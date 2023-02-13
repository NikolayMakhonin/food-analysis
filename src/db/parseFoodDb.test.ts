import { parseFoodDb } from './parseFoodDb'
import {FoodInfoSRLegacy} from "src/db/contracts";

describe('parseFoodDb', function () {
  this.timeout(5 * 60 * 1000)

  function toBeNumber(received, type, min, max) {
    const pass = typeof received === 'number'
      && !Number.isNaN(received)
      && received !== Infinity
      && received !== -Infinity
      && (type !== 'int' || Number.isInteger(received))
      && (min == null || received >= min)
      && (max == null || received <= max)
    if (pass) {
      return {
        message: () => `expected ${received} not to be a number`,
        pass   : true,
      }
    }
    else {
      return {
        message: () => `expected ${received} to be a number`,
        pass   : false,
      }
    }
  }

  function toBeNumberAsString(received, type, min, max) {
    const pass = typeof received === 'string'
    if (!pass) {
      return {
        message: () => `expected ${received} to be a string`,
        pass   : false,
      }
    }
    return toBeNumber(Number(received), type, min, max)
  }

  function toBeEmptyArray(received) {
    const pass = Array.isArray(received) && received.length === 0
    if (pass) {
      return {
        message: () => `expected ${received} not to be an empty array`,
        pass   : true,
      }
    }
    else {
      return {
        message: () => `expected ${received} to be an empty array`,
        pass   : false,
      }
    }
  }

  // custom matcher with parameters:
  // type: 'int' | 'float'
  // min?: number
  // max?: number
  expect.extend({
    toBeNumber        : toBeNumber as any,
    toBeNumberAsString: toBeNumberAsString as any,
    toBeEmptyArray    : toBeEmptyArray as any,
  })

  function expectNumber(type: 'int' | 'float', min?: number, max?: number): any {
    return (expect as any).toBeNumber(type, min, max)
  }

  function expectNumberAsString(type: 'int' | 'float', min?: number, max?: number): any {
    return (expect as any).toBeNumberAsString(type, min, max)
  }

  function expectEmptyArray(): any {
    return (expect as any).toBeEmptyArray()
  }

  const foodInfoSRLegacy = {
    SRLegacyFoods: expect.arrayContaining([
      {
        foodClass    : 'FinalFood',
        description  : expect.any(String),
        foodNutrients: expect.arrayContaining([
          {
            type    : 'FoodNutrient',
            id      : expectNumber('int'),
            nutrient: {
              id      : expectNumber('int'),
              number  : expectNumberAsString('int'),
              name    : expect.any(String),
              rank    : expectNumber('int'),
              unitName: expect.any(String),
            },
            dataPoints            : expectNumber('int'),
            foodNutrientDerivation: {
              code              : expect.any(String),
              description       : expect.any(String),
              foodNutrientSource: {
                id         : expectNumber('int'),
                code       : expectNumberAsString('int'),
                description: expect.any(String),
              },
            },
            amount: expectNumber('float'),
          },
        ]),
        foodAttributes           : expectEmptyArray(),
        nutrientConversionFactors: [
          {
            type : expect.any(String),
            value: expectNumber('float'),
          },
        ],
        isHistoricalReference: expect.any(Boolean),
        ndbNumber            : expectNumber('int'),
        foodCategory         : {
          description: expect.any(String),
        },
        fdcId          : expectNumber('int'),
        dataType       : 'SR Legacy',
        inputFoods     : expectEmptyArray(),
        publicationDate: '4/1/2019',
        foodPortions   : [
          {
            id         : expectNumber('int'),
            measureUnit: {
              id          : expectNumber('int'),
              name        : 'undetermined',
              abbreviation: 'undetermined',
            },
            modifier      : expect.any(String),
            gramWeight    : expectNumber('int'),
            sequenceNumber: expectNumber('int'),
          },
        ],
      },
    ]),
  }

  it('base', async function () {
    const data: FoodInfoSRLegacy = await parseFoodDb({
      dbPath: 'tmp/data/FoodData_Central_sr_legacy_food_json_2021-10-28.json',
    })
    expect(data.SRLegacyFoods)
      .toMatchObject(foodInfoSRLegacy.SRLegacyFoods)
    console.log(`count: ${data.SRLegacyFoods.length}`)

    function getMinMax(obj: any, minMax?: any, keyOrIndex?: string | number) {
      if (obj == null) {
        throw new Error('obj is null')
      }

      if (typeof obj === 'number' || typeof obj === 'boolean') {
        if (!Array.isArray(minMax[keyOrIndex])) {
          minMax[keyOrIndex] = [obj, obj]
          return
        }

        if (obj < minMax[keyOrIndex][0]) {
          minMax[keyOrIndex][0] = obj
        }
        if (obj > minMax[keyOrIndex][1]) {
          minMax[keyOrIndex][1] = obj
        }
        return
      }

      if (typeof obj === 'string') {
        // collect list of first 100 unique strings to a Set
        if (minMax[keyOrIndex] instanceof Set) {
          if (minMax[keyOrIndex].size < 100) {
            minMax[keyOrIndex].add(obj)
          }
        }
        else {
          minMax[keyOrIndex] = new Set([obj])
        }
        return
      }

      if (Array.isArray(obj)) {
        if (minMax == null) {
          minMax = []
        }
        for (let i = 0; i < obj.length; i++) {
          getMinMax(obj[i], minMax, i)
        }
        return minMax
      }

      if (typeof obj === 'object') {
        if (minMax == null) {
          minMax = {}
        }
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            getMinMax(obj[key], minMax, key)
          }
        }
        return minMax
      }

      throw new Error(`unknown type: ${typeof obj}`)
    }

    const minMax = getMinMax(data.SRLegacyFoods)

    debugger
  })
})

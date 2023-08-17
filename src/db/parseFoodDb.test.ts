import { parseFoodDb } from './parseFoodDb'
import {Food, FoodInfoSRLegacy} from 'src/db/contracts'
import * as fs from 'fs'
import {
  getAllNutrients,
  getMinPortion,
  getNutrient,
  getNutrientAmount,
  isAvailable,

} from 'src/db/helpers'
import {isNatural} from 'src/db/getFoodClassification'

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
              unitName: 'g',
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

    // const allFoodCategories = new Set()
    // data.SRLegacyFoods.forEach((foodInfo: FoodInfo) => {
    //   allFoodCategories.add(foodInfo.foodCategory.description)
    // })
    // console.log(`allFoodCategories: '${[...allFoodCategories].sort().join('\',\n\'')}'`)

    data.SRLegacyFoods.forEach((foodInfo: Food) => {
      if (![
        'American Indian/Alaska Native Foods',
        'Baby Foods',
        'Baked Products',
        'Beef Products',
        'Beverages',
        'Breakfast Cereals',
        'Cereal Grains and Pasta',
        'Dairy and Egg Products',
        'Fast Foods',
        'Fats and Oils',
        'Finfish and Shellfish Products',
        'Fruits and Fruit Juices',
        'Lamb, Veal, and Game Products',
        'Legumes and Legume Products',
        'Meals, Entrees, and Side Dishes',
        'Nut and Seed Products',
        'Pork Products',
        'Poultry Products',
        'Restaurant Foods',
        'Sausages and Luncheon Meats',
        'Snacks',
        'Soups, Sauces, and Gravies',
        'Spices and Herbs',
        'Sweets',
        'Vegetables and Vegetable Products',
      ].includes(foodInfo.foodCategory.description)) {
        throw new Error(`unknown foodCategory.description: ${foodInfo.foodCategory.description}`)
      }
    })

    console.log(`count: ${data.SRLegacyFoods.length}`)

    function getMinMax(obj: any, minMax?: any) {
      if (obj == null) {
        throw new Error('obj is null')
      }

      if (typeof obj === 'number' || typeof obj === 'boolean') {
        if (!Array.isArray(minMax)) {
          minMax = [obj, obj]
          return minMax
        }

        if (obj < minMax[0]) {
          minMax[0] = obj
        }
        if (obj > minMax[1]) {
          minMax[1] = obj
        }
        return minMax
      }

      if (typeof obj === 'string') {
        // collect list of first 1000 unique strings to a Set
        if (minMax instanceof Set) {
          if (minMax.size < 1000) {
            minMax.add(obj)
          }
        }
        else {
          minMax = new Set([obj])
        }
        return minMax
      }

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          minMax = getMinMax(obj[i], minMax)
        }
        return minMax
      }

      if (typeof obj === 'object') {
        if (minMax == null) {
          minMax = {}
        }
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            minMax[key] = getMinMax(obj[key], minMax[key])
          }
        }
        return minMax
      }

      throw new Error(`unknown type: ${typeof obj}`)
    }

    const minMax = getMinMax(data.SRLegacyFoods)

    debugger
  })

  it('search', async function () {
    const data: FoodInfoSRLegacy = await parseFoodDb({
      dbPath: 'tmp/data/FoodData_Central_sr_legacy_food_json_2021-10-28.json',
    })

    const allNutrients = getAllNutrients(data.SRLegacyFoods)

    const potassium = getNutrient({
      nutrients: allNutrients,
      filter   : nutrient => /potassium/i.test(nutrient.nutrient.name),
    })

    // ищем продукты богатые калием (не меньше 1% от суточной нормы на 100 грамм продукта)
    const found = data.SRLegacyFoods.filter(food => {
      if (!isNatural(food)) {
        return false
      }

      const amount = getNutrientAmount({
        food,
        nutrientId: potassium.nutrient.id,
      })

      if (amount == null) {
        return false
      }

      return true
    })

    type ResultItem = {
      amount: number // g
      portion: number // g
      amountPerPortion: number // g
      food: Food
    }

    const result: ResultItem[] = found.map(food => {
      const amount = getNutrientAmount({
        food,
        nutrientId: potassium.nutrient.id,
      })

      const portion = getMinPortion(food)?.gramWeight ?? 100

      return {
        amount,
        portion,
        amountPerPortion: amount * portion / 100,
        food            : food,
      }
    })

    result.sort((a, b) => {
      return a.amountPerPortion > b.amountPerPortion ? -1 : 1
    })

    const csvCells: string[][] = [
      ['amount', 'portion', 'amountPerPortion', 'category', 'description'],
      ...result.slice(0, 1000).map(item => {
        return [
          item.amount + '',
          item.portion + '',
          item.amountPerPortion + '',
          item.food.foodCategory.description,
          item.food.description,
        ]
      }),
    ]

    const csv = csvCells.map(cells => cells.join('\t')).join('\n')

    await fs.promises.writeFile('tmp/report.csv', csv, { encoding: 'utf8' })
  })

  it('filter', async function () {
    const data: FoodInfoSRLegacy = await parseFoodDb({
      dbPath: 'tmp/data/FoodData_Central_sr_legacy_food_json_2021-10-28.json',
    })

    const allNutrients = getAllNutrients(data.SRLegacyFoods)

    const found = data.SRLegacyFoods.filter(food => {
      // if (!isNatural(food)) {
      //   return false
      // }

      if (isAvailable(food) != null) {
        return false
      }

      return true
    })

    found.sort((a, b) => {
      if (a.foodCategory.description !== b.foodCategory.description) {
        return a.foodCategory.description < b.foodCategory.description ? -1 : 1
      }
      if (a.description !== b.description) {
        return a.description < b.description ? -1 : 1
      }
      return a.fdcId < b.fdcId ? -1 : 1
    })

    const csvCells: string[][] = [
      ['fdcId', 'category', 'description', 'natural'],
      ...found.map(food => {
        return [
          food.fdcId + '',
          food.foodCategory.description,
          food.description,
          isNatural(food) ? '1' : '0',
        ]
      }),
    ]

    const csv = csvCells.map(cells => cells.join('\t')).join('\n')

    await fs.promises.writeFile('tmp/filter.csv', csv, { encoding: 'utf8' })
  })
})

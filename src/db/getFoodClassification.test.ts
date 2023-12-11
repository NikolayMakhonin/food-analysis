import { parseFoodDb } from './parseFoodDb'
import {Food, FoodInfoSRLegacy} from 'src/db/contracts'
import {
  getAllNutrients,
} from 'src/db/helpers'
import {getFoodClassification, isNatural} from 'src/db/getFoodClassification'

describe('getFoodClassification', function () {
  this.timeout(5 * 60 * 1000)

  it('base', async function () {
    const data: FoodInfoSRLegacy = await parseFoodDb({
      dbPath: 'tmp/data/FoodData_Central_sr_legacy_food_json_2021-10-28.json',
    })

    const allNutrients = getAllNutrients(data.SRLegacyFoods)

    function foodError(valuesName: string, values: string[], food: Food) {
      console.error(`${valuesName} [${values.join(',')}]: ${food.foodCategory.description} > ${food.description}`)
    }

    for (const food of data.SRLegacyFoods) {
      if (!isNatural(food)) {
        continue
      }
      const classification = getFoodClassification(food)
      if (classification.type.length !== 1) {
        foodError('type', classification.type, food)
      }
      if (classification.type.includes('meat')) {
        if (classification.meatType.length !== 1) {
          foodError('meatType', classification.meatType, food)
        }
        if (classification.meatPart.length !== 1
          && classification.meatType[0] !== 'chicken'
          && classification.meatType[0] !== 'poultry'
          && classification.meatType[0] === 'beef'
        ) {
          foodError('meatPart', [String(classification.meatPart)], food)
        }
      }
    }
  })
})

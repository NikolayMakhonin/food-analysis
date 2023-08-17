import { parseFoodDb } from './parseFoodDb'
import {FoodInfoSRLegacy} from 'src/db/contracts'
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

    for (const food of data.SRLegacyFoods) {
      if (!isNatural(food)) {
        continue
      }
      const classification = getFoodClassification(food)
    }
  })
})

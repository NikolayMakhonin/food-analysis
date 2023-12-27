import {FoodInfoSRLegacy} from 'src/db/contracts'
import {
  getAllNutrients,
} from 'src/db/helpers'
import fs from 'fs'
import {parseFoodDb} from 'src/db/parseFoodDb'

describe('parser', function () {
  this.timeout(5 * 60 * 1000)

  it('get all db nutrients', async function () {
    const data: FoodInfoSRLegacy = await parseFoodDb({
      dbPath: 'tmp/data/FoodData_Central_sr_legacy_food_json_2021-10-28.json',
    })

    const allNutrients = getAllNutrients(data.SRLegacyFoods)

    allNutrients.sort((a, b) => a.name > b.name ? 1 : -1)

    // const csvCells: string[][] = [
    //   ['amount', 'portion', 'amountPerPortion', 'category', 'description'],
    //   ...result.slice(0, 1000).map(item => {
    //     return [
    //       item.amount + '',
    //       item.portion + '',
    //       item.amountPerPortion + '',
    //       item.food.foodCategory.description,
    //       item.food.description,
    //     ]
    //   }),
    // ]
    // const csv = csvCells.map(cells => cells.join('\t')).join('\n')
    // await fs.promises.writeFile('tmp/report.csv', csv, { encoding: 'utf8' })

    const csvCells: string[][] = [
      ['id', 'rank', 'name', 'unit'],
      ...allNutrients.map(item => {
        return [
          item.id + '',
          item.rank + '',
          item.name,
          item.unitName,
        ]
      }),
    ]

    const csv = csvCells.map(cells => cells.join('\t')).join('\n')

    await fs.promises.writeFile('tmp/nutrients.csv', csv, { encoding: 'utf8' })
  })
})

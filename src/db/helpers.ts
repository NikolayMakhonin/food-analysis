import {Food, Nutrient, Portion} from 'src/db/contracts'

export function getAllNutrients(food: Food[]): Nutrient[] {
  const nutrients = new Map<number, Nutrient>()
  for (const foodItem of food) {
    for (const nutrient of foodItem.foodNutrients) {
      nutrients.set(nutrient.nutrient.id, nutrient)
    }
  }
  return Array.from(nutrients.values())
}

export function getNutrient({
  nutrients,
  filter,
}: {
  nutrients: Nutrient[],
  filter: (nutrient: Nutrient) => boolean
}): Nutrient | null {
  let found: Nutrient | null = null
  for (const nutrient of nutrients) {
    if (filter(nutrient)) {
      if (found != null) {
        throw new Error(`Found multiple nutrients: ${nutrient.nutrient.name} and ${found.nutrient.name}`)
      }
      found = nutrient
    }
  }
  return found
}

export function getNutrientAmount({
  food,
  nutrientId,
}: {
  food: Food,
  nutrientId: number
}) {
  const nutrient = food.foodNutrients.find(nutrient => nutrient.nutrient.id === nutrientId)
  if (nutrient == null) {
    return null
  }
  return nutrient.amount
}

export function getMinPortion(food: Food): Portion | null {
  return food.foodPortions.reduce((min, portion) => {
    if (min == null || portion.gramWeight < min.gramWeight) {
      return portion
    }
    return min
  }, null as typeof food.foodPortions[0] | null)
}

/**
 * true: Я скорее всего могу это купить в продуктовом магазине
 * false: Я скорее всего не могу это купить в продуктовом магазине
 * null: Этот продукт еще не проверен
 */
export function isAvailable(food: Food): boolean | null {
  return null
}

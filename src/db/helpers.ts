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

export function getFoodKind(food: Food): string {
  if (food.foodCategory.description === 'Beef Products') {
    if (/\b(roasted)\b/.test(food.description)) {
      return 'beef roasted'
    }
    if (/\b(boiled)\b/.test(food.description)) {
      return 'beef boiled'
    }
  }
  return null
}

export function isNatural(food: Food) {
  if (![
    // 'American Indian/Alaska Native Foods',
    // 'Baby Foods',
    // 'Baked Products',
    'Beef Products',
    'Beverages',
    // 'Breakfast Cereals',
    'Cereal Grains and Pasta',
    'Dairy and Egg Products',
    // 'Fast Foods',
    'Fats and Oils',
    'Finfish and Shellfish Products',
    'Fruits and Fruit Juices',
    'Lamb, Veal, and Game Products',
    'Legumes and Legume Products',
    // 'Meals, Entrees, and Side Dishes',
    'Nut and Seed Products',
    'Pork Products',
    'Poultry Products',
    // 'Restaurant Foods',
    // 'Sausages and Luncheon Meats',
    // 'Snacks',
    // 'Soups, Sauces, and Gravies',
    'Spices and Herbs',
    // 'Sweets',
    'Vegetables and Vegetable Products',
  ].includes(food.foodCategory.description)) {
    return false
  }

  if (/\b(dehydrated|defatted|dried|drained|isolate|flour|raw|powder|concentrate|dry)\b/.test(food.description)) {
    return false
  }

  if (
    /\b(raw)\b/.test(food.description)
    && (![
      'Beverages',
      'Dairy and Egg Products',
      'Fats and Oils',
      'Fruits and Fruit Juices',
      'Nut and Seed Products',
      'Spices and Herbs',
      'Vegetables and Vegetable Products',
    ].includes(food.foodCategory.description))
  ) {
    return false
  }

  if (
    food.foodCategory.description === 'Cereal Grains and Pasta'
    && /\b(pasta)\b/.test(food.description)
  ) {
    return false
  }

  return true
}

/**
 * true: Я скорее всего могу это купить в продуктовом магазине
 * false: Я скорее всего не могу это купить в продуктовом магазине
 * null: Этот продукт еще не проверен
 */
export function isAvailable(food: Food): boolean | null {


  return null
}

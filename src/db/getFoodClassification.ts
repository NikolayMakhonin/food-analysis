import {Food} from 'src/db/contracts'

type FoodType = 'meat' | 'vegetable' | 'fruit' | 'oil' | 'milk' | 'egg' | 'fish' | 'seafood' | 'juice' | 'species'

type MeatType = 'beef' | 'pork' | 'chicken' | 'lamb'

type MeatPart =
  'breast'
  | 'thigh'
  | 'wing'
  | 'leg'
  | 'drumstick'
  | 'back'
  | 'neck'
  | 'gizzard'
  | 'heart'
  | 'liver'
  | 'skin'
  | 'wing tip'
  | 'wing meat'
  | 'wing skin'
  | 'wing meat and skin'

type CookType = 'roasted' | 'boiled' | 'braised' | 'steamed' | 'fried' | 'baked'

type VegetableType = 'beans' | 'nuts' | 'seeds' | 'cereal'

export type FoodClassification = {
  type: FoodType,
  meatType: MeatType | null,
  meatPart: MeatPart | null,
  cookType: CookType | null,
  canned: boolean,
}

export function getFoodType(food: Food): FoodType | null {
  if (
    food.foodCategory.description === 'Vegetables and Vegetable Products'
    || food.foodCategory.description === 'Legumes and Legume Products'
    || food.foodCategory.description === 'Nut and Seed Products'
    || food.foodCategory.description === 'Cereal Grains and Pasta'
  ) {
    return 'vegetable'
  }
  if (food.foodCategory.description === 'Fruits and Fruit Juices') {
    return 'fruit'
  }
  if (food.foodCategory.description === 'Beef Products'
    || food.foodCategory.description === 'Pork Products'
    || food.foodCategory.description === 'Poultry Products'
    || food.foodCategory.description === 'Lamb, Veal, and Game Products'
  ) {
    return 'meat'
  }
  if (food.foodCategory.description === 'Fats and Oils') {
    return 'oil'
  }
  if (food.foodCategory.description === 'Dairy and Egg Products') {
    if (/\b(cheese|cream|milk|yogurt|kefir|butter)\b/i.test(food.description)) {
      return 'milk'
    }
    if (/\b(egg)\b/i.test(food.description)) {
      return 'egg'
    }
  }
  if (food.foodCategory.description === 'Finfish and Shellfish Products') {
    if (/\b(fish|salmon)\b/i.test(food.description)) {
      return 'fish'
    }
    if (/\b(shrimps?|scallops?|mollusks?|crustaceans?|crab)\b/i.test(food.description)) {
      return 'seafood'
    }
  }
  if (food.foodCategory.description === 'Beverages' && /\b(juice)\b/i.test(food.description)) {
    return 'juice'
  }
  if (food.foodCategory.description === 'Spices and Herbs') {
    return 'species'
  }

  throw new Error(`Unknown food category: ${JSON.stringify({
    ...food,
    foodNutrients: null,
  }, null, 2)}`)
}

export function getMeatType(food: Food): MeatType | null {
  if (food.foodCategory.description === 'Beef Products') {
    return 'beef'
  }
  if (food.foodCategory.description === 'Pork Products') {
    return 'pork'
  }
  if (food.foodCategory.description === 'Poultry Products') {
    return 'chicken'
  }
  if (food.foodCategory.description === 'Lamb, Veal, and Game Products') {
    if (/\b(lamb)\b/i.test(food.description)) {
      return 'lamb'
    }
    if (/\b(veal)\b/i.test(food.description)) {
      return 'beef'
    }
  }

  throw new Error(`Unknown meat type: ${JSON.stringify({
    ...food,
    foodNutrients: null,
  }, null, 2)}`)
}

export function getMeatPart(food: Food): MeatPart | null {
  if (/\b(breast)\b/i.test(food.description)) {
    return 'breast'
  }
  return null
}

export function getCookType(food: Food): CookType | null {
  if (/\b(roasted)\b/i.test(food.description)) {
    return 'roasted'
  }
  if (/\b(boiled)\b/i.test(food.description)) {
    return 'boiled'
  }
  if (/\b(braised)\b/i.test(food.description)) {
    return 'braised'
  }
  if (/\b(steamed)\b/i.test(food.description)) {
    return 'steamed'
  }
  if (/\b(fried)\b/i.test(food.description)) {
    return 'fried'
  }
  if (/\b(baked)\b/i.test(food.description)) {
    return 'baked'
  }
  return null
}

export function getVegetableType(food: Food): VegetableType | null {
  if (/\b(seeds)\b/i.test(food.description)) {
    return 'seeds'
  }
  if (/\b(beans)\b/i.test(food.description)) {
    return 'beans'
  }
  if (/\b(nuts)\b/i.test(food.description)) {
    return 'nuts'
  }
  if (/\b(cereal)\b/i.test(food.description)) {
    return 'cereal'
  }
  return null
}

export function isCanned(food: Food): boolean {
  return /\b(canned)\b/i.test(food.description)
}

// export function getFoodKind(food: Food): string {
//   if (food.foodCategory.description === 'Beef Products') {
//     if (/\b(roasted)\b/i.test(food.description)) {
//       return 'beef roasted'
//     }
//     if (/\b(boiled)\b/i.test(food.description)) {
//       return 'beef boiled'
//     }
//   }
//   return null
// }

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

  if (/\b(dehydrated|defatted|dried|drained|isolate|flour|raw|powder|concentrate|dry|powdered|reduced|calorie|made with|meatless|tofu|imitation|substitute|papad|gluten|cornmeal|nonfat|fat free|skim|fortified|mixture|whey|supplement|eggnog|dulce de leche)\b/i.test(food.description)) {
    return false
  }

  if (/\b(bison|game)\b/i.test(food.description)) {
    return false
  }

  if (
    /\b(raw)\b/i.test(food.description)
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
    /\b(dressing)\b/i.test(food.description)
    && ([
      'Fats and Oils',
    ].includes(food.foodCategory.description))
  ) {
    return false
  }

  if (
    /\b(whipped|topping)\b/i.test(food.description)
    && ([
      'Dairy and Egg Products',
    ].includes(food.foodCategory.description))
  ) {
    return false
  }

  if (
    !/\b(juice)\b/i.test(food.description)
    && ([
      'Beverages',
    ].includes(food.foodCategory.description))
  ) {
    return false
  }

  if (
    food.foodCategory.description === 'Cereal Grains and Pasta'
    && /\b(pasta)\b/i.test(food.description)
  ) {
    return false
  }

  return true
}

export function getFoodClassification(food: Food): FoodClassification {
  const result: FoodClassification = {} as any
  result.type = getFoodType(food)
  if (result.type === 'meat') {
    result.meatType = getMeatType(food)
  }
  return result
}

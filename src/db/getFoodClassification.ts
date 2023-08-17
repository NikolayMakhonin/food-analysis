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
  type: FoodType[],
  meatType: MeatType[],
  meatPart: MeatPart[],
  cookType: CookType[],
  canned: boolean,
}

export function getFoodType(food: Food): FoodType[] {
  const result: FoodType[] = []
  if (
    food.foodCategory.description === 'Vegetables and Vegetable Products'
    || food.foodCategory.description === 'Legumes and Legume Products'
    || food.foodCategory.description === 'Nut and Seed Products'
    || food.foodCategory.description === 'Cereal Grains and Pasta'
  ) {
    result.push('vegetable')
  }
  if (food.foodCategory.description === 'Fruits and Fruit Juices') {
    result.push('fruit')
  }
  if (food.foodCategory.description === 'Beef Products'
    || food.foodCategory.description === 'Pork Products'
    || food.foodCategory.description === 'Poultry Products'
    || food.foodCategory.description === 'Lamb, Veal, and Game Products'
  ) {
    result.push('meat')
  }
  if (food.foodCategory.description === 'Fats and Oils') {
    result.push('oil')
  }
  if (food.foodCategory.description === 'Dairy and Egg Products') {
    if (/\b(cheese|cream|milk|yogurt|kefir|butter)\b/i.test(food.description)) {
      result.push('milk')
    }
    if (/\b(egg)\b/i.test(food.description)) {
      result.push('egg')
    }
  }
  if (food.foodCategory.description === 'Finfish and Shellfish Products') {
    if (/\b(fish|salmon)\b/i.test(food.description)) {
      result.push('fish')
    }
    if (/\b(shrimps?|scallops?|mollusks?|crustaceans?|crab)\b/i.test(food.description)) {
      result.push('seafood')
    }
  }
  if (food.foodCategory.description === 'Beverages' && /\b(juice)\b/i.test(food.description)) {
    result.push('juice')
  }
  if (food.foodCategory.description === 'Spices and Herbs') {
    result.push('species')
  }
  return result
}

export function getMeatType(food: Food): MeatType[] {
  const result: MeatType[] = []
  if (food.foodCategory.description === 'Beef Products') {
    result.push('beef')
  }
  if (food.foodCategory.description === 'Pork Products') {
    result.push('pork')
  }
  if (food.foodCategory.description === 'Poultry Products') {
    result.push('chicken')
  }
  if (food.foodCategory.description === 'Lamb, Veal, and Game Products') {
    if (/\b(lamb)\b/i.test(food.description)) {
      result.push('lamb')
    }
    if (/\b(veal)\b/i.test(food.description)) {
      result.push('beef')
    }
  }
  return result
}

export function getMeatPart(food: Food): MeatPart[] {
  const result: MeatPart[] = []
  if (/\b(breast)\b/i.test(food.description)) {
    result.push('breast')
  }
  if (/\b(wing)\b/i.test(food.description)) {
    result.push('wing')
  }
  if (/\b(drumstick)\b/i.test(food.description)) {
    result.push('drumstick')
  }
  return result
}

export function getCookType(food: Food): CookType[] {
  const result: CookType[] = []
  if (/\b(roasted)\b/i.test(food.description)) {
    result.push('roasted')
  }
  if (/\b(boiled)\b/i.test(food.description)) {
    result.push('boiled')
  }
  if (/\b(braised)\b/i.test(food.description)) {
    result.push('braised')
  }
  if (/\b(steamed)\b/i.test(food.description)) {
    result.push('steamed')
  }
  if (/\b(fried)\b/i.test(food.description)) {
    result.push('fried')
  }
  if (/\b(baked)\b/i.test(food.description)) {
    result.push('baked')
  }
  return result
}

export function getVegetableType(food: Food): VegetableType[] {
  const result: VegetableType[] = []
  if (/\b(seeds)\b/i.test(food.description)) {
    result.push('seeds')
  }
  if (/\b(beans)\b/i.test(food.description)) {
    result.push('beans')
  }
  if (/\b(nuts)\b/i.test(food.description)) {
    result.push('nuts')
  }
  if (/\b(cereal)\b/i.test(food.description)) {
    result.push('cereal')
  }
  return result
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
  if (result.type.includes('meat')) {
    result.meatType = getMeatType(food)
    result.meatPart = getMeatPart(food)
  }
  return result
}

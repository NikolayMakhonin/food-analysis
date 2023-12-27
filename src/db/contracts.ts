export type Nutrient = {
  /** int */
  id: number
  /** int */
  number: string
  name: string
  /** int */
  rank: number
  unitName: 'g'
}

export type NutrientAmount = {
  type: 'FoodNutrient'
  /** int */
  id: number
  nutrient: Nutrient
  /** int */
  dataPoints: number
  foodNutrientDerivation: {
    code: string
    description: string
    foodNutrientSource: {
      /** int */
      id: number
      /** int */
      code: string
      description: string
    }
  }
  amount: number
}

export type Portion = {
  /** int */
  id: number
  measureUnit: {
    /** int */
    id: number
    name: 'undetermined'
    abbreviation: 'undetermined'
  }
  modifier: 'serving'
  /** int */
  gramWeight: number
  /** int */
  sequenceNumber: number
}

export type Food = {
  foodClass: 'FinalFood'
  description: string
  foodNutrients: NutrientAmount[]
  /** empty array */
  foodAttributes: any[]
  nutrientConversionFactors: {
    type: string
    value: number
  }[]
  isHistoricalReference: boolean
  /** int */
  ndbNumber: number
  foodCategory: {
    description:
      'American Indian/Alaska Native Foods' |
      'Baby Foods' |
      'Baked Products' |
      'Beef Products' |
      'Beverages' |
      'Breakfast Cereals' |
      'Cereal Grains and Pasta' |
      'Dairy and Egg Products' |
      'Fast Foods' |
      'Fats and Oils' |
      'Finfish and Shellfish Products' |
      'Fruits and Fruit Juices' |
      'Lamb, Veal, and Game Products' |
      'Legumes and Legume Products' |
      'Meals, Entrees, and Side Dishes' |
      'Nut and Seed Products' |
      'Pork Products' |
      'Poultry Products' |
      'Restaurant Foods' |
      'Sausages and Luncheon Meats' |
      'Snacks' |
      'Soups, Sauces, and Gravies' |
      'Spices and Herbs' |
      'Sweets' |
      'Vegetables and Vegetable Products'
  }
  /** int */
  fdcId: number
  dataType: 'SR Legacy'
  /** empty array */
  inputFoods: any[]
  publicationDate: '4/1/2019',
  foodPortions: Portion[]
}

export type FoodInfoSRLegacy = {
  SRLegacyFoods: Food[]
}

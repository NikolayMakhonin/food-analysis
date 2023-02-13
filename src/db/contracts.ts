export type FoodInfoSRLegacy = {
  SRLegacyFoods: {
    foodClass: 'FinalFood'
    description: string
    foodNutrients: {
      type: 'FoodNutrient'
      /** int */
      id: number
      nutrient: {
        /** int */
        id: number
        /** int */
        number: string
        name: string
        /** int */
        rank: number
        unitName: string
      }
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
    }[]
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
      description: string
    }
    /** int */
    fdcId: number
    dataType: 'SR Legacy'
    /** empty array */
    inputFoods: any[]
    publicationDate: '4/1/2019',
    foodPortions: {
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
    }[]
  }[]
}

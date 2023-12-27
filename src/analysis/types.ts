export type UnitId = 'g' | 'mg' | 'mcg' | 'kJ' | 'kcal' | 'IU'

export type Amount = {
  value: number
  unit: string
}

export type NutrientId = string

export type NutrientNorm = {
  names: string[]
  norm: number
  max: number
  unit: string
}

export type NameToId = (name: string) => string | null

export function unitNameToId(name: string): UnitId | null {
  switch (name.toLowerCase()) {
    case 'g':
      return 'g'
    case 'mg':
      return 'mg'
    case 'mcg':
    case 'µg':
      return 'mcg'
    case 'kj':
      return 'kJ'
    case 'kcal':
      return 'kcal'
    case 'iu':
      return 'IU'
    default:
      return null
  }
}

/*
Alanine
Alcohol, ethyl
Arginine
Ash
Aspartic acid
Betaine
Beta-sitosterol
Caffeine
Calcium, Ca
Campesterol
Carbohydrate, by difference
Carotene, alpha
Carotene, beta
Cholesterol
Choline, total
Copper, Cu
Cryptoxanthin, beta
Cystine
Energy
Energy
Fatty acids, total monounsaturated
Fatty acids, total polyunsaturated
Fatty acids, total saturated
Fatty acids, total trans
Fatty acids, total trans-monoenoic
Fatty acids, total trans-polyenoic
Fiber, total dietary
Fluoride, F
Folate, DFE
Folate, food
Folate, total
Folic acid
Fructose
Galactose
Glucose
Glutamic acid
Glycine
Histidine
Hydroxyproline
Iron, Fe
Isoleucine
Lactose
Leucine
Lutein + zeaxanthin
Lycopene
Lysine
Magnesium, Mg
Maltose
Manganese, Mn
Methionine
MUFA 14:1
MUFA 15:1
MUFA 16:1
MUFA 16:1 c
MUFA 17:1
MUFA 18:1
MUFA 18:1 c
MUFA 18:1-11 t (18:1t n-7)
MUFA 20:1
MUFA 22:1
MUFA 22:1 c
MUFA 24:1 c
Niacin
Pantothenic acid
Phenylalanine
Phosphorus, P
Phytosterols
Potassium, K
Proline
Protein
PUFA 18:2
PUFA 18:2 CLAs
PUFA 18:2 i
PUFA 18:2 n-6 c,c
PUFA 18:3
PUFA 18:3 n-3 c,c,c (ALA)
PUFA 18:3 n-6 c,c,c
PUFA 18:3i
PUFA 18:4
PUFA 2:4 n-6
PUFA 2:5 n-3 (EPA)
PUFA 20:2 n-6 c,c
PUFA 20:3
PUFA 20:3 n-3
PUFA 20:3 n-6
PUFA 20:4
PUFA 21:5
PUFA 22:4
PUFA 22:5 n-3 (DPA)
PUFA 22:6 n-3 (DHA)
Retinol
Riboflavin
Selenium, Se
Serine
SFA 10:0
SFA 12:0
SFA 13:0
SFA 14:0
SFA 15:0
SFA 16:0
SFA 17:0
SFA 18:0
SFA 20:0
SFA 22:0
SFA 24:0
SFA 4:0
SFA 6:0
SFA 8:0
Sodium, Na
Starch
Stigmasterol
Sucrose
Sugars, total including NLEA
TFA 16:1 t
TFA 18:1 t
TFA 18:2 t not further defined
TFA 18:2 t,t
TFA 22:1 t
Theobromine
Thiamin
Threonine
Tocopherol, beta
Tocopherol, delta
Tocopherol, gamma
Tocotrienol, alpha
Tocotrienol, beta
Tocotrienol, delta
Tocotrienol, gamma
Total lipid (fat)
Tryptophan
Tyrosine
Valine
Vitamin A, IU
Vitamin A, RAE
Vitamin B-12
Vitamin B-12, added
Vitamin B-6
Vitamin C, total ascorbic acid
Vitamin D (D2 + D3)
Vitamin D (D2 + D3), International Units
Vitamin D2 (ergocalciferol)
Vitamin D3 (cholecalciferol)
Vitamin E (alpha-tocopherol)
Vitamin E, added
Vitamin K (Dihydrophylloquinone)
Vitamin K (Menaquinone-4)
Vitamin K (phylloquinone)
Water
Zinc, Zn
 */
export function nutrientNameToIds(name: string): NutrientId[] | null {
  name = removeExtraSpaces(name.replace(/[^\p{L}\d]/gu, ' ').toLowerCase())
  const ids: NutrientId[] = []
  if (/\b(alanine|аланин)\b/i.test(name)) {
    ids.push('alanine')
  }
  if (/\b(alcohol|ethyl|этанол|этиловый спирт|алкоголь)\b/i.test(name)) {
    ids.push('alcohol')
  }
  if (/\b(arginine|аргинин)\b/i.test(name)) {
    ids.push('arginine')
  }
  if (/\b(ash|зола)\b/i.test(name)) {
    ids.push('ash')
  }
  if (/\b(Aspartic acid|аспартовая кислота)\b/i.test(name)) {
    ids.push('aspartic acid')
  }
  if (/\b(Betaine)\b/i.test(name)) {
    ids.push('betaine')
  }
  if (/\b(Beta[- ]*sitosterol)\b/i.test(name)) {
    ids.push('beta-sitosterol')
  }
  if (/\b(Caffeine)\b/i.test(name)) {
    ids.push('caffeine')
  }
  if (/\b(Calcium|Ca)\b/i.test(name)) {
    ids.push('calcium')
  }
  if (/\b(Campesterol)\b/i.test(name)) {
    ids.push('campesterol')
  }
  if (/\b(Carbohydrate)\b/i.test(name)) {
    ids.push('carbohydrate')
  }
  if (/\b(Carotene[, ]alpha|alpha[, ]carotene)\b/i.test(name)) {
    ids.push('carotene alpha')
  }
  if (/\b(Carotene[, ]beta|beta[, ]carotene)\b/i.test(name)) {
    ids.push('carotene beta')
  }
  if (/\b(Cholesterol)\b/i.test(name)) {
    ids.push('cholesterol')
  }
  if (/\b(Choline)\b/i.test(name)) {
    ids.push('choline')
  }
  if (/\b(Copper|Cu)\b/i.test(name)) {
    ids.push('copper')
  }
  if (/\b(Cryptoxanthin[, ]beta|beta[, ]cryptoxanthin)\b/i.test(name)) {
    ids.push('cryptoxanthin beta')
  }
  if (/\b(Cystine)\b/i.test(name)) {
    ids.push('cystine')
  }
  if (/\b(Energy|k?cal|calories?|kilojoules?|kJ)\b/i.test(name)) {
    ids.push('energy')
  }
  if (/\b(Monounsaturated|MUFA)\b/i.test(name)) {
    ids.push('fat monounsaturated')
  }
  if (/\b(Polyunsaturated|PUFA)\b/i.test(name)) {
    ids.push('fat polyunsaturated')
  }
  if (/\b(Saturated|SFA)\b/i.test(name)) {
    ids.push('fat saturated')
  }
  if (/\b(trans[- ]mono)/i.test(name)) {
    ids.push('fat trans monoenoic')
  }
  if (/\b(trans[- ]poly)/i.test(name)) {
    ids.push('fat trans polyenoic')
  }
  if (
    /\b(trans)\b/i.test(name)
    && !/\b(mono|poly)/i.test(name)
  ) {
    ids.push('fat trans polyenoic')
  }
  if (
    /\b(Cystine)\b/i.test(name)
  ) {
    ids.push('cystine')
  }
  if (
    /\b(Cysteine)\b/i.test(name)
  ) {
    ids.push('cysteine')
  }
  if (
    /\b(glutamine|glutamic acid)\b/i.test(name)
  ) {
    ids.push('glutamine')
  }
  if (
    /\b(hydroxyproline)\b/i.test(name)
  ) {
    ids.push('hydroxyproline')
  }
  if (
    /\b(proline)\b/i.test(name)
  ) {
    ids.push('proline')
  }




  return ids.length > 0 ? ids : null
}

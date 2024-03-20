// https://github.com/Fleker/pokemon-as-a-service/blob/main/shared/src/as-literals.ts
function asLiterals<T extends string>(arr: T[]): T[] { return arr; }

export const flavors = asLiterals([
  'Acidic',
  'Almond',
  'Berry',
  'Bitter',
  'Bold',
  'Boozy',
  'Bright',
  'Brown Sugar',
  'Burnt',
  'Caramel',
  'Cherry',
  'Chocolate',
  'Cinnamon',
  'Citrus',
  'Clementine',
  'Cocoa',
  'Coconut',
  'Creamy',
  'Crisp',
  'Dark',
  'Dark Chocolate',
  'Decaf',
  'Dried Fig',
  'Floral',
  'Full-Bodied',
  'Fruity',
  'Ginger',
  'Gingerbread',
  'Green Grape',
  'Honey',
  'Mango',
  'Maple Syrup',
  'Milk Chocolate',
  'Molasses',
  'Nutty',
  'Orange',
  'Roasted Nuts',
  'Round',
  'Silky',
  'Smoky',
  'Smooth',
  'Strawberry',
  'Sweet',
  'Syrupy',
  'Tea',
  'Tea-Like',
  'Toffee',
  'Tropical',
  'Vanilla',
  'Velvet',
  'Woody',
])
type Flavor = keyof {[K in (typeof flavors)[number]]: string}

export const serving = asLiterals([
  'Drip',
  'Cold Brew',
  'Iced',
  'Pod',
  'Pour-Over',
  'French Press',
  'Espresso',
  'Turkish',
])
type ServingType = keyof {[K in (typeof serving)[number]]: string}

export const classification = asLiterals([
  'Light Roast',
  'Medium Light Roast',
  'Medium Roast',
  'Medium Dark Roast',
  'Dark Roast',
  /**
   * Dominant cultivar, from Ethiopia et al
   * https://en.wikipedia.org/wiki/Coffea_arabica
   */
  'Arabica',
  /**
   * Popular cultivar, from west Africa
   * https://en.wikipedia.org/wiki/Coffea_canephora
   */
  'Robusta',
  /**
   * Rarer, from West Africa, South America, Pacific Islands
   * https://en.wikipedia.org/wiki/Coffea_liberica
   */
  'Liberica',
  // Same as Liberica
  // 'Excelsa',
  /**
   * Sierra Leone coffee, novel cultivar
   * https://en.wikipedia.org/wiki/Coffea_stenophylla
   */
  'Stenophylla',
  /**
   * Naturally decafinated coffee
   * https://en.wikipedia.org/wiki/Coffea_charrieriana
   */
  'Charrier',
  /**
   * Rare form of low-caffeine coffee
   * https://en.wikipedia.org/wiki/Coffea_racemosa
   */
  'Racemosa',
])
type ClassificationType = keyof {[K in (typeof classification)[number]]: string}

interface CoffeeDb {
  id: string
  label: string
  classification: ClassificationType
  source: string
  icon: string
}

function brandCoffees(source: string, icon: string, products: {label: string, classification: ClassificationType}[]): CoffeeDb[] {
  return products.map(p => ({
    ...p,
    source,
    icon,
    id: `${source}-${p.label.replace(/\s/g, '')}`,
  }))
}

export const coffees: CoffeeDb[] = [{
  id: 'starbucks0',
  label: 'Starbucks Blonde Roast',
  classification: 'Arabica',
  source: 'Starbucks',
  icon: 'http://beantown.space/client-assets/logos/starbucks.png',
}, ...brandCoffees('Counter Culture', 'http://beantown.space/client-assets/logos/counterculture.png', [{
    label: 'Intango',
    classification: 'Dark Roast',
  }, {
    label: 'Cueva de los Llanos',
    classification: 'Light Roast',
  }, {
    label: 'Mpemba',
    classification: 'Light Roast',
  }, {
    label: 'Eladio Chamba Anaerobic Washed',
    classification: 'Light Roast',
  }, {
    label: 'Valle Del Santuario',
    classification: 'Light Roast',
  }, {
    label: 'Mpemba - Natural Sundried',
    classification: 'Light Roast',
  }, {
    label: 'Nuevo Amanecer',
    classification: 'Light Roast',
  }, {
    label: 'La Golondrina',
    classification: 'Light Roast',
  }, {
    label: 'Big Trouble',
    classification: 'Medium Dark Roast',
  }, {
    label: 'Hologram',
    classification: 'Medium Roast',
  }, {
    label: 'Apollo',
    classification: 'Medium Roast',
  }, {
    label: 'Fast Forward',
    classification: 'Medium Roast',
  }, {
    label: 'Gradient',
    classification: 'Dark Roast',
  }, {
    label: 'Forty-Six',
    classification: 'Dark Roast',
  }, {
    label: 'Slow Motion',
    classification: 'Medium Roast',
  }, {
    label: 'Decaf Urcunina',
    classification: 'Medium Light Roast',
  }])
]

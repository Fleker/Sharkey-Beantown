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

let coffees: CoffeeDb[] = []

import * as os from '@/os.js';
export async function loadCoffees() {
  if (coffees.length) return coffees
  const res = await os.api('checkinables/list')
  coffees = res
  return coffees
}

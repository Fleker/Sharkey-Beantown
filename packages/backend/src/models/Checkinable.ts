import { Entity, Column, PrimaryColumn } from 'typeorm';
import { id } from './util/id.js';

@Entity()
export class Checkinable {
  @PrimaryColumn(id())
  id: string;

  /** The label of the coffee, ie. 'Counter Culture Intango' */
  @Column()
  label: string;

  /** The classification of the coffee, ie. 'Dark Roast' */
  @Column()
  classification: string;

  /** The company or source of the coffee, ie. 'Counter Culture' */
  @Column()
  source: string;

  /** URL pointing to the coffee icon, ie. 'http://.../counterculture.png' */
  @Column()
  icon: string;

  constructor(data: Partial<Checkinable>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}

/**
 * [
    {
        "id": "starbucks0",
        "label": "Starbucks Blonde Roast",
        "classification": "Arabica",
        "source": "Starbucks",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/starbucks.png"
    },
    {
        "id": "counter-culture-intango",
        "label": "Counter Culture Intango",
        "classification": "Dark Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-cueva",
        "label": "Counter Culture Cueva de los Llanos",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-mpemba",
        "label": "Counter Culture Mpemba",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-eladio",
        "label": "Counter Culture Eladio Chamba Anaerobic Washed",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-valle",
        "label": "Counter Culture Valle Del Santuario",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-mpemba-nat",
        "label": "Counter Culture Mpemba - Natural Sundried",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-nuevo",
        "label": "Counter Culture Nuevo Amanecer",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-la",
        "label": "Counter Culture La Golondrina",
        "classification": "Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-big",
        "label": "Counter Culture Big Trouble",
        "classification": "Medium Dark Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-hologram",
        "label": "Counter Culture Hologram",
        "classification": "Medium Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-apollo",
        "label": "Counter Culture Apollo",
        "classification": "Medium Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-fast",
        "label": "Counter Culture Fast Forward",
        "classification": "Medium Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-gradient",
        "label": "Counter Culture Gradient",
        "classification": "Dark Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-forty",
        "label": "Counter Culture Forty-Six",
        "classification": "Dark Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-slow",
        "label": "Counter Culture Slow Motion",
        "classification": "Medium Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "counter-culture-urcunina",
        "label": "Counter Culture Decaf Urcunina",
        "classification": "Medium Light Roast",
        "source": "Counter Culture",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/counterculture.png"
    },
    {
        "id": "victor-allen-brazil",
        "label": "Victor Allen Brazil Primo",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-hawaiian",
        "label": "Victor Allen Hawaiian Blend",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-kenya",
        "label": "Victor Allen Kenyan Supreme",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-papua",
        "label": "Victor Allen Papua New Guinea",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-columbian",
        "label": "Victor Allen 100% Columbian",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-caramel",
        "label": "Victor Allen Caramel Macchiato",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-donut",
        "label": "Victor Allen Donut Shop Blend",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-morning",
        "label": "Victor Allen Morning Blend",
        "classification": "Light Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-hazelnut",
        "label": "Victor Allen Hazelnut",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-seattle",
        "label": "Victor Allen Seattle Dark",
        "classification": "Dark Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-italian",
        "label": "Victor Allen Italian Roast",
        "classification": "Dark Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-french",
        "label": "Victor Allen French Roast",
        "classification": "Dark Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-vanilla",
        "label": "Victor Allen French Vanilla",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-sweet-caramel",
        "label": "Victor Allen Sweet & Salty Caramel",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-white",
        "label": "Victor Allen White Chocolate Caramel",
        "classification": "Arabica",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-pumpkin",
        "label": "Victor Allen Pumpkin Spice",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-peppermint",
        "label": "Victor Allen Peppermint Bark",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-peru",
        "label": "Victor Allen Organic Peruvian",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "victor-allen-buffalo",
        "label": "Victor Allen Buffalo Trace Natural Bourbon",
        "classification": "Medium Roast",
        "source": "Victor Allen",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/victor-allen.png"
    },
    {
        "id": "shop-nyc-zuri",
        "label": "Zuri Coffee",
        "classification": "Medium Roast",
        "source": "Zuri Coffee",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/shop-nynyc.png"
    },
    {
        "id": "zabars-medium",
        "label": "Zabar's Blend ",
        "classification": "Medium Roast",
        "source": "Zabars",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/shop-nynyc.png"
    },
    {
        "id": "google-barista-bombon",
        "label": "Bombon Latte",
        "classification": "Medium Roast",
        "source": "Google",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/shop-nynyc.png"
    },
    {
        "id": "google-barista-idido",
        "label": "Idido Pourover",
        "classification": "Arabica",
        "source": "Google",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/shop-nynyc.png"
    },
    {
        "id": "gracenote-mistyvalley",
        "label": "Gracenote Misty Valley",
        "classification": "Arabica",
        "source": "Gracenote",
        "icon": "https:\/\/beantown.space\/client-assets\/logos\/gracenote.png"
    }
]
 */
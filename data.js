
// --- LOCAL PHOTOS (User Provided) ---
// Helper to generate array of local paths: Photos/Photos/City (i).png
const p = (city, count, start = 1) => {
  return Array.from({ length: count }, (_, i) => `Photos/Photos/${city} (${i + start}).png`);
};

// NOTE: Adjusted paths for Production Root
const photoDB = {
  arenal: ['Photos/Photos/la Fortuna (1).png', 'Photos/Photos/la Fortuna (5).png', 'Photos/Photos/la Fortuna (6).png', 'Photos/Photos/la Fortuna (7).png', 'Photos/Photos/la Fortuna (10).png', 'Photos/Photos/la Fortuna (11).png'],
  mistico: ['Photos/Photos/la Fortuna (5).png', 'Photos/Photos/la Fortuna (6).png', 'Photos/Photos/la Fortuna (7).png'],
  rio_celeste: ['Photos/Photos/Bijagua (1).png', 'Photos/Photos/Bijagua (2).png', 'Photos/Photos/Bijagua (3).png'],
  tortuguero: ['Photos/Photos/tortuguero (2).png', 'Photos/Photos/tortuguero (3).png', 'Photos/Photos/tortuguero (4).png', 'Photos/Photos/tortuguero (5).png', 'Photos/Photos/tortuguero (6).png', 'Photos/Photos/tortuguero (8).png', 'Photos/Photos/tortuguero (9).png'],
  pacuare: ['Photos/Photos/Sierpe (1).png', 'Photos/Photos/Sierpe (2).png'],
  corcovado: ['Photos/Photos/Drake Bay (11).png', 'Photos/Photos/Drake Bay (12).png', 'Photos/Photos/Drake Bay (13).png', 'Photos/Photos/Drake Bay (14).png', 'Photos/Photos/Drake Bay (15).png', 'Photos/Photos/Drake Bay (16).png', 'Photos/Photos/Drake Bay (18).png'],
  uvita: ['Photos/Photos/uvita (1).png', 'Photos/Photos/uvita (2).png', 'Photos/Photos/uvita (3).png', 'Photos/Photos/uvita (4).png', 'Photos/Photos/uvita (5).png', 'Photos/Photos/uvita (6).png'],
  manuel_antonio: ['Photos/Photos/Manuel Antonio (1).png', 'Photos/Photos/Manuel Antonio (7).png', 'Photos/Photos/Manuel Antonio (8).png', 'Photos/Photos/Manuel Antonio (9).png', 'Photos/Photos/Manuel Antonio (10).png', 'Photos/Photos/Manuel Antonio (11).png', 'Photos/Photos/Manuel Antonio (12).png'],
  montezuma: ['Photos/Photos/Montezuma (2).png', 'Photos/Photos/Montezuma (4).png', 'Photos/Photos/Montezuma (5).png'],
  santa_teresa: ['Photos/Photos/santa teresa (1).png', 'Photos/Photos/santa teresa (2).png', 'Photos/Photos/santa teresa (3).png', 'Photos/Photos/santa teresa (5).png', 'Photos/Photos/santa teresa (6).png', 'Photos/Photos/santa teresa (7).png'],
  samara: ['Photos/Photos/Samana (1).png', 'Photos/Photos/Samana (2).png', 'Photos/Photos/Samana (3).png', 'Photos/Photos/Samana (9).png', 'Photos/Photos/Samana (11).png', 'Photos/Photos/Samana (14).png', 'Photos/Photos/Samana (15).png', 'Photos/Photos/Samana (16).png', 'Photos/Photos/Samana (17).png'],
  tamarindo: ['Photos/Photos/Tamarindo (1).png', 'Photos/Photos/Tamarindo (2).png', 'Photos/Photos/Tamarindo (3).png', 'Photos/Photos/Tamarindo (4).png', 'Photos/Photos/Tamarindo (5).png', 'Photos/Photos/Tamarindo (6).png', 'Photos/Photos/Tamarindo (7).png'],
  jaco: ['Photos/Photos/Jaco.png'],
  laleona: ['Photos/Photos/la leona (2).png', 'Photos/Photos/la leona (3).png', 'Photos/Photos/la leona (5).png'],
  paquera: ['Photos/Photos/Paquera (1).png', 'Photos/Photos/Paquera (2).png', 'Photos/Photos/Paquera (3).png'],
  liberia: ['Photos/Photos/liberia (1).png', 'Photos/Photos/liberia (2).png']
};

// --- ITINERARY DAYS ---
let days = [
  // LA FORTUNA - 2 Days
  {
    d: 'J1', date: '21 Juil', loc: 'La Fortuna', labelPos: 'bottom', title: 'Arrivée & Volcan', photos: photoDB.arenal, coords: [10.4709, -84.6453], travel: "3h30 • 105 km", road: "Route 142", roadType: "secondary",
    weatherUrl: "https://www.accuweather.com/en/cr/la-fortuna/112660/weather-forecast/112660",
    text: "• Arrivée Aéroport LIR (Liberia)<br>• Récupération 4x4<br>• Route vers La Fortuna<br>• Détente Thermalitas del Arenal<br>• Soda La Hormiga (Food): Le vrai goût local pour le dîner. Portions énormes, prix minuscules, ambiance 100% Tico."
  },
  {
    d: 'J2', date: '22 Juil', loc: 'La Fortuna', labelPos: 'bottom', title: 'Mistico & Salto', photos: photoDB.mistico, coords: [10.4709, -84.6453], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/la-fortuna/112660/weather-forecast/112660",
    text: "• Mistico Hanging Bridges (Voir les paresseux)<br>• Baignade gratuite à 'El Salto' (Corde à sauter)<br>• Randonnée 'Arenal 1968' (Lave séchée)<br>• Chocolate Tour<br>• El Chollín (Hot Springs): Alternative gratuite à Tabacon. Rivière thermale naturelle juste à côté du resort. Allez-y le soir avec des bougies pour la magie (Don au gardien)."
  },

  // UVITA - 3 Days
  {
    d: 'J3', date: '23 Juil', loc: 'Uvita', title: 'Route Sud & Baleines', photos: photoDB.uvita, coords: [9.1670, -83.7441], travel: "5h • 280 km", road: "Route 1 + 34", roadType: "highway",
    weatherUrl: "https://www.accuweather.com/en/cr/uvita/114995/weather-forecast/114995",
    tides: "Basse: 11h20 • Haute: 17h45",
    text: "• Longue route vers le Sud (Arrêt Pont Crocodiles - Tarcoles)<br>• Parc Marino Ballena (Queue de Baleine)<br>• Installation & dîner Uvita<br>• Soda Ranchito Doña Maria (Food): Cuisine au feu de bois comme chez grand-mère. Rustique et délicieux."
  },
  {
    d: 'J4', date: '24 Juil', loc: 'Uvita', title: 'Nauyaca & Baleines', photos: [photoDB.uvita[2], photoDB.uvita[3], photoDB.uvita[4]], coords: [9.1670, -83.7441], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/uvita/114995/weather-forecast/114995",
    tides: "Basse: 12h10 • Haute: 18h35",
    text: "• Cataratas Nauyaca (4x4 Tour - Magnifique!)<br>• Observation des Baleines (Saison haute!)<br>• Pizza au Sibu Cafe<br>• Cascada El Pavon: À 20min au sud. Une cascade incroyable avec un énorme rocher coincé au milieu. Baignade fraiche et gratuite."
  },
  {
    d: 'J5', date: '25 Juil', loc: 'Uvita', title: 'Plages & Détente', photos: [photoDB.uvita[0], photoDB.uvita[1], photoDB.uvita[5]], coords: [9.1670, -83.7441], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/uvita/114995/weather-forecast/114995",
    tides: "Basse: 13h05 • Haute: 19h25",
    text: "• Journée plage Uvita / Dominical<br>• Manuel Antonio day trip (1h)<br>• Dernière soirée côte Pacifique Sud<br>• Playa Arco: Plage secrète avec des grottes, accessible seulement à marée basse par la jungle. Un paradis privé."
  },

  // DRAKE BAY - 3 Days (via Sierpe boat)
  {
    d: 'J6', date: '26 Juil', loc: 'Drake Bay', title: 'Vers Drake Bay', photos: photoDB.corcovado, coords: [8.6917, -83.6644], travel: "2h • 60 km", road: "Route 243", roadType: "secondary",
    waypoints: [[9.0167, -83.5167]], // Sierpe
    routeSegments: ['road', 'boat'], // Uvita -> Sierpe (road), Sierpe -> Drake (boat)
    weatherUrl: "https://www.accuweather.com/en/cr/bahia-drake/114952/weather-forecast/114952",
    tides: "Basse: 14h00 • Haute: 20h20",
    text: "• Route Uvita → Sierpe (1h30)<br>• Bateau Sierpe -> Drake Bay (Mangrove tour inclus)<br>• Drake Bay Hiking Trail (Cocalito)<br>• Plancton bioluminescent (Tour bateau)<br>• Rio Claro Canoe: Marchez jusqu'à l'embouchure et payez un local pour une petite balade en canoë dans la lagune d'eau douce."
  },
  {
    d: 'J7', date: '27 Juil', loc: 'Drake Bay', title: 'Corcovado', photos: [photoDB.corcovado[3], photoDB.corcovado[4], photoDB.corcovado[5]], coords: [8.6917, -83.6644], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/bahia-drake/114952/weather-forecast/114952",
    tides: "Basse: 15h10 • Haute: 21h30",
    text: "• Full Day: Corcovado - Sirena Ranger Station<br>• Faune intense: Tapirs, 4 espèces de singes, Requins<br>• Guide obligatoire (Pacheco Tours)<br>• Retour fatigués mais émerveillés!<br>• Soda Mar y Bosque (Food): Le meilleur poisson frais du village à prix Tico. Simple et efficace après une grosse journée."
  },
  {
    d: 'J8', date: '28 Juil', loc: 'Drake Bay', title: 'Isla del Caño', photos: [photoDB.corcovado[0], photoDB.corcovado[1], photoDB.corcovado[2]], coords: [8.6917, -83.6644], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/bahia-drake/114952/weather-forecast/114952",
    tides: "Basse: 04h30 • Haute: 10h45",
    text: "• Journée Snorkeling Isla del Caño<br>• Tortues marines, requins, poissons tropicaux<br>• Plage et détente après-midi<br>• Dernière soirée à Drake Bay<br>• Drake Bay Hiking Trail: Sentier côtier gratuit magnifique. Marchez jusqu'à playa Cocalito pour voir les singes sur la plage."
  },

  // SANTA TERESA - 3 Days (via ferry from Puntarenas)
  {
    d: 'J9', date: '29 Juil', loc: 'Santa Teresa', title: 'Grande Traversée', photos: photoDB.santa_teresa, coords: [9.6453, -85.1666], travel: "6h • 260 km", road: "Route 34 + 21", roadType: "highway",
    waypoints: [[9.0167, -83.5167], [9.9667, -84.8333], [9.8167, -84.9333]], // Sierpe, Puntarenas, Paquera
    routeSegments: ['boat', 'road', 'ferry', 'road'], // Drake->Sierpe, Sierpe->Punta, Punta->Paq, Paq->ST
    weatherUrl: "https://www.accuweather.com/en/cr/santa-teresa/114986/weather-forecast/114986",
    tides: "Basse: 05h45 • Haute: 12h00",
    text: "• Bateau retour Drake → Sierpe<br>• Route Sierpe → Puntarenas (3h)<br>• Ferry Puntarenas → Paquera (1h30)<br>• Route Paquera → Santa Teresa (1h30)<br>• Installation & Sunset Playa Carmen<br>• Soda Tiquicia (Food): Un des rares spots authentiques dans ce village hipster. Casados délicieux et pas chers."
  },
  {
    d: 'J10', date: '30 Juil', loc: 'Santa Teresa', title: 'Montezuma Day', photos: photoDB.montezuma, coords: [9.6453, -85.1666], travel: "45min aller", road: "Piste", roadType: "secondary",
    weatherUrl: "https://www.accuweather.com/en/cr/santa-teresa/114986/weather-forecast/114986",
    tides: "Basse: 06h50 • Haute: 13h10",
    text: "• Excursion journée Montezuma (30min)<br>• Montezuma Waterfalls (3 Niveaux - Baignade!)<br>• Déjeuner: Playa de los Artistes<br>• Retour Santa Teresa pour le sunset<br>• Cabuya Island Cemetery: Au sud de Montezuma. Attendez la marée basse pour marcher jusqu'à ce cimetière insulaire unique. Ambiance mystique."
  },
  {
    d: 'J11', date: '31 Juil', loc: 'Santa Teresa', title: 'Surf & Chill', photos: [photoDB.santa_teresa[3], photoDB.santa_teresa[4], photoDB.santa_teresa[5]], coords: [9.6453, -85.1666], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/santa-teresa/114986/weather-forecast/114986",
    tides: "Basse: 07h55 • Haute: 14h15",
    text: "• Surf Lesson ou Yoga<br>• Cabo Blanco Reserve (Option) ou plage<br>• Piscines naturelles à marée basse<br>• Dîner 'The Bakery'<br>• Dernière nuit Nicoya Sud<br>• Playa Hermosa Tidepool: Au nord de Santa Teresa. Une piscine naturelle géante se forme dans les rochers à marée basse."
  },

  // SÁMARA - 3 Days (ferry retour)
  {
    d: 'J12', date: '1 Août', loc: 'Sámara', title: 'Route Côtière', photos: photoDB.samara, coords: [9.8805, -85.5269], travel: "4h • 140 km", road: "Route 160", roadType: "secondary",
    waypoints: [[9.6975, -85.2046], [9.7619, -85.2415], [9.8668, -85.3736]], // Manzanillo, Playa Coyote, Puerto Islita
    routeSegments: null, // Removed ferry segments
    weatherUrl: "https://www.accuweather.com/en/cr/samara/113645/weather-forecast/113645",
    tides: "Basse: 09h00 • Haute: 15h20",
    text: "• Aventure Route 160 (4x4 nécessaire)<br>• Traversée de rivières (Rio Bongo)<br>• Plages sauvages: Coyote, Islita<br>• Arrivée Sámara via la côte<br>• Estrada's Bar (Food): Le vrai bar local sur la plage. Chaises en plastique, bières froides et vraie ambiance Pura Vida."
  },
  {
    d: 'J13', date: '2 Août', loc: 'Sámara', title: 'Isla Tortuga', photos: [photoDB.samara[5], photoDB.samara[6], photoDB.samara[7]], coords: [9.8805, -85.5269], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/samara/113645/weather-forecast/113645",
    tides: "Basse: 10h05 • Haute: 16h25",
    text: "• Journée Bateau Isla Tortuga<br>• Snorkeling, Banana Boat, BBQ Plage<br>• Retour: Coucher de soleil en mer<br>• Soir: Dîner les pieds dans le sable<br>• Isla Chora Kayak: Louez des kayaks ($15/p) et ramez vous-mêmes jusqu'à l'île déserte en face (30min). Plage rose privée garantie."
  },
  {
    d: 'J14', date: '3 Août', loc: 'Sámara', title: 'Nosara & Plages', photos: [photoDB.samara[0], photoDB.samara[1], photoDB.samara[2]], coords: [9.8805, -85.5269], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/samara/113645/weather-forecast/113645",
    tides: "Basse: 11h10 • Haute: 17h30",
    text: "• Visite Nosara Beach (Playa Guiones - Surf Vibe)<br>• Playa Carrillo (Calme, palmiers)<br>• Option: Kayak ou SUP<br>• Dernière soirée tranquille Sámara<br>• Playa Barrigona: La 'plage de Mel Gibson'. Cachée, sable blanc pur, souvent déserte. Nécessite un peu de marche ou 4x4."
  },

  // TAMARINDO - 3 Days
  {
    d: 'J15', date: '4 Août', loc: 'Tamarindo', title: 'Route Côtière', photos: photoDB.tamarindo, coords: [10.2993, -85.8400], travel: "2h30 • 85 km", road: "Route 160", roadType: "secondary",
    weatherUrl: "https://www.accuweather.com/en/cr/tamarindo/113650/weather-forecast/113650",
    tides: "Basse: 12h10 • Haute: 18h30",
    text: "• Route côtière: Sámara → Nosara → Ostional<br>• Arrêt: Playa Ostional (Observation tortues si saison)<br>• Continuation vers Tamarindo<br>• Playa Conchal (Sable de coquillages)<br>• Sunset au Coco Loco<br>• Soda Guanacaste (Food): Une institution locale pour manger pas cher dans cette ville touristique. Le Casado est top."
  },
  {
    d: 'J16', date: '5 Août', loc: 'Tamarindo', title: 'Playa Grande', photos: [photoDB.tamarindo[3], photoDB.tamarindo[4], photoDB.tamarindo[5]], coords: [10.2993, -85.8400], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/tamarindo/113650/weather-forecast/113650",
    tides: "Basse: 13h15 • Haute: 19h35",
    text: "• Bateau Estuaire -> Playa Grande<br>• Parc National Las Baulas<br>• Surf ou longue marche plage sauvage<br>• Déjeuner: Taco Star<br>• Shopping Tamarindo<br>• Playa Carbon: Plage de sable noir magnétique, juste au nord de Playa Grande. Complètement surréaliste et vide."
  },
  {
    d: 'J17', date: '6 Août', loc: 'Tamarindo', title: 'Détente Finale', photos: [photoDB.tamarindo[0], photoDB.tamarindo[1], photoDB.tamarindo[2]], coords: [10.2993, -85.8400], travel: "Sur Place",
    weatherUrl: "https://www.accuweather.com/en/cr/tamarindo/113650/weather-forecast/113650",
    tides: "Basse: 14h15 • Haute: 20h35",
    text: "• Journée libre & détente piscine<br>• Dernière session surf<br>• Shopping souvenirs<br>• Night Market ou Dîner Pangas<br>• Dernière grande soirée!<br>• Tamarindo Night Market (Food): Jeudi soir seulement. Plein de stands de nourriture de rue et artisanat local. Super ambiance."
  },

  // CURUBANDÉ - 1 Day
  {
    d: 'J18', date: '7 Août', loc: 'Curubandé', labelPos: 'top', title: 'La Leona', photos: photoDB.laleona, coords: [10.7650, -85.3900], travel: "1h45 • 80 km", road: "Route 21", roadType: "highway",
    weatherUrl: "https://www.accuweather.com/en/cr/liberia/113626/weather-forecast/113626",
    text: "• Départ Tamarindo → Curubandé<br>• La Leona Waterfall Adventure (Canyon & Baignade)<br>• Rincón de la Vieja National Park (Volcan, Boue)<br>• Nuit: Près de Liberia<br>• Poza Los Coyotes: La 'Piscine Bleue'. Une rivière à la couleur chimique bleu ciel (naturelle!). Grotte flottante incroyable."
  },

  // LIBERIA - Departure
  {
    d: 'J19', date: '8 Août', loc: 'Liberia', labelPos: 'right', title: 'Vol Retour', photos: photoDB.liberia, coords: [10.6346, -85.4410], travel: "30 min • 25 km", road: "Route 1", roadType: "highway",
    weatherUrl: "https://www.accuweather.com/en/cr/liberia/113626/weather-forecast/113626",
    text: "• Dernier petit-déj Gallo Pinto<br>• Route vers LIR Airport (30min)<br>• Restitution 4x4<br>• Vol Retour: Pura Vida!<br>• Parque Central Granizado (Food): Achetez un 'Churchill' (glace pilée locale) à un vendeur ambulant et regardez la vie passer sur la place centrale."
  }
];




// --- FALLBACK DATA (Auto-generated by update_json.py) ---
window.fallbackData = {
  "version": 1,
  "lastUpdated": "2026-01-30T17:02:56.418Z",
  "settings": {
    "gas": {
      "price": 1.85,
      "consumption": 10,
      "tankCapacity": 60,
      "refuelThreshold": 450,
      "dailyLocal": 20
    }
  },
  "fixedCosts": {
    "flights": 4500,
    "car": 1200,
    "accommodation": 0,
    "misc": 0
  },
  "itinerary": {
    "J1": {
      "activities": [
        {
          "name": "El Castillo Secrets :  best volcano view, Arenal Lake private access point",
          "price": 10
        },
        {
          "name": "Détente Thermalitas del Arenal",
          "price": 60
        }
      ],
      "restaurants": [
        {
          "name": "Soda El Turnito :  A bit outside town, famous for charcoal grilled chicken.",
          "price": 50,
          "locked": true
        }
      ],
      "expenses": {
        "food": 150,
        "drinks": 0,
        "tips": 0,
        "goods": 200,
        "night": 165,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J2": {
      "activities": [
        {
          "name": "Mistico Hanging Bridges (Voir les paresseux)",
          "price": 130
        },
        {
          "name": "El Salto (Rope swing)",
          "price": 0
        },
        {
          "name": "Catarata Danta :  Head to the Arenal Observatory Lodge gate",
          "price": 10
        }
      ],
      "restaurants": [
        {
          "name": "",
          "price": 0
        }
      ],
      "expenses": {
        "food": 50,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 165,
        "parking": 0,
        "gas": 70,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J3": {
      "activities": [
        {
          "name": "Arrêt Pont Crocodiles - Tarcoles",
          "price": 0
        },
        {
          "name": "Parc Marino Ballena (Queue de Baleine)",
          "price": 30
        },
        {
          "name": "Manuel Antonio day trip (1h)",
          "price": 70
        },
        {
          "name": "Cascada El Pavon : 20 mins south Ojochal. A giant boulderis stuck, swin under the rock.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Soda Ranchito Dona Maria : Rustic, wood-fire stove cooking. The real grandmother's cooking experience.",
          "price": 50,
          "locked": true
        }
      ],
      "expenses": {
        "food": 100,
        "drinks": null,
        "tips": 0,
        "goods": 0,
        "night": 185,
        "parking": 15,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J4": {
      "activities": [
        {
          "name": "Cataratas Nauyaca ",
          "price": 50
        },
        {
          "name": "Chocolate Tour",
          "price": 60
        },
        {
          "name": "Bamboo River : A quiet spot in Uvita to bathe in the river surrounded by towering bamboo stalks.",
          "price": 0
        },
        {
          "name": "Surf Lesson ou Yoga",
          "price": 200
        }
      ],
      "restaurants": [
        {
          "name": "Sibu Cafe : Excellent coffe and simpler meals.",
          "price": 0
        }
      ],
      "expenses": {
        "food": 50,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 185,
        "parking": 0,
        "gas": 110,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J5": {
      "activities": [
        {
          "name": "Journée plage Uvita / Dominical",
          "price": 0
        },
        {
          "name": "Playa Arco: Plage secrète avec des grottes, accessible seulement à marée basse par la jungle. Un paradis privé.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "",
          "price": 0
        }
      ],
      "expenses": {
        "food": 50,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 185,
        "parking": 0,
        "gas": 60,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J6": {
      "activities": [
        {
          "name": "11h30: Bateau Sierpe -> Drake Bay (Mangrove tour inclus)",
          "price": 100
        },
        {
          "name": "Drake Bay Hiking Trail (Cocalito)",
          "price": 0
        },
        {
          "name": "Rio Claro Canoe: Marchez jusqu'à l'embouchure et payez un local pour une petite balade en canoë dans la lagune d'eau douce.",
          "price": 15
        },
        {
          "name": "Plancton phosphorescent",
          "price": 0,
          "locked": true
        }
      ],
      "restaurants": [
        {
          "name": "",
          "price": 0
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 210,
        "parking": 25,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J7": {
      "activities": [
        {
          "name": "Journée Snorkeling Isla del Caño (Corcovado Expeditions)",
          "price": 350
        }
      ],
      "restaurants": [
        {
          "name": "Soda Mar y Bosque",
          "price": 50,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 210,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J8": {
      "activities": [
        {
          "name": "Drake Bay Hiking Trail: Sentier côtier gratuit magnifique. Marchez jusqu'à playa Cocalito pour voir les singes sur la plage.",
          "price": 0
        },
        {
          "name": "11h30: Bateau Drake-> Sierpe (Mangrove tour inclus)",
          "price": 100
        }
      ],
      "restaurants": [
        {
          "name": "Claudio's Grill : Great seefod, very local vibe.",
          "price": 0
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 210,
        "parking": 0,
        "gas": 110,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J9": {
      "activities": [
        {
          "name": "Ferry Puntarenas → Paquera (1h30)",
          "price": 50
        },
        {
          "name": "Montezuma Waterfalls",
          "price": 20
        },
        {
          "name": "Retour Santa Teresa pour le sunset",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Soda Tiquicia",
          "price": 60,
          "locked": true
        }
      ],
      "expenses": {
        "food": 150,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 250,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J10": {
      "activities": [
        {
          "name": "Déjeuner: Playa de los Artistes",
          "price": 0
        },
        {
          "name": "Cabuya Island Cemetery: Au sud de Montezuma. Attendez la marée basse pour marcher jusqu'à ce cimetière insulaire unique. Ambiance mystique.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Vista de Olas : Hotel bar ont the hill, best infinity pool sunset view n town, just buy a beer to hang out.",
          "price": 30,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 250,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J11": {
      "activities": [
        {
          "name": "Cabo Blanco Reserve",
          "price": 50
        },
        {
          "name": "Playa Hermosa Tidepool: Au nord de Santa Teresa. Une piscine naturelle géante se forme dans les rochers à marée basse.",
          "price": 0
        },
        {
          "name": "Playa Suecos : Situated between Malpaís - Santa Teresa. Path is near the entrance Cabo Blanco Nature Reserve",
          "price": null
        }
      ],
      "restaurants": [
        {
          "name": "The Bakery : Not a soda but Iconic",
          "price": 0
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 250,
        "parking": 0,
        "gas": 40,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J12": {
      "activities": [
        {
          "name": "Playa Carrillo (Calme, palmiers)",
          "price": 0
        },
        {
          "name": "Visite Nosara Beach (Playa Guiones - Surf Vibe)",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Estrada's Bar, Le vrai bar local sur la plage.",
          "price": 30,
          "locked": true
        }
      ],
      "expenses": {
        "food": 100,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 150,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {},
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J13": {
      "activities": [
        {
          "name": "Snorkeling, Banana Boat, BBQ Plage",
          "price": 0
        },
        {
          "name": "Isla Chora Kayak: Louez des kayaks ($15/p) et ramez vous-mêmes jusqu'à l'île déserte en face (30min). Plage rose privée garantie.",
          "price": 80
        }
      ],
      "restaurants": [
        {
          "name": "Soda La Perla : Classic authentic food near the beach",
          "price": 60,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 150,
        "parking": 0,
        "gas": 110,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "food": true,
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J14": {
      "activities": [
        {
          "name": "Playa Barrigona: La 'plage de Mel Gibson'. Cachée, sable blanc pur, souvent déserte. Nécessite un peu de marche ou 4x4.",
          "price": 0
        },
        {
          "name": "Journée Bateau Isla Tortuga",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Marisqueria Colochos : Fresh seafood truck.",
          "price": 40,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 150,
        "parking": 0,
        "gas": 60,
        "gifts": 0,
        "other": 40
      },
      "locked": {
        "expenses": {
          "food": true,
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J15": {
      "activities": [
        {
          "name": "Route côtière: Sámara → Nosara → Ostional",
          "price": 40
        },
        {
          "name": "Arrêt: Playa Ostional (Observation tortues si saison)",
          "price": 0
        },
        {
          "name": "Punta San Francisco : Walk south to the point between Tamarindo and Langosta. At low tide, the sunset reflection in the tide pools is world-class.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Sunset au Coco Loco, une institution locale ",
          "price": 0
        }
      ],
      "expenses": {
        "food": 120,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 230,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "food": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J16": {
      "activities": [
        {
          "name": "Parc National Las Baulas",
          "price": 50
        },
        {
          "name": "Tamarindo Estuary Walk : Enter from the north beach at low tide. You can walk deep into the mangroves on foot to see howlers and crocs at safe distance.",
          "price": 0
        },
        {
          "name": "Playa Carbon: Plage de sable noir magnétique, juste au nord de Playa Grande. Complètement surréaliste et vide.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Soda Buffet El Estero : Right by the estuary, local prices in an expensive town.",
          "price": 60,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 230,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "food": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J17": {
      "activities": [
        {
          "name": "Shopping souvenirs",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Night Market ou Dîner Pangas",
          "price": 100,
          "locked": true
        }
      ],
      "expenses": {
        "food": 20,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 230,
        "parking": 0,
        "gas": 0,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "food": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J18": {
      "activities": [
        {
          "name": "Activité: La Leona Waterfall Adventure (Canyon & Baignade)",
          "price": 140
        },
        {
          "name": "Poza Los Coyotes: La 'Piscine Bleue'. Une rivière à la couleur chimique bleu ciel (naturelle!). Grotte flottante incroyable.",
          "price": 20
        }
      ],
      "restaurants": [
        {
          "name": "",
          "price": 0
        }
      ],
      "expenses": {
        "food": 50,
        "drinks": null,
        "tips": 0,
        "goods": 0,
        "night": 140,
        "parking": 0,
        "gas": 40,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    },
    "J19": {
      "activities": [
        {
          "name": "Restitution 4x4",
          "price": 0
        },
        {
          "name": "Parque Central Granizado  regardez la vie passer sur la place centrale.",
          "price": 0
        }
      ],
      "restaurants": [
        {
          "name": "Taqueria Mazatlan : Not a soda, but famous locally for tacosé",
          "price": 0
        }
      ],
      "expenses": {
        "food": 0,
        "drinks": 0,
        "tips": 0,
        "goods": 0,
        "night": 0,
        "parking": 0,
        "gas": 80,
        "gifts": 0
      },
      "locked": {
        "expenses": {
          "gas": true
        },
        "activities": {},
        "restaurants": {}
      },
      "accommodation": {
        "name": "",
        "address": "",
        "link": ""
      }
    }
  }
};

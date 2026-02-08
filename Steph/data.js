
// Steph's Itinerary Data
// Dates: 19/07 to 08/08

// Photo helper (reusing generic for now or local placeholders)
const p = (city, count, start = 1) => {
    return Array.from({ length: count }, (_, i) => `Photos/Photos/${city} (${i + start}).png`); // Point to parent photos
};

// Generic coordinates for key locations
const COORDS = {
    sjo: [9.9981, -84.2041], // Alajuela/SJO
    manuel_antonio: [9.3925, -84.1507], // Quepos
    david_panama: [8.4277, -82.4309], // David/Boquete area (Volcan Baru entry)
    volcan_baru: [8.8078, -82.5431], // Volcan Baru actual
    puerto_viejo: [9.6565, -82.7538], // Puerto Viejo de Talamanca
    tortuguero: [10.5378, -83.5022],
    la_pavona: [10.4735, -83.4727], // Parking/Boat Dock
    fortuna: [10.4709, -84.6453],
    monteverde: [10.3069, -84.8097],
    tamarindo: [10.2993, -85.8400],
    samara: [9.8805, -85.5269],
    buena_vista: [9.8970, -85.5562], // Playa Buena Vista (Samara area)
    liberia: [10.6346, -85.4410],
    poas: [10.1973, -84.2312],
    golfito: [8.6390, -83.1660] // Near border for return
};

// Itinerary Array
let days = [
    // 19-20: Manuel Antonio (Quepos)
    {
        d: 'J1', date: '19 Juil', loc: 'Quepos / M. Antonio', title: 'Arrivée Liberia & Route',
        coords: COORDS.manuel_antonio,
        travel: "5h • 165 km", road: "Route 34",
        text: "Arrivée à l'aéroport de Liberia. Récupération du 4x4 et route vers le sud (Quepos). Installation.",
        photos: p('Manuel Antonio', 3)
    },
    {
        d: 'J2', date: '20 Juil', loc: 'Manuel Antonio', title: 'Parc National',
        coords: COORDS.manuel_antonio,
        travel: "Sur Place",
        text: "Exploration du Parc Manuel Antonio : plages, singes et paresseux. Après-midi détente.",
        photos: p('Manuel Antonio', 3, 4)
    },

    // 21-22: Panama Volcan Baru
    {
        d: 'J3', date: '21 Juil', loc: 'Panama (Boquete)', title: 'Cap au Sud 🇵🇦',
        coords: COORDS.volcan_baru,
        travel: "7h • 275 km", road: "Interamericana",
        text: "Longue route vers le sud. Passage de la frontière (Paso Canoas) et montée vers Boquete/Volcan Barú.",
        photos: []
    },
    {
        d: 'J4', date: '22 Juil', loc: 'Volcan Barú', title: 'Trek Volcan',
        coords: COORDS.volcan_baru,
        travel: "Sur Place",
        text: "Ascension du Volcan Barú (Trek 10h-12h). Vue spectaculaire sur les deux océans.",
        photos: []
    },

    // 23: Corcovado / Kayak Mangrove
    {
        d: 'J5', date: '23 Juil', loc: 'Corcovado / Sierpe', title: 'Retour Costa Rica',
        coords: [8.86, -83.5], // Sierpe approx
        travel: "4h • 190 km",
        text: "Retour au Costa Rica. Direction Sierpe pour explorer la mangrove ou accès Corcovado.",
        photos: p('Drake Bay', 3)
    },

    // 24: San Jose
    {
        d: 'J6', date: '24 Juil', loc: 'San José', title: 'Remontée Capitale',
        coords: COORDS.sjo,
        travel: "5h30 • 280 km",
        text: "Remontée vers la Vallée Centrale. Nuit étape à San José pour couper la route vers les Caraïbes.",
        photos: []
    },

    // 25-26: Puerto Viejo (Caribbean South)
    {
        d: 'J7', date: '25 Juil', loc: 'Puerto Viejo', title: 'Caraïbes Sud',
        coords: COORDS.puerto_viejo,
        travel: "5h30 • 215 km",
        text: "Traversée du Parc Braulio Carrillo. Arrivée dans l'ambiance rasta de Puerto Viejo.",
        photos: p('Samana', 3) // Placeholder styling
    },
    {
        d: 'J8', date: '26 Juil', loc: 'Puerto Viejo', title: 'Gandoca & Bribri',
        coords: COORDS.puerto_viejo,
        travel: "Sur Place",
        text: "Parc Gandoca-Manzanillo, rencontre Indigènes Bribri ou plage Cocles.",
        photos: p('Samana', 3, 4)
    },

    // 27-28: Tortuguero (Caribbean North)
    {
        d: 'J9', date: '27 Juil', loc: 'Tortuguero', title: 'Vers Tortuguero',
        coords: COORDS.tortuguero,
        waypoints: [COORDS.la_pavona],
        routeSegments: ['road', 'road'], // Force Road
        travel: "5h • 160 km",
        text: "Route vers La Pavona (Guapiles). Bateau (1h) vers le village de Tortuguero, accessible uniquement par l'eau.",
        photos: p('tortuguero', 3)
    },
    {
        d: 'J10', date: '28 Juil', loc: 'Tortuguero', title: 'Canaux & Jungle',
        coords: COORDS.tortuguero,
        travel: "Sur Place",
        text: "Balade en canoë au lever du soleil (faune). Visite du village et plage (tortues selon saison).",
        photos: p('tortuguero', 3, 4)
    },

    // 29-30-31: La Fortuna (Arenal)
    {
        d: 'J11', date: '29 Juil', loc: 'La Fortuna', title: 'Volcan Arenal',
        coords: COORDS.fortuna,
        waypoints: [COORDS.la_pavona],
        routeSegments: ['road', 'road'], // Force Road
        travel: "4h • 140 km",
        text: "Bateau retour La Pavona, puis route vers La Fortuna. Vue sur le Volcan Arenal.",
        photos: p('la Fortuna', 3)
    },
    {
        d: 'J12', date: '30 Juil', loc: 'La Fortuna', title: 'Aventure & Thermes',
        coords: COORDS.fortuna,
        travel: "Sur Place",
        text: "Activités : Canyoning, Ponts suspendus ou Randonnée coulée de lave 1968. Thermes le soir.",
        photos: p('la Fortuna', 3, 4)
    },
    {
        d: 'J13', date: '31 Juil', loc: 'La Fortuna / Monteverde', title: 'Santa Elena',
        coords: COORDS.monteverde,
        travel: "3h30 • 110 km",
        text: "Transfert vers Monteverde (Santa Elena) via le lac Arenal. Forêt de nuages.",
        photos: []
    },

    // 1-2-3: Tamarindo
    {
        d: 'J14', date: '1 Août', loc: 'Tamarindo', title: 'Pacific Gold Coast',
        coords: COORDS.tamarindo,
        travel: "4h • 155 km",
        text: "Descente vers le Guanacaste et la côte Pacifique. Ambiance surf et sunset.",
        photos: p('Tamarindo', 3)
    },
    {
        d: 'J15', date: '2 Août', loc: 'Tamarindo', title: 'Surf & Plage',
        coords: COORDS.tamarindo,
        travel: "Sur Place",
        text: "Journée détente, surf ou exploration des plages voisines (Langosta, Avellanas).",
        photos: p('Tamarindo', 3, 2)
    },
    {
        d: 'J16', date: '3 Août', loc: 'Tamarindo', title: 'Las Baulas',
        coords: COORDS.tamarindo,
        travel: "Sur Place",
        text: "Visite possible du Parc Marin Las Baulas (Playa Grande).",
        photos: p('Tamarindo', 3, 3)
    },

    // 4-5-6: Sámara
    {
        d: 'J17', date: '4 Août', loc: 'Sámara', title: 'Nicoya Vibes',
        coords: COORDS.samara,
        travel: "2h30 • 105 km",
        text: "Route vers Sámara / Playa Buena Vista. Ambiance plus relax et familiale.",
        photos: p('Samana', 3) // Placeholder Sámara -> Samana photos from source? Or generic.
    },
    {
        d: 'J18', date: '5 Août', loc: 'Sámara', title: 'Pura Vida',
        coords: COORDS.samara,
        travel: "Sur Place",
        text: "Détente, baignade (récif), observation des dauphins ou tour de l'ile Chora.",
        photos: p('Samana', 3, 2)
    },
    {
        d: 'J19', date: '6 Août', loc: 'Sámara', title: 'Derniers Instants',
        coords: COORDS.samara,
        travel: "Sur Place",
        text: "Profiter de la plage et des derniers moments au Costa Rica.",
        photos: p('Samana', 3, 3)
    },

    // 7: Near Airport (Liberia)
    {
        d: 'J20', date: '7 Août', loc: 'Liberia (Proche)', title: 'Pré-Départ',
        coords: COORDS.liberia,
        travel: "2h • 110 km",
        text: "Remontée vers Liberia. Nuit proche de l'aéroport pour le vol du lendemain.",
        photos: []
    },

    // 8: Flight
    {
        d: 'J21', date: '8 Août', loc: 'Départ', title: 'Vol Retour',
        coords: COORDS.liberia,
        travel: "Avion",
        text: "Restitution du véhicule. Vol retour. Fin du voyage.",
        photos: []
    }
];

// Helper to assign J numbers automatically
days.forEach((day, index) => {
    day.d = `J${index + 1}`;
});

// Fallback / Empty specific data
window.fallbackData = {
    settings: { gas: { price: 1.2, consumption: 10 } },
    itinerary: {}
};

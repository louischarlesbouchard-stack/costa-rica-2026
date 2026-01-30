
// Mock Data and Logic from app.js
const window = {
    itineraryState: {},
    itinerarySettings: {
        gas: {
            price: 1.85,          // CAD/L
            consumption: 10,      // L/100km
            tankCapacity: 60,     // L
            refuelThreshold: 450, // km range
            dailyLocal: 20        // km daily local
        }
    }
};

const days = [
    { d: 'J1', travel: "3h30 • 105 km" },
    { d: 'J2', travel: "Sur Place" },
    { d: 'J3', travel: "5h • 280 km" },
    { d: 'J4', travel: "Sur Place" },
    { d: 'J5', travel: "Sur Place" },
    { d: 'J6', travel: "2h route + traversée" }, // Special case in app.js: 65km
    { d: 'J7', travel: "Sur Place" },
    { d: 'J8', travel: "Sur Place" },
    { d: 'J9', travel: "6h Route + traversées" }, // Special case: 220km
    { d: 'J10', travel: "45min aller" }, // No km?
    { d: 'J11', travel: "Sur Place" },
    { d: 'J12', travel: "3h30 • Piste 160" }, // No km parsed?
    { d: 'J13', travel: "Sur Place" },
    { d: 'J14', travel: "Sur Place" },
    { d: 'J15', travel: "2h30 • 85 km" },
    { d: 'J16', travel: "Sur Place" },
    { d: 'J17', travel: "Sur Place" },
    { d: 'J18', travel: "1h45 • 80 km" },
    { d: 'J19', travel: "30min" }
];

// Re-implement app.js logic EXACTLY
function calculateDynamicGas() {
    let accumulatedDistance = 0;
    const s = window.itinerarySettings.gas;
    const TANK_CAPACITY = s.tankCapacity;
    const GAS_PRICE_CAD = s.price;
    const FULL_TANK_COST = TANK_CAPACITY * GAS_PRICE_CAD;
    const REFUEL_THRESHOLD = s.refuelThreshold;
    const LOCAL_DRIVING_DAILY = s.dailyLocal;

    console.log(`SETTINGS: Price ${GAS_PRICE_CAD}, Cap ${TANK_CAPACITY}, Thresh ${REFUEL_THRESHOLD}, Daily ${LOCAL_DRIVING_DAILY}`);
    console.log(`FULL TANK COST: $${Math.round(FULL_TANK_COST)}`);
    console.log("-".repeat(60));
    console.log("Day | Travel | Local | Total Acc | Action");
    console.log("-".repeat(60));

    days.forEach(day => {
        let travelKm = 0;
        if (day.travel && day.travel.includes('km')) {
            travelKm = parseInt(day.travel.split('•')[1].replace(/[^0-9]/g, '')) || 0;
        } else if (day.travel && day.travel !== 'Sur Place') {
            // Hardcoded specials from app.js
            if (day.d === 'J6') travelKm = 65;
            if (day.d === 'J9') travelKm = 220;
        }

        accumulatedDistance += travelKm + LOCAL_DRIVING_DAILY;

        let action = "";
        let cost = 0;

        if (accumulatedDistance >= REFUEL_THRESHOLD) {
            cost = Math.round(FULL_TANK_COST);
            action = `REFUEL ($${cost})`;
            accumulatedDistance = 0; // Reset
        }

        console.log(`${day.d.padEnd(3)} | ${String(travelKm).padStart(6)} | ${String(LOCAL_DRIVING_DAILY).padStart(5)} | ${String(accumulatedDistance).padStart(9)} | ${action}`);
    });

    // Check final refill logic (lines 800+)
    if (accumulatedDistance > 30) {
        // App.js logic:
        // if (accumulatedDistance > 30 && window.itineraryState[lastDayId])
        //   refillNeeded = accumulatedDistance * CONSUMPTION * GAS_PRICE_CAD
        const CONSUMPTION = s.consumption / 100;
        const refillNeeded = accumulatedDistance * CONSUMPTION * GAS_PRICE_CAD;
        console.log(`END | Last Top-up: ${accumulatedDistance}km * ${CONSUMPTION} * ${GAS_PRICE_CAD} = $${Math.round(refillNeeded)}`);
    }
}

calculateDynamicGas();

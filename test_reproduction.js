
// Mocking the environment
const window = {
    itineraryState: {},
    itinerarySettings: { gas: { price: 1.85, consumption: 10, tankCapacity: 60, refuelThreshold: 450, dailyLocal: 20 } },
    globalFixedCosts: { flights: 4500, car: 1200, accommodation: 0, misc: 0 }
};

const localStorage = {
    store: {},
    getItem: function (key) { return this.store[key] || null; },
    setItem: function (key, value) { this.store[key] = value.toString(); }
};

// Mock Days Data
const days = [
    {
        d: 'J1', loc: 'La Fortuna',
        text: "• Arrivée ...<br>• Dîner: Soda La Hormiga"
    }
];

// 1. Initialize
function initializeDayItineraryState(day) {
    if (window.itineraryState[day.d]) return;

    window.itineraryState[day.d] = {
        activities: [],
        restaurants: [],
        expenses: { food: null, drinks: null, tips: null, goods: null, night: null, parking: null, gas: 0 },
        locked: { expenses: {}, activities: {}, restaurants: {} }
    };

    // Simple parser mock for the test
    window.itineraryState[day.d].restaurants.push({ name: 'Soda La Hormiga', price: 0 });
    // Add extra slot
    window.itineraryState[day.d].restaurants.push({ name: '', price: 0 });
}

// 2. Logic to Test: Populate Estimates
function populateEstimates() {
    // RESTORE
    let saved = localStorage.getItem('crc_itinerary_state');
    if (saved) {
        const savedState = JSON.parse(saved);
        Object.keys(savedState).forEach(k => {
            if (window.itineraryState[k]) {
                const savedDay = savedState[k];
                const currentDay = window.itineraryState[k];
                // Restore Restaurants
                if (savedDay.restaurants && savedDay.restaurants.length > 0) {
                    currentDay.restaurants = savedDay.restaurants;
                }
            }
        });
    }

    // ESTIMATES
    const estimates = {
        'J1': { acts: { 'Soda La Hormiga': 50 } } // Estimate is 50
    };

    Object.keys(estimates).forEach(dayId => {
        const data = estimates[dayId];
        const dayState = window.itineraryState[dayId];
        if (!dayState) return;

        if (data.acts) {
            Object.keys(data.acts).forEach(key => {
                const estimatedPrice = data.acts[key];

                // Find restaurant
                let actIdx = dayState.restaurants.findIndex(r => r.name.toLowerCase().includes(key.toLowerCase()));

                if (actIdx !== -1) {
                    const current = dayState.restaurants[actIdx].price;
                    const isLocked = dayState.restaurants[actIdx].locked;

                    console.log(`[Check] Day: ${dayId}, Item: ${dayState.restaurants[actIdx].name}`);
                    console.log(`   Current Price: ${current}, Estimate: ${estimatedPrice}, Locked: ${isLocked}`);

                    const shouldUpdate =
                        (current === null || current === undefined) ||
                        (current === 0 && estimatedPrice > 0) ||
                        (!isLocked && (current < estimatedPrice * 0.4));

                    console.log(`   Should Update? ${shouldUpdate}`);

                    if (shouldUpdate) {
                        dayState.restaurants[actIdx].price = estimatedPrice;
                        console.log(`   -> UPDATED to ${estimatedPrice}`);
                    } else {
                        console.log(`   -> KEPT at ${current}`);
                    }
                }
            });
        }
    });
}

// SIMULATION

// Step 1: Initial Load
console.log("--- STEP 1: Initial Load ---");
days.forEach(d => initializeDayItineraryState(d));
populateEstimates();
// Expect: Updates to 50 because current is 0 and not locked.
console.log("J1 Restaurant 0 Price:", window.itineraryState['J1'].restaurants[0].price); // Should be 50

// Step 2: User Edits Price to 75 (Manual Override)
console.log("\n--- STEP 2: User Edits Price to 75 ---");
// Simulate updateRestaurantPrice
const dayId = 'J1';
const idx = 0;
const val = 75;
window.itineraryState[dayId].restaurants[idx].price = val;
window.itineraryState[dayId].restaurants[idx].locked = true;

// Save to LS
localStorage.setItem('crc_itinerary_state', JSON.stringify(window.itineraryState));
console.log("Saved State:", JSON.stringify(window.itineraryState['J1'].restaurants[0]));

// Step 3: Reload Page
console.log("\n--- STEP 3: Reload Page ---");
// Clear memory state to simulate reload
window.itineraryState = {};
// Re-init
days.forEach(d => initializeDayItineraryState(d));
// Run Populate Estimates (which includes Restore)
populateEstimates();

console.log("J1 Restaurant 0 Price:", window.itineraryState['J1'].restaurants[0].price);
// Expect: 75 (Locked)

// Step 4: User Edits Price to 0 (Manual Override to Zero)
console.log("\n--- STEP 4: User Edits Price to 0 ---");
window.itineraryState[dayId].restaurants[idx].price = 0;
window.itineraryState[dayId].restaurants[idx].locked = true;
localStorage.setItem('crc_itinerary_state', JSON.stringify(window.itineraryState));
console.log("Saved State:", JSON.stringify(window.itineraryState['J1'].restaurants[0]));

// Step 5: Reload Page with 0
console.log("\n--- STEP 5: Reload Page with 0 ---");
window.itineraryState = {};
days.forEach(d => initializeDayItineraryState(d));
populateEstimates();

console.log("J1 Restaurant 0 Price:", window.itineraryState['J1'].restaurants[0].price);
// Expect: 0? Or 50?

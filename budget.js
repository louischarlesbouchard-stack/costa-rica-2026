// budget.js - Finance & Budget Calculation Logic
// Extracted from app.js for better isolation

// --- GLOBAL STATE & SETTINGS ---
window.globalFixedCosts = { flights: 4500, car: 1200, accommodation: 0, misc: 0 };

window.itinerarySettings = {
    gas: {
        price: 1.85,          // CAD/L
        consumption: 10,      // L/100km
        tankCapacity: 60,     // L
        refuelThreshold: 450, // km range used before refueling
        dailyLocal: 20        // km daily local driving
    }
};

// --- INITIALIZATION & ESTIMATES ---

// PRE-FILL DEFAULT DATA
window.populateDefaults = function () {
    if (window.globalFixedCosts.flights === 0) window.updateFixedCost('flights', 4500);
    if (window.globalFixedCosts.car === 0) window.updateFixedCost('car', 1200);
    // Accommodation is calculated, not defaulted

    const ids = { flights: 'input-flights', car: 'input-car', accommodation: 'input-accommodation' }; // Fixed IDs
    Object.keys(ids).forEach(k => {
        const el = document.getElementById(ids[k]);
        if (el && el.value == "") el.value = window.globalFixedCosts[k];
    });
};

window.populateEstimates = function () {
    // 1. RESTORE FROM LOCAL STORAGE FIRST
    let saved = localStorage.getItem('crc_itinerary_state');
    // FALLBACK: Try old keys if new prefix is missing
    if (!saved) saved = localStorage.getItem('itinerary_state');
    if (!saved) saved = localStorage.getItem('itineraryState');

    let savedFixed = localStorage.getItem('crc_fixed_costs');
    if (!savedFixed) savedFixed = localStorage.getItem('fixed_costs');

    // We assume window.itineraryState is available (managed by app.js data loading)
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            Object.keys(savedState).forEach(k => {
                if (window.itineraryState[k]) {
                    const savedDay = savedState[k];
                    const currentDay = window.itineraryState[k];

                    // Restore Expenses (Always safe)
                    if (savedDay.expenses) currentDay.expenses = { ...currentDay.expenses, ...savedDay.expenses };

                    // Restore Item Lists (ACTIVITIES & RESTAURANTS)
                    // If saved state exists, it means user potentially deleted/added items. Trust storage over data.js.
                    if (savedDay.activities && Array.isArray(savedDay.activities)) {
                        currentDay.activities = savedDay.activities;
                    }
                    if (savedDay.restaurants && Array.isArray(savedDay.restaurants)) {
                        currentDay.restaurants = savedDay.restaurants;
                    }

                    // Restore Locked State
                    if (savedDay.locked) {
                        currentDay.locked = savedDay.locked;
                        if (!currentDay.locked.restaurants) currentDay.locked.restaurants = {};
                    }
                }
            });
        } catch (e) {
            console.error("Restore failed", e);
        }
    }

    if (savedFixed) {
        try {
            const parsedFixed = JSON.parse(savedFixed);
            window.globalFixedCosts = { ...window.globalFixedCosts, ...parsedFixed };
        } catch (e) {
            console.error("Fixed cost restore failed", e);
        }
    }

    // 1.5 MIGRATION: Convert legacy "locked" object to item properties
    days.forEach(d => {
        const dayState = window.itineraryState[d.d];
        if (dayState && dayState.locked) {
            // Migrate Activities
            if (dayState.locked.activities && dayState.activities) {
                Object.keys(dayState.locked.activities).forEach(idx => {
                    if (dayState.activities[idx]) dayState.activities[idx].locked = true;
                });
                dayState.locked.activities = {};
            }
            // Migrate Restaurants
            if (dayState.locked.restaurants && dayState.restaurants) {
                Object.keys(dayState.locked.restaurants).forEach(idx => {
                    if (dayState.restaurants[idx]) dayState.restaurants[idx].locked = true;
                });
                dayState.locked.restaurants = {};
            }
        }
    });

    // 2. THEN APPLY ESTIMATES (Converted to CAD, approx 1.4x exchange)
    const estimates = {
        'J1': { expenses: { night: 165 }, acts: { 'Thermalitas': 85 } },
        'J2': { expenses: { night: 165 }, acts: { 'Mistico': 185, 'Arenal 1968': 115, 'Chocolate': 140, 'Hot Springs': 0, 'Salto': 0 } },
        'J3': { expenses: { night: 185 }, parking: 15, acts: { 'Marino Ballena': 50 } },
        'J4': { expenses: { night: 185 }, acts: { 'Nauyaca': 70, 'Baleines': 535, 'Pavon': 0 } },
        'J5': { expenses: { night: 185 }, acts: { 'Manuel Antonio': 80, 'Arco': 0 } },
        'J6': { expenses: { night: 210 }, parking: 25, acts: { 'Bateau Sierpe': 115, 'Plancton': 250, 'Trail': 0, 'Canoe': 20 } },
        'J7': { expenses: { night: 210 }, acts: { 'Corcovado': 550 } },
        'J8': { expenses: { night: 210 }, acts: { 'Snorkeling': 490, 'Trail': 0, 'Retour bateau': 0 } },
        'J9': { expenses: { night: 250 }, acts: { 'Bateau retour': 115, 'Ferry': 50 } },
        'J10': { expenses: { night: 250 }, acts: { 'Montezuma Waterfalls': 30, 'Cabuya': 0 } },
        'J11': { expenses: { night: 250 }, acts: { 'Surf': 140, 'Cabo Blanco': 70, 'Hermosa': 0 } },
        'J12': { expenses: { night: 150 } },
        'J13': { expenses: { night: 150, food: 70, drinks: 30 }, acts: { 'Isla Tortuga': 450, 'Isla Chora': 115 } },
        'J14': { expenses: { night: 150, other: 60 }, acts: { 'Kayak': 210, 'Barrigona': 0 } },
        'J15': { expenses: { night: 230 }, acts: { 'Ostional': 45, 'Conchal': 0 } },
        'J16': { expenses: { night: 230 }, acts: { 'Estuaire': 170, 'Baulas': 70, 'Carbon': 0 } },
        'J17': { expenses: { night: 230 }, acts: { 'Surf': 115 } },
        'J18': { expenses: { night: 140 }, acts: { 'La Leona': 200, 'Rincón': 100, 'Coyotes': 30 } },
    };

    Object.keys(estimates).forEach(dayId => {
        const data = estimates[dayId];
        const dayState = window.itineraryState[dayId];
        if (!dayState) return;

        // 1. DAILY ESTIMATES (Food/Grocery) - ONE TIME ADVICE
        if (dayState.expenses.food === null || dayState.expenses.food === undefined) {
            dayState.expenses.food = 50; // Estimated 50 CAD/day for the family
        }
        if (data.parking && (dayState.expenses.parking === null || dayState.expenses.parking === undefined)) dayState.expenses.parking = data.parking;

        if (data.expenses) {
            Object.keys(data.expenses).forEach(k => {
                if (dayState.expenses[k] === null || dayState.expenses[k] === undefined) dayState.expenses[k] = data.expenses[k];
            });
        }

        if (data.acts) {
            Object.keys(data.acts).forEach(key => {
                const estimatedPrice = data.acts[key];
                // Search in activities
                let actIdx = dayState.activities.findIndex(a => a.name.toLowerCase().includes(key.toLowerCase()));
                let isRestaurant = false;

                // IF NOT FOUND IN ACTIVITIES, CHECK RESTAURANTS
                if (actIdx === -1) {
                    actIdx = dayState.restaurants.findIndex(r => r.name.toLowerCase().includes(key.toLowerCase()));
                    isRestaurant = true;
                }

                if (actIdx !== -1) {
                    const targetArray = isRestaurant ? dayState.restaurants : dayState.activities;
                    const current = targetArray[actIdx].price;
                    const isLocked = targetArray[actIdx].locked;

                    if (!isLocked) {
                        if (current === null || current === undefined) {
                            targetArray[actIdx].price = estimatedPrice;
                        } else if (current === 0 && estimatedPrice > 0) {
                            targetArray[actIdx].price = estimatedPrice;
                        }
                    }
                }
            });
        }
    });

    // 3. DYNAMIC GAS EVALUATION
    window.calculateDynamicGas();

    // 4. RESTORE SETTINGS FROM LOCAL STORAGE
    const savedSettings = localStorage.getItem('crc_itinerary_settings');
    if (savedSettings) {
        try {
            window.itinerarySettings = JSON.parse(savedSettings);
        } catch (e) {
            console.error("Settings restore failed", e);
        }
    }

    // renderDetailsGrid(); // Removed: handled by app.js and not globally accessible here
    window.updateGlobalBudget();
};

window.calculateDynamicGas = function () {
    let accumulatedDistance = 0;
    const s = window.itinerarySettings.gas;
    const TANK_CAPACITY = s.tankCapacity; // Liters
    const CONSUMPTION = s.consumption / 100; // L per km
    const REFUEL_THRESHOLD = s.refuelThreshold; // km range used before refueling
    const GAS_PRICE_CAD = s.price; // CAD per liter
    const FULL_TANK_COST = TANK_CAPACITY * GAS_PRICE_CAD;
    const LOCAL_DRIVING_DAILY = s.dailyLocal; // km daily local driving

    days.forEach(day => {
        const dayState = window.itineraryState[day.d];
        if (!dayState) return;

        let travelKm = 0;
        if (day.travel && day.travel.includes('km')) {
            travelKm = parseInt(day.travel.split('•')[1].replace(/[^0-9]/g, '')) || 0;
        } else if (day.travel && day.travel !== 'Sur Place') {
            if (day.d === 'J6') travelKm = 65;
            if (day.d === 'J9') travelKm = 220;
        }

        accumulatedDistance += travelKm + LOCAL_DRIVING_DAILY;

        const isLocked = (dayState.locked && dayState.locked.expenses && dayState.locked.expenses.gas);

        // Refuel if threshold reached
        if (accumulatedDistance >= REFUEL_THRESHOLD) {
            if (!isLocked && (dayState.expenses.gas === null || dayState.expenses.gas === undefined)) {
                dayState.expenses.gas = Math.round(FULL_TANK_COST);
            }
            accumulatedDistance = 0; // Full tank refill
        } else {
            // If not refilling, ensure it is 0 if it was null (initialization)
            if (!isLocked && (dayState.expenses.gas === null || dayState.expenses.gas === undefined)) {
                dayState.expenses.gas = 0;
            }
        }
    });

    // Final refill on last day
    const lastDayId = days[days.length - 1].d;
    if (accumulatedDistance > 30 && window.itineraryState[lastDayId]) {
        const dayState = window.itineraryState[lastDayId];
        const isLocked = dayState.locked && dayState.locked.expenses && dayState.locked.expenses.gas;
        if (!isLocked && (dayState.expenses.gas === null || dayState.expenses.gas === undefined)) {
            const refillNeeded = accumulatedDistance * CONSUMPTION * GAS_PRICE_CAD;
            dayState.expenses.gas = Math.round(refillNeeded);
        }
    }
};

// --- UPDATE & CALCULATION LOGIC ---

window.updateFixedCost = function (key, val) {
    window.globalFixedCosts[key] = parseFloat(val) || 0;
    window.updateGlobalBudget();
};

window.updateFixedCosts = function () {
    const flightsInput = document.getElementById('input-flights');
    const carInput = document.getElementById('input-car');
    const insuranceInput = document.getElementById('input-insurance');

    if (flightsInput) window.globalFixedCosts.flights = parseFloat(flightsInput.value) || 0;
    if (carInput) window.globalFixedCosts.car = parseFloat(carInput.value) || 0;
    if (insuranceInput) window.globalFixedCosts.misc = parseFloat(insuranceInput.value) || 0;

    window.updateGlobalBudget();
};

window.resetFixedCosts = function () {
    window.globalFixedCosts = { flights: 0, car: 0, accommodation: 0, misc: 0 };
    document.querySelectorAll('.budget-fix-input').forEach(el => el.value = '');
    const inputs = ['input-flights', 'input-car', 'input-insurance'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 0;
    });
    window.updateGlobalBudget();
};

window.updateBudget = function (dayId, type, val) {
    if (val === "") {
        window.itineraryState[dayId].expenses[type] = null;
        if (window.itineraryState[dayId].locked) {
            delete window.itineraryState[dayId].locked.expenses[type];
        }
    } else {
        window.itineraryState[dayId].expenses[type] = parseFloat(val) || 0;
        if (!window.itineraryState[dayId].locked) window.itineraryState[dayId].locked = { expenses: {}, activities: {} };
        window.itineraryState[dayId].locked.expenses[type] = true;
    }
    updateTotal(dayId);
};

// Internal helper (or global if needed by app.js)
window.updateTotal = function (dayId) {
    const s = window.itineraryState[dayId];
    const actTotal = s.activities.reduce((acc, a) => acc + (a.price || 0), 0);
    const restTotal = s.restaurants.reduce((acc, r) => acc + (r.price || 0), 0);
    const expTotal = Object.values(s.expenses).reduce((acc, v) => acc + (v || 0), 0);
    const total = actTotal + expTotal + restTotal;
    const el = document.getElementById(`total-${dayId}`);
    if (el) el.textContent = '$' + total.toLocaleString();

    if (window.updateGlobalBudget) window.updateGlobalBudget();
    localStorage.setItem('crc_itinerary_state', JSON.stringify(window.itineraryState));
}
// Alias for backward compatibility if `updateTotal` was not window scoped
const updateTotal = window.updateTotal;


window.updateGlobalBudget = function () {
    let totalVariable = 0;
    let allActivities = [];

    // Reset categories
    let catVariable = {
        activities: 0, restaurants: 0,
        food: 0, drinks: 0,
        gas: 0, parking: 0, transport_other: 0,
        shopping: 0,
        tips: 0, night: 0
    };

    Object.values(window.itineraryState).forEach(dayState => {
        // Find city name for this day state.
        const dayId = dayState.dayId || Object.keys(window.itineraryState).find(k => window.itineraryState[k] === dayState);
        const city = days.find(d => String(d.d) === String(dayId))?.loc || 'Unknown';

        // Collect Activities for the Priority Table
        dayState.activities.forEach(a => {
            if (a.name && a.price > 0) {
                allActivities.push({
                    name: a.name,
                    price: a.price,
                    location: city,
                    day: dayId || '?'
                });
            }
        });

        const actTotal = dayState.activities.reduce((acc, a) => acc + (a.price || 0), 0);
        catVariable.activities += actTotal;

        const restTotal = (dayState.restaurants || []).reduce((acc, r) => acc + (r.price || 0), 0);
        catVariable.restaurants += restTotal;

        // Granular Summing
        catVariable.food += (dayState.expenses.food || 0);
        catVariable.drinks += (dayState.expenses.drinks || 0);
        catVariable.gas += (dayState.expenses.gas || 0);
        catVariable.parking += (dayState.expenses.parking || 0);
        catVariable.shopping += (dayState.expenses.goods || 0);
        catVariable.tips += (dayState.expenses.tips || 0);
        catVariable.night += (dayState.expenses.night || 0);

        // Grand Total (Variable portion)
        const expTotal = (dayState.expenses.food || 0) +
            (dayState.expenses.drinks || 0) +
            (dayState.expenses.gas || 0) +
            (dayState.expenses.parking || 0) +
            (dayState.expenses.goods || 0) +
            (dayState.expenses.tips || 0) +
            (dayState.expenses.night || 0);

        totalVariable += (actTotal + restTotal + expTotal);
    });

    const totalFixed = Object.values(window.globalFixedCosts).reduce((acc, v) => acc + v, 0);
    const grandTotal = totalVariable + totalFixed;

    const elVar = document.getElementById('total-variable');
    const elFixed = document.getElementById('total-fixed');
    const elGrandTbl = document.getElementById('grand-total-tbl');

    if (elVar) elVar.textContent = '$' + totalVariable.toLocaleString();
    if (elFixed) elFixed.textContent = '$' + totalFixed.toLocaleString();
    if (elGrandTbl) elGrandTbl.textContent = '$' + grandTotal.toLocaleString();

    // --- GLOBAL CHART CATEGORIES ---

    // 1. Accommodation (Fixed + Daily Nights)
    let totalAccom = window.globalFixedCosts.accommodation + catVariable.night;

    // 2. Transport (Fixed Car + Daily Gas + Parking?) 
    let totalTransportChart = window.globalFixedCosts.car + catVariable.gas + catVariable.parking;
    let totalTransportTable = catVariable.gas + catVariable.parking;

    // 3. Activities
    let totalActivities = catVariable.activities;

    // 5. Grocery (Food)
    let totalGrocery = catVariable.food;

    // 8. Other (Drinks + Tips + Insurance/Misc)
    let totalOther = (window.globalFixedCosts.misc || 0) + catVariable.drinks + catVariable.tips;

    const elAccom = document.getElementById('tbl-accom');
    const elActivities = document.getElementById('tbl-activities');
    const elRestaurants = document.getElementById('tbl-restaurants');
    const elFood = document.getElementById('tbl-food');
    const elTransport = document.getElementById('tbl-transport');
    const elShopping = document.getElementById('tbl-shopping');
    const elOther = document.getElementById('tbl-other');

    if (elAccom) elAccom.textContent = '$' + totalAccom.toLocaleString();
    if (elActivities) elActivities.textContent = '$' + totalActivities.toLocaleString();
    if (elRestaurants) elRestaurants.textContent = '$' + catVariable.restaurants.toLocaleString();
    if (elFood) elFood.textContent = '$' + totalGrocery.toLocaleString();
    if (elTransport) elTransport.textContent = '$' + totalTransportTable.toLocaleString();
    if (elShopping) elShopping.textContent = '$' + catVariable.shopping.toLocaleString();
    if (elOther) elOther.textContent = '$' + totalOther.toLocaleString();

    // Prepare data for renderBudgetVisuals
    const globalBudgetBreakdown = {
        vols: window.globalFixedCosts.flights || 0,
        hebergement: totalAccom,
        transport: totalTransportChart,
        activites: totalActivities,
        epicerie: totalGrocery,
        autres: totalOther
    };

    // Compute Daily Average Breakdown
    const dailyCatTotals = {
        resto: 0,
        goods: 0,
        drinks: 0,
        tips: 0,
        gas: 0,
        parking: 0,
        epicerie: 0
    };

    days.forEach(d => {
        if (window.itineraryState[d.d]) {
            const exp = window.itineraryState[d.d].expenses || {};
            const res = window.itineraryState[d.d].restaurants || [];

            res.forEach(r => dailyCatTotals.resto += (r.price || 0));
            dailyCatTotals.goods += (exp.goods || 0);
            dailyCatTotals.drinks += (exp.drinks || 0);
            dailyCatTotals.tips += (exp.tips || 0);
            dailyCatTotals.gas += (exp.gas || 0);
            dailyCatTotals.parking += (exp.parking || 0);
            dailyCatTotals.epicerie += (exp.food || 0);
        }
    });

    const safeDayCount = days.length || 1;
    const dailyAvgBreakdown = {};
    let dailyAvgTotal = 0;

    Object.keys(dailyCatTotals).forEach(k => {
        const avg = Math.round(dailyCatTotals[k] / safeDayCount);
        dailyAvgBreakdown[k] = avg;
        dailyAvgTotal += avg;
    });

    // RENDER VISUALS
    renderBudgetVisuals(grandTotal, globalBudgetBreakdown, dailyAvgTotal, dailyAvgBreakdown);

    // --- PERSISTENCE ---
    // Note: We check window.isAppReady which is set in app.js. 
    // If not accessible, we might skip saving early state, which is fine.
    // Ideally we define isAppReady on window too.
    if (window.isAppReady) {
        localStorage.setItem('crc_itinerary_state', JSON.stringify(window.itineraryState));
        localStorage.setItem('crc_global_fixed_costs', JSON.stringify(window.globalFixedCosts));
        localStorage.setItem('crc_itinerary_settings', JSON.stringify(window.itinerarySettings));
    }

    // --- DASHBOARD KPIS ---
    const totalDays = 18;
    const totalPax = 5;

    const elKpiTotal = document.getElementById('kpi-grand-total');
    if (elKpiTotal) elKpiTotal.textContent = '$' + grandTotal.toLocaleString();

    const elKpiDay = document.getElementById('kpi-cost-day');
    if (elKpiDay) elKpiDay.textContent = '$' + Math.round(grandTotal / totalDays).toLocaleString();

    const elKpiPerson = document.getElementById('kpi-cost-person');
    if (elKpiPerson) elKpiPerson.textContent = '$' + Math.round(grandTotal / totalPax).toLocaleString();

    // --- PARETO ANALYSIS (TOP SPENDERS) ---
    const spenderBody = document.getElementById('top-spenders-body');
    if (spenderBody) {
        let allExpenses = [];

        // 1. Add Fixed Costs
        if (window.globalFixedCosts.flights > 0) allExpenses.push({ name: 'Vols Internationaux', cat: 'Fixed', loc: 'Global', day: '-', price: window.globalFixedCosts.flights });
        if (window.globalFixedCosts.car > 0) allExpenses.push({ name: 'Location Auto (4x4)', cat: 'Fixed', loc: 'Global', day: '-', price: window.globalFixedCosts.car });

        // 2. Add Activities, Restaurants, Hotels
        Object.values(window.itineraryState).forEach(dayState => {
            const dayId = dayState.dayId || Object.keys(window.itineraryState).find(k => window.itineraryState[k] === dayState);
            if (!dayId) return;

            const city = days.find(d => String(d.d) === String(dayId))?.loc || 'Unknown';

            // Activities (> $100)
            dayState.activities.forEach(a => {
                if (a.name && (a.price > 100)) {
                    allExpenses.push({ name: a.name, cat: 'Activity', loc: city, day: dayId, price: a.price });
                }
            });

            // Restaurants (> $100)
            dayState.restaurants.forEach(r => {
                if (r.name && (r.price > 100)) {
                    allExpenses.push({ name: r.name, cat: 'Restaurant', loc: city, day: dayId, price: r.price });
                }
            });

            // Accommodation (Daily Night Cost)
            if (dayState.expenses.night > 0) {
                allExpenses.push({ name: `Hébergement (${city})`, cat: 'Hotel', loc: city, day: dayId, price: dayState.expenses.night });
            }
        });

        // Sort DESC
        const topSpenders = allExpenses.sort((a, b) => b.price - a.price).slice(0, 10);

        spenderBody.innerHTML = topSpenders.map(item => {
            const pct = ((item.price / grandTotal) * 100).toFixed(1);
            let icon = 'money-bill';
            let col = 'text-stone-400';
            if (item.cat === 'Fixed') { icon = 'plane'; col = 'text-blue-400'; }
            if (item.cat === 'Activity') { icon = 'ticket-alt'; col = 'text-red-400'; }
            if (item.cat === 'Restaurant') { icon = 'utensils'; col = 'text-purple-400'; }
            if (item.cat === 'Hotel') { icon = 'bed'; col = 'text-amber-400'; }

            return `
            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td class="py-3 px-4 font-bold text-white flex items-center gap-3">
                    <div class="w-8 h-8 rounded bg-stone-800 flex items-center justify-center ${col}"><i class="fas fa-${icon}"></i></div>
                    ${item.name}
                </td>
                <td class="py-3 px-4 text-stone-500 text-xs uppercase font-bold tracking-wider">${item.cat}</td>
                <td class="py-3 px-4 text-center">
                        <span class="bg-stone-800 text-stone-400 text-[10px] font-black px-2 py-0.5 rounded border border-white/10">${item.day !== '-' ? 'J' + item.day.replace(/\D/g, '') : '-'}</span>
                </td>
                <td class="py-3 px-4 text-right font-black text-cr-gold tracking-tighter text-base">$${item.price.toLocaleString()}</td>
                    <td class="py-3 px-4 text-right text-xs font-mono text-stone-500">${pct}%</td>
            </tr>
        `}).join('');
    }
};

// --- VISUALIZATION FUNCTION ---
function renderBudgetVisuals(total, globalCats, dailyAvgTotal, dailyAvgBreakdown) {
    // COLORS
    const colors = {
        vols: '#60a5fa', // Blue 400
        hebergement: '#f59e0b', // Amber 500
        transport: '#10b981', // Emerald 500
        activites: '#ef4444', // Red 500
        epicerie: '#fcd34d', // Amber 300
        autres: '#64748b',  // Slate 500
        // Daily specific
        resto: '#8b5cf6', // Violet 500
        goods: '#ec4899', // Pink 500
        drinks: '#3b82f6', // Blue 500
        tips: '#84cc16', // Lime 500
        gas: '#0d9488', // Teal 600
        parking: '#64748b' // Slate 500
    };

    const icons = {
        vols: 'fa-plane',
        hebergement: 'fa-bed',
        transport: 'fa-car',
        activites: 'fa-hiking',
        epicerie: 'fa-shopping-basket',
        autres: 'fa-ellipsis-h',
        resto: 'fa-utensils',
        goods: 'fa-suitcase',
        drinks: 'fa-cocktail',
        tips: 'fa-hand-holding-dollar',
        gas: 'fa-gas-pump',
        parking: 'fa-parking'
    };

    // 1. GLOBAL BUDGET VISUALS
    const globalBar = document.getElementById('global-budget-bar');
    const globalGrid = document.getElementById('global-category-grid');

    // Reset
    if (globalBar) globalBar.innerHTML = '';
    if (globalGrid) globalGrid.innerHTML = '';

    // Display Total
    const elGrand = document.getElementById('grand-total');
    if (elGrand) elGrand.textContent = `$${total.toLocaleString()}`;

    // Render Global Elements
    Object.entries(globalCats).forEach(([key, val]) => {
        if (val > 0) {
            const pct = (val / total) * 100;

            // Bar Segment
            if (globalBar) {
                const segment = document.createElement('div');
                segment.className = 'budget-bar-segment h-full';
                segment.style.width = `${pct}%`;
                segment.style.backgroundColor = colors[key];
                segment.title = `${key}: $${val.toLocaleString()}`;
                globalBar.appendChild(segment);
            }

            // Card
            if (globalGrid) {
                const card = `
                    <div class="budget-card bg-stone-800/80 p-3 rounded-lg flex flex-col justify-between h-20">
                        <div class="flex justify-between items-start">
                            <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">${key}</span>
                            <i class="fas ${icons[key]} text-stone-500 text-xs"></i>
                        </div>
                        <div class="flex items-end gap-2 mt-auto">
                            <span class="text-xl font-bold text-white">$${val.toLocaleString()}</span>
                            <span class="text-xs text-stone-500 font-mono mb-1">${Math.round(pct)}%</span>
                        </div>
                        <div class="w-full h-1 bg-stone-700 rounded-full mt-2 overflow-hidden">
                            <div class="h-full rounded-full" style="width: ${pct}%; background-color: ${colors[key]}"></div>
                        </div>
                    </div>
                `;
                globalGrid.insertAdjacentHTML('beforeend', card);
            }
        }
    });


    // 2. DAILY BUDGET VISUALS
    const dailyBar = document.getElementById('daily-budget-bar');
    const dailyGrid = document.getElementById('daily-category-grid');

    // Reset
    if (dailyBar) dailyBar.innerHTML = '';
    if (dailyGrid) dailyGrid.innerHTML = '';

    // Display Daily Total
    const elDailyCenter = document.getElementById('daily-total-center');
    if (elDailyCenter) elDailyCenter.textContent = `$${dailyAvgTotal.toLocaleString()}`;

    const sortedDaily = Object.entries(dailyAvgBreakdown).sort((a, b) => b[1] - a[1]);

    sortedDaily.forEach(([key, val]) => {
        if (val > 0) {
            const pct = (val / dailyAvgTotal) * 100;
            // Bar
            if (dailyBar) {
                const segment = document.createElement('div');
                segment.className = 'budget-bar-segment h-full';
                segment.style.width = `${pct}%`;
                segment.style.backgroundColor = colors[key];
                segment.title = `${key}: $${val.toLocaleString()}`;
                dailyBar.appendChild(segment);
            }

            // Card
            if (dailyGrid) {
                const card = `
                    <div class="budget-card bg-stone-800/80 p-2 rounded-lg flex flex-col justify-between h-16">
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">${key}</span>
                                <i class="fas ${icons[key]} text-stone-500 text-[10px]"></i>
                        </div>
                        <div class="flex items-end gap-2 mt-auto">
                            <span class="text-lg font-bold text-white">$${val.toLocaleString()}</span>
                        </div> 
                    </div>
                `;
                dailyGrid.insertAdjacentHTML('beforeend', card);
            }
        }
    });
}

// --- SETTINGS UI ---
window.openSettings = function () {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    // Populate fields
    document.getElementById('set-gas-price').value = window.itinerarySettings.gas.price;
    document.getElementById('set-gas-cons').value = window.itinerarySettings.gas.consumption;
    document.getElementById('set-gas-tank').value = window.itinerarySettings.gas.tankCapacity;
    document.getElementById('set-gas-threshold').value = window.itinerarySettings.gas.refuelThreshold;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeSettings = function () {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
};

window.saveSettings = function () {
    window.itinerarySettings.gas.price = parseFloat(document.getElementById('set-gas-price').value) || 0;
    window.itinerarySettings.gas.consumption = parseFloat(document.getElementById('set-gas-cons').value) || 0;
    window.itinerarySettings.gas.tankCapacity = parseFloat(document.getElementById('set-gas-tank').value) || 0;
    window.itinerarySettings.gas.refuelThreshold = parseFloat(document.getElementById('set-gas-threshold').value) || 0;

    localStorage.setItem('crc_itinerary_settings', JSON.stringify(window.itinerarySettings));

    window.calculateDynamicGas();
    window.updateGlobalBudget();
    renderDetailsGrid(); // App.js function to re-render costs on cards if needed
    window.closeSettings();
};

window.exportBudget = function () {
    const data = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        settings: window.itinerarySettings,
        fixedCosts: window.globalFixedCosts,
        itinerary: window.itineraryState
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "budget_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    alert("✅ Saved! Now replace budget_data.json in your project folder and push to GitHub.");
};

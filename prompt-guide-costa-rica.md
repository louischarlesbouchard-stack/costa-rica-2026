# PROMPT: Guide de Voyage Costa Rica - Famille

## CONTEXTE
Crée un guide de voyage HTML complet et professionnel pour un voyage familial au Costa Rica.

## INFORMATIONS DU VOYAGE
- **Voyageurs:** Famille de 5 (2 adultes + 3 enfants: [ÂGES])
- **Durée:** 22 jours
- **Période:** Juillet-Août 2026
- **Point de départ:** Montréal, Québec
- **Budget cible:** $12,000-18,000 CAD total
- **Priorités:** Surf (débutants), wildlife, plages famille, expériences mémorables pour enfants

---

## STRUCTURE REQUISE DU GUIDE

### 1. SECTION PLAGES (CRITIQUE - très détaillée)
Créer une comparaison complète **Côte Pacifique vs Côte Caraïbe** avec:

**Pour chaque plage (minimum 10 plages au total):**
- Nom + tagline descriptif
- Score famille (sur 10) + badge distinctif
- **Grille de 5-6 photos** (utiliser Unsplash URLs haute qualité)
- 4 métriques clés: vagues, enfants, activité principale, temps depuis aéroport
- Description 3-4 lignes avec conseils pratiques
- Tags highlights (✓ positifs, ⚠️ warnings)

**Plages à couvrir minimum:**
- Pacifique: Samara, Nosara/Guiones, Manuel Antonio, Uvita, Santa Teresa, Tamarindo
- Caraïbe: Puerto Viejo, Punta Uva, Cahuita, Tortuguero

**Inclure:** Tableau comparatif rapide (famille/surf/snorkel/développement)

---

### 2. ITINÉRAIRES JOUR PAR JOUR (format agent de voyage)
Proposer **3 itinéraires distincts** avec structure:

**Pour chaque itinéraire:**
- Header avec: nom, route (emojis aéroports), durée, distance totale
- Badge recommandation si applicable

**Pour chaque bloc de jours:**
- Numéro jour(s) dans cercle coloré
- Titre + badge location
- Description détaillée: quoi faire matin/PM, temps de route
- Tags activités avec prix approximatifs
- 2-3 photos miniatures

**Identifier clairement:** La "semaine plage" en couleur distincte (fond jaune)

**Itinéraires suggérés:**
- A: Caraïbe + Volcan + Pacifique (SJO→LIR) - RECOMMANDÉ pour juillet (tortues)
- B: 100% Pacifique beach hopping (LIR→SJO)
- C: Focus Caraïbes + Volcan (SJO→SJO)

---

### 3. REVIEWS & TÉMOIGNAGES (10+ par activité clé)
Format: cards scrollables horizontalement

**Pour chaque activité majeure:**
- Header: Score, nom, nombre reviews, meta info, photo miniature
- **10+ review cards** avec mix:
  - 5-6 positifs (fond vert)
  - 2-3 warnings/réalistes (fond orange)
  - 2 tips pratiques (fond bleu)
- Chaque card: texte citation, auteur + date + étoiles
- Boutons liens: site officiel + TripAdvisor

**Activités à couvrir:**
- École surf principale (Safari Surf Nosara)
- Zipline (100% Aventura Monteverde)
- Tours tortues (Tortuguero)
- Optionnel: whale watching, Manuel Antonio

---

### 4. ACTIVITÉS INCONTOURNABLES
Cards avec: image gauche, infos droite
- Nom + emoji
- Où / Prix / Durée
- Description 2-3 lignes
- Boutons liens

**Inclure:** Cascade La Fortuna, Sources chaudes (gratuit vs luxe), Manuel Antonio, Whale watching

---

### 5. SECTION NOURRITURE
- Tip box sur les "sodas" (restos locaux)
- Grid 4 cards plats typiques avec photos
- Liste restos recommandés par région

---

### 6. BUDGET DÉTAILLÉ
Tableau avec colonnes: Catégorie | Budget | Confort | Notes
- Vols, auto, hébergements, activités, nourriture, essence, divers
- Ligne total en vert avec estimation réaliste
- Sous-section détail activités (grid petites cards)

---

### 7. CONSEILS PRATIQUES
- 3 info boxes couleur (tip vert, warning orange, info bleu)
- Grid 3 colonnes: Météo, À apporter, À éviter

---

## STYLE & DESIGN

### Palette couleurs
```css
--jungle-dark: #1a3a2f;
--jungle-green: #2d5a47;
--ocean-blue: #1e6091;
--caribbean-teal: #0d9488;
--pacific-orange: #ea580c;
--sunset-gold: #f2cc8f;
```

### Typographie
- Titres: Playfair Display (serif, élégant)
- Corps: Source Sans 3 (lisible)
- Google Fonts import

### Éléments UI
- Cards avec border-radius: 12-16px
- Shadows subtiles: 0 2px 12px rgba(0,0,0,0.08)
- Grids responsives (auto-fit, minmax)
- Navigation sticky
- Photos avec object-fit: cover

---

## PHOTOS (CRITIQUE - Authentiques et spécifiques)

### ⚠️ RÈGLE ABSOLUE: PAS DE PHOTOS GÉNÉRIQUES!
Chaque photo doit être **spécifique au lieu exact mentionné**, pas une photo générique de "plage tropicale" ou "surfeur" qu'on pourrait mettre n'importe où.

### Comment trouver les bonnes photos:
1. **Recherche web** pour chaque lieu spécifique (ex: "Playa Samara Costa Rica photos", "Nosara Guiones beach aerial")
2. **Wikimedia Commons** - photos libres souvent géolocalisées
3. **Unsplash** avec recherche précise du nom de lieu
4. **Flickr Creative Commons** - beaucoup de photos de voyageurs avec lieux tagués

### Exemples de ce qu'on veut vs ce qu'on ne veut PAS:

| Lieu | ❌ MAUVAIS (générique) | ✅ BON (authentique) |
|------|----------------------|---------------------|
| Playa Samara | Photo random de plage avec palmiers | Vue de la baie en croissant de Samara avec Isla Chora visible |
| Arenal | N'importe quel volcan conique | Le volcan Arenal avec sa forme distinctive + lac Arenal |
| Tortuguero | Tortue de mer générique | Tortue verte sur la plage noire de Tortuguero |
| Manuel Antonio | Singe capucin random | Singe avec la plage de Manuel Antonio en arrière-plan |
| Monteverde | Forêt tropicale générique | Les ponts suspendus ou la brume caractéristique du cloud forest |
| Safari Surf School | Surfeur générique | Photo avec le logo/école visible OU plage Guiones reconnaissable |

### Pour chaque plage, inclure si possible:
- **Vue aérienne/drone** montrant la forme distinctive de la baie
- **Photo "signature"** - l'élément qui rend ce lieu unique et reconnaissable
- **Ambiance locale** - restos, village, activités spécifiques au lieu
- **Wildlife local** - espèces qu'on voit vraiment à cet endroit

### Recherches web à faire pour photos authentiques:
```
"Playa Samara aerial view"
"Nosara Playa Guiones drone"
"Punta Uva Costa Rica turquoise"
"Cahuita National Park trail beach"
"Tortuguero canals boat"
"La Fortuna Waterfall Costa Rica"
"Arenal Volcano lake view"
"Monteverde hanging bridges fog"
"Manuel Antonio beach monkeys"
"Uvita whale tail aerial marino ballena"
"100% Aventura superman zipline"
"Safari Surf School Nosara"
```

### Format URLs
- Unsplash: `https://images.unsplash.com/photo-[ID]?w=[WIDTH]&q=80`
- Si photo web: s'assurer qu'elle est libre de droits ou utiliser pour référence visuelle

---

## FORMAT SORTIE
- Fichier HTML unique, autonome (CSS inline dans `<style>`)
- Responsive (media queries pour mobile)
- Prêt à imprimer (@media print)
- ~1500-2000 lignes de code
- Langue: Mix français/anglais (noms lieux en anglais, descriptions en français)

---

## TON & APPROCHE
- Agent de voyage expérimenté qui connaît le terrain
- Conseils pratiques et honnêtes (pas juste positif)
- Prix réalistes avec fourchettes
- Warnings quand nécessaire (sécurité, foules, etc.)
- Focus famille avec enfants

---

## CHECKLIST QUALITÉ
- [ ] 10+ plages avec photos multiples chacune
- [ ] **Photos authentiques et reconnaissables** (pas génériques!)
- [ ] Chaque photo correspond visuellement au lieu spécifique mentionné
- [ ] 3 itinéraires jour par jour complets
- [ ] 10+ reviews par activité majeure
- [ ] Tableau comparatif plages
- [ ] Budget détaillé avec activités
- [ ] Navigation sticky fonctionnelle
- [ ] Responsive mobile
- [ ] Toutes les photos chargent (URLs valides)
- [ ] Links externes fonctionnels (Google Maps, TripAdvisor, sites officiels)

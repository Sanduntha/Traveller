/* ══════════════════════════════════════════════════════════════
   slRecommendations.ts
   Rich local guide recommendations for Sri Lanka destinations
   Watch (Sightseeing), Eat (Dining), and Stay (Accommodations)
   ══════════════════════════════════════════════════════════════ */

export interface PlaceRecommendation {
  id: string;
  name: string;
  category: 'watch' | 'eat' | 'stay';
  /** Category badge or price rating (e.g. "Cultural Heritage", "$$ Seafood", "Luxury Resort") */
  tag: string;
  /** Description of the attraction, dining experience, or hotel */
  desc: string;
  /** Special tip, signature dish, or standout feature */
  highlight: string;
}

export interface LocationRecommendations {
  placesToWatch: PlaceRecommendation[];
  placesToEat: PlaceRecommendation[];
  placesToStay: PlaceRecommendation[];
}

const RECOMMENDATIONS_DB: Record<string, LocationRecommendations> = {
  colombo: {
    placesToWatch: [
      {
        id: 'col-watch-1',
        name: 'Gangaramaya Buddhist Temple',
        category: 'watch',
        tag: 'Sacred Architecture',
        desc: 'One of the oldest and most important temples in Colombo, featuring a mix of Sri Lankan, Thai, Indian, and Chinese architectural styles.',
        highlight: '✨ Highlight: Visit the Seema Malaka water temple on Beira Lake at dusk',
      },
      {
        id: 'col-watch-2',
        name: 'Colombo Fort & Old Dutch Hospital',
        category: 'watch',
        tag: 'Colonial Heritage',
        desc: 'Wander through 17th-century cobblestone precincts surrounded by grand colonial buildings, high-end boutiques, and craft cafes.',
        highlight: '✨ Highlight: Historic architecture & artisan shopping',
      },
      {
        id: 'col-watch-3',
        name: 'Galle Face Green Promenade',
        category: 'watch',
        tag: 'Oceanfront Promenade',
        desc: 'The city’s famous oceanfront park where locals gather for sunset breezes, kite flying, and street snacks.',
        highlight: '✨ Highlight: Unrivaled Indian Ocean sunset views',
      },
      {
        id: 'col-watch-4',
        name: 'National Museum of Colombo',
        category: 'watch',
        tag: 'History & Culture',
        desc: 'Housed in a grand 1877 neo-classical mansion, showcasing ancient Kandyan royal regalia, ancient bronze sculptures, and palm leaf manuscripts.',
        highlight: '✨ Highlight: Behold the Golden Throne of the Kandyan Kingdom',
      },
      {
        id: 'col-watch-5',
        name: 'Jami Ul-Alfar (Red Mosque)',
        category: 'watch',
        tag: 'Architectural Icon',
        desc: 'A mesmerizing red-and-white candy-striped mosque in the heart of bustling Pettah market, blending Indo-Saracenic and Gothic architecture.',
        highlight: '✨ Highlight: Striking red-and-white patterned towers',
      },
    ],
    placesToEat: [
      {
        id: 'col-eat-1',
        name: 'Ministry of Crab (Dutch Hospital)',
        category: 'eat',
        tag: '$$$ World’s 50 Best',
        desc: 'World-renowned dining celebrated for giant Sri Lankan lagoon crabs prepared in pepper, garlic chilli, or curry spices.',
        highlight: '✨ Must Try: The Garlic Chilli Mud Crab with wood-fired kade bread',
      },
      {
        id: 'col-eat-2',
        name: 'Upali’s by Nawaloka',
        category: 'eat',
        tag: '$$ Authentic Sri Lankan',
        desc: 'Beloved by locals for traditional clay-pot rice and curry served on banana leaves with aromatic spices.',
        highlight: '✨ Must Try: Mutton curry & roast pol sambol',
      },
      {
        id: 'col-eat-3',
        name: 'Kaema Sutra at Shangri-La',
        category: 'eat',
        tag: '$$$ Modern Sri Lankan',
        desc: 'A stylish culinary partnership celebrating traditional island dishes with a contemporary tapas-style twist and exotic tiki cocktails.',
        highlight: '✨ Must Try: Giant egg hoppers & black pork curry',
      },
      {
        id: 'col-eat-4',
        name: 'Nihonbashi',
        category: 'eat',
        tag: '$$$ Japanese Heritage',
        desc: 'Consistently ranked among Asia’s finest Japanese restaurants, highlighting fresh local Sri Lankan tuna and wagyu.',
        highlight: '✨ Must Try: Fresh sashimi platter & crab shabu-shabu',
      },
      {
        id: 'col-eat-5',
        name: 'Pettah Night Street Market Stalls',
        category: 'eat',
        tag: '$ Local Street Food',
        desc: 'Vibrant street stalls serving piping hot kottu roti, crispy hoppers, and fresh king coconut juice.',
        highlight: '✨ Must Try: Cheese kottu with spicy gravy',
      },
    ],
    placesToStay: [
      {
        id: 'col-stay-1',
        name: 'Shangri-La Colombo',
        category: 'stay',
        tag: 'Luxury Tier',
        desc: 'Ultra-contemporary waterfront luxury hotel with panoramic Indian Ocean and Beira Lake views, world-class spa, and fine dining.',
        highlight: '✨ Vibe: High-rise luxury & sunset infinity pool',
      },
      {
        id: 'col-stay-2',
        name: 'Galle Face Hotel',
        category: 'stay',
        tag: 'Colonial Heritage',
        desc: 'Founded in 1864, this grand oceanfront heritage gem combines old-world elegance with modern comfort.',
        highlight: '✨ Vibe: Historic charm & oceanfront checkerboard lawn',
      },
      {
        id: 'col-stay-3',
        name: 'Tintagel Colombo',
        category: 'stay',
        tag: 'Boutique Heritage',
        desc: 'A stunning heritage mansion in Cinnamon Gardens offering intimate luxury suites, private courtyard dining, and regal suites.',
        highlight: '✨ Vibe: Exclusive privacy & royal colonial heritage',
      },
      {
        id: 'col-stay-4',
        name: 'Cinnamon Life at City of Dreams',
        category: 'stay',
        tag: 'Modern Landmark',
        desc: 'Colombo’s newest architectural wonder, featuring integrated entertainment, sky lounges, and sweeping ocean views.',
        highlight: '✨ Vibe: Cutting-edge architecture & skyline infinity pool',
      },
      {
        id: 'col-stay-5',
        name: 'Granbell Hotel Colombo',
        category: 'stay',
        tag: 'Mid-Range Tier',
        desc: 'Sleek Japanese-designed coastal hotel featuring an ocean-facing rooftop pool and soothing spa facilities.',
        highlight: '✨ Vibe: Modern comfort & rooftop sunset bar',
      },
    ],
  },

  galle: {
    placesToWatch: [
      {
        id: 'gal-watch-1',
        name: 'Galle Fort Ramparts & Lighthouse',
        category: 'watch',
        tag: 'UNESCO Heritage',
        desc: 'Walk along the fortified 17th-century coral and stone ramparts overlooking the turquoise ocean and historic lighthouse.',
        highlight: '✨ Highlight: Breathtaking sunset walk along the fortress walls',
      },
      {
        id: 'gal-watch-2',
        name: 'Unawatuna Beach & Jungle Cove',
        category: 'watch',
        tag: 'Tropical Beach',
        desc: 'A sheltered palm-fringed horseshoe bay just 15 minutes from the fort, perfect for swimming, snorkelling, and lounging.',
        highlight: '✨ Highlight: Calm swimming waters & sea turtle spotting',
      },
      {
        id: 'gal-watch-3',
        name: 'Historic Pedlar Street Boutiques',
        category: 'watch',
        tag: 'Art & Design',
        desc: 'Cobblestone lanes packed with gemologists, Ceylon tea merchants, linen boutiques, and restored colonial courtyards.',
        highlight: '✨ Highlight: Sri Lanka’s premier artisan shopping district',
      },
      {
        id: 'gal-watch-4',
        name: 'National Maritime Museum',
        category: 'watch',
        tag: 'Naval History',
        desc: 'Housed in a 1671 Dutch spice warehouse inside the fort, showcasing marine archeology, shipwrecks, and naval artifacts.',
        highlight: '✨ Highlight: 17th-century Dutch colonial naval relics',
      },
      {
        id: 'gal-watch-5',
        name: 'Japanese Peace Pagoda (Rumassala)',
        category: 'watch',
        tag: 'Scenic Sanctuary',
        desc: 'A pristine white stupa perched on Rumassala Hill across Galle Bay, offering dramatic views across the fort skyline.',
        highlight: '✨ Highlight: 360° panorama across Galle Bay and ocean',
      },
    ],
    placesToEat: [
      {
        id: 'gal-eat-1',
        name: 'Church Street Social (Fort Bazaar)',
        category: 'eat',
        tag: '$$$ Contemporary Fusion',
        desc: 'Set inside a restored merchant’s mansion, serving exquisite Sri Lankan seafood fusion and artisanal cocktails.',
        highlight: '✨ Must Try: Seared yellowfin tuna with curry leaf chimichurri',
      },
      {
        id: 'gal-eat-2',
        name: 'Fortaleza Restaurant & Courtyard',
        category: 'eat',
        tag: '$$$ Historic Dining',
        desc: 'Dining inside a 1684 spice warehouse featuring coral walls, candlelight, and wood-fired seafood.',
        highlight: '✨ Must Try: Grilled barramundi with lemongrass & coconut glaze',
      },
      {
        id: 'gal-eat-3',
        name: 'Lucky Fort Restaurant',
        category: 'eat',
        tag: '$$ Traditional Feast',
        desc: 'Famous for its legendary 10-curry rice tasting menu prepared by a local family using secret generational recipes.',
        highlight: '✨ Must Try: 10-curry traditional banana leaf platter',
      },
      {
        id: 'gal-eat-4',
        name: 'Pedlar’s Inn Cafe & Gelateria',
        category: 'eat',
        tag: '$ Artisan Cafe',
        desc: 'Charming historic cafe known for fresh Italian gelato, Ceylon iced coffee, and wood-fired sourdough pizzas.',
        highlight: '✨ Must Try: Passionfruit & king coconut gelato',
      },
      {
        id: 'gal-eat-5',
        name: 'Aquaduct Galle Fort Cafe',
        category: 'eat',
        tag: '$$ Casual Coastal',
        desc: 'Breezy fort café specializing in avocado toast, coconut hoppers, and fresh tropical smoothies.',
        highlight: '✨ Must Try: Egg hopper breakfast board & iced Ceylon tea',
      },
    ],
    placesToStay: [
      {
        id: 'gal-stay-1',
        name: 'Amangalla Resort',
        category: 'stay',
        tag: 'Ultra-Luxury Tier',
        desc: 'Housed in the historic 1684 Dutch governor residence, offering unmatched colonial grandeur and Ayurvedic baths.',
        highlight: '✨ Vibe: Regal heritage & private courtyard pool',
      },
      {
        id: 'gal-stay-2',
        name: 'Galle Fort Hotel',
        category: 'stay',
        tag: 'Colonial Luxury',
        desc: 'A magnificent 18th-century Dutch mansion restored into a multi-award winning heritage hotel with an iconic courtyard pool.',
        highlight: '✨ Vibe: Architectural grandeur in the heart of the fort',
      },
      {
        id: 'gal-stay-3',
        name: 'Jetwing Lighthouse',
        category: 'stay',
        tag: 'Geoffrey Bawa Masterpiece',
        desc: 'Designed by legendary architect Geoffrey Bawa, this coastal luxury resort sits dramatically on rocks facing the crashing ocean.',
        highlight: '✨ Vibe: Dramatic ocean architecture & dual swimming pools',
      },
      {
        id: 'gal-stay-4',
        name: 'The Fort Printers',
        category: 'stay',
        tag: 'Boutique Heritage',
        desc: 'An 18th-century mansion converted into an intimate design hotel with understated luxury and personal service.',
        highlight: '✨ Vibe: Architect-designed sanctuary in the fort heart',
      },
      {
        id: 'gal-stay-5',
        name: 'Fort Bazaar Hotel',
        category: 'stay',
        tag: 'Mid-Range Boutique',
        desc: 'A vibrant Moroccan-inspired heritage hotel surrounding a breezy central courtyard and spa.',
        highlight: '✨ Vibe: Chic design & relaxed tropical luxury',
      },
    ],
  },

  yala: {
    placesToWatch: [
      {
        id: 'yal-watch-1',
        name: 'Yala National Park Block 1',
        category: 'watch',
        tag: 'Wildlife Safari',
        desc: 'Home to the world’s highest density of wild leopards, along with herds of Asian elephants, sloth bears, and crocodiles.',
        highlight: '✨ Highlight: 6:00 AM dawn safari for leopard tracking',
      },
      {
        id: 'yal-watch-2',
        name: 'Sithulpawwa Ancient Rock Monastery',
        category: 'watch',
        tag: 'Ancient History',
        desc: 'A 2nd-century BC rock temple inside the national park where ancient kings and monks lived amidst wilderness.',
        highlight: '✨ Highlight: 360° jungle views & elephant encounters',
      },
      {
        id: 'yal-watch-3',
        name: 'Bundala National Park (Birding Sanctuary)',
        category: 'watch',
        tag: 'UNESCO Biosphere',
        desc: 'A coastal wetland paradise just west of Yala, hosting flamingos, pelicans, crocodiles, and migratory waterfowl.',
        highlight: '✨ Highlight: World-class bird watching across coastal lagoons',
      },
      {
        id: 'yal-watch-4',
        name: 'Kirinda Coast & Great Basses Lighthouse',
        category: 'watch',
        tag: 'Wild Coastline',
        desc: 'Dramatic rocky beach overlooking offshore reef lighthouses where jungle meets the rolling Southern Ocean.',
        highlight: '✨ Highlight: Spectacular coastal photography & ocean waves',
      },
      {
        id: 'yal-watch-5',
        name: 'Tissa Wewa Reservoir Walk',
        category: 'watch',
        tag: 'Ancient Lake',
        desc: 'An expansive 3rd-century BC lake surrounded by rain trees, wading birds, and flying foxes at sunset.',
        highlight: '✨ Highlight: Serene sunset stroll surrounded by birdlife',
      },
    ],
    placesToEat: [
      {
        id: 'yal-eat-1',
        name: 'Wild Coast Tented Lodge Dining Pavilion',
        category: 'eat',
        tag: '$$$ Luxury Safari Dining',
        desc: 'Bamboo-domed coastal pavilion serving gourmet Sri Lankan safari cuisine and sundowners by the roaring ocean.',
        highlight: '✨ Must Try: Traditional bush dinner under the stars',
      },
      {
        id: 'yal-eat-2',
        name: 'Tissa Lakeside Seafood Grill',
        category: 'eat',
        tag: '$$ Freshwater Specialties',
        desc: 'Relaxed terrace overlooking Tissa Wewa lake serving grilled freshwater prawns, fried lake fish, and clay-pot curries.',
        highlight: '✨ Must Try: Giant lake prawn curry with garlic butter rice',
      },
      {
        id: 'yal-eat-3',
        name: 'Chenaa Village Traditional Kitchen',
        category: 'eat',
        tag: '$$ Authentic Safari Feast',
        desc: 'Traditional open-air dining where local chefs cook Sri Lankan game and vegetable curries in earthen vessels.',
        highlight: '✨ Must Try: Wild boar curry & manioc leaves sambol',
      },
      {
        id: 'yal-eat-4',
        name: 'The Safari Lounge Tissamaharama',
        category: 'eat',
        tag: '$$ Casual Dining',
        desc: 'Relaxed restaurant serving fresh prawns, clay-pot curries, and chilled Ceylon beverages after a long safari day.',
        highlight: '✨ Must Try: Devilled chicken & garlic naan',
      },
      {
        id: 'yal-eat-5',
        name: 'Local Buffalo Curd & Treacle Stalls',
        category: 'eat',
        tag: '$ Authentic Treat',
        desc: 'Roadside clay-pot stalls serving fresh organic buffalo curd drizzled with sweet kithul palm treacle.',
        highlight: '✨ Must Try: Clay-pot curd with kithul palm syrup',
      },
    ],
    placesToStay: [
      {
        id: 'yal-stay-1',
        name: 'Wild Coast Tented Lodge (Relais & Châteaux)',
        category: 'stay',
        tag: 'Ultra-Luxury Safari',
        desc: 'Arching cocoon tents scattered along an untamed beach where Yala jungle meets the Indian Ocean.',
        highlight: '✨ Vibe: World-class luxury safari tents & private pools',
      },
      {
        id: 'yal-stay-2',
        name: 'Uga Chena Huts Yala',
        category: 'stay',
        tag: 'Luxury Domed Villas',
        desc: 'Private luxury cabins with private plunge pools nestled amidst coastal scrub jungle and sand dunes.',
        highlight: '✨ Vibe: Secluded wilderness luxury & private plunge pools',
      },
      {
        id: 'yal-stay-3',
        name: 'Jetwing Yala',
        category: 'stay',
        tag: 'Luxury Tier',
        desc: 'Eco-luxury resort right on the park boundary featuring an expansive beachside swimming pool and spa.',
        highlight: '✨ Vibe: Modern comfort seamlessly merged with nature',
      },
      {
        id: 'yal-stay-4',
        name: 'Kulu Safaris Tented Camp',
        category: 'stay',
        tag: 'Authentic Safari',
        desc: 'Custom-built safari tents with en-suite bathrooms, campfire dining, and expert naturalist guides.',
        highlight: '✨ Vibe: True bushveld camping under the stars',
      },
      {
        id: 'yal-stay-5',
        name: 'Cinnamon Wild Yala',
        category: 'stay',
        tag: 'Mid-Range Safari',
        desc: 'Charming jungle chalets where wild elephants and deer frequently wander past the observation deck.',
        highlight: '✨ Vibe: Authentic wilderness experience & rooftop bar',
      },
    ],
  },

  ella: {
    placesToWatch: [
      {
        id: 'ell-watch-1',
        name: 'Nine Arches Bridge (Demodara)',
        category: 'watch',
        tag: 'Colonial Viaduct',
        desc: 'An engineering marvel of stone and brick spanning a lush jungle valley, where the blue train passes amidst tea bushes.',
        highlight: '✨ Highlight: Watch the morning blue train cross the viaduct',
      },
      {
        id: 'ell-watch-2',
        name: 'Little Adam’s Peak & Ravana Zip',
        category: 'watch',
        tag: 'Scenic Trail',
        desc: 'An easy, rewarding 45-minute trail through tea plantations opening to dramatic valley vistas and zip-lining.',
        highlight: '✨ Highlight: Stunning sunrise 270° panorama',
      },
      {
        id: 'ell-watch-3',
        name: 'Ella Rock Summit Hike',
        category: 'watch',
        tag: 'Mountain Adventure',
        desc: 'A scenic 4-hour trek across train tracks, eucalyptus forests, and tea gardens leading to a sheer cliff-edge viewpoint.',
        highlight: '✨ Highlight: Panoramic summit view above the clouds',
      },
      {
        id: 'ell-watch-4',
        name: 'Diyaluma Falls Plunge Pools',
        category: 'watch',
        tag: 'Natural Waterfalls',
        desc: 'Sri Lanka’s second highest waterfall featuring natural infinity plunge pools at the summit overlooking the valley.',
        highlight: '✨ Highlight: Swim in natural cliff-edge pools',
      },
      {
        id: 'ell-watch-5',
        name: 'Uva Halpewatte Tea Factory',
        category: 'watch',
        tag: 'Ceylon Tea Estate',
        desc: 'A historic working tea factory high in the hills where you can tour the machinery and taste fresh Pekoe tea.',
        highlight: '✨ Highlight: Tea tasting overlooking rolling hills',
      },
    ],
    placesToEat: [
      {
        id: 'ell-eat-1',
        name: 'Cafe Chill Ella',
        category: 'eat',
        tag: '$$ Iconic Hill Cafe',
        desc: 'The heartbeat of Ella—an open-timber architectural gem serving world-class lamprais, cocktails, and espresso.',
        highlight: '✨ Must Try: Traditional banana-leaf Lamprais & passion cocktail',
      },
      {
        id: 'ell-eat-2',
        name: '360 Ella Lounge & Bar',
        category: 'eat',
        tag: '$$ Rooftop Dining',
        desc: 'Lively rooftop bar in Ella village featuring acoustic music, craft cocktails, and sizzling Sri Lankan seafood platters.',
        highlight: '✨ Must Try: Sizzling seafood platter & Ceylon arrack sour',
      },
      {
        id: 'ell-eat-3',
        name: 'Matey Hut Ella',
        category: 'eat',
        tag: '$ Authentic Sri Lankan',
        desc: 'Tiny, legendary kitchen serving mouthwatering pumpkin curry, coconut sambol, and fresh roti.',
        highlight: '✨ Must Try: Pumpkin & cashew curry with pol roti',
      },
      {
        id: 'ell-eat-4',
        name: 'Adam’s Breeze Hillside Cafe',
        category: 'eat',
        tag: '$$ Scenic Dining',
        desc: 'Set right on the trail to Little Adam’s Peak, serving fresh mango smoothies, rice & curry, and homemade cakes.',
        highlight: '✨ Must Try: Fresh avocado smoothie & black chicken curry',
      },
      {
        id: 'ell-eat-5',
        name: 'Ak Ristoro',
        category: 'eat',
        tag: '$$ Contemporary Dining',
        desc: 'Set overlooking tea gardens, serving homemade pastas, Sri Lankan tapas, and rich chocolate desserts.',
        highlight: '✨ Must Try: Sri Lankan tapas board & avocado mousse',
      },
    ],
    placesToStay: [
      {
        id: 'ell-stay-1',
        name: '98 Acres Resort & Spa',
        category: 'stay',
        tag: 'Luxury Tier',
        desc: 'Stunning straw-thatched chalets built on a scenic tea estate with a cliff-edge infinity pool and helicopter pad.',
        highlight: '✨ Vibe: Iconic mountain views & luxury spa treatments',
      },
      {
        id: 'ell-stay-2',
        name: 'EKHO Ella',
        category: 'stay',
        tag: 'Railway Heritage',
        desc: 'Designed like a vintage railway carriage overlooking the Ella Gap, combining nostalgia with panoramic hill comfort.',
        highlight: '✨ Vibe: Dramatic Ella Gap views & heritage railway design',
      },
      {
        id: 'ell-stay-3',
        name: 'The Secret Ella',
        category: 'stay',
        tag: 'Boutique Heritage',
        desc: 'A restored colonial tea planter’s bungalow offering personalized service and serene garden terraces.',
        highlight: '✨ Vibe: Old-world planter elegance amidst tea hills',
      },
      {
        id: 'ell-stay-4',
        name: 'Mountain Heaven Ella Resort',
        category: 'stay',
        tag: 'Mid-Range Scenic',
        desc: 'Perched high on the hillside with an outdoor swimming pool facing directly toward Ella Rock and the valley.',
        highlight: '✨ Vibe: Infinity pool overlooking the misty Ella Gap',
      },
      {
        id: 'ell-stay-5',
        name: 'Ella Eco Lodge',
        category: 'stay',
        tag: 'Mid-Range Eco',
        desc: 'Charming wooden treehouse-style cottages surrounded by forest birds and misty morning air.',
        highlight: '✨ Vibe: Cozy nature hideaway walking distance to town',
      },
    ],
  },

  sigiriya: {
    placesToWatch: [
      {
        id: 'sig-watch-1',
        name: 'Sigiriya Lion Rock Fortress',
        category: 'watch',
        tag: 'UNESCO World Wonder',
        desc: 'A 5th-century sky fortress rising 200 meters above the jungle, famous for ancient water gardens and mirror-wall frescoes.',
        highlight: '✨ Highlight: Climb at 7:00 AM for sunrise views from the summit palace',
      },
      {
        id: 'sig-watch-2',
        name: 'Pidurangala Rock Overlook',
        category: 'watch',
        tag: 'Panoramic Viewpoint',
        desc: 'A rugged rock summit opposite Sigiriya offering the most iconic eye-level view of the Lion Rock silhouette.',
        highlight: '✨ Highlight: Best sunrise & sunset photo spot in Sri Lanka',
      },
      {
        id: 'sig-watch-3',
        name: 'Dambulla Golden Cave Temple',
        category: 'watch',
        tag: 'Ancient Sanctuary',
        desc: 'Five cavernous sanctuaries carved into rock containing 153 Buddha statues and vibrant ceiling murals dating to 1st century BC.',
        highlight: '✨ Highlight: Marvel at the 14-meter reclining Buddha statue',
      },
      {
        id: 'sig-watch-4',
        name: 'Minneriya Elephant Gathering',
        category: 'watch',
        tag: 'Wildlife Phenomenon',
        desc: 'Witness over 300 wild Asian elephants gathering around the Minneriya reservoir during the dry season.',
        highlight: '✨ Highlight: One of the greatest wildlife spectacles in Asia',
      },
      {
        id: 'sig-watch-5',
        name: 'Sigiriya Ancient Water Gardens',
        category: 'watch',
        tag: 'Ancient Engineering',
        desc: 'Stroll through 1,500-year-old symmetrical water fountains and boulder pavilions at the base of the Lion Rock.',
        highlight: '✨ Highlight: Functioning 5th-century hydraulic fountains',
      },
    ],
    placesToEat: [
      {
        id: 'sig-eat-1',
        name: 'Heritance Kandalama Dining Room',
        category: 'eat',
        tag: '$$$ Architectural Dining',
        desc: 'Geoffrey Bawa’s cliffside masterpiece dining room overlooking Kandalama Lake, serving lavish Sri Lankan buffets.',
        highlight: '✨ Must Try: Clay-pot lake fish curry & spice-crusted lamb',
      },
      {
        id: 'sig-eat-2',
        name: 'Ranna 21 Sigiriya Village Dining',
        category: 'eat',
        tag: '$$ Open-Air Pavilion',
        desc: 'Atmospheric village restaurant surrounded by lotus ponds, serving organic vegetables harvested from nearby gardens.',
        highlight: '✨ Must Try: Lotus leaf vegetable rice & river prawn curry',
      },
      {
        id: 'sig-eat-3',
        name: 'Pradeep Restaurant & Clay Pot Kitchen',
        category: 'eat',
        tag: '$$ Traditional Feast',
        desc: 'Authentic village cooking where meals are prepared over wood fires in earthenware clay vessels.',
        highlight: '✨ Must Try: Traditional village curry lunch with 12 vegetables',
      },
      {
        id: 'sig-eat-4',
        name: 'Chandi’s Clay Pot Curry House',
        category: 'eat',
        tag: '$ Authentic Local',
        desc: 'Charming open kitchen where you can watch curries bubbling in clay pots and enjoy homemade ginger beer.',
        highlight: '✨ Must Try: Jackfruit curry & homemade ginger beer',
      },
      {
        id: 'sig-eat-5',
        name: 'Roti Shop Sigiriya',
        category: 'eat',
        tag: '$ Street Favorite',
        desc: 'Cozy roadside spot serving piping hot coconut roti, avocado sambol, and sweet banana chocolate roti.',
        highlight: '✨ Must Try: Crispy pol roti with spicy lunu miris',
      },
    ],
    placesToStay: [
      {
        id: 'sig-stay-1',
        name: 'Heritance Kandalama',
        category: 'stay',
        tag: 'Architectural Icon',
        desc: 'Geoffrey Bawa’s legendary eco-resort woven directly into the living rock face overlooking a serene reservoir.',
        highlight: '✨ Vibe: Architectural genius & infinity pool into the lake',
      },
      {
        id: 'sig-stay-2',
        name: 'Water Garden Sigiriya',
        category: 'stay',
        tag: 'Ultra-Luxury Tier',
        desc: 'Opulent private villas surrounded by ancient-style water channels with direct views of Sigiriya Rock.',
        highlight: '✨ Vibe: Regal privacy & plunge pool villas',
      },
      {
        id: 'sig-stay-3',
        name: 'Aliya Resort & Spa',
        category: 'stay',
        tag: 'Luxury Tier',
        desc: 'Minimalist luxury resort featuring an iconic infinity swimming pool aligned directly with the silhouette of Sigiriya Rock.',
        highlight: '✨ Vibe: Breathtaking infinity pool facing Lion Rock',
      },
      {
        id: 'sig-stay-4',
        name: 'Seerock The King’s Domain',
        category: 'stay',
        tag: 'Boutique Resort',
        desc: 'Intimate boutique chalets nestled amidst jungle greenery with personalized dining and Ayurvedic massages.',
        highlight: '✨ Vibe: Tranquil jungle hideaway & attentive service',
      },
      {
        id: 'sig-stay-5',
        name: 'Sigiriya Village Hotel',
        category: 'stay',
        tag: 'Mid-Range Resort',
        desc: 'Charming cottage-style rooms scattered across landscaped jungle gardens with a large swimming pool.',
        highlight: '✨ Vibe: Peaceful garden retreat minutes from the rock',
      },
    ],
  },
};

/**
 * Returns curated Watch, Eat, Stay recommendations for a given location name.
 * Falls back to dynamic recommendations if the location isn't in our curated list.
 */
export function getPlaceRecommendations(locationName: string): LocationRecommendations {
  const lower = locationName.toLowerCase().trim();

  // Direct check
  if (RECOMMENDATIONS_DB[lower]) {
    return RECOMMENDATIONS_DB[lower];
  }

  // Substring match
  for (const [key, data] of Object.entries(RECOMMENDATIONS_DB)) {
    if (lower.includes(key) || key.includes(lower.split(' ')[0])) {
      return data;
    }
  }

  // Dynamic fallback for any other Sri Lankan town or location
  const display = locationName;
  return {
    placesToWatch: [
      {
        id: `${lower}-watch-1`,
        name: `${display} Heritage Landmark & Viewpoint`,
        category: 'watch',
        tag: 'Cultural Heritage',
        desc: `Discover the rich local history, architecture, and scenic viewpoints around the heart of ${display}.`,
        highlight: '✨ Highlight: Best visited in the cooler early morning hours',
      },
      {
        id: `${lower}-watch-2`,
        name: `${display} Natural Sanctuary & Gardens`,
        category: 'watch',
        tag: 'Nature & Scenery',
        desc: `Explore lush greenery, peaceful water features, and scenic walking paths characteristic of the region.`,
        highlight: '✨ Highlight: Great photo spot & relaxing atmosphere',
      },
      {
        id: `${lower}-watch-3`,
        name: `${display} Traditional Artisan Market`,
        category: 'watch',
        tag: 'Local Culture',
        desc: `Wander through bustling local stalls featuring regional spices, fresh tropical fruit, and handmade crafts.`,
        highlight: '✨ Highlight: Authentic interaction with local artisans',
      },
      {
        id: `${lower}-watch-4`,
        name: `${display} Sunset Overlook & Lake`,
        category: 'watch',
        tag: 'Panoramic View',
        desc: `A serene natural setting near ${display} perfect for evening walks, bird watching, and sunset photography.`,
        highlight: '✨ Highlight: Peaceful evening reflections & photography',
      },
    ],
    placesToEat: [
      {
        id: `${lower}-eat-1`,
        name: `${display} Spice & Clay Pot Kitchen`,
        category: 'eat',
        tag: '$$ Authentic Sri Lankan',
        desc: `Celebrated for traditional wood-fired rice and curry served with coconut sambol and aromatic spices.`,
        highlight: '✨ Must Try: Local clay-pot fish or vegetable curry',
      },
      {
        id: `${lower}-eat-2`,
        name: `The ${display} Veranda & Lounge`,
        category: 'eat',
        tag: '$$$ Fine & Fusion Dining',
        desc: `Relaxed dining atmosphere combining regional Sri Lankan delicacies with international culinary fusion.`,
        highlight: '✨ Must Try: Grilled seafood or spiced lamb chops',
      },
      {
        id: `${lower}-eat-3`,
        name: `${display} Roti & Hopper Cafe`,
        category: 'eat',
        tag: '$ Local Street Food',
        desc: `Crispy hoppers, savory kottu roti, and piping-hot Ceylon tea served fresh in a friendly setting.`,
        highlight: '✨ Must Try: Crispy egg hopper with lunu miris relish',
      },
      {
        id: `${lower}-eat-4`,
        name: `${display} Tropical Juice & Cafe Bar`,
        category: 'eat',
        tag: '$ Cafe & Bakery',
        desc: `Fresh avocado smoothies, king coconut juice, homemade cakes, and Ceylon coffee in a breezy cafe setting.`,
        highlight: '✨ Must Try: Fresh tropical fruit bowl & iced Ceylon latte',
      },
    ],
    placesToStay: [
      {
        id: `${lower}-stay-1`,
        name: `${display} Grand Heritage Resort`,
        category: 'stay',
        tag: 'Luxury Tier',
        desc: `Premium resort featuring a swimming pool, spa treatments, and elegant rooms with panoramic views.`,
        highlight: '✨ Vibe: Exceptional comfort & attentive luxury hospitality',
      },
      {
        id: `${lower}-stay-2`,
        name: `The Boutique Villa at ${display}`,
        category: 'stay',
        tag: 'Boutique Heritage',
        desc: `An intimate design lodge set in tranquil tropical gardens with personalized service and gourmet dining.`,
        highlight: '✨ Vibe: Peaceful sanctuary & authentic charm',
      },
      {
        id: `${lower}-stay-3`,
        name: `${display} Garden Retreat`,
        category: 'stay',
        tag: 'Mid-Range Comfort',
        desc: `Clean, stylish chalets with easy access to main sightseeing spots and a welcoming local staff.`,
        highlight: '✨ Vibe: Excellent value & relaxing garden terrace',
      },
      {
        id: `${lower}-stay-4`,
        name: `${display} Eco Lodge & Chalets`,
        category: 'stay',
        tag: 'Eco Friendly',
        desc: `Surrounded by native trees and birdlife, offering an immersive natural stay with organic breakfast.`,
        highlight: '✨ Vibe: Cozy nature retreat & warm local hospitality',
      },
    ],
  };
}

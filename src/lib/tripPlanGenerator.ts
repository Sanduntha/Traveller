/* ══════════════════════════════════════════════════════════════
   tripPlanGenerator.ts
   Smart template-based trip plan generator for Sri Lanka
   ══════════════════════════════════════════════════════════════ */

/* ── Types ── */

import { getPlaceRecommendations, type PlaceRecommendation } from './slRecommendations';
export type { PlaceRecommendation };

export interface DayActivities {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface PlaceKnowledge {
  displayName: string;
  tagline: string;
  activities: DayActivities;
  accommodation: { luxury: string; mid: string; budget: string };
  mustTry: string[];
  tip: string;
}

export interface DayPlan {
  dayNumber: number;
  location: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  accommodation: string;
  mustTry: string[];
  localTip: string;
  placesToWatch: PlaceRecommendation[];
  placesToEat: PlaceRecommendation[];
  placesToStay: PlaceRecommendation[];
}

export interface TripSummary {
  tripTitle: string;
  totalDays: number;
  totalDistanceKm: number | null;
  stopNames: string[];
  budget: { low: string; mid: string; high: string };
  bestMonths: string;
  days: DayPlan[];
  packingList: string[];
  highlights: string[];
}

/* ── Sri Lanka Destination Knowledge Base ── */

const SL_KNOWLEDGE: Record<string, PlaceKnowledge> = {
  colombo: {
    displayName: 'Colombo',
    tagline: 'The vibrant island capital — commerce, culture & coastline',
    activities: {
      morning: [
        'Early puja at Gangaramaya Temple (6:30 AM) — serene and atmospheric',
        'Walk through the historic Colombo Fort and Dutch Hospital Precinct',
        'Fresh seafood breakfast at the Pettah fish market',
      ],
      afternoon: [
        'National Museum of Colombo for ancient artefacts & royal regalia',
        'Explore colourful Pettah Market for spices, batik & gems',
        'Viharamahadevi Park stroll and Colombo Town Hall photo stop',
      ],
      evening: [
        'Sunset cocktails on the Galle Face Green lawn',
        'Dinner at Ministry of Crab inside the 17th-century Dutch Hospital',
        'Night market and street food along Slave Island lanes',
      ],
    },
    accommodation: {
      luxury: 'Shangri-La Colombo (harbour views)',
      mid: 'Galle Face Hotel (colonial heritage gem)',
      budget: 'Cityrest Colombo (great central location)',
    },
    mustTry: [
      'String hoppers with coconut milk curry',
      'Ministry of Crab mud crab',
      'Kottu roti from night street vendors',
      'Wood-apple juice',
    ],
    tip: 'Book Ministry of Crab at least 2 weeks in advance. Pettah Market is closed Sundays. Tuk-tuks are the fastest way around the city.',
  },

  galle: {
    displayName: 'Galle',
    tagline: 'UNESCO heritage fort meets turquoise Indian Ocean coast',
    activities: {
      morning: [
        'Sunrise walk atop the 17th-century Dutch fort ramparts',
        'Explore the Dutch Reformed Church & Groote Kerk history',
        'Visit Galle Lighthouse for panoramic ocean views',
      ],
      afternoon: [
        'Snorkel or swim at Unawatuna beach (15 min from fort)',
        'Sea turtle watch at nearby Kosgoda Turtle Hatchery',
        'Browse the fort\'s boutiques, jewellers and antique shops',
      ],
      evening: [
        'Sundowner from the fort walls watching fishing boats return',
        'Fine dining at Fortaleza inside the 1684 Dutch residence',
        'Craft cocktails at the Galle Fort Hotel rooftop bar',
      ],
    },
    accommodation: {
      luxury: 'Amangalla (inside the fort — historic luxury)',
      mid: 'Fort Bazaar Galle (restored colonial mansion)',
      budget: 'Old Dutch Hospital Hostel (fort location)',
    },
    mustTry: [
      'Fresh tuna carpaccio at fort restaurants',
      'Hoppers with lunu miris chilli relish',
      'Dutch Burgher biscuits from the fort bakery',
      'King coconut (thambili) on the beach',
    ],
    tip: 'The fort is compact but magical in the early morning before the heat and crowds arrive. Rent a bicycle to explore the backstreets.',
  },

  yala: {
    displayName: 'Yala',
    tagline: 'Sri Lanka\'s premier safari park — leopards, elephants & sea birds',
    activities: {
      morning: [
        '6 AM jeep safari — highest density of leopards in the world',
        'Elephant herds at the Sithulpawwa lagoon water holes',
        'Birding at Buttuwa Wewa (over 200 species recorded)',
      ],
      afternoon: [
        'Rest at the lodge during peak midday heat (animals hide)',
        'Visit the ancient Sithulpawwa Rock Temple (2nd century BC)',
        'Crocodile watching along Menik Ganga river banks',
      ],
      evening: [
        '3 PM sunset safari — leopards become active again',
        'Sloth bear and spotted deer sightings at dusk',
        'Bush dinner under the stars at your tented lodge',
      ],
    },
    accommodation: {
      luxury: 'Wild Coast Tented Lodge (luxury under canvas)',
      mid: 'Jetwing Yala (modern comforts, park edge)',
      budget: 'Cinnamon Wild Yala (good safari packages)',
    },
    mustTry: [
      'Full Sri Lankan rice & curry board at the lodge',
      'Buffalo curd with kithul treacle for dessert',
      'Fresh juice from your camp kitchen',
      'Grilled fresh catch if staying near coast',
    ],
    tip: 'July to October is the very best season — the dry weather drives wildlife to waterholes. Block 1 has the most leopards. Book safaris 3–6 months in advance in peak season.',
  },

  ella: {
    displayName: 'Ella',
    tagline: 'Misty hill country — tea trails, waterfalls & iconic bridges',
    activities: {
      morning: [
        'Hike Little Adam\'s Peak for a stunning sunrise (45 min, easy)',
        'Catch the blue train crossing Nine Arches Bridge (9:06 AM & 12:45 PM)',
        'Tea tasting at Uva Halpewatte Tea Factory with plantation tour',
      ],
      afternoon: [
        'Ella Rock hike for panoramic views (4 hours, moderate difficulty)',
        'Swim in the plunge pool at Diyaluma Falls (5 km from Ella)',
        'Explore the Demodara loop railway — world\'s only spiral railway loop',
      ],
      evening: [
        'Sunset from Ella Rock viewpoint with 270° hill panorama',
        'Dinner and live acoustic music at Ella\'s main street cafes',
        'Star gazing from your guesthouse veranda in the cooler air',
      ],
    },
    accommodation: {
      luxury: '98 Acres Resort (stunning valley views, infinity pool)',
      mid: 'Ella Eco Lodge (charming bamboo rooms)',
      budget: 'Ella Flower Garden Rest (budget with views)',
    },
    mustTry: [
      'Roti with dhal at the roadside cafes',
      'Fresh avocado & banana smoothies',
      'Ella\'s homemade dark chocolate bars',
      'Highland ginger tea from the estates',
    ],
    tip: 'The Nine Arches Bridge train crosses at approximately 9:06 AM and 3:35 PM — confirm timings at Ella station as schedules shift. Book accommodation early as Ella is very popular.',
  },

  sigiriya: {
    displayName: 'Sigiriya',
    tagline: 'The Lion Rock — an 1,800-year-old sky fortress & UNESCO wonder',
    activities: {
      morning: [
        'Climb Sigiriya Rock at 7 AM sharp — beat the heat and crowds',
        'Study the stunning 5th century frescoes halfway up the rock',
        'Explore the ornate water gardens and boulder gardens at the base',
      ],
      afternoon: [
        'Dambulla Cave Temple (30 min drive) — 5 caves of golden Buddhas',
        'Minneriya National Park elephant gathering (seasonal Jul–Oct)',
        'Pidurangala Rock climb for the best view looking back at Sigiriya',
      ],
      evening: [
        'Sunset from Pidurangala Rock looking across Sigiriya silhouette',
        'Cultural Kandyan dance performance at Sigiriya Village',
        'Candlelit dinner at Heritance Kandalama overlooking the lake',
      ],
    },
    accommodation: {
      luxury: 'Heritance Kandalama (Geoffrey Bawa masterpiece, built into the rock)',
      mid: 'Sigiriya Village Hotel (traditional style with pool)',
      budget: 'Eden Garden Hotel Sigiriya (clean, well-rated)',
    },
    mustTry: [
      'Village rice & curry with 12 side dishes',
      'Pol roti with coconut sambol',
      'King coconut juice at the rock base',
      'Treacle and buffalo curd dessert',
    ],
    tip: 'Arrive at 7 AM (opening time) to avoid both the heat and the crowds. Bring 1.5L of water. The climb takes 45–60 minutes each way and can be challenging in the midday heat.',
  },

  kandy: {
    displayName: 'Kandy',
    tagline: 'Sri Lanka\'s cultural soul — sacred temple, botanical gardens & hill lakes',
    activities: {
      morning: [
        'Attend the 6:30 AM puja at the Temple of the Sacred Tooth Relic',
        'Peradeniya Royal Botanical Gardens (one of Asia\'s finest — 147 acres)',
        'Walk through Kandy Market and the gem quarter',
      ],
      afternoon: [
        'Udawattekele Forest Sanctuary bird walk (above the temple)',
        'Visit Bahirawakanda giant Buddha statue for panoramic city views',
        'Kandy Lake circuit stroll, cloud wall and Malwatte Monastery',
      ],
      evening: [
        'Kandyan cultural dance show at Kandyan Art Association (5 PM)',
        'Sunset cocktails at Hotel Suisse overlooking the lake',
        'Lakeside dinner in the Kandy City Centre area',
      ],
    },
    accommodation: {
      luxury: 'Mahaweli Reach Hotel (riverside, excellent)',
      mid: 'Queens Hotel (historic colonial, lakeside)',
      budget: 'Hilltop Hotel Kandy (affordable hill views)',
    },
    mustTry: [
      'Full Kandyan rice & curry with 10–12 curries',
      'Wood-apple mousse from heritage restaurants',
      'Kandyan sweetmeats from the market',
      'Ceylon cinnamon tea from Peradeniya',
    ],
    tip: 'The Temple of the Tooth Relic puja ceremonies are at 6:30 AM, 9:30 AM, and 6:30 PM — the evening one with drummers and torchlight is the most atmospheric.',
  },

  mirissa: {
    displayName: 'Mirissa',
    tagline: 'Whale watching capital, surf beach & chilled-out lagoon vibes',
    activities: {
      morning: [
        'Blue whale watching boat tour (Nov–Apr — highest probability in the world)',
        'Surf lessons at Mirissa beach with certified local instructors',
        'Secret Beach sunrise walk (around the headland from main beach)',
      ],
      afternoon: [
        'Parrot Rock snorkelling — colourful reef fish and coral',
        'Coconut Tree Hill viewpoint for the iconic Sri Lanka photo',
        'Jungle Beach hidden cove for peaceful swimming',
      ],
      evening: [
        'Fresh tuna steaks at the Mirissa Harbour fish market stalls',
        'Beach bonfire at the main Mirissa beach at sunset',
        'Beach bar crawl along the strip — vibrant and lively',
      ],
    },
    accommodation: {
      luxury: 'Vaarnam at Mirissa (clifftop pool villa)',
      mid: 'Pearl Beach Hotel Mirissa (sea-view rooms)',
      budget: 'Mirissa Hills (eco-budget with great sunsets)',
    },
    mustTry: [
      'Grilled skipjack tuna at the harbour restaurants',
      'Coconut pancakes for breakfast',
      'Prawn masala curry',
      'Fresh fruit bowl smoothies',
    ],
    tip: 'Blue whale season is November through April. Book your whale watching boat by 5 PM the day before. December–March is peak season — book accommodation weeks ahead.',
  },

  'nuwara eliya': {
    displayName: 'Nuwara Eliya',
    tagline: 'Little England at 1,868 m — tea estates, cool air & colonial charm',
    activities: {
      morning: [
        'Sunrise drive to Single Tree Hill viewpoint over the misty tea valleys',
        'Pedro Tea Estate factory tour — see the full tea-to-cup process',
        'Hakgala Botanical Gardens with mountain backdrop (stunning April–May)',
      ],
      afternoon: [
        'Horton Plains National Park and World\'s End cliff drop (8 km hike)',
        'Gregory Lake rowing boat hire or lakeside picnic',
        'Victoria Park — perfectly manicured colonial English gardens',
      ],
      evening: [
        'Traditional high tea with scones and clotted cream at The Grand Hotel',
        'Log fire dinner at one of the colonial-era dining rooms',
        'Racecourse district evening walk with mountain views',
      ],
    },
    accommodation: {
      luxury: 'Heritance Tea Factory (inside a converted tea factory)',
      mid: 'Jetwing St. Andrews (colonial elegance)',
      budget: 'Tea Bush Hotel (cosy and affordable)',
    },
    mustTry: [
      'Cream tea with fresh scones and Sri Lankan jam',
      'Strawberries and cream (April–May season)',
      'Rainbow trout from local hill-country farms',
      'Multiple varieties of single-estate Ceylon tea',
    ],
    tip: 'Nights can drop to 8–12°C — bring a warm jacket and layers. The Horton Plains hike is best started before 7 AM to avoid clouds covering the World\'s End view.',
  },

  negombo: {
    displayName: 'Negombo',
    tagline: 'Bustling fishing town just 8 km from the international airport',
    activities: {
      morning: [
        'Watch the early morning fish auction at Negombo Lagoon (4–7 AM)',
        'Cycling tour through the Dutch canal network and backwaters',
        'St. Mary\'s Church and the charming old Dutch hospital ruins',
      ],
      afternoon: [
        'Negombo Beach — calm lagoon side is safe for swimming',
        'Hamilton Canal boat tour through mangroves and lagoon villages',
        'Visit the bustling Negombo market for fresh produce',
      ],
      evening: [
        'Lobster and prawn dinner at the Negombo beach strip restaurants',
        'Sunset lagoon boat trip with local fishermen',
        'Beach bar evening at the main strip',
      ],
    },
    accommodation: {
      luxury: 'Jetwing Beach (premium beachfront)',
      mid: 'Goldi Sands Hotel (good beach access)',
      budget: 'Villa Araliya (quiet guesthouse)',
    },
    mustTry: [
      'Lobster thermidor at the beach restaurants',
      'Fresh lagoon prawn curry',
      'Egg hoppers for breakfast',
      'Crab kottu at the night markets',
    ],
    tip: 'Perfect for a first or last night given the proximity to the airport (20 min). The fishing fleet returns around 5 AM — set an early alarm for a spectacular sight.',
  },

  anuradhapura: {
    displayName: 'Anuradhapura',
    tagline: 'Sri Lanka\'s first ancient capital — 2,300 years of sacred history',
    activities: {
      morning: [
        'Sri Maha Bodhi — sacred fig tree grown from the original Bodhi tree under which Buddha was enlightened',
        'Ruwanwelisaya Dagoba (white stupa 103 m tall) at sunrise',
        'Thuparamaya — Sri Lanka\'s oldest stupa, 3rd century BC',
      ],
      afternoon: [
        'Jetavana Monastery — once the tallest brick structure on Earth',
        'Isurumuniya Rock Temple with its ancient love carvings',
        'Cycling tour between the scattered ruins (city is very spread out)',
      ],
      evening: [
        'Evening puja at Sri Maha Bodhi — extraordinary atmosphere with oil lamps',
        'Sunset over Tissawewa reservoir with bats and birds',
        'Dinner at Randiya Restaurant for authentic local cuisine',
      ],
    },
    accommodation: {
      luxury: 'Ulagalla Resort (boutique heritage near ruins)',
      mid: 'Tissawewa Grand Hotel (colonial-era, lake views)',
      budget: 'Galway City Hotel (central and reliable)',
    },
    mustTry: [
      'Traditional rice & curry lunch at local spots near the ruins',
      'Coconut roti with dhal',
      'Fresh king coconut throughout the site visit',
      'Jaggery sweets from local stalls near Sri Maha Bodhi',
    ],
    tip: 'Hire a local bicycle guide (around LKR 500–800) — they know shortcuts between sites and can unlock hidden viewpoints. Dress modestly for all temple visits.',
  },
};

/* ── Fuzzy place matcher ── */

function getPlaceKnowledge(name: string): PlaceKnowledge {
  const lower = name.toLowerCase().trim();

  // Direct key match
  if (SL_KNOWLEDGE[lower]) return SL_KNOWLEDGE[lower];

  // Partial key match (e.g. "Yala National Park" → "yala")
  for (const [key, info] of Object.entries(SL_KNOWLEDGE)) {
    if (lower.includes(key) || key.includes(lower.split(' ')[0])) return info;
  }

  // Generic fallback for unknown Sri Lanka destinations
  return {
    displayName: name,
    tagline: `Explore the beauty and culture of ${name}`,
    activities: {
      morning: [
        `Early morning exploration of ${name}'s local market and surroundings`,
        `Visit the main cultural or historical site near ${name}`,
        `Sunrise viewpoint hike or walk for panoramic Sri Lanka scenery`,
      ],
      afternoon: [
        `Guided tour of the area's key natural or heritage attractions`,
        `Local village walk and interaction with residents`,
        `Relax at a nearby beach, lake or scenic viewpoint`,
      ],
      evening: [
        `Sunset from the best local viewpoint`,
        `Traditional Sri Lankan rice & curry dinner`,
        `Evening stroll and local night market if available`,
      ],
    },
    accommodation: {
      luxury: `Best-rated boutique resort near ${name}`,
      mid: `Comfortable guesthouse in ${name} town`,
      budget: `Local homestay experience in ${name}`,
    },
    mustTry: [
      'Rice & curry with local Sri Lankan side dishes',
      'Fresh tropical fruit: mango, papaya, rambutan',
      'Ceylon tea from a nearby estate',
      'King coconut (thambili) — hydrating and delicious',
    ],
    tip: `Ask your accommodation host for the best local spots — they'll know hidden gems not in any guidebook. Hire a tuk-tuk driver for the day (around LKR 2,000–3,000).`,
  };
}

/* ══════════════════════════════════════════════════════
   Main generator function
   ══════════════════════════════════════════════════════ */

export interface StopWithDays {
  id: string;
  label?: string;
  name: string;
  days: number;
}

export function generateTripPlan(
  stops: StopWithDays[],
  routeDistanceM: number | null
): TripSummary {
  const stopsWithDays = stops.filter(s => s.days > 0);
  const totalDays = stopsWithDays.reduce((sum, s) => sum + s.days, 0);

  const days: DayPlan[] = [];
  let dayCount = 1;

  for (const stop of stops) {
    const daysHere = stop.days;
    if (daysHere <= 0) continue;

    const info = getPlaceKnowledge(stop.label ?? stop.name);
    const recs = getPlaceRecommendations(info.displayName);

    for (let d = 0; d < daysHere; d++) {
      const isArrivalDay = d === 0;
      const isLastDay = d === daysHere - 1 && stop.id !== stops[stops.length - 1]?.id;

      days.push({
        dayNumber: dayCount++,
        location: info.displayName,
        title: isArrivalDay
          ? `Arrive in ${info.displayName}`
          : isLastDay
          ? `Final day in ${info.displayName} — depart afternoon`
          : `Explore ${info.displayName}`,
        morning: info.activities.morning[d % info.activities.morning.length],
        afternoon: info.activities.afternoon[d % info.activities.afternoon.length],
        evening: info.activities.evening[d % info.activities.evening.length],
        accommodation: isLastDay ? 'Pack and prepare for next destination' : info.accommodation.mid,
        mustTry: info.mustTry.slice(0, 2),
        localTip: info.tip,
        placesToWatch: recs.placesToWatch,
        placesToEat: recs.placesToEat,
        placesToStay: recs.placesToStay,
      });
    }
  }

  const stopNames = stopsWithDays.map(s => {
    const info = getPlaceKnowledge(s.label ?? s.name);
    return info.displayName;
  });

  // Budget per day estimates (USD)
  const lowDaily = 45;
  const midDaily = 100;
  const highDaily = 280;

  return {
    tripTitle: `${totalDays}-Day Sri Lanka Journey`,
    totalDays,
    totalDistanceKm: routeDistanceM ? Math.round(routeDistanceM / 1000) : null,
    stopNames,
    budget: {
      low:  `$${totalDays * lowDaily}–$${totalDays * (lowDaily + 15)} USD`,
      mid:  `$${totalDays * midDaily}–$${totalDays * (midDaily + 30)} USD`,
      high: `$${totalDays * highDaily}–$${totalDays * (highDaily + 70)} USD`,
    },
    bestMonths: 'Dec–Mar (south & west coast) · Jul–Sep (east coast & cultural triangle)',
    days,
    highlights: stopsWithDays.map(s => getPlaceKnowledge(s.label ?? s.name).tagline),
    packingList: [
      'Light cotton clothes for coastal & lowland areas',
      'Warmer layers for hill country (Ella, Nuwara Eliya can be 10–15°C)',
      'Reef-safe sunscreen — strong UV all year',
      'Insect repellent for jungle and national parks',
      'Comfortable walking shoes or trail runners',
      'Modest cover-up for temple visits (shoulders & knees)',
      'Reusable water bottle — stay hydrated in the heat',
      'Power adapter (Type D & G plugs used in Sri Lanka)',
    ],
  };
}

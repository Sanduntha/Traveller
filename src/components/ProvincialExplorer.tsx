'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, Hotel, Utensils, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import styles from './ProvincialExplorer.module.css';

interface Place {
    id: string;
    name: string;
    desc: string;
    lat: number;
    lon: number;
    img: string;
}

interface Province {
    id: string;
    name: string;
    image: string;
}

const PROVINCES: Province[] = [
    { id: 'central', name: 'Central', image: 'https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=800' },
    { id: 'southern', name: 'Southern', image: 'https://images.unsplash.com/photo-1569670380685-4582bf29a24a?q=80&w=800' },
    { id: 'western', name: 'Western', image: 'https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=800' },
    { id: 'eastern', name: 'Eastern', image: 'https://images.unsplash.com/photo-1569670380685-4582bf29a24a?q=80&w=800' },
    { id: 'north-central', name: 'North Central', image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=800' },
    { id: 'uva', name: 'Uva', image: 'https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=800' },
    { id: 'northern', name: 'Northern', image: 'https://images.unsplash.com/photo-1569670380685-4582bf29a24a?q=80&w=800' },
    { id: 'north-western', name: 'North Western', image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=800' },
    { id: 'sabaragamuwa', name: 'Sabaragamuwa', image: 'https://images.unsplash.com/photo-1624963145721-277432579507?q=80&w=800' }
];

const PLACES: Record<string, Place[]> = {
    "central": [
        {
            "id": "c1",
            "name": "Temple of the Tooth",
            "desc": "Sacred Buddhist temple in Kandy.",
            "lat": 7.097442037084231,
            "lon": 80.81469423724627,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c2",
            "name": "Gregory Lake",
            "desc": "Scenic reservoir in Nuwara Eliya.",
            "lat": 7.423452089060811,
            "lon": 80.57265806527222,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "c3",
            "name": "Royal Botanical Gardens",
            "desc": "Orchid collection in Peradeniya.",
            "lat": 7.288078295751976,
            "lon": 80.64661852284662,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c4",
            "name": "Ambuluwawa Tower",
            "desc": "Spiral tower in Gampola.",
            "lat": 7.264383240191251,
            "lon": 80.79664352707933,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c5",
            "name": "Knuckles Mountain Range",
            "desc": "Rugged trekking terrain.",
            "lat": 7.287063540506276,
            "lon": 80.58070295125142,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c6",
            "name": "Pinnawala Elephant Orphanage",
            "desc": "Elephant sanctuary nearby.",
            "lat": 7.092122455688712,
            "lon": 80.82214232485991,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c7",
            "name": "Horton Plains",
            "desc": "High altitude plateau park.",
            "lat": 7.286499372716926,
            "lon": 80.80007515055861,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c8",
            "name": "Worlds End",
            "desc": "Sheer precipice in Horton Plains.",
            "lat": 7.134532897622697,
            "lon": 80.51501452322954,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c9",
            "name": "Bahirawakanda Vihara",
            "desc": "Giant Buddha statue overlooking Kandy.",
            "lat": 7.282477193806466,
            "lon": 80.48096957345471,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "c10",
            "name": "Hunas Falls",
            "desc": "Beautiful waterfall in Matale district.",
            "lat": 7.182249220746173,
            "lon": 80.78714225750917,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c11",
            "name": "Dambulla Cave Temple",
            "desc": "Golden temple complex.",
            "lat": 7.3644267195887405,
            "lon": 80.63857304600977,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "c12",
            "name": "Pidurangala Rock",
            "desc": "Alternative hike near Sigiriya.",
            "lat": 7.228267872228843,
            "lon": 80.77375247974045,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c13",
            "name": "Udawatta Kele",
            "desc": "Sanctuary in the heart of Kandy.",
            "lat": 7.178634192341281,
            "lon": 80.55922738605217,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c14",
            "name": "Victoria Dam",
            "desc": "Highest dam in Sri Lanka.",
            "lat": 7.150081734600458,
            "lon": 80.4901705227551,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "c15",
            "name": "Maduru Oya Park",
            "desc": "Wildlife and ancient ruins.",
            "lat": 7.386272646901216,
            "lon": 80.64080194077702,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c16",
            "name": "Sembuwatta Lake",
            "desc": "Man-made lake with misty hills.",
            "lat": 7.1222409242091524,
            "lon": 80.58847549273696,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "c17",
            "name": "St. Clair's Falls",
            "desc": "Little Niagara of Sri Lanka.",
            "lat": 7.402176356840076,
            "lon": 80.66326612560515,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "c18",
            "name": "Devon Falls",
            "desc": "Waterfall named after English coffee planter.",
            "lat": 7.204336781888012,
            "lon": 80.51919896584745,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "c19",
            "name": "Aluvihare Rock Temple",
            "desc": "Where Pali Canon was written.",
            "lat": 7.133852397085235,
            "lon": 80.47981499815421,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "c20",
            "name": "Matale Spice Gardens",
            "desc": "Educational spice tours.",
            "lat": 7.333846112488815,
            "lon": 80.71904973176807,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "southern": [
        {
            "id": "s1",
            "name": "Galle Fort",
            "desc": "Portuguese historical fortifications.",
            "lat": 6.112207134446493,
            "lon": 80.30144300052956,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s2",
            "name": "Mirissa Beach",
            "desc": "Whale watching paradise.",
            "lat": 5.918364563620021,
            "lon": 80.04380496942662,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "s3",
            "name": "Yala National Park",
            "desc": "Wildlife (leopards and elephants).",
            "lat": 6.011997697303937,
            "lon": 80.16308041574942,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s4",
            "name": "Unawatuna Beach",
            "desc": "Crescent beach and palm trees.",
            "lat": 6.014382790981541,
            "lon": 80.33428421237511,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s5",
            "name": "Tangalle",
            "desc": "Pristine beaches and luxury stays.",
            "lat": 6.138054661130926,
            "lon": 80.3767978227933,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s6",
            "name": "Weligama Bay",
            "desc": "Ideal for beginner surfing.",
            "lat": 6.028456493186314,
            "lon": 80.26438543391497,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s7",
            "name": "Hiriketiya Beach",
            "desc": "Hidden horseshoe surf bay.",
            "lat": 5.868933266168998,
            "lon": 80.32685931401895,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s8",
            "name": "Dondra Head Lighthouse",
            "desc": "Southernmost point of Sri Lanka.",
            "lat": 6.120112324720032,
            "lon": 80.25033889374048,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s9",
            "name": "Hummanaya Blowhole",
            "desc": "Natural seawater blowhole.",
            "lat": 6.006049581326497,
            "lon": 80.10958771891464,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s10",
            "name": "Koggala Lake",
            "desc": "Serene lake with small islands.",
            "lat": 6.160560904107357,
            "lon": 80.40675302838375,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s11",
            "name": "Handunugoda Tea Estate",
            "desc": "Virgin White Tea production.",
            "lat": 6.026740261380111,
            "lon": 80.08936128132216,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s12",
            "name": "Kushtarajagala",
            "desc": "Rock-cut statue of Avalokiteshvara.",
            "lat": 6.183181537457582,
            "lon": 80.20046610168174,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s13",
            "name": "Matara Star Fort",
            "desc": "Dutch fort built in star shape.",
            "lat": 6.166780513837462,
            "lon": 80.01243565693989,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s14",
            "name": "Polhena Beach",
            "desc": "Safe snorkeling and turtle sightings.",
            "lat": 6.019654573685022,
            "lon": 80.30346045316104,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s15",
            "name": "Rekawa Beach",
            "desc": "Famous for turtle nesting.",
            "lat": 5.838792580490615,
            "lon": 80.05032510067235,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s16",
            "name": "Madu River Safari",
            "desc": "Boat ride through mangroves.",
            "lat": 6.077467160608556,
            "lon": 80.2749219122041,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s17",
            "name": "Ahungalla Beach",
            "desc": "Golden sands and palm luxury.",
            "lat": 5.835634889838191,
            "lon": 80.31852791953554,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "s18",
            "name": "Bentota Beach",
            "desc": "Major water sports hub.",
            "lat": 6.1768355706135525,
            "lon": 80.35538320405928,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s19",
            "name": "Kosgoda Turtle Hatchery",
            "desc": "Sea turtle conservation center.",
            "lat": 6.089671480722718,
            "lon": 80.19106908963047,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s20",
            "name": "Kanneliya Forest",
            "desc": "Lowland rainforest biodiversity.",
            "lat": 5.87583243290511,
            "lon": 80.35531544218134,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "western": [
        {
            "id": "w1",
            "name": "Lotus Tower",
            "desc": "Tallest South Asian tower.",
            "lat": 7.003236430038414,
            "lon": 79.82673455293126,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w2",
            "name": "Negombo Beach",
            "desc": "Golden sands near airport.",
            "lat": 6.9618112406874895,
            "lon": 79.77517327907647,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "w3",
            "name": "Independence Square",
            "desc": "Grand monument in Colombo.",
            "lat": 6.748159988196028,
            "lon": 79.99451516882532,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w4",
            "name": "Galle Face Green",
            "desc": "Ocean-side urban park.",
            "lat": 6.97326349251381,
            "lon": 79.79593803104044,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w5",
            "name": "Mount Lavinia",
            "desc": "Colonial charm beach resort.",
            "lat": 7.082099794048624,
            "lon": 79.71311253392416,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w6",
            "name": "Colombo National Museum",
            "desc": "Historic artifacts and art.",
            "lat": 7.024073573061448,
            "lon": 79.87724202193873,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w7",
            "name": "Viharamahadevi Park",
            "desc": "Colombo's largest public park.",
            "lat": 7.06637992759036,
            "lon": 79.66097576793776,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w8",
            "name": "Gangaramaya Temple",
            "desc": "Modern eclectic Buddhist temple.",
            "lat": 7.013750494940672,
            "lon": 80.00316203128564,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w9",
            "name": "Beira Lake",
            "desc": "Urban lake with Seema Malaka temple.",
            "lat": 6.755531541916819,
            "lon": 79.91450894529935,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "w10",
            "name": "St. Anthony's Shrine",
            "desc": "Famous Catholic pilgrimage site.",
            "lat": 6.986876178714591,
            "lon": 79.78932903075925,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w11",
            "name": "Bellanwila Rajamaha Vihara",
            "desc": "Venerated ancient Buddhist site.",
            "lat": 7.066709782989026,
            "lon": 79.92861453741449,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "w12",
            "name": "Bolgoda Lake",
            "desc": "Largest natural lake in Sri Lanka.",
            "lat": 6.7754756800733045,
            "lon": 79.761357306673,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w13",
            "name": "Kelaniya Temple",
            "desc": "Sanctified by Buddha's visit.",
            "lat": 7.074549765905624,
            "lon": 79.98019984402784,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w14",
            "name": "Apey Gama",
            "desc": "Replica of a traditional village.",
            "lat": 6.89886773878509,
            "lon": 79.98100240958784,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "w15",
            "name": "Waters Edge Park",
            "desc": "Recreational park in Battaramulla.",
            "lat": 6.731148534746066,
            "lon": 80.03740694207143,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w16",
            "name": "Diyatha Uyana",
            "desc": "Lakeside park and food stalls.",
            "lat": 7.00372465432458,
            "lon": 79.83528048533931,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "w17",
            "name": "Beddagana Wetland Park",
            "desc": "Nature walk and bird watching.",
            "lat": 6.897506623442091,
            "lon": 79.69626122893935,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "w18",
            "name": "Attidiya Bird Sanctuary",
            "desc": "Wetland bird habitat.",
            "lat": 6.897282147082219,
            "lon": 79.76351591780845,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "w19",
            "name": "Dutch Hospital Colombo",
            "desc": "Oldest building in Fort area.",
            "lat": 6.765441540727079,
            "lon": 79.89290275528256,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "w20",
            "name": "Pettah Floating Market",
            "desc": "Modern shopping on water.",
            "lat": 6.774836257363759,
            "lon": 79.97917607678552,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "eastern": [
        {
            "id": "e1",
            "name": "Arugam Bay",
            "desc": "Surfing point break destination.",
            "lat": 8.444659712286713,
            "lon": 81.04629862487702,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e2",
            "name": "Pigeon Island",
            "desc": "Coral reef national park.",
            "lat": 8.689896399264452,
            "lon": 81.24656762731034,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "e3",
            "name": "Trincomalee Harbour",
            "desc": "Natural deep-water harbour.",
            "lat": 8.65556383575639,
            "lon": 81.24449254731793,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e4",
            "name": "Nilaveli Beach",
            "desc": "White sands and turquoise waters.",
            "lat": 8.662367399246298,
            "lon": 81.05674204592542,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e5",
            "name": "Batticaloa Lagoon",
            "desc": "Home of the singing fish.",
            "lat": 8.594616463905423,
            "lon": 81.15887150748446,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e6",
            "name": "Uppuveli Beach",
            "desc": "Relaxed vibe and seafood stalls.",
            "lat": 8.54507617454689,
            "lon": 81.31441598751672,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e7",
            "name": "Koneswaram Temple",
            "desc": "Classical Hindu temple on Swami Rock.",
            "lat": 8.454404553644597,
            "lon": 81.23370521698124,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e8",
            "name": "Marble Beach",
            "desc": "Hidden gem with crystal waters.",
            "lat": 8.619023671587065,
            "lon": 81.03731697738493,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e9",
            "name": "Kanniya Hot Springs",
            "desc": "Ancient therapeutic hot wells.",
            "lat": 8.730185723437891,
            "lon": 81.17673083828385,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "e10",
            "name": "Pasikudah Bay",
            "desc": "Shallow waters and luxury resorts.",
            "lat": 8.447607647678398,
            "lon": 81.25018265297177,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e11",
            "name": "Kalkudah Beach",
            "desc": "Pristine and secluded sands.",
            "lat": 8.414886464748307,
            "lon": 81.35044031077423,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "e12",
            "name": "Ampara Tank",
            "desc": "Large reservoir and wildlife.",
            "lat": 8.700107308257714,
            "lon": 81.15405983728395,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e13",
            "name": "Buddhangala Monastery",
            "desc": "Ancient ruins in Ampara.",
            "lat": 8.667115665499644,
            "lon": 81.15645448949637,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e14",
            "name": "Lahugala Kitulana",
            "desc": "National park for elephants.",
            "lat": 8.578629318394167,
            "lon": 81.23784961544273,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "e15",
            "name": "Magul Maha Viharaya",
            "desc": "Site of royal wedding ceremony.",
            "lat": 8.574909197274076,
            "lon": 81.25406976295987,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e16",
            "name": "Okanda Devalaya",
            "desc": "Coastal shrine for pilgrims.",
            "lat": 8.497377277207844,
            "lon": 81.12350842895543,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "e17",
            "name": "Kumana National Park",
            "desc": "Bird sanctuary and leopards.",
            "lat": 8.75851124645187,
            "lon": 81.1766318892404,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "e18",
            "name": "Gal Oya National Park",
            "desc": "Boat safaris and wild elephants.",
            "lat": 8.523761414979505,
            "lon": 81.33096707149127,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "e19",
            "name": "Senanayake Samudraya",
            "desc": "Largest reservoir in Sri Lanka.",
            "lat": 8.756027914648383,
            "lon": 81.20398106208009,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "e20",
            "name": "Elephant Rock",
            "desc": "Popular viewpoint in Arugam Bay.",
            "lat": 8.486325977399616,
            "lon": 81.42470170794212,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "north-central": [
        {
            "id": "n1",
            "name": "Sigiriya Rock",
            "desc": "Ancient fortress and palace.",
            "lat": 8.196092834800341,
            "lon": 80.57079158551971,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n2",
            "name": "Polonnaruwa",
            "desc": "Ruins of ancient kingdom.",
            "lat": 8.30936388242106,
            "lon": 80.38226146222753,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n3",
            "name": "Anuradhapura",
            "desc": "Ancient sacred city and stupas.",
            "lat": 8.44724297823471,
            "lon": 80.59553276865341,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n4",
            "name": "Mihintale",
            "desc": "Birthplace of Buddhism here.",
            "lat": 8.417758900155636,
            "lon": 80.58377956381105,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n5",
            "name": "Ritigala",
            "desc": "Ancient forest monastery range.",
            "lat": 8.20151287301804,
            "lon": 80.59905038781801,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n6",
            "name": "Isurumuniya",
            "desc": "Famous for stone carvings.",
            "lat": 8.179112868943204,
            "lon": 80.44019538367206,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n7",
            "name": "Sri Maha Bodhi",
            "desc": "World's oldest planted tree.",
            "lat": 8.286884497089817,
            "lon": 80.51435375840124,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n8",
            "name": "Ruwanwelisaya",
            "desc": "Colossal bubble-shaped stupa.",
            "lat": 8.482404734474501,
            "lon": 80.21343451438042,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n9",
            "name": "Jetavanaramaya",
            "desc": "Tallest brick structure of antiquity.",
            "lat": 8.126756864723596,
            "lon": 80.34902378865546,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n10",
            "name": "Abhayagiri Dagoba",
            "desc": "Massive monastery ruins.",
            "lat": 8.262642927394715,
            "lon": 80.2260066595787,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n11",
            "name": "Minneriya National Park",
            "desc": "The Great Elephant Gathering.",
            "lat": 8.336620763560896,
            "lon": 80.21339218788711,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n12",
            "name": "Kaudulla National Park",
            "desc": "Another hub for wild elephants.",
            "lat": 8.297185522605124,
            "lon": 80.20126574031387,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n13",
            "name": "Giritale Tank",
            "desc": "Scenic reservoir and ruins.",
            "lat": 8.230454369872541,
            "lon": 80.48164877772301,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n14",
            "name": "Lankathilaka Vihara",
            "desc": "High-walled massive brick structure.",
            "lat": 8.382558896085035,
            "lon": 80.29216747894965,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n15",
            "name": "Gal Viharaya",
            "desc": "Exquisite rock-cut Buddha statues.",
            "lat": 8.26256328381295,
            "lon": 80.23944546028642,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n16",
            "name": "Vatadage",
            "desc": "Circular relic house in Polonnaruwa.",
            "lat": 8.166622284023285,
            "lon": 80.49319751386585,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n17",
            "name": "Hatadage",
            "desc": "Ancient relic shrine of Tooth.",
            "lat": 8.153653691647285,
            "lon": 80.58056229072209,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n18",
            "name": "Rankot Vihara",
            "desc": "Largest dagoba in Polonnaruwa.",
            "lat": 8.186651852101885,
            "lon": 80.4723502838608,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n19",
            "name": "Tivanka Image House",
            "desc": "Exquisite ancient frescoes.",
            "lat": 8.36482336214441,
            "lon": 80.32565700359429,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n20",
            "name": "Parakrama Samudra",
            "desc": "The Sea of Parakrama reservoir.",
            "lat": 8.130195007243548,
            "lon": 80.43948663580399,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "uva": [
        {
            "id": "u1",
            "name": "Nine Arches Bridge",
            "desc": "Iconic colonial railway bridge.",
            "lat": 7.0975984629725275,
            "lon": 81.08805226194947,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u2",
            "name": "Ella Rock",
            "desc": "Hike with panoramic views.",
            "lat": 7.182274649354647,
            "lon": 81.09374341828145,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "u3",
            "name": "Little Adam's Peak",
            "desc": "Ridge-line viewpoints hike.",
            "lat": 7.140344157365179,
            "lon": 80.86905162184839,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u4",
            "name": "Dunhinda Falls",
            "desc": "Beautiful high waterfall.",
            "lat": 7.03551412782782,
            "lon": 81.03435849639163,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u5",
            "name": "Lipton's Seat",
            "desc": "Breathtaking tea estate viewpoint.",
            "lat": 7.123974420537133,
            "lon": 80.96702537138928,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u6",
            "name": "Ravana Falls",
            "desc": "Associated with Ramayana legend.",
            "lat": 7.120913271862421,
            "lon": 81.08485007572463,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u7",
            "name": "Adisham Bungalow",
            "desc": "St. Benedictine monastery.",
            "lat": 7.071376883679996,
            "lon": 81.03722459479171,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u8",
            "name": "Buduruwagala",
            "desc": "Colossal rock-cut Buddha figures.",
            "lat": 7.047423372385138,
            "lon": 81.00721801361955,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u9",
            "name": "Diyaluma Falls",
            "desc": "Sri Lanka's second highest waterfall.",
            "lat": 6.837442096100844,
            "lon": 81.17338250655789,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "u10",
            "name": "Bambarakanda Falls",
            "desc": "Highest waterfall in the country.",
            "lat": 6.980288193781947,
            "lon": 81.09636913138922,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u11",
            "name": "Muthiyangana Vihara",
            "desc": "Ancient temple in Badulla.",
            "lat": 7.098791309925355,
            "lon": 81.1959069500532,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "u12",
            "name": "Narangala",
            "desc": "Popular mountain for camping.",
            "lat": 6.8526935573051055,
            "lon": 81.07655717833079,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u13",
            "name": "Maligawila Buddha",
            "desc": "Free-standing ancient stone statue.",
            "lat": 6.8442623807403855,
            "lon": 81.08340616955276,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u14",
            "name": "Yudaganawa Stupa",
            "desc": "One of the largest in Uva.",
            "lat": 6.8933734779717275,
            "lon": 80.99542310430807,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "u15",
            "name": "Bogoda Wooden Bridge",
            "desc": "Oldest wooden bridge in the country.",
            "lat": 7.118659381983132,
            "lon": 80.92152136015055,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u16",
            "name": "Demodara Loop",
            "desc": "Unique railway engineering marvel.",
            "lat": 6.925847695428459,
            "lon": 80.88097903298103,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "u17",
            "name": "Haputale",
            "desc": "Misty town with sheer cliffs.",
            "lat": 6.866039574580967,
            "lon": 81.17783632029999,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "u18",
            "name": "Idalgashinna",
            "desc": "Scenic railway station in the clouds.",
            "lat": 6.8807436302702945,
            "lon": 81.04309079950933,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "u19",
            "name": "Sorabora Wewa",
            "desc": "Ancient irrigation masterpiece.",
            "lat": 7.128981370897106,
            "lon": 80.98691854267499,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "u20",
            "name": "Rawana Cave",
            "desc": "Legendary hiding place of Seetha.",
            "lat": 7.172494424954108,
            "lon": 81.2269095097347,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "northern": [
        {
            "id": "n1",
            "name": "Jaffna Fort",
            "desc": "Limestone colonial fortification.",
            "lat": 9.856043346918689,
            "lon": 79.98665506750909,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n2",
            "name": "Nallur Kovil",
            "desc": "Grand Hindu temple complex.",
            "lat": 9.691464630017041,
            "lon": 80.06180754990221,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n3",
            "name": "Nagadeepa",
            "desc": "Ancient island temple site.",
            "lat": 9.83899764797423,
            "lon": 79.99280348688241,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n4",
            "name": "Casuarina Beach",
            "desc": "Shallow blue karainagar beach.",
            "lat": 9.823754004454784,
            "lon": 79.95388159487786,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n5",
            "name": "Delft Island",
            "desc": "Wild horses and history.",
            "lat": 9.493168870126722,
            "lon": 79.893734660137,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n6",
            "name": "Point Pedro Lighthouse",
            "desc": "Northernmost edge of Sri Lanka.",
            "lat": 9.758523786996646,
            "lon": 80.12521115929232,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n7",
            "name": "Kandarodai Ruined Stupas",
            "desc": "Enigmatic cluster of small stupas.",
            "lat": 9.723590897548577,
            "lon": 80.00715284273316,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n8",
            "name": "Keerimalai Springs",
            "desc": "Sacred coastal bathing ponds.",
            "lat": 9.826460646439873,
            "lon": 80.05288018282506,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n9",
            "name": "Elephant Pass",
            "desc": "Strategic gateway to Jaffna.",
            "lat": 9.807957416259718,
            "lon": 80.10461806919693,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n10",
            "name": "Charty Beach",
            "desc": "Secluded sandy beach in Jaffna.",
            "lat": 9.697622762530996,
            "lon": 79.8056520628733,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n11",
            "name": "Mandaitivu Island",
            "desc": "Scenic island linked by causeway.",
            "lat": 9.779854609527565,
            "lon": 79.83207630434623,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n12",
            "name": "Karainagar Causeway",
            "desc": "Beautiful drive through the sea.",
            "lat": 9.685078119383567,
            "lon": 80.18883154323687,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n13",
            "name": "Vallipuram Temple",
            "desc": "Ancient Vishnu temple site.",
            "lat": 9.603804321599755,
            "lon": 80.0667223480307,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n14",
            "name": "Jaffna Public Library",
            "desc": "Symbol of cultural resilience.",
            "lat": 9.776667520267656,
            "lon": 79.88158237117987,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n15",
            "name": "Sangilean Thoopu",
            "desc": "Archway of the last Jaffna king.",
            "lat": 9.803201977988758,
            "lon": 79.81818561036177,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n16",
            "name": "Minister's Palace",
            "desc": "Ruins of a royal residence.",
            "lat": 9.725139983912609,
            "lon": 80.16639505781747,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n17",
            "name": "Naguleswaram Temple",
            "desc": "One of the five Ishwarams.",
            "lat": 9.467054437566919,
            "lon": 79.99955318296223,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n18",
            "name": "Dambakola Patuna",
            "desc": "Where Sangamitta landed here.",
            "lat": 9.57849814371928,
            "lon": 79.98302761339825,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n19",
            "name": "Pooneryn Fort",
            "desc": "Remote Dutch ruins in the north.",
            "lat": 9.600021105000469,
            "lon": 79.878488307916,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n20",
            "name": "Iranamadu Tank",
            "desc": "Largest reservoir in northern region.",
            "lat": 9.719657039778928,
            "lon": 80.15805947505692,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "north-western": [
        {
            "id": "n1",
            "name": "Kalpitiya Lagoon",
            "desc": "Kite surfing and dolphins.",
            "lat": 7.690166050033859,
            "lon": 79.74226641618434,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n2",
            "name": "Munneswaram Temple",
            "desc": "Ancient Chilaw Hindu complex.",
            "lat": 7.7075220544582,
            "lon": 79.685503449916,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n3",
            "name": "Wilpattu National Park",
            "desc": "Sri Lanka's largest park.",
            "lat": 7.513432610237996,
            "lon": 79.8497708119225,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n4",
            "name": "Panduwasnuwara",
            "desc": "Ancient kingdom ruins site.",
            "lat": 7.592498300939805,
            "lon": 79.80977306700088,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n5",
            "name": "Yapahuwa Rock Fortress",
            "desc": "Historic capital rock stair.",
            "lat": 7.695221988651497,
            "lon": 79.95385632804889,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n6",
            "name": "Muthurajawela Marsh",
            "desc": "Important coastal wetland.",
            "lat": 7.545538045583995,
            "lon": 79.91179440850817,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n7",
            "name": "Chilaw Beach",
            "desc": "Stretching coastal sands.",
            "lat": 7.587801072548855,
            "lon": 79.63140047972271,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n8",
            "name": "Marawila Beach",
            "desc": "Quiet resort town atmosphere.",
            "lat": 7.48637086630512,
            "lon": 80.00416165685299,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n9",
            "name": "Puttalam Lagoon",
            "desc": "Vast lagoon with salt pans.",
            "lat": 7.521106316665465,
            "lon": 79.97820501429625,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n10",
            "name": "Anamaduwa Paramakanda",
            "desc": "Temple on a sheer rock cliff.",
            "lat": 7.662026395370682,
            "lon": 79.69200839523926,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n11",
            "name": "Dambadeniya",
            "desc": "Ancient capital with hill ruins.",
            "lat": 7.454877774013977,
            "lon": 79.86973791918989,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n12",
            "name": "Kurunegala Ethagala",
            "desc": "The Elephant Rock viewpoint.",
            "lat": 7.432384976859168,
            "lon": 79.9982470953599,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n13",
            "name": "Ridi Vihara",
            "desc": "Ancient silver forest monastery.",
            "lat": 7.654296588759166,
            "lon": 80.00132046996002,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n14",
            "name": "Athugala Statue",
            "desc": "Giant Buddha on Kurunegala cliff.",
            "lat": 7.382978099101285,
            "lon": 79.95889887061644,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n15",
            "name": "Talawila Church",
            "desc": "Historic St. Anne's shrine.",
            "lat": 7.509373383770701,
            "lon": 79.68203507579821,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n16",
            "name": "Kudiramalai Point",
            "desc": "Ancient port with red sands.",
            "lat": 7.540398677950723,
            "lon": 79.93383708581675,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "n17",
            "name": "Arankele Monastery",
            "desc": "Ancient hermitage ruins.",
            "lat": 7.665978368639154,
            "lon": 79.9973077878321,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "n18",
            "name": "Nikaweratiya Tank",
            "desc": "Beautiful inland reservoir.",
            "lat": 7.406380553276322,
            "lon": 79.81831422393313,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "n19",
            "name": "Kurunegala Lake",
            "desc": "Heart of the rock city.",
            "lat": 7.738353545749397,
            "lon": 79.70941101473935,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "n20",
            "name": "Sandalankawa",
            "desc": "Center of traditional agriculture.",
            "lat": 7.391066857096228,
            "lon": 79.76839594970146,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ],
    "sabaragamuwa": [
        {
            "id": "s1",
            "name": "Adams Peak (Sri Pada)",
            "desc": "Spiritual mountain pilgrimage.",
            "lat": 6.829383075881725,
            "lon": 80.40048376669407,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s2",
            "name": "Ratnapura Gem Mines",
            "desc": "Mining for sapphires and rubies.",
            "lat": 6.780573950921193,
            "lon": 80.52457745367114,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "s3",
            "name": "Udawalawe National Park",
            "desc": "Elephant herds in the wild.",
            "lat": 6.793833941378306,
            "lon": 80.33754860747703,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s4",
            "name": "Elephant Orphanage",
            "desc": "Pinnawala sanctuary.",
            "lat": 6.77288264134436,
            "lon": 80.52206369292146,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s5",
            "name": "Belilena Caves",
            "desc": "Prehistoric archaeological site.",
            "lat": 6.771093960244237,
            "lon": 80.4818910479975,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s6",
            "name": "Saman Devalaya",
            "desc": "Grand shrine of God Saman.",
            "lat": 6.662331060353896,
            "lon": 80.57428785251918,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s7",
            "name": "Kitulgala",
            "desc": "Adventure hub for river rafting.",
            "lat": 6.8094191498178676,
            "lon": 80.27630582108011,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s8",
            "name": "Sinharaja Forest",
            "desc": "UNESCO rainforest biodiversity.",
            "lat": 6.65412669909054,
            "lon": 80.5837680656883,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s9",
            "name": "Bopath Ella",
            "desc": "Bo-leaf shaped waterfall.",
            "lat": 6.805122847215998,
            "lon": 80.41453259825192,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s10",
            "name": "Dover Cave",
            "desc": "Intriguing natural formations.",
            "lat": 6.486489771137609,
            "lon": 80.41567721504437,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s11",
            "name": "Kirindi Ella",
            "desc": "Cascading waterfall in Ratnapura.",
            "lat": 6.807956885061545,
            "lon": 80.5782483417489,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s12",
            "name": "Kuruwita Batadombalena",
            "desc": "Balangoda man habitat site.",
            "lat": 6.862632724768233,
            "lon": 80.50725086970871,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s13",
            "name": "Wavulpane Cave",
            "desc": "Cave of bats and fossils.",
            "lat": 6.547199807476879,
            "lon": 80.40707685559097,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s14",
            "name": "Maduwanwela Walawwa",
            "desc": "Archaic aristocrat mansion.",
            "lat": 6.713267795073116,
            "lon": 80.31942521885743,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s15",
            "name": "Sankapala Vihara",
            "desc": "Ancient temple in a cave.",
            "lat": 6.827670938009276,
            "lon": 80.23822796542356,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s16",
            "name": "Katugas Ella",
            "desc": "Tucked away forest waterfall.",
            "lat": 6.550070071923719,
            "lon": 80.23258653291697,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        },
        {
            "id": "s17",
            "name": "Pelmadulla",
            "desc": "Heart of the gem mining region.",
            "lat": 6.86945583128575,
            "lon": 80.254259052712,
            "img": "https://images.unsplash.com/photo-1624963145721-277432579507"
        },
        {
            "id": "s18",
            "name": "Godakawela",
            "desc": "Gateway to the southern plains.",
            "lat": 6.768071889363627,
            "lon": 80.53191124471516,
            "img": "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8"
        },
        {
            "id": "s19",
            "name": "Kolonne Valley",
            "desc": "Scenic agricultural landscape.",
            "lat": 6.5059705298920845,
            "lon": 80.52945185120504,
            "img": "https://images.unsplash.com/photo-1569670380685-4582bf29a24a"
        },
        {
            "id": "s20",
            "name": "Bulutota Pass",
            "desc": "Winding road with 10 hairpins.",
            "lat": 6.648578179487572,
            "lon": 80.42587071241891,
            "img": "https://images.unsplash.com/photo-1580794749460-76f97b7180d8"
        }
    ]
};

const fetchNearbyData = async (lat: number, lon: number) => {
    const query = `
    [out:json];
    (
      nwr["tourism"~"hotel|guest_house|resort|hostel"](around:5000, ${lat}, ${lon});
      nwr["amenity"~"restaurant|cafe|fast_food|bar"](around:5000, ${lat}, ${lon});
    );
    out center 40;
  `;
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.elements.filter((e: any) => e.tags && (e.tags.name || e.tags["name:en"]));
};

export default function ProvincialExplorer() {
    const [selectedProv, setSelectedProv] = useState<string | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [tab, setTab] = useState('hotels');
    const [showAllPlaces, setShowAllPlaces] = useState(false);

    const { data: poiData, isLoading } = useQuery({
        queryKey: ['nearbyPOIs', selectedPlace?.id],
        queryFn: () => fetchNearbyData(selectedPlace!.lat, selectedPlace!.lon),
        enabled: !!selectedPlace,
        staleTime: 5 * 60 * 1000
    });

    const handleProvinceSelect = (id: string) => {
        setSelectedProv(id);
        const provincePlaces = PLACES[id] || [];
        setSelectedPlace(provincePlaces[0] || null);
        setShowAllPlaces(false);
    };

    const handleBack = () => {
        setSelectedProv(null);
        setSelectedPlace(null);
    };

    const hotels = poiData?.filter((p: any) => p.tags.tourism === 'hotel' || p.tags.tourism === 'resort') || [];
    const restaurants = poiData?.filter((p: any) => p.tags.amenity === 'restaurant' || p.tags.amenity === 'cafe') || [];

    return (
        <div className={`section ${styles.container}`} id="map">
            <div className={styles.intro}>
                <h2 className={styles.title}>Provincial Explorer</h2>
                <p className={styles.subtitle}>Navigate Sri Lanka by province and uncover nearby luxury stays and dining via live maps data.</p>
            </div>

            <AnimatePresence mode="wait">
                {!selectedProv ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.provinceGrid}
                    >
                        {PROVINCES.map(prov => (
                            <motion.div
                                key={prov.id}
                                className={styles.provinceCard}
                                whileHover={{ y: -5 }}
                                onClick={() => handleProvinceSelect(prov.id)}
                            >
                                <img src={prov.image} alt={prov.name} className={styles.provinceImg} />
                                <div className={styles.provinceOverlay}>
                                    <h3 className={styles.provinceName}>{prov.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="places"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={styles.placesContainer}
                    >
                        <button className={styles.backBtn} onClick={handleBack}>
                            <ChevronLeft size={20} /> Back to Provinces
                        </button>

                        <div className={styles.placesLayout}>
                            <div className={styles.placesList}>
                                <h3 className={styles.title} style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                                    Famous Places in {PROVINCES.find(p => p.id === selectedProv)?.name}
                                </h3>
                                {PLACES[selectedProv]?.slice(0, showAllPlaces ? 20 : 4).map(place => (
                                    <motion.div
                                        key={place.id}
                                        className={`${styles.placeCard} ${selectedPlace?.id === place.id ? styles.placeCardActive : ''}`}
                                        onClick={() => setSelectedPlace(place)}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img src={place.img} alt={place.name} className={styles.placeImg} />
                                        <div className={styles.placeContent}>
                                            <h4 className={styles.placeTitle}>{place.name}</h4>
                                            <p className={styles.placeDesc}>{place.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {PLACES[selectedProv]?.length > 4 && !showAllPlaces && (
                                    <button
                                        className={styles.showMoreBtn}
                                        onClick={() => setShowAllPlaces(true)}
                                    >
                                        Show All (+{(PLACES[selectedProv]?.length || 0) - 4}) Places
                                    </button>
                                )}
                            </div>

                            <div className={styles.dataView}>
                                <div className={styles.dataHeader}>
                                    <h4 className={styles.dataTitle}>Near {selectedPlace?.name}</h4>
                                    <div className={styles.dataTabs}>
                                        <button
                                            className={`${styles.tab} ${tab === 'hotels' ? styles.tabActive : ''}`}
                                            onClick={() => setTab('hotels')}
                                        >
                                            <Hotel size={16} style={{ display: 'inline', marginRight: '6px' }} /> Hotels
                                        </button>
                                        <button
                                            className={`${styles.tab} ${tab === 'restaurants' ? styles.tabActive : ''}`}
                                            onClick={() => setTab('restaurants')}
                                        >
                                            <Utensils size={16} style={{ display: 'inline', marginRight: '6px' }} /> Dining
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className={styles.loadingState}>
                                        <Loader2 size={40} className="animate-spin" />
                                        <p>Fetching live map data via Overpass API...</p>
                                    </div>
                                ) : (
                                    <div className={styles.poiList}>
                                        {tab === 'hotels' && hotels.length === 0 && (
                                            <div className={styles.emptyState}>No hotels found within 5km.</div>
                                        )}
                                        {tab === 'restaurants' && restaurants.length === 0 && (
                                            <div className={styles.emptyState}>No restaurants found within 5km.</div>
                                        )}

                                        {(tab === 'hotels' ? hotels : restaurants).map((poi: any) => (
                                            <motion.div
                                                key={poi.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={styles.poiCard}
                                            >
                                                <div className={styles.poiIcon}>
                                                    {tab === 'hotels' ? <Hotel size={24} /> : <Utensils size={24} />}
                                                </div>
                                                <div className={styles.poiInfo}>
                                                    <h5>{poi.tags.name}</h5>
                                                    <p><MapPin size={12} style={{ display: 'inline' }} /> Live Coordinates ({Math.abs(selectedPlace!.lat - (poi.lat || poi.center?.lat || 0)).toFixed(3)}° offset)</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

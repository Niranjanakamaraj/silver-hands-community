import food from "@/assets/cat-food.jpg";
import craft from "@/assets/cat-craft.jpg";
import tailoring from "@/assets/cat-tailoring.jpg";
import tutoring from "@/assets/cat-tutoring.jpg";
import garden from "@/assets/cat-garden.jpg";
import music from "@/assets/cat-music.jpg";

export const categoryImages = { food, craft, tailoring, tutoring, garden, music };

export type Category = {
  name: string;
  image: string;
  count: number;
};

export const categories: Category[] = [
  { name: "Homemade Food", image: food, count: 214 },
  { name: "Tailoring", image: tailoring, count: 138 },
  { name: "Handicrafts", image: craft, count: 302 },
  { name: "Tutoring", image: tutoring, count: 176 },
  { name: "Language Training", image: tutoring, count: 84 },
  { name: "Gardening", image: garden, count: 61 },
  { name: "Childcare", image: food, count: 47 },
  { name: "Traditional Arts", image: craft, count: 119 },
  { name: "Music Lessons", image: music, count: 93 },
  { name: "Consulting", image: tutoring, count: 58 },
];

export type Service = {
  id: string;
  title: string;
  seller: string;
  sellerAge: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  unit: string;
  location: string;
  category: string;
  about: string;
  languages: string[];
  experience: string;
  delivery: string;
};

export const services: Service[] = [
  {
    id: "s1",
    title: "Home-cooked Bengali thali, delivered daily",
    seller: "Anjali Sen",
    sellerAge: "62 · Homemaker",
    image: food,
    rating: 4.9,
    reviews: 214,
    price: 180,
    unit: "per meal",
    location: "Salt Lake, Kolkata",
    category: "Homemade Food",
    about:
      "Thirty-eight years of cooking for family, now cooking for my neighbourhood. Every thali is prepared fresh each morning with seasonal vegetables from the local market.",
    languages: ["Bengali", "Hindi", "English"],
    experience: "38 years of home cooking",
    delivery: "Same day, before 1 PM",
  },
  {
    id: "s2",
    title: "Bespoke blouse and saree fall stitching",
    seller: "Meera Iyer",
    sellerAge: "58 · Tailor",
    image: tailoring,
    rating: 4.8,
    reviews: 167,
    price: 450,
    unit: "per piece",
    location: "T. Nagar, Chennai",
    category: "Tailoring",
    about:
      "I stitched for a boutique for twenty-two years. Precise measurements, hand-finished seams, and a fitting session included with every order.",
    languages: ["Tamil", "English"],
    experience: "22 years in couture tailoring",
    delivery: "4–6 days",
  },
  {
    id: "s3",
    title: "Retired professor: Mathematics tutoring, Class 8–12",
    seller: "Dr. R. Krishnan",
    sellerAge: "68 · Educator",
    image: tutoring,
    rating: 5.0,
    reviews: 92,
    price: 700,
    unit: "per hour",
    location: "Online & Bengaluru",
    category: "Tutoring",
    about:
      "Forty years teaching mathematics at university level. Patient, structured sessions with weekly progress notes for parents.",
    languages: ["English", "Kannada", "Hindi"],
    experience: "40 years teaching",
    delivery: "Flexible weekday evenings",
  },
  {
    id: "s4",
    title: "Classical sitar lessons for beginners",
    seller: "Vikram Joshi",
    sellerAge: "71 · Musician",
    image: music,
    rating: 4.9,
    reviews: 58,
    price: 900,
    unit: "per session",
    location: "Pune",
    category: "Music Lessons",
    about:
      "Trained in the Maihar gharana. Lessons begin with posture and breath, then move gently into raag structure. Instrument provided for the first month.",
    languages: ["Marathi", "Hindi", "English"],
    experience: "45 years performing",
    delivery: "Twice weekly, 60 minutes",
  },
  {
    id: "s5",
    title: "Balcony kitchen-garden setup and monthly care",
    seller: "Suresh Nair",
    sellerAge: "65 · Gardener",
    image: garden,
    rating: 4.7,
    reviews: 41,
    price: 1200,
    unit: "per visit",
    location: "Kochi",
    category: "Gardening",
    about:
      "I design compact herb and vegetable gardens for apartments, then return monthly to prune, repot and troubleshoot.",
    languages: ["Malayalam", "English"],
    experience: "30 years of horticulture",
    delivery: "Visit within 3 days",
  },
  {
    id: "s6",
    title: "Conversational Spanish with a retired diplomat",
    seller: "Elena Fernandes",
    sellerAge: "66 · Language coach",
    image: tutoring,
    rating: 4.9,
    reviews: 73,
    price: 850,
    unit: "per hour",
    location: "Online",
    category: "Language Training",
    about:
      "Twelve years posted across Latin America. Sessions are pure conversation with gentle correction and a weekly vocabulary sheet.",
    languages: ["Spanish", "English", "Konkani"],
    experience: "12 years abroad, 8 years teaching",
    delivery: "Flexible scheduling",
  },
];

export type Product = {
  id: string;
  name: string;
  seller: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  category: string;
  stock: number;
  description: string;
  delivery: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Handwoven cotton throw, olive fringe",
    seller: "Kamala Devi",
    image: craft,
    rating: 4.9,
    reviews: 128,
    price: 2400,
    category: "Handicrafts",
    stock: 6,
    description:
      "Woven on a pit loom over nine days, in undyed cotton with a hand-knotted marigold fringe. Softens beautifully with every wash.",
    delivery: "Ships in 3 days · Free above ₹1,500",
  },
  {
    id: "p2",
    name: "Small-batch mango & jaggery preserve",
    seller: "Anjali Sen",
    image: food,
    rating: 4.8,
    reviews: 86,
    price: 420,
    category: "Homemade Food",
    stock: 24,
    description:
      "Slow-cooked with Himsagar mangoes and organic jaggery. No preservatives — refrigerate after opening and finish within a month.",
    delivery: "Ships in 2 days",
  },
  {
    id: "p3",
    name: "Hand-embroidered linen cushion cover",
    seller: "Meera Iyer",
    image: craft,
    rating: 4.7,
    reviews: 54,
    price: 1150,
    category: "Traditional Arts",
    stock: 11,
    description:
      "Kantha stitch on stonewashed linen, finished with a concealed placket. Each piece is slightly different by hand.",
    delivery: "Ships in 4 days",
  },
  {
    id: "p4",
    name: "Terracotta herb planter set of three",
    seller: "Suresh Nair",
    image: garden,
    rating: 4.6,
    reviews: 37,
    price: 980,
    category: "Gardening",
    stock: 15,
    description:
      "Wheel-thrown terracotta with drainage saucers, packed with tulsi, mint and curry-leaf saplings ready to grow.",
    delivery: "Ships in 5 days",
  },
];

export const reviews = [
  {
    name: "Priya M.",
    rating: 5,
    text: "Genuinely the warmest experience I've had on any marketplace. Everything arrived early and beautifully packed.",
    date: "2 weeks ago",
  },
  {
    name: "Arjun T.",
    rating: 5,
    text: "Communication was clear and patient throughout. I've already booked again for next month.",
    date: "1 month ago",
  },
  {
    name: "Nisha R.",
    rating: 4,
    text: "Lovely craftsmanship and fair pricing. Delivery took a day longer than expected, which was fine.",
    date: "2 months ago",
  },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

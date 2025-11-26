// src/pages/Homepage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/herosection";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import CoachCard from "../components/CoachCard";
import AwardPlayercard from "../components/AwardPlayercard";

// footer / icon imports
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { Facebook } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Vision/Mission/Goals modal state
  const [selectedVision, setSelectedVision] = useState(null);

  
  // Contact form state + popup
  const [contactForm, setContactForm] = useState({
    first: "",
    last: "",
    email: "",
    message: "",
  });
  const [showContactPopup, setShowContactPopup] = useState(false);

  // ensure smooth-scroll behavior on mount
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  // ---- GALLERY STATES ----
const [modalOpen, setModalOpen] = useState(false);
const [modalImage, setModalImage] = useState(null);
const [currentIndex, setCurrentIndex] = useState(0);

const [activeFilter, setActiveFilter] = useState("All");
const [visibleCount, setVisibleCount] = useState(12);

// Gallery Images
const galleryImages = [
  { url: "/images/GLphotos/mpl1.jpeg", category: "MPL", title: "MPL Capture 1" },
  { url: "/images/GLphotos/mpl2.jpeg", category: "MPL", title: "MPL Capture 2" },
  { url: "/images/GLphotos/mpl3.jpeg", category: "MPL", title: "MPL Capture 3" },
  { url: "/images/GLphotos/mpl4.jpeg", category: "MPL", title: "MPL Capture 4" },

  { url: "/images/women1.jpeg", category: "Women", title: "Women Cricket 1" },
  { url: "/images/women2.jpeg", category: "Women", title: "Women Cricket 2" },
  { url: "/images/women3.jpeg", category: "Women Cricket 3" },
  { url: "/images/women7.jpeg", category: "Women Cricket 4" },

  { url: "/images/fitness.jpeg", category: "Trophy", title: "Fitness Warmup" },
  { url: "/images/GLphotos/trophy3.jpeg", category: "Trophy", title: "Trophy Moment" },
  { url: "/images/team.jpeg", category: "Trophy", title: "Team Unity" },
  { url: "/images/GLphotos/trophy2.jpeg", category: "Trophy", title: "Trophy Lineup" },

  { url: "/images/camp1.jpeg", category: "Camp", title: "Camp Day 1" },
  { url: "/images/camp2.jpeg", category: "Camp", title: "Camp Day 2" },
  { url: "/images/camp3.jpeg", category: "Camp", title: "Camp Day 3" },
  { url: "/images/players/player7.jpeg", category: "Camp", title: "Junior Player" },
];

// Filtering Logic
const filteredImages =
  activeFilter === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

// Modal functions
const openImage = (img, index) => {
  setModalImage(img);
  setCurrentIndex(index);
  setModalOpen(true);
};

const closeModal = () => setModalOpen(false);

// ESC key support
useEffect(() => {
  const esc = (e) => e.key === "Escape" && closeModal();
  window.addEventListener("keydown", esc);
  return () => window.removeEventListener("keydown", esc);
}, []);
//

// ---------- Programs & Facilities: states & handlers ----------
const [programModalOpen, setProgramModalOpen] = useState(false);
const [activeProgram, setActiveProgram] = useState(null); // "ageWise","ground","night","residential","competitions","seasonal"
const [activeInner, setActiveInner] = useState(null); // e.g. "beginner","timings","night-gallery", etc.

// scroll to CTA (contact-section)
const scrollToCTA = () => {
  const el = document.getElementById("contact-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// keyboard & inner-card arrow nav while modal open
useEffect(() => {
  const onKey = (e) => {
    if (!programModalOpen) return;
    if (e.key === "Escape") {
      setProgramModalOpen(false);
      setActiveProgram(null);
      setActiveInner(null);
    }
    const orderMap = {
      ageWise: ["beginner", "intermediate", "advanced"],
      residential: ["accommodation", "food", "safety"],
      competitions: ["weekly", "premier", "awards"],
      ground: ["timings", "facilities"],
    };
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const keys = orderMap[activeProgram] || [];
      if (keys.length) {
        const idx = Math.max(0, keys.indexOf(activeInner ?? keys[0]));
        const nextIdx = e.key === "ArrowLeft" ? Math.max(0, idx - 1) : Math.min(keys.length - 1, idx + 1);
        setActiveInner(keys[nextIdx]);
      }
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [programModalOpen, activeProgram, activeInner]);

  // Coaches (dynamic; can add more later)
 const coaches = [
    {
      name: "Sumeet Chavan",
      title: "Senior Coach • Former Maharashtra Ranji Player",
      instagram:"https://www.instagram.com/sumeetchavan9?igsh=MW5tczBocGl0d3hwNw==",
      Facebook:"",
      description: (
  <div className="space-y-3 text-gray-800 leading-relaxed">
    <p className="text-2xl font-bold text-[#0f2547]">🔥 *Highlights*</p>

    <ul className="list-disc text-l pl-5 space-y-1 font-medium">
      <li>Co-Owner — Sumeet Sports Cricket Academy, Sangli</li>
      <li>Professional Cricketer • Maharashtra State Player</li>
      <li>U-16 Maharashtra Team Selector</li>
      <li>Syed Mushtaq Ali & Vijay Hazare Trophy Cricketer</li>
      <li>Coaching Experience: <b>10+ Years</b></li>
    </ul>

    <p className="italic text-gray-700">
      “Dedicated to shaping cricketers who compete with skill, discipline, and character.”
    </p>

    <h4 className="font-semibold text-lg mt-4">📘 About Sumeet Sir</h4>

    <p>
      Sumeet Chavan is a respected cricketer, coach, and selector from Sangli.
      As co-owner of Sumeet Sports Cricket Academy at Appasaheb Birnale Public School,
      he mentors young and emerging players with a structured, high-discipline training style.
    </p>

    <p>
      He represented Maharashtra across all major age categories and played in India’s
      premier domestic tournaments — the <b>Syed Mushtaq Ali Trophy</b> and the
      <b> Vijay Hazare Trophy</b>.
    </p>

    <p>
      Sumeet currently serves as the <b>U-16 Maharashtra Selector</b> and previously spent
      two years as the U-14 selector. His deep technical knowledge and talent-identification
      skills make him one of Sangli’s strongest cricketing mentors.
    </p>
  </div>
),
      image: "/images/coaches/sumeetsir.jpg",
    },

    {
      name: "Prashaant Kore",
      title: "Head Coach • Former Maharashtra Ranji Player",
      instagram:"https://www.instagram.com/prashaant_kore",
      description: (
  <div className="space-y-3 text-gray-800 leading-relaxed">
    <p className="text-xl font-bold text-[#0f2547]">🔥 *Highlights*</p>

    <ul className="list-disc text-l pl-5 space-y-1 font-medium">
      <li>Co-Owner & Head Coach — Sumeet Sports Cricket Academy</li>
      <li>Professional Cricketer • Maharashtra Representative</li>
      <li>Played Vijay Hazare Trophy</li>
      <li>Coaching Experience: <b>7+ Years</b></li>
    </ul>

    <p className="italic text-gray-700">
      “Building the next generation of cricketers in Sangli, one session at a time.”
    </p>

    <h4 className="font-semibold text-lg mt-4">📘 About Prashaant Sir</h4>

    <p>
      Prashaant Kore is a professional cricketer and a passionate coach known for
      his high-intensity training style and focus on discipline, technique, and match temperament.
    </p>

    <p>
      He has represented Maharashtra in multiple age-group levels and competed in the
      prestigious <b>Vijay Hazare Trophy</b> — making him one of the few players from
      Sangli to reach this stage.
    </p>

    <p>
      With 7+ years of coaching experience, Prashaant blends professional experience with
      modern cricketing methods to help players grow technically, mentally, and physically.
    </p>
  </div>
  
),
            
            image: "/images/coaches/prashaantsir.jpg",
            
          },
        ];

   

  // modal details map (complete set so modal never shows undefined)
  const detailsMap = {
    // Programs
    "Junior Coaching Program": [
      "Training designed for ages 6–12.",
      "Focus on fundamentals: batting, bowling, fielding.",
      "Fun drills to build engagement and discipline.",
    ],
    "Spacious Ground with Advanced Functionalities": [
      "Tactical match-scenario coaching.",
      "Video analysis & technique refinement.",
      "Personalised sessions for state-level aspirants.",
    ],
    "Fitness & Conditioning": [
      "Strength & endurance routines for cricketers.",
      "Agility & speed training with progress tracking.",
      "Weekly assessments and tailored plans.",
    ],
    "Tournaments & Exposure": [
      "Regular practice matches and tournaments.",
      "Selection trial preparation & exposure.",
      "Performance feedback & pathway guidance.",
    ],
    "Women’s Cricket Training": [
      "Skill-specific training & mentorship.",
      "Strength conditioning for women athletes.",
      "Tournament & trial support.",
    ],
    "Seasonal Camps": [
      "Intensive camps during holidays.",
      "Guest coaches & focused skill-building.",
      "Match practice and fitness routines.",
    ],


    // Why Choose Us / Highlights
    "🏆 Professional Coaching": [
      "Coaching from ex-professionals and certified trainers.",
      "Individual attention and progress tracking.",
    ],
    "🏟️ Modern Facilities": [
      "Turf & mat wickets, practice nets, and fitness area.",
      "Performance analysis tools for continuous improvement.",
    ],
    "🤝 Growth Opportunities": [
      "Tournament exposure and selection pathways.",
      "Support for trials & higher-level placements.",
    ],
    "Residential Facilities": [
      "Safe, hygienic hostel with monitored routines.",
      "Nutritious meals and supervised training schedules.",
    ],
    // Generic fallback
    default: ["Detailed information coming soon. Please contact the academy for more info."],
  };

  // small motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5 },
    }),
  };

  // drag logic for carousel: detect end direction
  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset < -50) {
      goNext();
    } else if (offset > 50) {
      goPrev();
    }
  };

  // Contact submit (show popup)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate backend call later
    setShowContactPopup(true);
    setContactForm({ first: "", last: "", email: "", message: "" });
    // auto hide after 4s
    setTimeout(() => setShowContactPopup(false), 4000);
  };

  // Vision / Mission / Goals content
  const vision =
    "To become Sangli’s leading cricket development hub that nurtures talented athletes with strong values, advanced skills, and a champion mindset.";
  const missionBullets = [
    "Provide high-quality, structured cricket coaching supported by modern training methods and certified coaches.",
    "Create a positive, disciplined, and growth-oriented sporting environment for players of all ages.",
    "Develop athletes holistically — physically, technically, mentally, and ethically.",
  ];
  const goalsShort = [
    "Strengthen basic & advanced skill development programs.",
    "Organize regular practice matches and fitness sessions.",
    "Build strong parent–coach communication.",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section id="home-section">
        <HeroSection />
      </section>

      {/* ABOUT */}
      <section id="about-section" className="relative -mt-12 md:-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 -mt-8">
            <div className="md:flex md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2547] mb-4">Enhancement Beyond Limits</h2>
                <p className="text-gray-700 mb-6">
                  Under the expert guidance of former Maharashtra Ranji players <strong>Sumeet Chavan</strong> and <strong>Prashaant Kore</strong>, Sumeet Sports Cricket Academy shapes the next generation of cricketers with focused training, discipline, and match exposure.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <a className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition" href="#about-section">
                    Learn More
                  </a>
                  <a className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50 transition" href="#contact-section">
                    Contact Us
                  </a>
                </div>
              </div>

              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/images/team.jpeg" className="w-full h-64 object-cover" alt="academy team" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats-section" className="py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 ">
          {[
            { value: "150+", label: "Active Players" },
            { value: "20+", label: "Tournament Hosted" },
            { value: "8+", label: "Certified Coaches" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="bg-sky-100 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
              <div className="text-3xl font-bold text-[#0f1724]">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
{/* ABOUT US  SECTION  */}
<section id="about-extra" className="py-12 bg-gradient-to-r from-pink-200 to-sky-200">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2547] mb-4">
      About Us
    </h2>

    

    <p className="text-gray-900 leading-relaxed text-lg md:text-xl">
      At <b>Sumeet Sports Cricket Academy</b>, We Believe Every Athlete Deserves A 
      Structured Path To Unlock Their Highest Potential. With The Guidance 
      Of Former Maharashtra Ranji Players And Qualified Professional Coaches, 
      We Ensure That Each Player Receives Modern Technical Training, Cricket 
      Intelligence Development, Disciplined Conditioning Routines, And 
      Real Match Exposure.  
      <br /><br />
      Our Academy Focuses On Shaping Players Not Just As Athletes, But As 
      Confident, Responsible, And Mentally Strong Individuals — Prepared 
      For District, State, And National-Level Selections.
      <br /> <br />
      The academy frequently arranges practice matches and tournaments,
       giving players real-time match experience and building confidence. 
      These initiatives ensure players are well-prepared for higher-level challenges
    </p>
    </div>
    </section>
      {/* COACHES */}
      <section id="coaches-section" className="py-12 bg-gradient-to-r from-pink-200 to-sky-200">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-[#0f2547]">Expert Coaches</h3>

          <div className="flex flex-col gap-12">
            {coaches.map((c, i) => (
              <CoachCard key={i} name={c.name} title={c.title} description={c.description} image={c.image} instagram={c.instagram} />
            ))}
          </div>
        </div>
      </section>
      {/* PROUD PLAYERS SECTION */}
  <section id="players-section" className="py-20 bg-gradient-to-r from-pink-200 to-sky-200">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-5xl font-extrabold text-[#0f2547] text-center mb-12">
        Our Proud Players
      </h2>

      {/* ADMIN UPLOAD BUTTON */}
      {user?.role === "admin" && (
        <div className="text-center mb-8">
          <Link
            to="/upload?type=players"
            className="px-6 py-2 bg-gradient-to-r from-sky-100 to-pink-100 text-white rounded-full font-semibold shadow-md hover:scale-105 transition"
          >
            Add New Player
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Nikhil Kadam", tournament: "Maharashtra Premier League 2024", image: "/images/players/player1.jpg" },
          { name: "Bhakti Mirajkar", tournament: "Maharashtra U-19, U-23 & Open Team", image: "/images/players/player2.jpg" },
          { name: "Soham Chavan", tournament: "Maharashtra U-14 Team", image: "/images/players/player3.jpeg" },
          { name: "Aneesh Joshi", tournament: "Maharashtra U-19 & U-16 Team", image: "/images/players/player4.jpg" },
          { name: "Aryan Desai", tournament: "U-19 Maharashtra Camp", image: "/images/players/player5.jpeg" },
          { name: "Soham Sargar", tournament: "U-16 Maharashtra Camp", image: "/images/players/player7.jpeg" },
          { name: "Nidhi Shambhawani", tournament: "U-19 Women's Maharashtra Camp", image: "/images/women3.jpeg" },
          { name: "Madhushree Uplavikar", tournament: "U-15 Women's Maharashtra Camp", image: "/images/women7.jpeg" },

        ].map((p, i) => (
    
          <AwardPlayercard
            key={i}
            name={p.name}
            tournament={p.tournament}
            image={p.image}
            isAdmin={user?.role === "admin"}
          />
        ))}
      </div>
    </div>
  </section>

     
{/* VISION / MISSION / GOALS – NEW SECTION */}
<section id="vision-section" className="py-20 bg-gradient-to-r from-pink-200 to-sky-200">
  <div className="max-w-5xl mx-auto px-6">
    

    {/* VISION */}
    <div
      onClick={() =>
        setSelectedVision({
          title: "Vision",
          paragraphs: [
            "To become Sangli’s leading cricket development hub that nurtures talented athletes with strong values, advanced skills, and a champion mindset—empowering them to excel at district, state, national, and international levels.",
            "Our vision is to nurture world-class cricketers by providing elite coaching and facilities. We aim to instill discipline, teamwork, and a relentless winning mindset. We strive to be the premier launchpad for future international stars. "
          ],
        })
      }
      className="bg-gradient-to-r from-pink-100 to-sky-100 rounded-3xl p-8 shadow-xl cursor-pointer hover:scale-[1.02] transition mb-10"
    >
      <h3 className="text-4xl font-bold text-[#0f2547] mb-3">🌟 Vision</h3>
      <p className="text-gray-800 leading-relaxed text-1xl">
        To Become Sangli’s Leading Cricket Development Hub That Nurtures Talented Athletes…
      </p>
      <p className="text-gray-900 leading-relaxed text-1xl mt-2">Our Vision Is To Nurture World-Class Cricketers By Providing Elite Coaching And Facilities. We Aim To Instill Discipline, Teamwork, And A Relentless Winning Mindset. We Strive To Be The Premier Launchpad For Future International Stars. "
      </p>
      
    </div>

    {/* MISSION */}
    <div
      onClick={() =>
        setSelectedVision({
          title: "Mission",
          paragraphs: [
            "To provide high-quality, structured cricket coaching supported by modern training methods, technology, and certified coaches.",
            "To create a positive, disciplined, and growth-oriented sporting environment for players of all age groups.",
            "To develop athletes holistically—physically, technically, mentally, and ethically.",
            "To promote cricket culture in Sangli by identifying grassroots talent and giving them opportunities to compete and shine."
          ],
        })
      }
      className="bg-gradient-to-r from-sky-100 to-pink-100 rounded-3xl p-8 shadow-xl cursor-pointer hover:scale-[1.02] transition mb-10"
    >
      <h3 className="text-4xl font-bold text-[#0f2547] mb-3">🎯 Mission</h3>

      <ul className="list-disc pl-5 text-gray-800 space-y-2">
        <li>High-quality, structured cricket coaching with technology.</li>
        <li>Positive & disciplined sporting environment.</li>
        <li>Holistic player development: physical + mental + ethical.</li>
        <li>Grassroots talent identification & exposure.</li>
      </ul>

      
    </div>

    {/* GOALS */}
    <div
      onClick={() =>
        setSelectedVision({
          title: "Goals",
          paragraphs: [
            "• Strengthen basic & advanced skill development programs.",
            "• Organize regular matches, fitness sessions, and evaluations.",
            "• Build strong parent–coach communication.",
            "",
            "• Produce players who qualify for district & state selections.",
            "• Host inter-academy tournaments to improve competition.",
            "• Upgrade equipment & training infrastructure.",
            "",
            "• Establish academy as a cricket excellence center.",
            "• Create IPL/state-level pathways for athletes.",
            "• Expand into multiple training centers."
          ],
        })
      }
      className="bg-gradient-to-r from-pink-100 to-sky-200 rounded-3xl p-8 shadow-xl cursor-pointer hover:scale-[1.02] transition"
    >
      <h3 className="text-4xl font-bold text-[#0f2547] mb-3">🏆 Goals</h3>

      <p className="text-gray-800 mb-2 font-semibold">Short-Term Goals</p>
      <ul className="list-disc pl-5 text-gray-800 space-y-1 mb-4">
        <li>Skill development programs</li>
        <li>Fitness sessions & performance evaluation</li>
        <li>Parent–coach communication</li>
      </ul>

      <p className="text-gray-800 mb-2 font-semibold">Mid-Term Goals</p>
      <ul className="list-disc pl-5 text-gray-800 space-y-1 mb-4">
        <li>State-level selections</li>
        <li>Inter-academy tournaments</li>
        <li>Upgrade infrastructure</li>
      </ul>

      <p className="text-gray-800 mb-2 font-semibold">Long-Term Goals</p>
      <ul className="list-disc pl-5 text-gray-800 space-y-1">
        <li>Become a cricket excellence center</li>
        <li>Pathway for professional cricket / IPL</li>
        <li>Expand into multiple centers</li>
      </ul>

      
    </div>
  </div>
</section>
{/* END NEW VMG SECTION */}
      
          
{/* PROGRAMS & FACILITIES */}
<section id="programs-section" className="py-12 bg-gradient-to-r from-pink-200 to-sky-200">
  <div className="max-w-6xl mx-auto px-6">
    <h3 className="text-5xl font-bold text-sky-900 text-center mb-12">Programs & Facilities</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { key: "ageWise", title: "Age Wise Coaching", desc: "Age-specific training for young talent.", img: "/images/juniors.jpeg" },
        { key: "ground", title: "Spacious Ground For Booking", desc: "Available for matches & practice.", img: "/images/advanced.jpeg" },
        { key: "night", title: "Night Practice Sessions", desc: "Under Flood Lights", img: "/images/GLphotos/trophy3.jpeg" },
        { key: "residential", title: "Residential Facilities", desc: "Comfortable stay & nutrition for outstation students.", img: "/images/team.jpeg" },
        { key: "competitions", title: "Competitions & Exposure", desc: "Real match exposure & tournaments.", img: "/images/tournament.jpeg" },
        { key: "seasonal", title: "Seasonal Camps", desc: "Intensive holiday camps with guest coaches.", img: "/images/camps.jpeg" },
      ].map((p) => (
        <motion.div
          key={p.key}
          onClick={() => { setActiveProgram(p.key); setProgramModalOpen(true); setActiveInner(null); }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03, y: -6 }}
          transition={{ duration: 0.28 }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setActiveProgram(p.key); setProgramModalOpen(true); setActiveInner(null); } }}
        >
          <div className="w-full h-48 overflow-hidden rounded-t-3xl">
            <motion.img src={p.img} className="w-full h-full object-cover" whileHover={{ scale: 1.12 }} transition={{ duration: 0.5 }} alt={p.title} />
          </div>

          <div className="p-5 text-center">
            <h4 className="font-bold text-lg text-[#0f1724]">{p.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Program Modal (centered on desktop, fullscreen-ish on mobile) */}
  <AnimatePresence>
    {programModalOpen && activeProgram && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => { setProgramModalOpen(false); setActiveProgram(null); setActiveInner(null); }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* modal content container:
            - on small screens full width/height
            - on sm+ screens centered box
        */}
        <motion.div
          className="relative z-10 w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-4xl bg-white rounded-2xl overflow-auto"
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* header */}
          <div className="flex items-start justify-between p-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-[#0f2547]">
                {
                  {
                    ageWise: "Age Wise Coaching",
                    ground: "Ground Booking Facility",
                    night: "Night Practice Sessions",
                    residential: "Residential Facilities ",
                    competitions: "Competitions & Exposure",
                    seasonal: "Seasonal Camps",
                  }[activeProgram]
                }
              </h3>
              <p className="text-gray-700 mt-1">
                {
                  {
                    ageWise: "Structured coaching by age and level. Click a level to see details.",
                    ground: "Book our ground for practice, matches and tournaments.",
                    night: "Evening training under professional flood lights.",
                    residential: "Accommodation and food facilities for outstation students.",
                    competitions: "Match practice, tournaments and awards for players.",
                    seasonal: "Short-term intensive camps with guest coaches.",
                  }[activeProgram]
                }
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setProgramModalOpen(false); setActiveProgram(null); setActiveInner(null); }}
                className="px-3 py-2 bg-white/90 rounded-full shadow hover:bg-white text-gray-900"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* modal body */}
          <div className="p-6">
            {/* ---------- AGE WISE: 3 centered mini-cards (expand downward) ---------- */}
            {activeProgram === "ageWise" && (
              <div>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
                  {/* Beginner */}
                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveInner(prev => prev === "beginner" ? null : "beginner")}
                      onKeyDown={(e) => { if (e.key === "Enter") setActiveInner(prev => prev === "beginner" ? null : "beginner"); }}
                      className={`p-4 flex flex-col items-start gap-3 cursor-pointer ${activeInner === "beginner" ? "ring-2 ring-sky-300" : ""}`}
                    >
                      <img src="/images/juniors.jpeg" alt="Beginner 6-10" className="w-full h-28 object-cover rounded-md mb-1" />
                      <h4 className="font-semibold text-lg">Beginner Batch (6 – 10 Years)</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-1">
                        <li>Introduction to cricket fundamentals and basic skill development</li>
                        <li>Age-appropriate exercises to build athletic ability, coordination and discipline</li>
                        <li>Practice sessions conducted using soft leather ball for safety</li>
                        <li>Regular practice matches to build confidence and game awareness</li>
                      </ul>
                    </div>

                    <AnimatePresence initial={false}>
                      {activeInner === "beginner" && (
                        <motion.div
                          key="beginner-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="px-4 pb-4 pt-0 bg-gray-50 text-sm text-gray-700"
                        >
                          <div className="py-3">
                            <p className="mb-2"><b>Beginner plan:</b> Twice weekly sessions, equipment guidance, parent progress updates.</p>
                            <p className="mb-2">Ideal for first-time players learning fundamentals through play-based drills.</p>
                            <div className="text-right">
                              <button className="px-3 py-1 rounded-full bg-[#0f2547] text-white text-sm">Know More</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Intermediate */}
                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveInner(prev => prev === "intermediate" ? null : "intermediate")}
                      onKeyDown={(e) => { if (e.key === "Enter") setActiveInner(prev => prev === "intermediate" ? null : "intermediate"); }}
                      className={`p-4 flex flex-col items-start gap-3 cursor-pointer ${activeInner === "intermediate" ? "ring-2 ring-sky-300" : ""}`}
                    >
                      <img src="/images/practice_nets.jpeg" alt="Intermediate 10-14" className="w-full h-28 object-cover rounded-md mb-1" />
                      <h4 className="font-semibold text-lg">Intermediate Batch (10 – 14 Years)</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-1">
                        <li>Advanced skill development in batting, bowling and fielding</li>
                        <li>Dedicated net practice sessions with certified coaches</li>
                        <li>Training and matches conducted using leather ball</li>
                        <li>Students participate in external tournaments to gain competitive exposure</li>
                      </ul>
                    </div>

                    <AnimatePresence initial={false}>
                      {activeInner === "intermediate" && (
                        <motion.div
                          key="intermediate-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="px-4 pb-4 pt-0 bg-gray-50 text-sm text-gray-700"
                        >
                          <div className="py-3">
                            <p className="mb-2"><b>Intermediate plan:</b> Three sessions weekly, match simulations, strength basics and diet guidance.</p>
                            <p className="mb-2">Focus on polishing technique and introducing competitive strategies.</p>
                            <div className="text-right">
                              <button className="px-3 py-1 rounded-full bg-[#0f2547] text-white text-sm">Know More</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Advanced */}
                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveInner(prev => prev === "advanced" ? null : "advanced")}
                      onKeyDown={(e) => { if (e.key === "Enter") setActiveInner(prev => prev === "advanced" ? null : "advanced"); }}
                      className={`p-4 flex flex-col items-start gap-3 cursor-pointer ${activeInner === "advanced" ? "ring-2 ring-sky-300" : ""}`}
                    >
                      <img src="/images/advanced.jpeg" alt="Advanced 15+" className="w-full h-28 object-cover rounded-md mb-1" />
                      <h4 className="font-semibold text-lg">Advance Batch (15 Years & Above)</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-1">
                        <li>High-performance training program focused on fitness and professional techniques</li>
                        <li>Full-time leather-ball matches and competitive tournaments</li>
                        <li>Match simulations, tactical awareness and mental conditioning for higher-level cricket</li>
                      </ul>
                    </div>

                    <AnimatePresence initial={false}>
                      {activeInner === "advanced" && (
                        <motion.div
                          key="advanced-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="px-4 pb-4 pt-0 bg-gray-50 text-sm text-gray-700"
                        >
                          <div className="py-3">
                            <p className="mb-2"><b>Advanced plan:</b> Daily focused training, personalized video analysis, tournament prep & trial support.</p>
                            <p className="mb-2">Designed for serious aspirants preparing for district/state selection.</p>
                            <div className="text-right">
                              <button className="px-3 py-1 rounded-full bg-[#0f2547] text-white text-sm">Know More</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            )}

            {/* ---------- GROUND BOOKING: two inner cards (timings + facilities) ---------- */}
            {activeProgram === "ground" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <h4 className="font-semibold text-lg mb-2">Timings</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Saturday — Half Day</li>
                    <li>Sunday — Full Day</li>
                    <li>Weekdays — On request (contact academy)</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <button className="px-3 py-1 rounded-full bg-[#0f2547] text-white text-sm">Book Now</button>
                  </div>
                </motion.div>

                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <h4 className="font-semibold text-lg mb-2">Facilities Available</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Leather-ball & Tennis-ball pitches</li>
                    <li>Practice nets & wicket covers</li>
                    <li>Change rooms & basic first-aid</li>
                    <li>Scorers & match setup assistance (on request)</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <button className="px-3 py-1 rounded-full bg-[#0f2547] text-white text-sm">Enquire</button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ---------- NIGHT PRACTICE: one inner card with images + text ---------- */}
            {activeProgram === "night" && (
              <div className="space-y-4">
                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <h4 className="font-semibold text-lg mb-2">Night Practice (Under Flood Lights)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Evening sessions from 6:00 PM to 8:00 PM. To support students with busy school schedules, our academy runs supervised night practices under high-quality LED floodlights — ideal for skill refinement and match practice.
                  </p>

                  {/* small image grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "/images/night1.jpeg",
                      "/images/night2.jpeg",
                      "/images/night3.jpeg",
                      "/images/GLphotos/trophy3.jpeg",
                      "/images/players/player7.jpeg",
                    ].map((src, i) => (
                      <img key={i} src={src} alt={`night-${i}`} className="w-full h-24 object-cover rounded-md" />
                    ))}
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <p>First-ever night cricket practice facility in Sangli with professional lighting, coach supervision and safety measures. Perfect for school-goers and working parents.</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ---------- RESIDENTIAL: three inner cards ---------- */}
            {activeProgram === "residential" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <img src="/images/hostel.jpeg" alt="accommodation" className="w-full h-28 object-cover rounded-md mb-3" />
                  <h4 className="font-semibold text-lg">Accommodation</h4>
                  <p className="text-sm text-gray-700 mt-2">Tie-up with Shri Babanrao Birnale Boys Hostel for safe, comfortable stay near the training grounds. Supervised environment suitable for athletes.</p>
                </motion.div>

                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <img src="/images/food.jpeg" alt="food" className="w-full h-28 object-cover rounded-md mb-3" />
                  <h4 className="font-semibold text-lg">Food</h4>
                  <p className="text-sm text-gray-700 mt-2">Nutritious, balanced meals prepared daily. Special sport-focused diets available on request.</p>
                </motion.div>

                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <img src="/images/safety.jpeg" alt="safety" className="w-full h-28 object-cover rounded-md mb-3" />
                  <h4 className="font-semibold text-lg">Safety</h4>
                  <p className="text-sm text-gray-700 mt-2">Monitored entry/exit, CCTV coverage and hostel wardens provide a safe environment for all trainees.</p>
                </motion.div>
              </div>
            )}

            {/* ---------- COMPETITIONS: 3-card layout ---------- */}
            {activeProgram === "competitions" && (
              <div>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                    <h4 className="font-semibold text-lg">Weekly Matches</h4>
                    <p className="text-sm text-gray-700 mt-2">Weekend practice matches for all age groups to build match temperament and real-game fitness.</p>
                  </motion.div>

                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                    <h4 className="font-semibold text-lg">Premier League</h4>
                    <p className="text-sm text-gray-700 mt-2">Annual U-13 & U-16 Sumeet Sports Premier League Tournament for academy players — league format and knockout stages.</p>
                  </motion.div>

                  <motion.div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                    <h4 className="font-semibold text-lg">Awards & Recognition</h4>
                    <p className="text-sm text-gray-700 mt-2">Player awards, best batsman/bowler prizes and recognition ceremonies to encourage talent development.</p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* ---------- SEASONAL CAMPS (fallback simple content) ---------- */}
            {activeProgram === "seasonal" && (
              <div>
                <motion.div className="bg-white rounded-xl border shadow-sm overflow-hidden p-4">
                  <h4 className="font-semibold text-lg">Seasonal Camps</h4>
                  <p className="text-sm text-gray-700 mt-2">Intensive holiday camps with guest coaches, match practice, and fitness routines to help players level up quickly during holidays.</p>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>
     
        
     {/* residential and expo */}
      <div className="max-w-6xl mx-auto px-6 mt-12 space-y-10">

  {/* RESIDENTIAL FACILITIES */}
  <motion.div
    onClick={() =>
      setSelectedCard({
        title: "Residential Facilities",
        img: "/images/hostel.jpeg",
        desc: `The Academy Ensures Not Only Cricket Training But Also Comfortable Living Arrangements.
        Well-Maintained Residential And Food Facilities Are Provided At Appasaheb Birnale Public School Boys Hostel, Sangli.
        This Ensures A Disciplined Environment And Holistic Growth For Every Player.`,
      })
    }
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -6 }}
    transition={{ duration: 0.3 }}
    className="cursor-pointer bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden"
  >
    <div className="flex flex-col md:flex-row items-center gap-6 p-6">
      <div className="w-full md:w-1/3 flex-shrink-0">
        <motion.img
          src="/images/hostel.jpeg"
          alt="Residential facilities"
          className="w-full h-48 object-cover rounded-2xl"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="w-full md:w-2/3">
        <h3 className="text-3xl font-bold text-[#0f2547] mb-3">Residential Facilities</h3>
        <p className="text-gray-800 text-lg leading-relaxed">
          The Academy ensures comfortable living arrangements with well-maintained hostel
          and food facilities at Appasaheb Birnale Public School Boys Hostel, Sangli — ensuring
          discipline and holistic growth.
        </p>
      </div>
    </div>
  </motion.div>

  {/* COMPETITION & EXPOSURE */}
  <motion.div
    onClick={() =>
      setSelectedCard({
        title: "Competition & Exposure",
        img: "/images/exposure.jpeg",
        desc: `The Academy Frequently Arranges Practice Matches and Tournaments,
        Giving Players Real-Time Match Experience and Building Confidence.
        These Initiatives Ensure Players Are Well-Prepared For Higher-Level Challenges.`,
      })
    }
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -6 }}
    transition={{ duration: 0.3 }}
    className="cursor-pointer bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden"
  >
    <div className="flex flex-col md:flex-row items-center gap-6 p-6">
      <div className="w-full md:w-1/3 flex-shrink-0">
        <motion.img
          src="/images/exposure.jpeg"
          alt="Competition and exposure"
          className="w-full h-48 object-cover rounded-2xl"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="w-full md:w-2/3">
        <h3 className="text-3xl font-bold text-[#0f2547] mb-3">Competition & Exposure</h3>
        <p className="text-gray-800 text-lg leading-relaxed">
          The Academy regularly organizes practice games and tournaments, giving players
          real match exposure and confidence — preparing them for district, state and
          higher-level competitions.
        </p>
      </div>
    </div>
  </motion.div>

</div>
 

      {/* GALLERY */}
<section id="gallery-section" className="py-20 bg-gradient-to-r from-sky-200 to-pink-200">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-extrabold text-[#0f2547] text-center mb-3"
    >
      Gallery Highlights
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-3 text-gray-600 max-w-2xl mx-auto text-center mb-8"
    >
      Moments that define our academy — passion, teamwork, and excellence captured in every frame.
    </motion.p>

    {/* Admin Upload Button */}
    {user?.role === "admin" && (
      <div className="text-center mb-8">
        <Link
          to="/upload?type=gallery"
          className="px-6 py-2 bg-gradient-to-r from-sky-500 to-pink-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition"
        >
          Upload New Event
        </Link>
      </div>
    )}

    {/* CATEGORY FILTERS */}
    <div className="flex justify-center gap-3 flex-wrap mb-10">
      {["All", "MPL", "Women", "Trophy", "Camp"].map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`px-5 py-2 rounded-full border text-sm font-semibold transition 
          ${activeFilter === cat ? "bg-[#0f2547] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* IMAGE GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {filteredImages.slice(0, visibleCount).map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03, duration: 0.4 }}
          className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
          onClick={() => {
            setCurrentIndex(index);
            openImage(img.url);
          }}
        >
          {/* Image */}
          <img src={img.url} alt="Gallery" className="w-full h-56 object-cover" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
            transition flex items-center justify-center">
            <p className="text-white text-lg font-semibold">View</p>
          </div>
        </motion.div>
      ))}

    </div>

    {/* LOAD MORE */}
    <div className="text-center mt-10">
      {visibleCount < filteredImages.length && (
        <button
          onClick={() => setVisibleCount(prev => prev + 8)}
          className="px-6 py-3 bg-[#0f2547] text-white rounded-full shadow hover:bg-[#1b396a] transition"
        >
          Load More
        </button>
      )}
    </div>

    {/* MODAL PREVIEW */}
    
<AnimatePresence>
  {modalOpen && modalImage && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* MODAL CONTENT */}
      <motion.div
        className="relative max-w-[90vw] max-h-[90vh] z-10 rounded-lg overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <img
          src={modalImage}
          alt="Preview"
          className="max-h-[80vh] w-auto object-contain bg-black rounded-xl"
        />

        {/* TITLE */}
        <p className="text-center text-white mt-3 text-lg font-semibold">
          {filteredImages[currentIndex]?.title || "Gallery Image"}
        </p>

        {/* PREVIOUS */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prev = currentIndex - 1;
              setCurrentIndex(prev);
              setModalImage(filteredImages[prev].url);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-3 rounded-full shadow text-xl"
          >
            ‹
          </button>
        )}

        {/* NEXT */}
        {currentIndex < filteredImages.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = currentIndex + 1;
              setCurrentIndex(next);
              setModalImage(filteredImages[next].url);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black p-3 rounded-full shadow text-xl"
          >
            ›
          </button>
        )}

        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-white/90 text-black p-2 rounded-full shadow text-xl"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  </div>
</section>

{/* FOOTBALL SECTION */}
<section id="football-section" className="py-20 bg-gradient-to-r from-pink-200 to-sky-200">
  <div className="max-w-7xl mx-auto px-6">

    {/* Hero Banner */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-xl mb-16"
    >
      <img
        src="/images/football1.jpeg"
        className="w-full h-72 object-cover"
        alt="Football Training"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Football at Sumeet Sports
        </h2>
      </div>
    </motion.div>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center text-gray-800 max-w-2xl mx-auto text-lg md:text-xl mb-12"
    >
      Training • Tournaments • Weekend Matches  
      <br />
      High-quality football sessions and ground bookings available.
    </motion.p>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {/* Coaching Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg"
      >
        <img src="/images/fc coaching.jpeg" className="w-full h-40 object-cover rounded-xl mb-4" alt="Football Coaching" />
        <h3 className="text-xl font-bold text-[#0f1724] mb-2">Football Coaching Sessions</h3>
        <ul className="text-gray-800 text-sm space-y-1">
          <li>Beginner & intermediate batches</li>
          <li>Basic drills, agility & ball control</li>
          <li>Sessions supervised by experienced trainers</li>
        </ul>
      </motion.div>

      {/* Ground Booking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg"
      >
        <img src="/images/advanced.jpeg" className="w-full h-40 object-cover rounded-xl mb-4" alt="Ground Booking" />
        <h3 className="text-xl font-bold text-[#0f1724] mb-2">Ground Booking for Football</h3>
        <ul className="text-gray-800 text-sm space-y-1">
          <li>7-a-side & 9-a-side formats</li>
          <li>Weekend match bookings</li>
          <li>Goalpost & boundary setup available</li>
        </ul>
      </motion.div>

      {/* Tournaments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg"
      >
        <img src="/images/fc tournament.png" className="w-full h-40 object-cover rounded-xl mb-4" alt="Football Tournaments" />
        <h3 className="text-xl font-bold text-[#0f1724] mb-2">Football Tournaments</h3>
        <ul className="text-gray-800 text-sm space-y-1">
          <li>Friendly matches & school events</li>
          <li>Club tournaments hosted periodically</li>
          <li>Trophies & certificates arranged by academy</li>
        </ul>
      </motion.div>
    </div>

    {/* Mini Gallery */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {[
        "/images/football1.jpeg",
        "/images/football/fc match.jpeg",
        "/images/football/roller.jpeg",
        "/images/football/strike.jpeg", 
      ].map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative group rounded-xl overflow-hidden shadow-md"
        >
          <img src={img} className="w-full h-40 object-cover" alt="Football Scene" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <p className="text-white font-semibold">View</p>
          </div>
        </motion.div>
      ))}
    </div>


   
    {/* CTA */}
    <div className="text-center mt-12">
      <button
        onClick={() => {
          const el = document.getElementById("contact-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-8 py-3 bg-gradient-to-r from-sky-500 to-pink-500 text-white text-lg font-semibold rounded-full shadow hover:scale-105 transition"
      >
        Enquire for Football Training
      </button>
    </div>
  </div>
</section>


      
      {/* CONTACT */}
<section id="contact-section" className="py-20 bg-gradient-to-r from-sky-200 to-pink-200">
  <div className="container mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0f2547]">
        Get In <span className="bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent">
          Touch
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Have questions about admissions, programs or training?
        <br />  
        -just connect with us via given email form.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* LEFT – FORM */}
      <div>
        <div className="rounded-2xl border border-gray-200 shadow-md bg-white hover:border-pink-400 transition">
          <div className="p-8">

            <h3 className="text-2xl font-semibold mb-6 text-[#0f2547]">
              Send us a Message
            </h3>

            <form className="space-y-6" onSubmit={handleContactSubmit}>
              
              {/* First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-800">First Name</label>
                  <input
                    value={contactForm.first}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, first: e.target.value })
                    }
                    placeholder="Enter your first name"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-gray-800">Last Name</label>
                  <input
                    value={contactForm.last}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, last: e.target.value })
                    }
                    placeholder="Enter your last name"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white"
                  />
                  
                </div>
                </div>

              {/* Email */}
              <div>
                <label className="text-gray-800">Email</label>
                <input
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="Enter your email address"
                  type="email"
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-800">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  rows="6"
                  placeholder="Write your message here"
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-sky-500 to-pink-500 hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>

          </div>
        </div>
        <p className="text-xl text-gray-900 max-w-3xl mt-5 mx-auto">* We Will Reach Out Instantly..!!</p>
      </div>

      {/* RIGHT – CONTACT INFO */}
      <div className="space-y-8">

        <div>
          <h3 className="text-4xl font-semibold px-3 mb-6 text-[#0f2547]">
            Contact Information
          </h3>
          <p className="text-gray-900 mb-8 leading-relaxed">
            Reach out to us anytime. We usually respond within 24 hours.
          </p>
        </div>

        {/* Phone */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white hover:border-pink-400 transition">
          <div className="p-8 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-300 to-pink-300 rounded-full flex items-center justify-center text-white">
              📞
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-[#0f2547]">Phone</h4>
              <p className="text-gray-900">+91 9403230200</p>
              <p className="text-gray-900">+91 7507878219</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white hover:border-pink-400 transition">
          <div className="p-8 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              ✉️
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-[#000000]">Email</h4>
              <p className="text-gray-900">info@sumeetsportsacademy.com</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border mt-4 border-gray-200 shadow-sm bg-white hover:border-pink-400 transition">
          <div className="p-8 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              📍
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-[#0f2547]">Address</h4>
              <p className="text-gray-900">
                Sumeet Sports Cricket Academy,  
                Appasaheb Birnale Public School, Sangli, Maharashtra
              </p>
            </div>
          </div>
        </div>

        

      </div>
    </div>

  </div>
</section>
      {/* FOOTER */}
      <footer className="bg-[#0b1020] text-gray-300 rounded-t-[40px] pt-12">
        <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/images/logo4.png" className="w-20 h-20 rounded-full mb-3 border border-gray-400" alt="logo" />
            <p className=" text-2xl"><b>Sumeet Sports</b> </p> <p>Cricket Academy — Sangli</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white text-2xl">Contact</h4>
            <p className="text-sm">info@sumeetsportsacademy.com</p>
            <p className="text-lg text-gray-200 font-semibold">📞 +91 9403230200</p>
            <p className="text-lg text-gray-200 font-semibold">📞 +91 7507878219</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white text-2xl">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#home-section" className="hover:underline">Home</a></li>
              <li><a href="#about-section" className="hover:underline">About</a></li>
              <li><a href="#gallery-section" className="hover:underline">Gallery</a></li>
              <li><a href="#contact-section" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white text-2xl">Follow Us</h4>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/sumeetsports_cricket_academy  " className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center hover:scale-110 transition" aria-label="Instagram"><FaInstagram className="text-white" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center hover:scale-110 transition" aria-label="LinkedIn"><FaLinkedin className="text-white" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition" aria-label="Website"><FaGlobe className="text-white" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center hover:scale-110 transition" aria-label="Cricket"><GiCricketBat className="text-white" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm">© {new Date().getFullYear()} Sumeet Sports Cricket Academy — All rights reserved.</div>
        <h6  className="text-sm"><p className="text-sm text-gray-900"> D.B.Nadim </p></h6>     
      </footer>

      {/* SELECTED CARD MODAL */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50" onClick={() => setSelectedCard(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="rounded-3xl max-w-3xl w-full p-4">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                {selectedCard.img && <img src={selectedCard.img} className="w-full h-64 object-cover rounded-xl mb-6" alt={selectedCard.title || selectedCard.name || "detail"} />}
                <h2 className="text-3xl font-bold mb-4 text-[#0f1724]">{selectedCard.title || selectedCard.name}</h2>

                <ul className="list-disc pl-6 text-gray-800 space-y-2 text-lg mb-8">
                  {(detailsMap[selectedCard.title] || detailsMap[selectedCard.name] || detailsMap.default).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <button onClick={() => setSelectedCard(null)} className="w-full py-3 bg-gradient-to-r from-sky-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg">Close</button>
              </div>
                    {/* Vision / Mission / Goals Modal */}
      <AnimatePresence>
        {selectedVision && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50"
            onClick={() => setSelectedVision(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 text-[#0f1724]">
                {selectedVision.title}
              </h2>

              <div className="space-y-3 text-lg text-gray-800 leading-relaxed">
                {selectedVision.points.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 text-right">
                <button
                  onClick={() => setSelectedVision(null)}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT SUBMIT POPUP */}
      <AnimatePresence>
        {showContactPopup && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50">
            <div className="bg-white rounded-xl px-6 py-4 shadow-xl border border-gray-200">
              <p className="font-semibold">Enquiry delivered, we will respond to you asap..!!!!</p>
              <div className="mt-2 text-right">
                <button className="text-sm text-sky-600 font-semibold" onClick={() => setShowContactPopup(false)}>Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
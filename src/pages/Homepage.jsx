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

  // Coaches (dynamic; can add more later)
 const coaches = [
    {
      name: "Sumeet Chavan",
      title: "Senior Coach • Former Maharashtra Ranji Player",
      description: (
  <div className="space-y-3 text-gray-800 leading-relaxed">
    <p className="text-2xl font-bold text-[#0f2547]">✨ *Highlights*</p>

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
      description: (
  <div className="space-y-3 text-gray-800 leading-relaxed">
    <p className="text-xl font-bold text-[#0f2547]">🔥 *Prashaant Kore*</p>

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
    "Advanced Player Training": [
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
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: "150+", label: "Active Players" },
            { value: "20+", label: "Tournament Hosted" },
            { value: "8+", label: "Certified Coaches" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
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
              <CoachCard key={i} name={c.name} title={c.title} description={c.description} image={c.image} />
            ))}
          </div>
        </div>
      </section>
      {/* PROUD PLAYERS SECTION */}
  <section id="players-section" className="py-20 bg-gradient-to-r from-pink-200 to-sky-200">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-extrabold text-[#0f2547] text-center mb-12">
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
          { name: "Nidhi Shambhawani", tournament: "U-19 Women's Maharashtra Camp", image: "/images/women3.jpeg" },
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
          <h3 className="text-3xl font-bold mb-6 text-[#1c9e9e]">Programs & Facilities</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Junior Coaching Program", desc: "Age-specific training for young talent.", img: "/images/juniors.jpeg" },
              { title: "Advanced Player Training", desc: "High performance coaching & analysis.", img: "/images/advanced.jpeg" },
              { title: "Fitness & Conditioning", desc: "Tailored strength and agility training.", img: "/images/GLphotos/trophy3.jpeg" },
              { title: "Tournaments & Exposure", desc: "Regular matches to build competitive edge.", img: "/images/tournament.jpeg" },
              { title: "Women’s Cricket Training", desc: "Dedicated sessions & mentoring.", img: "/images/women2.jpeg" },
              { title: "Seasonal Camps", desc: "Intensive holiday camps with guest coaches.", img: "/images/camps.jpeg" },
              
            ].map((p, idx) => (
              <motion.div key={idx} onClick={() => setSelectedCard(p)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03, y: -6 }} transition={{ duration: 0.3 }} 
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden cursor-pointer">
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
        
     {/* residential and expo */}
<div className="max-w-6xl mx-auto px-6 mt-12 space-y-6">
  <div className="bg-gradient-to-r from-pink-100 to-sky-100 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
    <div className="w-full md:w-1/3 flex-shrink-0">
      <img src="/images/hostel.jpeg" alt="Residential facilities" className="w-full h-48 object-cover rounded-2xl" />
    </div>
    <div className="w-full md:w-2/3">
      <h3 className="text-3xl font-bold text-[#0f2547] mb-3">Residential Facilities</h3>
      <p className="text-gray-800 text-lg leading-relaxed"> 
        {/* description  */}
        The Academy Ensures Not Only Cricket Training But Also Comfortable Living Arrangements.
        Well-Maintained Residential And Food Facilities Are Provided At Appasaheb Birnale Public School Boys Hostel, Sangli
        This Ensures A Disciplined Environment And Holistic Growth For Every Player.
		
      </p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-sky-100 to-pink-100 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
    <div className="w-full md:w-1/3 flex-shrink-0">
      <img src="/images/exposure.jpeg" alt="Competition and exposure" className="w-full h-48 object-cover rounded-2xl" />
    </div>
    <div className="w-full md:w-2/3">
      <h3 className="text-3xl font-bold text-[#0f2547] mb-3">Competition and Exposure</h3>
      <p className="text-gray-800 text-lg leading-relaxed">
        {/* description  */}
        The Academy Frequently Arranges Practice Matches and Tournaments,
              <br></br> 
             Giving Players Real-Time Match Experience and Building Confidence.
             <br />
              These Initiatives Ensure Players are Well-Prepared for Higher-level Challenges.
      </p>
    </div>
  </div>
</div>

     </section>

      {/* GALLERY */}
      <section id="gallery-section" className="py-20 bg-gradient-to-r from-sky-200 to-pink-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-extrabold text-[#0f2547] text-center mb-3">
            Gallery Highlights
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-3 text-gray-600 max-w-2xl mx-auto text-center mb-8">
            Moments that define our academy — passion, teamwork, and excellence captured in every frame.
          </motion.p>

          {/* Admin upload button */}
          {user?.role === "admin" && (
            <div className="text-center mb-8">
              <Link to="/upload?type=gallery" className="px-6 py-2 bg-gradient-to-r from-sky-500 to-pink-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition">
                Upload New Event
              </Link>
            </div>
          )}

          <div className="space-y-16 pb-4">
            {/*—  events array  */}
            {[
              {
                title: "Maharashtra Premier League Selections",
                desc: "Our academy players giving their best in the MPL selection trials with dedication and sportsmanship.",
                images: ["/images/GLphotos/mpl1.jpeg", "/images/GLphotos/mpl2.jpeg", "/images/GLphotos/mpl3.jpeg", "/images/GLphotos/mpl4.jpeg"],
              },
              {
                title: "Women’s Cricket Empowerment Camp",
                desc: "Focused on enhancing skills and confidence of our women cricketers through specialized coaching sessions.",
                images: ["/images/women1.jpeg", "/images/women2.jpeg", "/images/women3.jpeg"],
              },
              {
                title: "Annual Trophy Tournament 2025",
                desc: "Celebrating team spirit and performance at our annual cricket tournament held at Sangli ground.",
                images: ["/images/fitness.jpeg", "/images/GLphotos/trophy3.jpeg", "/images/team.jpeg", "/images/GLphotos/trophy2.jpeg"],
              },
              {
                title: "Junior Cricket Summer Camp",
                desc: "A training camp to shape young players with technical drills, fun matches, and motivational sessions.",
                images: ["/images/camp1.jpeg", "/images/camp2.jpeg", "/images/camp3.jpeg"],
              },
            ].map((event, idx) => (
              <motion.section key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0f2547] mb-3">{event.title}</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{event.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {event.images.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.4 }} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1">
                      <img src={img} alt={`${event.title} - ${i + 1}`} className="w-full h-56 object-cover" />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
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
        <p className="text-xl text-gray-600 max-w-3xl mt-5 mx-auto">* We Will Reach Out Instantly..!!</p>
      </div>

      {/* RIGHT – CONTACT INFO */}
      <div className="space-y-8">

        <div>
          <h3 className="text-4xl font-semibold mb-6 text-[#0f2547]">
            Contact Information
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
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

        {/* Quick Guarantee */}
        

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
              <a href="#" className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center hover:scale-110 transition" aria-label="Instagram"><FaInstagram className="text-white" /></a>
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
import React from "react"; import { motion } from "framer-motion";

export default function AwardPlayerCard({ name, tournament, image, isAdmin }) { return ( <motion.div whileHover={{ y: -6, scale: 1.03 }} transition={{ duration: 0.3 }} 
className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl overflow-hidden p-9 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)]" >
   {/* 🥇 Gold Ribbon */} 
   <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"> 🥇 Proud Player </div>

<div className="w-full h-68 rounded-2xl overflow-hidden mb-4">
    <img src={image} alt={name} className="w-full h-full object-cover" />
  </div>

  <h3 className="text-lg font-bold text-[#03070e]">{name}</h3>
  <p className="text-m text-gray-800 mt-1">{tournament}</p>

  {/* Admin edit/delete buttons */}
  {isAdmin && (
    <div className="mt-4 flex justify-center gap-3">
      <button className="px-5 py-3 bg-blue-600 text-white rounded-full text-sm shadow hover:scale-105 transition">
        Edit
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm shadow hover:scale-105 transition">
        Delete
      </button>
    </div>
  )}
</motion.div>

); }
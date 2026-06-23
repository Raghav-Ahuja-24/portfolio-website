"use client"

import { motion } from "framer-motion"
import { Trophy, Package, IndianRupee, HeartHandshake, Sparkles } from "lucide-react"

export function BeyondCode() {
  return (
    <div className="relative flex justify-center items-center overflow-visible z-40 w-full">
      {/* Massive glowing orb behind it to make it stand out */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Floating particles specific to this achievement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400/30 rounded-full blur-[2px]"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="relative w-full rounded-[2rem] p-[2px] bg-gradient-to-br from-yellow-300 via-amber-600 to-orange-700 shadow-[0_0_80px_rgba(217,119,6,0.3)] transform-gpu hover:shadow-[0_0_100px_rgba(217,119,6,0.4)] transition-shadow duration-500 group"
      >
        <div className="bg-[#0a0e1a]/95 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 h-full w-full relative overflow-hidden">
          
          {/* Subtle animated gradient sweep across the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            
            {/* The Badge Icon - Intrusive and 3D-like */}
            <div className="relative shrink-0">
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500/40 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-orange-600/20 shadow-[inset_0_0_40px_rgba(234,179,8,0.3),0_0_20px_rgba(234,179,8,0.4)]"
              >
                <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,1)]" />
              </motion.div>
              
              {/* Sparkles around the trophy */}
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 text-yellow-300"
              >
                <Sparkles className="w-10 h-10 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-6 text-amber-400"
              >
                <Sparkles className="w-8 h-8 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center w-full">
              
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold tracking-[0.2em] text-xs uppercase shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  Beyond Code
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-md border border-amber-500/30"
                >
                  Hidden Achievement Unlocked
                </motion.div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 mb-8 drop-shadow-sm tracking-tight leading-tight">
                Entrepreneurial Impact
              </h2>

              <ul className="space-y-4 text-base md:text-lg text-slate-300 w-full text-left">
                
                <motion.li 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-yellow-500/30 hover:scale-[1.02] transition-all duration-300 group/item shadow-lg"
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover/item:scale-110 group-hover/item:text-blue-300 transition-all">
                    <Package className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-base md:text-lg leading-tight">Sold hundreds of products</span>
                    <span className="text-slate-400 text-xs md:text-sm mt-1">Soaps, cleaners, room fresheners, etc.</span>
                  </div>
                </motion.li>
                
                <motion.li 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-yellow-500/30 hover:scale-[1.02] transition-all duration-300 group/item shadow-lg"
                >
                  <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 group-hover/item:scale-110 group-hover/item:text-emerald-300 transition-all">
                    <IndianRupee className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="font-bold text-white text-base md:text-lg leading-tight">Generated ₹30k–₹40k in school</span>
                </motion.li>

                <motion.li 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-yellow-500/30 hover:scale-[1.02] transition-all duration-300 group/item shadow-lg"
                >
                  <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400 group-hover/item:scale-110 group-hover/item:text-pink-300 transition-all">
                    <HeartHandshake className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="font-bold text-white text-base md:text-lg leading-tight">Contributions directed to charity</span>
                </motion.li>

              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

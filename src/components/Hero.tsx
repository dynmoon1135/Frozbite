"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import landingImg from "../data/assets/ladingpage.jpg";

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-[100vh] w-full flex flex-col justify-start md:justify-center overflow-hidden bg-slate-50 md:bg-transparent pt-16 pb-10 md:pt-0 md:pb-0">
      
      {/* ========================================= */}
      {/* 1. BACKGROUND FULL (HANYA UNTUK LAPTOP)   */}
      {/* ========================================= */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={landingImg}
          alt="Frozen Food Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* PERBAIKAN: Gradasi hanya tipis di kiri (50%) lalu memudar jadi jernih (transparent) di tengah ke kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent"></div>
      </div>

      {/* ========================================= */}
      {/* 2. PITA KACA FULL KIRI KANAN (DI LAPTOP)  */}
      {/* ========================================= */}
      {/* PERBAIKAN: md:bg-slate-900/40 diturunkan menjadi md:bg-slate-900/10 agar kaca jauh lebih bening */}
      <div className="relative z-10 w-full md:bg-slate-900/10 md:backdrop-blur-md md:border-y md:border-white/20 md:shadow-2xl md:py-10">
        
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:block items-center gap-4 md:gap-8">
          
          {/* ========================================= */}
          {/* A. GAMBAR POSTER (HANYA UNTUK HP)         */}
          {/* ========================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:hidden relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white z-10 aspect-[4/3] sm:aspect-video"
          >
            <Image 
              src={landingImg}
              alt="Frozen Food Product" 
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </motion.div>

          {/* ========================================= */}
          {/* B. KOTAK TEKS                             */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-700 md:bg-blue-600 md:text-white text-[10px] md:text-xs font-bold tracking-widest uppercase md:border md:border-blue-400/30 md:shadow-lg transition-colors">
              Premium Quality
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[2.5rem] font-extrabold text-slate-900 md:text-white leading-[1.15] mb-4 md:drop-shadow-xl transition-colors">
              Frozen Food <br className="hidden md:block" />
              <span className="text-blue-600 md:text-blue-400">Berkualitas</span> & <span className="text-orange-500 md:text-orange-400">Terpercaya</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 md:text-slate-200 mb-8 leading-relaxed max-w-lg transition-colors md:drop-shadow-md">
              Solusi praktis dan higienis untuk dapur Anda. Kami memastikan produk sampai dalam kondisi beku sempurna.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center md:justify-start gap-3">
              <Link 
                href="#produk" 
                className="group w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30"
              >
                <ShoppingBag size={18} />
                <span>Lihat Produk</span>
                <ArrowRight size={16} className="hidden sm:block group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="#kontak" 
                className="w-full sm:w-auto px-6 py-3.5 bg-white md:bg-white/10 text-slate-700 md:text-white border border-slate-200 md:border-white/20 hover:bg-slate-50 md:hover:bg-white/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all md:backdrop-blur-md shadow-sm md:shadow-none"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
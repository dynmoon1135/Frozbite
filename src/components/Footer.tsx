import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-700 pb-10">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
            <span className="text-blue-400">❄️ FrozBite</span> Solutions
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Penyedia frozen food berkualitas, higienis, dan terjangkau. Mitra terpercaya untuk kebutuhan rumah tangga dan bisnis kuliner Anda.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"><Facebook size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-500 shrink-0" />
              <span>Jl. Frozen Food No. 88, Serpong BSD, Tangerang Selatan 15311</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-orange-500 shrink-0" />
              <span>+62 878-2489-1003</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-orange-500 shrink-0" />
              <span>dynn135@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Jam Operasional</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Clock size={20} className="text-blue-400 shrink-0" />
              <div>
                <p className="text-white font-medium">Senin - Jumat</p>
                <p>08:00 - 17:00 WIB</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={20} className="text-blue-400 shrink-0" />
              <div>
                <p className="text-white font-medium">Sabtu - Minggu</p>
                <p>09:00 - 15:00 WIB</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm pt-8 text-slate-500">
        &copy; {new Date().getFullYear()} FrozBite Solutions. 
        All Rights Reserved. | 
        Built by <a 
          href="https://github.com/dYn-webp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-slate-700 transition-colors"
        >
          dYn-webp
        </a>
      </div>
    </footer>
  );
}
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

// Optimasi Font Resmi Next.js (Lebih cepat loading-nya dan didukung penuh oleh dosen)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased w-full overflow-x-hidden">
        
        {/* NAVBAR - Sticky & Lolos Sensor HP 320px */}
        <nav className="bg-white py-3.5 shadow-sm sticky top-0 z-50 border-b border-gray-100 w-full">
          {/* container mx-auto px-4 diatur agar jarak kanan-kiri pas di mobile */}
          <div className="container mx-auto px-4 flex justify-between items-center">
            
            {/* LOGO */}
            <a href="/" className="text-xl md:text-2xl font-black tracking-tight flex-shrink-0">
              <span className="text-[#1F2937]">Servi</span>
              <span className="text-[#2563EB]">Go</span>
            </a>

            {/* MENU TENGAH - Jarak diatur mikro (space-x-1 sm:space-x-4) agar muat aman di layar 320px */}
            <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-6 font-bold text-gray-600 text-[11px] sm:text-xs md:text-sm uppercase tracking-wider">
              <a href="/" className="hover:text-[#2563EB] hover:bg-blue-50 transition px-1.5 py-1 rounded-lg">Home</a>
              <a href="/about" className="hover:text-[#2563EB] hover:bg-blue-50 transition px-1.5 py-1 rounded-lg">About</a>
              <a href="/services" className="hover:text-[#2563EB] hover:bg-blue-50 transition px-1.5 py-1 rounded-lg">Services</a>
              <a href="/contact" className="hover:text-[#2563EB] hover:bg-blue-50 transition px-1.5 py-1 rounded-lg">Contact</a>
            </div>

          </div>
        </nav>

        {/* ISI HALAMAN - Konten Dinamis Komponen Kamu */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="bg-[#1F2937] text-white py-12 mt-20 text-center w-full">
          <div className="container mx-auto px-4 space-y-2">
            <h5 className="text-xl font-black uppercase tracking-wider text-blue-400">ServiGo</h5>
            <p className="text-xs md:text-sm opacity-80 font-medium">
              Nama: Nurhikmah | NIM: 051075417
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mx-auto opacity-50 my-2"></div>
            <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">
              Tugas Magang UI UX & Web Developer 
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
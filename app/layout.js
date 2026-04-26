import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Plus_Jakarta_Sans'] bg-white text-gray-900">
        
        {/* NAVBAR - Semua Menu Tetap Muncul Walau Layar Kecil */}
        <nav className="bg-white py-4 shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="container mx-auto px-2 md:px-6 flex justify-between items-center">
            
            {/* LOGO */}
            <a href="/" className="text-lg md:text-2xl font-bold flex-shrink-0 mr-2">
              <span className="text-[#1F2937]">Servi</span>
              <span className="text-[#2563EB]">Go</span>
            </a>

            {/* MENU TENGAH - Sekarang Tidak Pakai 'hidden' lagi */}
            <div className="flex items-center space-x-2 md:space-x-8 font-semibold text-gray-600 text-[10px] sm:text-xs md:text-base">
              <a href="/" className="hover:text-[#2563EB] transition px-1">Home</a>
              <a href="/about" className="hover:text-[#2563EB] transition px-1">About</a>
              <a href="/services" className="hover:text-[#2563EB] transition px-1">Services</a>
              <a href="/contact" className="hover:text-[#2563EB] transition px-1">Contact</a>
            </div>

            {/* TOMBOL DAFTAR */}
            <div className="flex-shrink-0 ml-2">
              <a href="#" className="bg-[#2563EB] text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md text-[10px] md:text-base">
                Daftar
              </a>
            </div>

          </div>
        </nav>

        {/* ISI HALAMAN */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="bg-[#1F2937] text-white py-12 mt-20 text-center">
          <div className="container mx-auto px-4">
            <h5 className="text-xl font-bold mb-2">ServiGo</h5>
            <p className="text-sm opacity-70">Nama: Nurhikmah | NIM: 051075417</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
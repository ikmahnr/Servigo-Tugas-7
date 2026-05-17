export default function AboutPage() {
  return (
    // Ditambahkan w-full dan overflow-x-hidden sebagai pelindung mutlak agar layar tidak meluber ke kanan
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-20 w-full overflow-x-hidden">
      
      {/* HEADER HERO BANNER (Gradasi Biru-Ungu khas ServiGo) */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-14 md:py-16 px-4 sm:px-6 rounded-b-[30px] md:rounded-b-[40px] text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Tentang ServiGo</h1>
        <p className="opacity-90 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase font-semibold px-2">Mengenal lebih dekat platform penyalur tenaga kerja serabutan harian terintegrasi</p>
      </section>

      {/* PROFIL UTAMA PLATFORM */}
      <section className="py-10 md:py-12 px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto text-center bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-gray-100">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
            <span className="font-black text-blue-600">ServiGo</span> adalah platform penyedia jasa harian modern yang dirancang khusus untuk menghubungkan para tenaga kerja serabutan lokal dengan masyarakat yang membutuhkan bantuan praktis secara cepat, jujur, dan terpercaya. Kami memotong jalur birokrasi rumit agar pencari cuan harian bisa langsung bertemu dengan pemberi tugas dalam satu klik.
          </p>
        </div>
      </section>

      {/* VISI & MISI INTERAKTIF */}
      <section className="py-6 md:py-8 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto">
          {/* Otomatis 1 kolom di HP kecil (grid-cols-1) dan berubah jadi 2 kolom di tablet/PC (md:grid-cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            
            {/* KARTU VISI */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col justify-center">
              <h2 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tight mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-blue-600 text-lg md:text-xl">🎯</span> Visi Kami
              </h2>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-medium">
                Menjadi solusi ekosistem utama bagi masyarakat dalam menyelesaikan tugas atau pekerjaan rumah tangga harian, sekaligus membuka peluang akselerasi ekonomi yang adil serta transparan bagi para penyedia jasa mandiri.
              </p>
            </div>

            {/* KARTU MISI */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-blue-100">
              <h2 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tight mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-purple-600 text-lg md:text-xl">🚀</span> Misi Kami
              </h2>
              <ul className="space-y-2.5 md:space-y-3 text-gray-600 text-xs md:text-sm font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Menghadirkan kenyamanan penawaran kerja lewat transparansi biaya admin yang ringkas.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Menjamin validasi data pelaporan terenkripsi demi keamanan penuh antara pengguna platform.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Terus berinovasi mengembangkan fitur filter dinamis guna menjawab kebutuhan industri jasa yang bergerak cepat.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/*  (TAMPILAN BARU ) */}
      <section className="py-10 md:py-12 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
          <h3 className="text-center font-black text-[10px] md:text-xs uppercase tracking-widest text-amber-400 mb-8 md:mb-10">🛡️ Pilar Utama Operasional</h3>
          
          {/* Di layar HP berderet ke bawah, di layar komputer berjejer ke samping (md:grid-cols-3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gray-700 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl mx-auto shadow">🛡️</div>
              <h4 className="text-xs md:text-sm font-black uppercase tracking-wider mt-2">Terpercaya</h4>
              <p className="text-gray-400 text-[11px] md:text-xs font-medium leading-relaxed max-w-sm mx-auto">Seluruh laporan masuk dan data mitra diverifikasi berkala ke dalam sistem backend khusus.</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gray-700 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl mx-auto shadow">⚡</div>
              <h4 className="text-xs md:text-sm font-black uppercase tracking-wider mt-2">Cepat & Sigap</h4>
              <p className="text-gray-400 text-[11px] md:text-xs font-medium leading-relaxed max-w-sm mx-auto">Dilengkapi akselerasi filter prioritas kilat untuk penayangan iklan tugas darurat.</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gray-700 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl mx-auto shadow">🤝</div>
              <h4 className="text-xs md:text-sm font-black uppercase tracking-wider mt-2">Harga Adil</h4>
              <p className="text-gray-400 text-[11px] md:text-xs font-medium leading-relaxed max-w-sm mx-auto">Kombinasi upah bersih murni dan penataan komisi aplikasi yang transparan tanpa potongan siluman.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER AJAKAN & KREDIT AKUN */}
      <div className="mt-12 md:mt-16 text-center px-4 space-y-4">
        <h3 className="text-base md:text-lg font-black uppercase italic text-gray-800 tracking-tight">"Layanan apa pun, kami carikan solusinya!"</h3>
        <div className="inline-block bg-white px-5 py-2.5 md:px-6 md:py-3 rounded-2xl shadow-md border border-gray-100">
          <p className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-wider">Developer & Founder</p>
          <p className="text-xs md:text-sm font-black text-gray-800 mt-0.5">Nurhikmah</p>
          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">NIM: 051075417</p>
        </div>
      </div>

      {/* BRANDING FOOTER */}
      <footer className="text-center py-12 md:py-16 opacity-40 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100 mt-12">
        © {new Date().getFullYear()} ServiGo Indonesia. All Rights Reserved.
      </footer>

    </div>
  );
}
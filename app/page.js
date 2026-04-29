export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white pt-20 pb-32 px-4 rounded-b-[50px] text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Solusi Jasa Terpercaya <br className="hidden md:block" /> dalam Sekali Klik.
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Hubungkan kebutuhan harian Anda dengan tenaga kerja profesional yang siap membantu kapan saja.
          </p>
          <button className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105">
            Cari Jasa Sekarang
          </button>
        </div>
      </section>

      {/* KATEGORI JASA UTAMA */}
      <section className="py-16 bg-gray-50 px-4 mt-[-50px]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Layanan Unggulan Kami</h2>
            <p className="text-gray-500 text-sm md:text-base">Kategori jasa yang paling sering dipesan oleh pelanggan kami</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Rumah Tangga */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition text-center border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">🏠</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Rumah Tangga</h4>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Jasa beres-beres rumah, setrika rapi, hingga cuci pakaian bersih kilat.
                </p>
              </div>
              <a href="/services" className="text-[#2563EB] font-bold text-sm hover:underline">Lihat Detail →</a>
            </div>

            {/* 2. Jasa Digital */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition text-center border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">💻</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Jasa Digital</h4>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Bantuan jasa tulis tugas, desain CV profesional, dan admin digital.
                </p>
              </div>
              <a href="/services" className="text-[#2563EB] font-bold text-sm hover:underline">Lihat Detail →</a>
            </div>

            {/* 3. Logistik */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition text-center border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">📦</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Logistik</h4>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Layanan bongkar muat barang pindahan dan pengiriman paket cepat.
                </p>
              </div>
              <a href="/services" className="text-[#2563EB] font-bold text-sm hover:underline">Lihat Detail →</a>
            </div>

            {/* 4. Lainnya */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition text-center border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">✨</div>
                <h4 className="text-lg font-bold mb-2 text-gray-800">Lainnya</h4>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Jasa antre, rakit perabot, siram tanaman, hingga beli galon darurat.
                </p>
              </div>
              <a href="/services" className="text-[#2563EB] font-bold text-sm hover:underline">Lihat Detail →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TESTIMONI (Pura-puranya WKWKWKKW) */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Apa Kata Mereka?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testi 1 */}
            <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 relative">
              <span className="text-6xl text-blue-200 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-700 italic relative z-10 mb-6">
                "Sangat terbantu buat setrika baju pas lagi sibuk kuliah! Harganya juga masuk di kantong mahasiswa."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">R</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Rina Septiani</p>
                  <p className="text-xs text-gray-500">Mahasiswa UT</p>
                </div>
              </div>
            </div>

            {/* Testi 2 */}
            <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-100 relative">
              <span className="text-6xl text-purple-200 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-700 italic relative z-10 mb-6">
                "Jasa antre-nya juara, saya gak perlu panas-panasan lagi buat beli makanan viral. Adminnya juga ramah."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-700">B</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Budi Cahyono</p>
                  <p className="text-xs text-gray-500">Karyawan Swasta</p>
                </div>
              </div>
            </div>

            {/* Testi 3 */}
            <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100 relative">
              <span className="text-6xl text-orange-200 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-700 italic relative z-10 mb-6">
                "Desain CV dari ServiGo beneran keren dan rapi banget, saya langsung dapet panggilan kerja minggu depannya!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700">A</div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Andi Wijaya</p>
                  <p className="text-xs text-gray-500">Fresh Graduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
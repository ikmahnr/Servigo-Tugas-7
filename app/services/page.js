export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <div className="bg-[#F8FAFC] py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#1F2937] mb-4">Layanan Kami</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Semua solusi jasa yang Anda butuhkan, dikerjakan oleh tenaga profesional yang terpercaya.
          </p>
        </div>
      </div>

      {/* GRID LAYANAN */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* 1. RUMAH TANGGA */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6">🏠</div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Rumah Tangga</h3>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start"><span className="text-blue-500 mr-2">✔</span> Beres-beres & Bersih Rumah</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">✔</span> Cuci & Setrika Pakaian</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">✔</span> Pembersihan Kamar Mandi</li>
            </ul>
            <button className="w-full py-3 bg-gray-50 text-[#2563EB] font-bold rounded-xl hover:bg-blue-600 hover:text-white transition">Pesan Jasa</button>
          </div>

          {/* 2. JASA DIGITAL (Ini yang tadi ketinggalan) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl mb-6">💻</div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Jasa Digital</h3>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start"><span className="text-purple-500 mr-2">✔</span> Pengetikan & Olah Data</li>
              <li className="flex items-start"><span className="text-purple-500 mr-2">✔</span> Desain CV & Portofolio</li>
              <li className="flex items-start"><span className="text-purple-500 mr-2">✔</span> Admin Media Sosial</li>
            </ul>
            <button className="w-full py-3 bg-gray-50 text-[#7C3AED] font-bold rounded-xl hover:bg-purple-600 hover:text-white transition">Pesan Jasa</button>
          </div>

          {/* 3. LOGISTIK */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Logistik</h3>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start"><span className="text-orange-500 mr-2">✔</span> Bongkar Muat Pindahan</li>
              <li className="flex items-start"><span className="text-orange-500 mr-2">✔</span> Kirim Paket Cepat</li>
              <li className="flex items-start"><span className="text-orange-500 mr-2">✔</span> Pengantaran Barang Besar</li>
            </ul>
            <button className="w-full py-3 bg-gray-50 text-[#F97316] font-bold rounded-xl hover:bg-orange-600 hover:text-white transition">Pesan Jasa</button>
          </div>

          {/* 4. LAINNYA (Jasa Antri, dll) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6">✨</div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Lainnya</h3>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> Jasa Antre Apa Saja</li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> Rakit Perabot & Siram Tanaman</li>
              <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> Jaga Anabul & Bantuan Darurat</li>
            </ul>
            <button className="w-full py-3 bg-gray-50 text-green-600 font-bold rounded-xl hover:bg-green-600 hover:text-white transition">Pesan Jasa</button>
          </div>

        </div>

        {/* CUSTOM REQUEST BOX */}
        <div className="mt-16 bg-[#F1F5F9] p-10 rounded-[3rem] text-center border-2 border-dashed border-gray-300 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Belum Menemukan Jasa yang Dicari?</h2>
          <p className="text-gray-600 mb-8">Kami siap melayani permintaan jasa kustom apa pun sesuai kebutuhan Anda.</p>
          <a href="/contact" className="bg-[#2563EB] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition">
            Hubungi Bantuan Kami
          </a>
        </div>
      </div>
    </div>
  );
}
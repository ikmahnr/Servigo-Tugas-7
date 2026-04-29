export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/*  ABOUT */}
      <section className="bg-[#F8FAFC] py-20 px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-6">Tentang ServiGo</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Kami adalah platform penyedia jasa harian yang menghubungkan tenaga kerja terampil dengan masyarakat yang membutuhkan bantuan praktis, jujur, dan terpercaya.
          </p>
        </div>
      </section>

      {/* VISI N MISI ANZAYYYY */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-l-4 border-[#2563EB] pl-4">Visi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Menjadi solusi utama bagi setiap individu dalam menyelesaikan tugas harian mereka, sekaligus membuka peluang ekonomi yang adil bagi para penyedia jasa lokal.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-[2.5rem]">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-l-4 border-[#2563EB] pl-4">Misi Kami</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2563EB] mr-2">●</span>
                  Memberikan layanan berkualitas dengan proses pemesanan yang mudah.
                </li>
                <li className="flex items-start">
                  <span className="text-[#2563EB] mr-2">●</span>
                  Menjamin keamanan dan kepercayaan antara pelanggan dan penyedia jasa.
                </li>
                <li className="flex items-start">
                  <span className="text-[#2563EB] mr-2">●</span>
                  Terus berinovasi mengikuti kebutuhan jasa masyarakat yang dinamis.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NILAI UTAMA */}
      <section className="py-16 bg-[#1F2937] text-white rounded-[3rem] mx-4 md:mx-10 overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="text-xl font-bold mb-2">Terpercaya</h4>
              <p className="text-gray-400 text-sm italic">Setiap tenaga kerja telah melalui proses verifikasi ketat.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-2">Cepat & Sigap</h4>
              <p className="text-gray-400 text-sm italic">Respon admin dan pengerjaan jasa yang mengutamakan waktu Anda.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold mb-2">Harga Adil</h4>
              <p className="text-gray-400 text-sm italic">Transparansi harga yang kompetitif bagi pelanggan dan penyedia jasa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER AJAKAN */}
      <div className="mt-20 text-center px-6">
        <h3 className="text-2xl font-bold mb-6 italic text-gray-800">"Layanan apa pun, kami carikan solusinya!"</h3>
        <p className="text-gray-500 mb-8 font-medium">Nurhikmah - NIM: 051075417</p>
      </div>
    </div>
  );
}
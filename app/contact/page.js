export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="bg-[#F8FAFC] py-20 px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-6">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ada pertanyaan atau butuh jasa khusus yang tidak terdaftar? Tim ServiGo siap membantu Anda kapan saja.
          </p>
        </div>
      </section>

      {/* KONTEN KONTAK */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* INFO KONTAK & SOSMED */}
            <div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-8">Saluran Bantuan</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">📱</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">WhatsApp Admin</h4>
                    <p className="text-gray-600 mb-3">Respon cepat setiap hari (08.00 - 20.00 WIB)</p>
                    <a href="https://wa.me/628123456789" className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-[#128C7E] transition">
                      Chat Sekarang
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">📧</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Email Support</h4>
                    <p className="text-gray-600 italic">support@servigo.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">📍</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Kantor Pusat</h4>
                    <p className="text-gray-600">Jl. Sudirman No. 123, Jakarta Selatan, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULIR KONTAK */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Kirim Pesan</h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama Anda" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                  <input type="email" placeholder="email@contoh.com" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Pesan Anda</label>
                  <textarea rows="4" placeholder="Ceritakan kebutuhan jasa Anda..." className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition"></textarea>
                </div>
                <button type="button" className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
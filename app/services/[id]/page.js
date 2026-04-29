// Tambahkan async di depan fungsi
export default async function ServiceDetail({ params }) {
  // SMOGA NILAINYA BAGUS
  const { id } = await params;
  const idJasa = id;

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <a href="/services" className="text-blue-600 mb-6 inline-block font-medium">← Kembali ke Layanan</a>
        
        <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
            Detail Layanan: {idJasa.replace('-', ' ')}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Halaman detail untuk layanan <strong>{idJasa.replace('-', ' ')}</strong>. Di sini pelanggan bisa melihat prosedur kerja, estimasi waktu, dan harga lebih mendalam.
          </p>
          
          <div className="space-y-4 text-left">
            <h3 className="font-bold text-xl">Kenapa Memilih Layanan Ini?</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Dikerjakan oleh tenaga profesional terverifikasi.</li>
              <li>Peralatan lengkap dan standar kualitas tinggi.</li>
              <li>Garansi kepuasan pelanggan 100%.</li>
            </ul>
          </div>

          <button className="mt-10 w-full bg-[#2563EB] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">
            Pesan Jasa Ini Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
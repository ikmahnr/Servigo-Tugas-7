"use client";

import { useState } from 'react';
import { supabase } from '@/supabase';

export default function ContactPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKirim = async (e) => {
    e.preventDefault();
    
    if (!nama || !email || !pesan) {
      alert("Harap isi semua kolom ya!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('pesanan')
        .insert([{ nama, email, pesanan: pesan }]);

      if (error) throw error;

      alert("Hore! Pesan kamu sudah tersimpan di database.");
      
      // Reset form jadi kosong lagi setelah berhasil
      setNama('');
      setEmail('');
      setPesan('');

    } catch (error) {
      alert("Waduh, gagal kirim: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#F8FAFC] py-20 px-6 border-b border-gray-100 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-6">Hubungi Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Ada pertanyaan atau butuh bantuan? Kami siap membantu kamu.</p>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Kontak */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#1F2937]">Saluran Bantuan</h2>
            
            <div className="flex items-start gap-5 p-6 bg-blue-50 rounded-3xl">
              <div className="text-3xl">📧</div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Email Support</h4>
                <p className="text-gray-600">support@servigo.id</p>
              </div>
            </div>

            {/* Tombol WhatsApp yang sudah diperbaiki (Bisa diklik) */}
            <a 
              href="https://wa.me/628123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-5 p-6 bg-green-50 rounded-3xl hover:bg-green-100 transition-all cursor-pointer group no-underline"
            >
              <div className="text-3xl">📱</div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">WhatsApp Admin</h4>
                <p className="text-green-600 font-bold group-hover:underline">Chat Sekarang (Klik di Sini)</p>
              </div>
            </a>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Kirim Pesan</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama kamu..." 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition-all text-black" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Alamat Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com" 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition-all text-black" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Pesan</label>
                <textarea 
                  rows="4" 
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis pesan kamu di sini..." 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition-all text-black"
                ></textarea>
              </div>
              <button 
                onClick={handleKirim}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Sedang Mengirim...' : 'Kirim Pesan Sekarang'}
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
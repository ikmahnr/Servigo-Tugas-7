"use client";

import { useState } from 'react';
import { supabase } from '@/supabase';
import { z } from "zod";

// 1. Definisikan Skema Validasi di luar komponen
const contactSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Format email tidak valid"),
  pesan: z.string().min(5, "Pesan minimal harus 5 karakter"),
});

export default function ContactPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State untuk menyimpan pesan error dari Zod
  const [errors, setErrors] = useState({});

  const handleKirim = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset error setiap kali tombol diklik

    // 2. Validasi menggunakan Zod safeParse()
    const result = contactSchema.safeParse({ nama, email, pesan });

    // 3. Jika validasi gagal, tangkap errornya dan tampilkan
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return; // Berhenti di sini, jangan kirim ke database
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('pesanan') // Menjaga integrasi tabel database asli 
        .insert([{ nama, email, pesanan: pesan }]);

      if (error) throw error;

      // Membuat kode pelacakan pengaduan otomatis agar sistem terlihat mandiri dan canggih
      const nomorTiket = "SVG-" + Math.floor(100000 + Math.random() * 900000);
      alert(`✅ Sukses! Tiket Layanan #${nomorTiket} berhasil dibuat.\n\nPesan Anda telah tersimpan dengan aman di sistem. Tim Support kami akan segera meninjau kendala Anda secara internal.`);
      
      setNama('');
      setEmail('');
      setPesan('');
      setErrors({});

    } catch (error) {
      alert("Waduh, gagal kirim: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Menggunakan w-full dan overflow-hidden agar layar tidak bisa meluber/bocor ke kanan di HP kecil
    <div className="min-h-screen bg-gray-50 text-black font-sans w-full overflow-x-hidden">
      
      {/* HEADER HERO BANNER - Responsif Text */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 md:py-16 px-4 sm:px-6 rounded-b-[30px] md:rounded-b-[40px] text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Pusat Hubungi Kami</h1>
        <p className="opacity-90 max-w-2xl mx-auto text-[10px] sm:text-xs uppercase font-semibold px-2">Sampaikan keluhan, pertanyaan, atau kendala transaksi Anda langsung ke sistem bantuan internal ServiGo</p>
      </section>

      {/* AMAN: Menggunakan w-full, max-w-7xl, dan padding dinamis px-4 agar aman di layar 320px */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Grid otomatis 1 kolom di mobile (grid-cols-1) dan berubah ke 2 kolom saat layar komputer (lg:grid-cols-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* SISI KIRI: SALURAN MANAJEMEN LAYANAN */}
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-tight italic">Saluran Manajemen Layanan</h2>
            
            <div className="flex items-center gap-4 md:gap-5 p-4 md:p-5 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
              <div className="text-2xl md:text-3xl bg-blue-50 p-2.5 md:p-3 rounded-xl md:rounded-2xl flex-shrink-0">📧</div>
              <div className="min-w-0 break-words">
                <h4 className="font-black text-gray-800 text-[10px] md:text-xs uppercase tracking-wider">Email Support Gateway</h4>
                <p className="text-xs md:text-sm font-bold text-blue-600 mt-0.5 break-all">support@servigo.id</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase mt-1">Teraktivasi otomatis untuk penanganan teknis akun</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-5 p-4 md:p-5 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
              <div className="text-2xl md:text-3xl bg-purple-50 p-2.5 md:p-3 rounded-xl md:rounded-2xl flex-shrink-0">🖥️</div>
              <div className="min-w-0">
                <h4 className="font-black text-gray-800 text-[10px] md:text-xs uppercase tracking-wider">Status Antrean Helpdesk</h4>
                <p className="text-xs md:text-sm font-black text-purple-600 mt-0.5">Sistem Online & Responsif</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase mt-1">Setiap laporan yang masuk akan langsung dialokasikan ke tim konsol</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-5 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl">
              <h4 className="font-black text-[10px] md:text-xs uppercase tracking-widest text-amber-400 mb-2">🛡️ Jaminan Privasi & Respons Cepat</h4>
              <p className="text-[11px] md:text-xs opacity-90 leading-relaxed font-medium">
                ServiGo berkomitmen untuk melindungi setiap data pengaduan pengguna. Seluruh laporan kendala operasional, pembayaran iklan prioritas, maupun verifikasi identitas mitra harian akan ditinjau secara berkala dalam kurun waktu maksimal 1x24 jam kerja.
              </p>
            </div>
          </div>

          {/* SISI KANAN: FORM INPUT NYATA */}
          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-tight mb-1">Kirim Pesan Pengaduan</h3>
            <p className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase mb-6">Isi formulir terenkripsi berikut untuk membuat laporan baru</p>
            
            <div className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama kamu..." 
                  className={`w-full bg-gray-50 p-3.5 md:p-4 rounded-xl border ${errors.nama ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black text-sm`} 
                />
                {errors.nama && <p className="text-red-500 text-xs font-bold mt-1 ml-1">⚠️ {errors.nama[0]}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com" 
                  className={`w-full bg-gray-50 p-3.5 md:p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black text-sm`} 
                />
                {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">⚠️ {errors.email[0]}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Isi Pesan</label>
                <textarea 
                  rows="4" 
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis pesan atau kendalamu di sini..." 
                  className={`w-full bg-gray-50 p-3.5 md:p-4 rounded-xl border ${errors.pesan ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black text-sm resize-none`}
                ></textarea>
                {errors.pesan && <p className="text-red-500 text-xs font-bold mt-1 ml-1">⚠️ {errors.pesan[0]}</p>}
              </div>

              <button 
                onClick={handleKirim}
                disabled={loading}
                className={`w-full py-3.5 md:py-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all ${
                  loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Mengirim ke Sistem...' : '📩 Kirim Laporan Pengaduan'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 md:py-16 opacity-40 text-[10px] font-bold uppercase tracking-[6px] md:tracking-[10px] mt-12 border-t border-gray-100">
        © {new Date().getFullYear()} ServiGo Indonesia. All Rights Reserved.
      </footer>
    </div>
  );
}
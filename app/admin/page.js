"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';

export default function AdminPage() {
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk ambil data dari Supabase
  const ambilData = async () => {
    try {
      const { data, error } = await supabase
        .from('pesanan')
        .select('*')
        .order('id', { ascending: false }); // Pesanan

      if (error) throw error;
      setPesanan(data);
    } catch (error) {
      console.error('Gagal ambil data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Pesan Masuk</h1>
          <button 
            onClick={ambilData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat pesan...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 font-bold text-gray-700 border-b">ID</th>
                  <th className="p-4 font-bold text-gray-700 border-b">Nama</th>
                  <th className="p-4 font-bold text-gray-700 border-b">Email</th>
                  <th className="p-4 font-bold text-gray-700 border-b">Pesan</th>
                </tr>
              </thead>
              <tbody>
                {pesanan.length > 0 ? (
                  pesanan.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-all">
                      <td className="p-4 border-b text-gray-600">{item.id}</td>
                      <td className="p-4 border-b font-semibold text-gray-800">{item.nama}</td>
                      <td className="p-4 border-b text-blue-600">{item.email}</td>
                      <td className="p-4 border-b text-gray-700">{item.pesanan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">Belum ada pesan yang masuk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <a href="/contact" className="text-blue-500 hover:underline">← Kembali ke Form Kontak</a>
        </div>
      </div>
    </div>
  );
}
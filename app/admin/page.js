"use client";

import { useEffect, useState, Suspense } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-4 border-b"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
      <td className="p-4 border-b"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      <td className="p-4 border-b"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
      <td className="p-4 border-b"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    </tr>
  );
}

function AdminContent() {
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get('query') || '';

  const supabase = createBrowserClient(
    'https://plykglcgdhoxzsxupgox.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseWtnbGNnZGhveHpzeHVwZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODUxMDMsImV4cCI6MjA5Mjk2MTEwM30.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'
  );

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    // Hapus kuki session agar ditendang oleh middleware
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Balik ke halaman utama (Beranda)
    window.location.href = "/";
  };

  const ambilData = async () => {
    setLoading(true);
    try {
      let request = supabase
        .from('pesanan')
        .select('*')
        .order('id', { ascending: false });

      if (query) {
        request = request.ilike('nama', `%${query}%`);
      }

      const { data, error } = await request;
      if (error) throw error;
      setPesanan(data || []);
    } catch (error) {
      console.error('Gagal ambil data:', error.message);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('query', term);
    else params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    ambilData();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Pesan Masuk</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari nama..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-64"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={query}
            />
            <button onClick={ambilData} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold">
              Refresh
            </button>
            {/* TOMBOL LOGOUT MERAH */}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm font-semibold">
              Logout
            </button>
          </div>
        </div>

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
              {loading ? (
                <><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
              ) : pesanan.length > 0 ? (
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
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="text-center p-10">Loading...</p>}>
      <AdminContent />
    </Suspense>
  );
}
'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'

export default function ServiceDetailPage({ params }) {
  const [userSession, setUserSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [invoiceData, setInvoiceData] = useState(null)

  // URL & KEY SUPABASE
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plykglcgdhoxzsxupgox.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseWtnbGNnZGhveHpzeHVwZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODUxMDMsImV4cCI6MjA5Mjk2MTEwM30.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'

  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      
      // 1. Jalankan Cek Sesi Pengguna
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUserSession(session?.user || null)
        
        if (!session?.user) {
          setLoading(false)
          return
        }
      } catch (err) {
        console.log("Session bypass on building time")
      }

      // 2. Ambil Data Lowongan Spesifik Berdasarkan ID dari URL
      const targetId = params?.id
      if (targetId) {
        const { data, error } = await supabase
          .from('lowongan')
          .select('*')
          .eq('id', targetId)
          .single() // Ambil satu data murni

        if (error) {
          setMessage('❌ Gagal memuat data tagihan: ' + error.message)
        } else if (data) {
          // Bersihkan string nominal gaji dari DB (misal "Rp 157.500") untuk kalkulasi balik jika diperlukan rinciannya
          const cleanGajiStr = data.gaji ? data.gaji.replace(/[^\d]/g, '') : '0'
          const totalHarusDibayar = Number(cleanGajiStr)
          
          // Dekonstruksi rincian biaya (Admin 2500, Prioritas 5000 jika true)
          const biayaAdmin = 2500
          const biayaPrioritas = data.is_priority ? 5000 : 0
          const upahMurni = totalHarusDibayar - biayaAdmin - biayaPrioritas

          setInvoiceData({
            nomorInvoice: `INV-${100000 + Number(targetId) % 900000}`,
            namaPengirimData: data.nama_pemberi,
            upahMurni: upahMurni > 0 ? upahMurni : totalHarusDibayar,
            biayaAdmin: biayaAdmin,
            biayaPrioritas: biayaPrioritas,
            totalHarusDibayar: totalHarusDibayar
          })
        }
      }
      setLoading(false)
    }

    initializeData()
  }, [params?.id])

  return (
    <main className="bg-gray-50 min-h-screen text-black pb-20 font-sans w-full overflow-x-hidden">
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 md:py-16 px-4 rounded-b-[30px] md:rounded-b-[40px] text-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Layanan ServiGo</h1>
        <p className="opacity-90 max-w-md mx-auto text-[10px] md:text-xs uppercase font-semibold px-2">Gerbang Verifikasi Invoice Resmi</p>
      </section>

      {loading ? (
        <section className="px-4 mt-12 max-w-xl mx-auto text-center">
          <div className="text-purple-600 font-bold text-xs uppercase tracking-widest animate-pulse">
            ⏳ Menyinkronkan Data Transaksi...
          </div>
        </section>
      ) : !userSession ? (
        <section className="px-4 sm:px-6 mt-8 max-w-xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-[2rem] p-6 text-center shadow-sm flex flex-col items-center">
            <span className="text-4xl">🔒</span>
            <h3 className="font-black uppercase text-sm mt-3 tracking-wide">Akses Terkunci!</h3>
            <p className="text-xs opacity-90 mt-2 max-w-sm leading-relaxed">
              Silakan login terlebih dahulu untuk melihat invoice detail penempatan pekerjaan ini.
            </p>
            <button onClick={() => window.location.href = '/login'} className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-md w-full">
              🔑 Masuk Sekarang
            </button>
          </div>
        </section>
      ) : (
        <section className="px-4 sm:px-6 mt-8 max-w-xl mx-auto animate-in fade-in duration-500">
          
          {message && (
            <div className="p-4 rounded-xl text-xs font-bold text-center mb-6 bg-red-50 text-red-700 border border-red-200">
              {message}
            </div>
          )}

          {invoiceData ? (
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-2 border-purple-200 text-center animate-in zoom-in-95 duration-300">
              <div className="text-4xl mb-2">🧾</div>
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">Invoice Pembayaran</h2>
              <p className="text-[10px] text-purple-600 font-bold tracking-wider">{invoiceData.nomorInvoice}</p>
              
              <div className="my-5 bg-gray-50 rounded-2xl p-4 md:p-5 text-left text-xs font-bold text-gray-600 space-y-2 border border-gray-100 uppercase">
                <div className="flex justify-between"><span>Upah Pekerja:</span><span className="text-gray-800">Rp {invoiceData.upahMurni.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Biaya Admin Aplikasi:</span><span className="text-gray-800">Rp {invoiceData.biayaAdmin.toLocaleString('id-ID')}</span></div>
                {invoiceData.biayaPrioritas > 0 && (
                  <div className="flex justify-between text-purple-600"><span>Layanan Prioritas Kilat:</span><span>Rp {invoiceData.biayaPrioritas.toLocaleString('id-ID')}</span></div>
                )}
                <div className="border-t border-dashed border-gray-200 my-2 pt-2 flex justify-between text-sm font-black text-purple-900">
                  <span>Total Tagihan:</span><span>Rp {invoiceData.totalHarusDibayar.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100 mb-6">
                <p className="text-[10px] font-black text-purple-800 uppercase">Silakan Transfer Sesuai Nominal Ke:</p>
                <p className="text-sm md:text-lg font-black text-gray-800 tracking-wide mt-1 break-words">BANK MANDIRI — 123-000-999-888</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Atas Nama: PT SERVIGO INDONESIA</p>
              </div>

              {/* ACTION BUTTON UTAMA MENUJU WA ADMIN */}
              <a 
                href={`https://api.whatsapp.com/send?phone=62856767655&text=${encodeURIComponent(
                  `Halo Admin ServiGo,\n\nSaya telah melakukan transfer untuk invoice berikut:\n\n• *Nomor Invoice:* ${invoiceData.nomorInvoice}\n• *Total Tagihan:* Rp ${invoiceData.totalHarusDibayar.toLocaleString('id-ID')}\n• *Nama Pengirim:* ${invoiceData.namaPengirimData || 'Pemberi Tugas'}\n\nBerikut saya lampirkan foto bukti transfernya untuk segera diverifikasi. Terima kasih! 🙏`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setTimeout(() => {
                    // Setelah klik konfirmasi, arahkan kembali ke beranda/layanan agar antrean bersih
                    window.location.href = '/services'
                  }, 1550)
                }} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs py-4 rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 block text-center animate-pulse"
              >
                Saya Sudah Transfer & Konfirmasi
              </a>
            </div>
          ) : (
            !message && (
              <div className="bg-white rounded-[2rem] p-6 text-center shadow border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">⚠️ Data transaksi kosong atau tidak terdaftar.</p>
              </div>
            )
          )}

        </section>
      )}

      <footer className="text-center py-12 opacity-40 text-[10px] font-bold uppercase tracking-[6px] mt-12 border-t border-gray-100">
        © {new Date().getFullYear()} ServiGo Indonesia. All Rights Reserved.
      </footer>
    </main>
  )
}
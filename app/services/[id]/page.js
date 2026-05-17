'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'

export default function ServiceDetailPage({ params }) {
  const [userSession, setUserSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // TOGGLE FORM TABS ('lowongan' atau 'mitra')
  const [activeForm, setActiveForm] = useState('lowongan')

  // STATE FORM LOWONGAN (PEMBERI KERJA)
  const [namaPemberi, setNamaPemberi] = useState('')
  const [kontakPemberi, setKontakPemberi] = useState('')
  const [butuhJasa, setButuhJasa] = useState('')
  const [lokasiKerja, setLokasiKerja] = useState('')
  const [gajiTawaran, setGajiTawaran] = useState('')
  const [isPriority, setIsPriority] = useState(false)
  
  // STATE INVOICE SETELAH BERHASIL SIMPAN
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  // STATE FORM MITRA (PENCARI KERJA)
  const [namaMitra, setNamaMitra] = useState('')
  const [noHpMitra, setNoHpMitra] = useState('')
  const [keahlian, setKeahlian] = useState('')

  // TAMENG PENYELAMAT VERCELL: String cadangan asli dipasang agar build tidak crash
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plykglcgdhoxzsxupgox.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6"cGx5a2dsY2dkaG94enN4dXBnb3giLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc3NzM4NTEwMywiZXhwIjoyMDkyOTYxMTAzfQ.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'

  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUserSession(session?.user || null)
      } catch (err) {
        console.log("Session bypass on building time")
      }
    }
    checkUser()
  }, [])

  // 1. AKSI: SIMPAN LOWONGAN + HITUNG INVOICE MANDIRI
  const handleSimpanLowongan = async (e) => {
    e.preventDefault()
    if (!userSession) return
    setLoading(true)
    setMessage('')

    const upahMurni = Number(gajiTawaran)
    const biayaAdmin = 2500
    const biayaPrioritas = isPriority ? 5000 : 0
    const totalHarusDibayar = upahMurni + biayaAdmin + biayaPrioritas

    const { error } = await supabase.from('lowongan').insert([
      { 
        nama_pemberi: namaPemberi, 
        kontak: kontakPemberi, 
        butuh_jasa: butuhJasa, 
        lokasi: lokasiKerja, 
        gaji: `Rp ${totalHarusDibayar.toLocaleString('id-ID')}`,
        is_priority: isPriority,
        status_bayar: 'Pending Verification'
      }
    ])

    if (error) {
      setMessage('❌ Gagal pasang lowongan: ' + error.message)
    } else {
      setInvoiceData({
        upahMurni,
        biayaAdmin,
        biayaPrioritas,
        totalHarusDibayar,
        nomorInvoice: 'INV-' + Math.floor(100000 + Math.random() * 900000)
      })
      setShowInvoice(true)
      setNamaPemberi(''); setKontakPemberi(''); setButuhJasa(''); setLokasiKerja(''); setGajiTawaran(''); setIsPriority(false);
    }
    setLoading(false)
  }

  // 2. AKSI: DAFTAR MITRA OTOMATIS MASUK SUPABASE
  const handleDaftarMitra = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('mitra').insert([
      {
        nama_mitra: namaMitra,
        no_hp: noHpMitra,
        keahlian: keahlian,
        email_pendaftar: userSession.email
      }
    ])

    if (error) {
      setMessage('❌ Gagal mendaftar: ' + error.message)
    } else {
      setMessage('✅ Berhasil! Profil kamu sudah aktif di sistem database Mitra ServiGo.')
      setNamaMitra(''); setNoHpMitra(''); setKeahlian('');
    }
    setLoading(false)
  }

  return (
    <main className="bg-gray-50 min-h-screen text-black pb-20 font-sans w-full overflow-x-hidden">
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 md:py-16 px-4 rounded-b-[30px] md:rounded-b-[40px] text-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Layanan ServiGo</h1>
        <p className="opacity-90 max-w-md mx-auto text-[10px] md:text-xs uppercase font-semibold px-2">Detail Rute Id Proyek Terintegrasi</p>
      </section>

      {!userSession ? (
        <section className="px-4 sm:px-6 mt-8 max-w-xl mx-auto animate-in fade-in duration-300">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-[2rem] p-6 md:p-8 text-center shadow-sm flex flex-col items-center">
            <span className="text-4xl animate-bounce">🔒</span>
            <h3 className="font-black uppercase text-sm mt-3 tracking-wide">Akses Layanan Terkunci!</h3>
            <p className="text-xs opacity-90 mt-2 max-w-sm leading-relaxed">
              Kamu wajib Masuk atau Daftar akun terlebih dahulu di sistem ekosistem ServiGo sebelum dapat mengakses menu formulir penempatan ini.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button onClick={() => window.location.href = '/login'} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-md hover:opacity-90 transition-all flex-1 sm:flex-none">
                🔑 Masuk / Login Akun
              </button>
              <button onClick={() => window.location.href = '/'} className="bg-white border border-amber-200 text-amber-800 font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider hover:bg-amber-100 transition-all flex-1 sm:flex-none">
                ← Kembali ke Beranda
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 sm:px-6 mt-8 max-w-xl mx-auto animate-in fade-in duration-500">
          
          {!showInvoice && (
            <div className="flex bg-gray-200 p-1.5 rounded-2xl mb-6 md:mb-8 shadow-inner">
              <button onClick={() => { setActiveForm('lowongan'); setMessage(''); }} className={`flex-1 py-3 text-[10px] md:text-[11px] font-black rounded-xl uppercase tracking-wider transition-all ${activeForm === 'lowongan' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}>
                📢 Pasang Lowongan
              </button>
              <button onClick={() => { setActiveForm('mitra'); setMessage(''); }} className={`flex-1 py-3 text-[10px] md:text-[11px] font-black rounded-xl uppercase tracking-wider transition-all ${activeForm === 'mitra' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                💼 Daftar Jadi Mitra
              </button>
            </div>
          )}

          {message && !showInvoice && (
            <div className={`p-4 rounded-xl text-xs font-bold text-center mb-6 ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message}
            </div>
          )}

          {showInvoice && invoiceData && (
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

              <button onClick={() => { setShowInvoice(false); setInvoiceData(null); }} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs py-4 rounded-xl uppercase tracking-wider shadow-md transition-all">
                Saya Sudah Transfer & Konfirmasi
              </button>
            </div>
          )}

          {activeForm === 'lowongan' && !showInvoice && (
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
              <h2 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-tight mb-1">Butuh Tenaga Kerja Dadakan?</h2>
              <p className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase mb-6">Lengkapi data lowongan di bawah ini</p>
              
              <form onSubmit={handleSimpanLowongan} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nama Pemberi Tugas</label>
                  <input type="text" placeholder="Contoh: Ibu Susi / Toko Jaya" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-purple-200" value={namaPemberi} onChange={(e) => setNamaPemberi(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">No. WhatsApp Aktif</label>
                  <input type="text" placeholder="Contoh: 081234567xxx" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-purple-200" value={kontakPemberi} onChange={(e) => setKontakPemberi(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Pekerjaan Yang Dibutuhkan</label>
                  <input type="text" placeholder="Contoh: Jaga Kios Baju Seharian" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-purple-200" value={butuhJasa} onChange={(e) => setButuhJasa(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Lokasi Penempatan Kerja</label>
                  <input type="text" placeholder="Contoh: Cengkareng, Jakbar" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-purple-200" value={lokasiKerja} onChange={(e) => setLokasiKerja(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Tawaran Gaji Pokok Pekerja (Angka Saja)</label>
                  <input type="number" placeholder="Contoh: 150000" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-purple-200" value={gajiTawaran} onChange={(e) => setGajiTawaran(e.target.value)} required />
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex items-start gap-3 mt-2">
                  <input type="checkbox" id="priorityCheck" className="mt-1 w-4 h-4 accent-purple-600 rounded cursor-pointer flex-shrink-0" checked={isPriority} onChange={(e) => setIsPriority(e.target.checked)} />
                  <label htmlFor="priorityCheck" className="cursor-pointer">
                    <span className="text-xs font-black text-purple-900 block">🔥 Pasang Sebagai Iklan Prioritas (+Rp 5.000)</span>
                    <span className="text-[10px] text-purple-600 font-semibold block uppercase mt-0.5">Iklan otomatis tayang di kategori URGENT halaman utama!</span>
                  </label>
                </div>

                {gajiTawaran && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] md:text-[11px] font-bold text-gray-600 uppercase space-y-1">
                    <p>• Upah Murni Pekerja: Rp {Number(gajiTawaran).toLocaleString('id-ID')}</p>
                    <p>• Biaya Pemeliharaan Aplikasi: Rp 2.500</p>
                    {isPriority && <p className="text-purple-600">• Fitur Akselerasi Prioritas: Rp 5.000</p>}
                    <div className="border-t border-dashed border-gray-200 my-2"></div>
                    <p className="text-xs md:text-sm font-black text-gray-800">Total Biaya Invoice: Rp {(Number(gajiTawaran) + 2500 + (isPriority ? 5000 : 0)).toLocaleString('id-ID')}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 md:py-4 rounded-xl font-black uppercase text-xs mt-4 disabled:bg-gray-300 transition-all">
                  {loading ? 'Sedang Memproses...' : '🚀 Pasang Lowongan Sekarang'}
                </button>
              </form>
            </div>
          )}

          {activeForm === 'mitra' && (
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
              <h2 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-tight mb-1">Gabung Mitra Pencari Kerja</h2>
              <p className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase mb-6">Daftarkan dirimu ke database agar langsung mendapat orderan</p>
              
              <form onSubmit={handleDaftarMitra} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nama Lengkap Pekerja</label>
                  <input type="text" placeholder="Nama lengkap kamu..." className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-blue-200" value={namaMitra} onChange={(e) => setNamaMitra(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nomor HP / WhatsApp Aktif</label>
                  <input type="text" placeholder="Contoh: 0857xxxxxx" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-blue-200" value={noHpMitra} onChange={(e) => setNoHpMitra(e.target.value)} required />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Keahlian Utama / Jenis Jasa Serabutan</label>
                  <input type="text" placeholder="Contoh: Setrika, Nyetir, Bersih-bersih Kos, Angkat Barang" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl outline-none text-sm mt-1 text-black border border-transparent focus:border-blue-200" value={keahlian} onChange={(e) => setKeahlian(e.target.value)} required />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 md:py-4 rounded-xl font-black uppercase text-xs mt-2 shadow-md disabled:bg-gray-300 transition-all">
                  {loading ? 'Menyimpan ke Sistem...' : '💼 Aktifkan Profil Mitra Kerja'}
                </button>
              </form>
            </div>
          )}

        </section>
      )}

      <footer className="text-center py-12 md:py-16 opacity-40 text-[10px] font-bold uppercase tracking-[6px] md:tracking-[10px] mt-12 border-t border-gray-100">
        © {new Date().getFullYear()} ServiGo Indonesia. All Rights Reserved.
      </footer>
    </main>
  )
}
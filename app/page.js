'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mode, setMode] = useState('login') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // STATE USER LOGIN
  const [userSession, setUserSession] = useState(null)
  
  // STATE FILTER KATEGORI
  const [selectedKategori, setSelectedKategori] = useState('Semua')

  // AMAN: Ditambahkan nilai cadangan string kunci asli agar @supabase/ssr tidak ngambek dan eror saat Vercel proses build awal
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plykglcgdhoxzsxupgox.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6"cGx5a2dsY2dkaG94enN4dXBnb3giLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc3NzM4NTEwMywiZXhwIjoyMDkyOTYxMTAzfQ.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'

  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUserSession(session?.user || null)
      } catch (err) {
        console.log("Session fetch skipped during build")
      }
    }
    getSession()
  }, [])

  // DATA KARTU TUGAS (Upah Pokok Sebelum Ditambah Admin/Prioritas)
  const semuaKartuTugas = [
    { id: 1, kategori: 'Rumah Tangga', nama: 'Jasa Setrika & Lipat Baju', hargaAsli: 25000, satuan: '/ Jam', lokasi: 'Kapuk, Jakarta Barat', wa: '6281234567890', icon: '🧺', isPriority: true },
    { id: 2, kategori: 'Rumah Tangga', nama: 'Jasa Bersih-bersih Rumah (Nyapu/Ngepel)', hargaAsli: 50000, satuan: '', lokasi: 'Cengkareng, Jakarta Barat', wa: '6281234567890', icon: '🧹', isPriority: false },
    { id: 3, kategori: 'Rumah Tangga', nama: 'Jasa Cuci Baju & Gosok', hargaAsli: 30000, satuan: '', lokasi: 'Grogol, Jakarta Barat', wa: '6281234567890', icon: '🧼', isPriority: false },
    { id: 4, kategori: 'Logistik', nama: 'Bantu Pindahan Rumah/Kos', hargaAsli: 150000, satuan: '', lokasi: 'Kalideres, Jakarta Barat', wa: '6281234567890', icon: '🚚', isPriority: true },
    { id: 5, kategori: 'Logistik', nama: 'Bantu Kirim & Antar Barang', hargaAsli: 75000, satuan: '', lokasi: 'Kapuk, Jakarta Barat', wa: '6281234567890', icon: '📦', isPriority: false },
    { id: 6, kategori: 'Logistik', nama: 'Bantu Antar Paket Kilat', hargaAsli: 15000, satuan: '', lokasi: 'Kembangan, Jakarta Barat', wa: '6281234567890', icon: '🛵', isPriority: false },
    { id: 7, kategori: 'Jasa Digital', nama: 'Jasa Pembuatan CV Kreatif', hargaAsli: 35000, satuan: '', lokasi: 'Online / Jakarta', wa: '6281234567890', icon: '📄', isPriority: false },
    { id: 8, kategori: 'Jasa Digital', nama: 'Jasa Ketik Tugas & Dokumen', hargaAsli: 5000, satuan: '/ Lembar', lokasi: 'Online', wa: '6281234567890', icon: '⌨️', isPriority: false },
    { id: 9, kategori: 'Jasa Digital', nama: 'Joki Tugas Kuliah & Sekolah', hargaAsli: 100000, satuan: '', lokasi: 'Online', wa: '6281234567890', icon: '📚', isPriority: true },
    { id: 10, kategori: 'Lainnya', nama: 'Jasa Jaga Orang Sakit di RS', hargaAsli: 150000, satuan: '/ Hari', lokasi: 'Cengkareng, Jakarta Barat', wa: '6281234567890', icon: '🏥', isPriority: false },
    { id: 11, kategori: 'Lainnya', nama: 'Jasa Antre Tiket / Sembako', hargaAsli: 20000, satuan: '', lokasi: 'Kebon Jeruk, Jakarta Barat', wa: '6281234567890', icon: '🚶', isPriority: false },
    { id: 12, kategori: 'Lainnya', nama: 'Jasa Packing Paket Penjualan', hargaAsli: 2000, satuan: '/ Paket', lokasi: 'Kapuk, Jakarta Barat', wa: '6281234567890', icon: '🎁', isPriority: false }
  ]

  // LOGIKA FILTER KATEGORI BARU (TERMASUK TOMBOL URGENT)
  const kartuYangMuncul = selectedKategori === 'Semua' 
    ? semuaKartuTugas 
    : selectedKategori === '🔥 URGENT'
      ? semuaKartuTugas.filter(item => item.isPriority === true)
      : semuaKartuTugas.filter(item => item.kategori === selectedKategori)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Daftar Berhasil! Silakan cek kotak masuk email kamu.')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        
        if (email === 'test@gmail.com') { 
          document.cookie = "session=true; path=/; SameSite=Lax"
          window.location.href = '/admin'
        } else {
          setUserSession(data.user)
          setMessage('Login Berhasil!')
        }
      }
    } catch (err) {
      setMessage('Gagal: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-gray-50 min-h-screen text-black pb-20 font-sans w-full overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white pt-16 pb-28 md:pt-20 md:pb-32 px-4 rounded-b-[40px] md:rounded-b-[50px] text-center shadow-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 uppercase tracking-tight">ServiGo</h1>
        <p className="opacity-90 max-w-xl mx-auto text-xs sm:text-sm px-2">Cari Cuan Harian & Hubungkan Pekerjaan Instan Sekali Klik.</p>
      </section>

      {/* FORM LOGIN / REGISTER */}
      {!userSession ? (
        <section className="px-4 sm:px-6 mt-[-60px] md:mt-[-80px] mb-12 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-blue-100">
            <h2 className="text-lg md:text-xl font-bold text-center mb-5 text-gray-800 uppercase italic">
              {mode === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input type="email" placeholder="Masukkan Email" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Masukkan Password" className="w-full bg-gray-50 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" onChange={(e) => setPassword(e.target.value)} required />
              <button disabled={loading} className="w-full bg-blue-600 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all uppercase text-xs tracking-wider disabled:bg-gray-300">
                {loading ? 'Sabar Ya...' : mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              </button>
            </form>
            <p className="text-center mt-5 text-[11px] font-bold text-gray-400">
              {mode === 'login' ? "Belum punya akun?" : "Sudah punya akun?"} 
              <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-blue-600 cursor-pointer ml-1 hover:underline">Klik di sini</span>
            </p>
            {message && <p className="text-center mt-4 text-xs font-bold text-blue-600 bg-blue-50 p-2 rounded-lg">{message}</p>}
          </div>
        </section>
      ) : (
        <section className="px-4 sm:px-6 mt-[-30px] md:mt-[-40px] mb-8 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border border-green-200 flex justify-between items-center gap-4">
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase">Selamat Datang 👋</p>
              <h3 className="font-black text-gray-800 text-xs md:text-sm truncate">{userSession.email}</h3>
            </div>
            <button onClick={async () => { await supabase.auth.signOut(); setUserSession(null); }} className="bg-red-50 hover:bg-red-100 text-red-600 font-black text-[10px] px-3 py-2 rounded-xl uppercase flex-shrink-0">
              Keluar
            </button>
          </div>
        </section>
      )}

      {/* FILTER KATEGORI */}
      <section className="px-4 sm:px-6 py-4">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="font-black mb-5 text-gray-800 text-base md:text-lg uppercase text-center italic tracking-tight">Pilih Kategori Jasa</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {['Semua', '🔥 URGENT', 'Rumah Tangga', 'Logistik', 'Jasa Digital', 'Lainnya'].map((kat) => (
              <button 
                key={kat} 
                onClick={() => setSelectedKategori(kat)} 
                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider transition-all ${
                  selectedKategori === kat 
                    ? kat === '🔥 URGENT'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105' 
                      : 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID KARTU TUGAS */}
      <section className="px-4 sm:px-6 py-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kartuYangMuncul.map((item) => {
              const biayaAdmin = 2500
              const biayaPrioritas = item.isPriority ? 5000 : 0
              const totalBayar = item.hargaAsli + biayaAdmin + biayaPrioritas

              return (
                <div key={item.id} className={`bg-white rounded-[1.8rem] md:rounded-[2rem] p-5 md:p-6 shadow-xl border flex flex-col justify-between hover:scale-[1.02] transition-all relative overflow-hidden ${item.isPriority ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-100'}`}>
                  
                  {item.isPriority && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white font-black text-[8px] md:text-[9px] px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow">
                      🔥 URGENT / KILAT
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-blue-50 text-blue-600 text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full uppercase">{item.kategori}</span>
                      <div className="text-3xl md:text-4xl mt-2">{item.icon}</div>
                    </div>
                    <h4 className="font-black text-gray-800 text-sm md:text-base mb-2 uppercase tracking-tight pr-10">{item.nama}</h4>
                    
                    {userSession ? (
                      <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-500">Upah Bersih: <span className="text-green-600 font-black">Rp {item.hargaAsli.toLocaleString('id-ID')} {item.satuan}</span></p>
                        <p className="text-[10px] font-bold text-purple-600">+ Administrasi: Rp 2.500</p>
                        {item.isPriority && <p className="text-[10px] font-bold text-indigo-600">+ Biaya Kilat Prioritas: Rp 5.000</p>}
                        <div className="border-t border-dashed border-gray-200 my-1"></div>
                        <p className="text-xs font-black text-gray-800">Total Pembayaran: Rp {totalBayar.toLocaleString('id-ID')} {item.satuan}</p>
                        <p className="text-[11px] text-gray-400 font-semibold flex items-center mt-2 break-words">📍 {item.lokasi}</p>
                      </div>
                    ) : (
                      <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-100 opacity-50">
                        <p className="text-xs font-bold text-gray-300">Upah Bersih: 🔒 Rp ???.???</p>
                        <p className="text-[10px] font-bold text-gray-300">+ Administrasi: Rp 2.500</p>
                        <div className="border-t border-dashed border-gray-200 my-1"></div>
                        <p className="text-xs font-black text-gray-300">Total Pembayaran: 🔒 Rp ???.???</p>
                        <p className="text-[11px] text-gray-300 font-semibold flex items-center mt-2">📍 Lokasi Terkunci</p>
                      </div>
                    )}
                  </div>

                  {userSession ? (
                    <button 
                      onClick={() => window.open(`https://wa.me/${item.wa}?text=Halo%20Admin,%20saya%20berminat%20mengambil%20pekerjaan%20${encodeURIComponent(item.nama)}%20di%20${encodeURIComponent(item.lokasi)}%20dengan%20Total%20Bayar%20Rp%20${totalBayar.toLocaleString('id-ID')}`, '_blank')}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider mt-5 md:mt-6 shadow-md transition-all flex justify-center items-center gap-2"
                    >
                      💬 Ambil Tugas & Hubungi WA
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setMessage('Kamu harus masuk/daftar akun dulu untuk mengambil tugas!');
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="w-full bg-gray-200 text-gray-400 font-black text-xs py-3 rounded-xl uppercase tracking-wider mt-5 md:mt-6"
                    >
                      🔒 Login Untuk Ambil Tugas
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="px-4 sm:px-6 mt-12 md:mt-16">
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-orange-400 to-amber-500 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white text-center shadow-xl">
          <h3 className="text-lg md:text-xl font-black uppercase mb-2">Tidak Ada Jasa yang Kalian Cari?</h3>
          <p className="text-xs opacity-90 mb-6 max-w-md mx-auto px-2">Sampaikan kebutuhan kerjamu ke Admin. Kami akan langsung hubungkan ke pencari kerja yang siap sedia!</p>
          <button 
            onClick={() => {
              if(userSession) {
                window.open('https://wa.me/6281234567890?text=Halo%20Admin%20ServiGo,%20saya%20butuh%20jasa%20custom', '_blank')
              } else {
                setMessage('Silakan login terlebih dahulu untuk menghubungi Admin!');
                window.scrollTo({ top: 150, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto bg-white text-orange-600 font-black px-6 py-3.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xs uppercase tracking-widest shadow-md hover:bg-orange-50 transition-all"
          >
            {userSession ? 'Hubungi Admin Yuk! 📞' : '🔒 Login untuk Hubungi Admin'}
          </button>
        </div>
      </section>

      <footer className="text-center py-12 md:py-16 opacity-40 text-[10px] font-bold uppercase tracking-[6px] md:tracking-[10px] mt-12 border-t border-gray-100">
        © {new Date().getFullYear()} ServiGo Indonesia. All Rights Reserved.
      </footer>
    </main>
  )
}
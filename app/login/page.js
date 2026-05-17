'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Konfigurasi Client Supabase resmi bawaan aplikasi kamu
  const supabase = createBrowserClient(
    'https://plykglcgdhoxzsxupgox.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseWtnbGNnZGhveHpzeHVwZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODUxMDMsImV4cCI6MjA5Mjk2MTEwM30.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'
  )

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('Sedang memverifikasi kredensial akses...')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('❌ Gagal Masuk: ' + error.message)
      setLoading(false)
    } else {
      // 🔐 AMAN & VALID: KARTU AKSES SATPAM (MIDDLEWARE) TUGAS 9 TETAP BERJALAN SEMPURNA
      document.cookie = "session=true; path=/; SameSite=Lax";
      setMessage('⚡ Otorisasi Berhasil! Membuka gerbang dasbor admin...')
      
      // Pengalihan bersih langsung menuju halaman admin utama
      setTimeout(() => {
        window.location.href = '/admin'
      }, 800)
    }
  }

  return (
    // AMAN: Ditambahkan w-full dan overflow-x-hidden agar bodi halaman terkunci rapat dari kebocoran layout
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 md:py-12 font-sans text-black w-full overflow-x-hidden">
      
      {/* Lebar maksimal dikunci max-w-md, namun fleksibel melar 100% mengikuti HP kecil */}
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-2xl border border-gray-100 flex flex-col animate-in fade-in duration-300">
        
        {/* HERO BANNER LOGIN - Responsif Text & Padding */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-10 md:py-12 px-4 md:px-6 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">ServiGo</h2>
          <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-widest opacity-80 font-bold px-2">
            Sistem Autentikasi Internal Dasbor Admin
          </p>
        </section>

        {/* INPUT FORM UTAMA - Padding disesuaikan agar tidak menjebol bodi HP 320px */}
        <div className="p-5 sm:p-6 md:p-10 space-y-5 md:space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            
            <div>
              <label className="block text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Alamat Email Administrator</label>
              <input
                type="email"
                placeholder="Masukkan email resmi admin..."
                className="w-full bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 md:py-3.5 focus:ring-2 focus:ring-purple-500 outline-none text-sm transition-all text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Kata Sandi Akses</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi..."
                className="w-full bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 md:py-3.5 focus:ring-2 focus:ring-purple-500 outline-none text-sm transition-all text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Proteksi klik ganda dengan state loading */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 md:py-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all mt-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Memvalidasi Enkripsi...' : '🔑 MASUK KE SISTEM KONTROL'}
            </button>
          </form>

          {/* AREA NOTIFIKASI / STATUS RESPONS */}
          {message && (
            <div className={`rounded-xl p-3.5 text-center text-xs font-bold border animate-in fade-in duration-300 ${
              message.includes('Gagal') 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : message.includes('Berhasil')
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {message}
            </div>
          )}

          {/* TOMBOL KEMBALI KE BERANDA (NAVIGASI UX TAMBAHAN) */}
          <div className="text-center pt-1">
            <span 
              onClick={() => window.location.href = '/'} 
              className="text-[10px] font-black text-purple-600 uppercase tracking-wider hover:underline cursor-pointer"
            >
              ← Kembali ke Beranda Utama
            </span>
          </div>

          {/* FOOTER BANTUAN LAYANAN */}
          <div className="text-center text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider pt-4 border-t border-gray-100">
            Internal Security System Gateway v1.0
          </div>
          
        </div>
      </div>
    </div>
  )
}
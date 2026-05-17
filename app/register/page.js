'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [role, setRole] = useState('pencari') // pencari, pemberi
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const router = useRouter()

  // Disamakan menggunakan createBrowserClient bawaan asli proyek Supabase kamu
  const supabase = createBrowserClient(
    'https://plykglcgdhoxzsxupgox.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseWtnbGNnZGhveHpzeHVwZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODUxMDMsImV4cCI6MjA5Mjk2MTEwM30.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'
  )

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { role: role } // Menyimpan peran user ke metadata Supabase Auth
      },
    })

    if (error) {
      setMessage('❌ Gagal: ' + error.message)
    } else {
      setMessage('✅ Registrasi Berhasil! Akun Anda telah terdaftar di sistem. Silakan buka halaman login untuk masuk.')
      setEmail('')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    // AMAN: Ditambahkan w-full dan overflow-x-hidden agar bodi halaman terkunci rapat dari kebocoran layout
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 md:py-12 font-sans text-black w-full overflow-x-hidden">
      
      {/* Lebar maksimal dikunci max-w-md, namun fleksibel melar 100% mengikuti HP kecil */}
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-2xl border border-gray-100 flex flex-col animate-in fade-in duration-300">
        
        {/* HEADER BANNER REGISTRASI - Responsif Text & Padding */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-10 px-4 md:px-6 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">ServiGo</h2>
          <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-widest opacity-80 font-bold px-2">
            Pembuatan Akun Baru
          </p>
        </section>

        {/* KONTEN UTAMA FORM - Padding disesuaikan agar tidak menjebol bodi HP 320px */}
        <div className="p-5 sm:p-6 md:p-10 space-y-5 md:space-y-6">
          
          {/* PILIHAN ROLE / PERAN */}
          <div className="space-y-1.5">
            <label className="block text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Daftar Sebagai Peran Apa?</label>
            <div className="flex bg-gray-200 p-1.5 rounded-2xl shadow-inner">
              <button 
                type="button"
                onClick={() => setRole('pencari')}
                className={`flex-1 py-2.5 text-[9px] md:text-[10px] font-black rounded-xl uppercase tracking-wider transition-all ${role === 'pencari' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
              >
                💼 PENCARI KERJA
              </button>
              <button 
                type="button"
                onClick={() => setRole('pemberi')}
                className={`flex-1 py-2.5 text-[9px] md:text-[10px] font-black rounded-xl uppercase tracking-wider transition-all ${role === 'pemberi' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
              >
                📢 PEMBERI KERJA
              </button>
            </div>
          </div>

          {/* FORM INPUT DATABASES */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Alamat Email Baru</label>
              <input
                type="email"
                placeholder="emailbaru@contoh.com"
                className="w-full bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 md:py-3.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1 mb-1">Kata Sandi (Password)</label>
              <input
                type="password"
                placeholder="Buat kata sandi minimal 6 karakter..."
                className="w-full bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 md:py-3.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Proteksi klik brutal ganda */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 md:py-4 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all mt-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses Pendaftaran...' : `✨ BUAT AKUN ${role.toUpperCase()}`}
            </button>
          </form>

          {/* NAVIGASI PINDAH KE HALAMAN LOGIN TERPISAH */}
          <div className="text-center text-xs pt-4 border-t border-gray-100 space-y-2">
            <p className="text-gray-500 font-medium text-[11px] md:text-xs">
              Sudah memiliki akun ServiGo?{" "}
              <span 
                onClick={() => router.push('/login')} 
                className="text-blue-600 cursor-pointer font-black hover:underline inline-block ml-0.5"
              >
                Masuk/Login di sini
              </span>
            </p>
            {/* Navigasi UX Tambahan Kembali ke Home */}
            <div>
              <span 
                onClick={() => window.location.href = '/'} 
                className="text-[10px] font-black text-gray-400 uppercase tracking-wider hover:underline cursor-pointer"
              >
                ← Beranda Utama
              </span>
            </div>
          </div>

          {message && (
            <div className={`rounded-xl p-3.5 text-center text-xs font-bold border animate-in fade-in duration-300 ${
              message.includes('Gagal') 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
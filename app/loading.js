export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center font-sans text-black px-4">
      <div className="flex flex-col items-center space-y-4">
        
        {/* ANIMASI SPINNER MUTER-MUTER */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        
        {/* TEKS INDIKATOR */}
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 animate-pulse">
            Mengambil Data Sistem
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mt-1">
            Menghubungkan ke Server ServiGo...
          </p>
        </div>

      </div>
    </div>
  )
}
'use server' 

import { supabase } from '@/supabase'

export async function simpanPesan(formData) {
  const nama = formData.get('nama')
  const email = formData.get('email')
  const pesanan = formData.get('pesan')

  const { error } = await supabase
    .from('pesanan')
    .insert([{ nama, email, pesanan }])

  if (error) return { success: false, message: error.message }
  return { success: true }
}
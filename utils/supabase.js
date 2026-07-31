import { createClient } from '@supabase/supabase-js'

// Gerçek Supabase Proje URL ve Anon Key Bilgilerin
const supabaseUrl = 'https://pnpulseudlnlefucqvxp.supabase.co'
const supabaseAnonKey = 'sb_publishable_KNV41faHRcQQbM78jagnBQ_e3D2Uf7D'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
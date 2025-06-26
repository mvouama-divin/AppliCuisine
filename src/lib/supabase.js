
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwvmmomxgudixinqoyom.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dm1tb214Z3VkaXhpbnFveW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMzI3NDEsImV4cCI6MjA1MDkwODc0MX0.mwvmmomxgudixinqoyom'

export const supabase = createClient(supabaseUrl, supabaseKey)

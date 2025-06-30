// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cthhbqosddsisuaelydz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aGhicW9zZGRzaXN1YWVseWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzQwMDEsImV4cCI6MjA2NTkxMDAwMX0.LUwAl8igpTgMJzt-BzCogBsWMd8GvYjuDUFilhCHrOA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

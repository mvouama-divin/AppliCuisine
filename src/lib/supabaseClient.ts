// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwvmmomxgudixinqoyom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dm1tb214Z3VkaXhpbnFveW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTk3NDYsImV4cCI6MjA2NDQ3NTc0Nn0.agvTc2MXdk7geftkiXVT20Af3K5gZ0KvnCV1XtROHAE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

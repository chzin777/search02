import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kxmfaghfbwykuxgalxfm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bWZhZ2hmYnd5a3V4Z2FseGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ4MjksImV4cCI6MjA3MDg0MDgyOX0.CWsJQTL8OLlMdfOzbitlep81-Xl9Ej3c6sEdDbFEvtk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

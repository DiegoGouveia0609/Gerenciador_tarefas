import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://amwdxyslbmxymvkkdahn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtd2R4eXNsYm14eW12a2tkYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MTc4MzgsImV4cCI6MjA0MTQ5MzgzOH0.0dT7o2nSckJ-QWR8-cRPhqYF9C_9mvOdIo-e7lrKTjc'; 
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
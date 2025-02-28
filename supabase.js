// supabase.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rayvzgprawpfcnvfutkj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJheXZ6Z3ByYXdwZmNudmZ1dGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MjA1NzksImV4cCI6MjA1NjI5NjU3OX0.DUWDuHsqcGA4qNhXfJo1qqnBK2KU3BjDPYItUhG-e-o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

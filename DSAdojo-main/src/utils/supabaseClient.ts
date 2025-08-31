import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amosytazqdgvdxribtag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtb3N5dGF6cWRndmR4cmlidGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDU5MzksImV4cCI6MjA2Njg4MTkzOX0.aBHndgfr1z5jmMhrkqyp9MC5dlhqqgwFIolrK7LviDo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
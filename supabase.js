import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'public-anon-key-placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

# Supabase Auth Queries

**Users Table (already in SUPABASE_SETUP.md):**
```sql
CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  is_admin bool DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own data" ON users FOR ALL USING (auth.uid() = user_id);
```

**LoginPage.tsx:** auth.signInWithPassword → auth.users

**RegisterPage.tsx:** auth.signUp → auth.users + users.insert

Test: register → both tables populated!


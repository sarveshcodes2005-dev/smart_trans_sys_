-- ============================================
-- SARV Database Fix — Run this in Supabase SQL Editor
-- This fixes the "infinite recursion" RLS policy error
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste this → Click "Run"
-- ============================================

-- Step 1: Drop ALL existing policies on profiles (they cause infinite recursion)
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Super admin reads all profiles" ON profiles;
DROP POLICY IF EXISTS "Super admin inserts profiles" ON profiles;
DROP POLICY IF EXISTS "Super admin updates profiles" ON profiles;
DROP POLICY IF EXISTS "Super admin deletes profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Step 2: Create a SECURITY DEFINER function to check if user is super_admin
-- This bypasses RLS and prevents the infinite recursion
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Step 3: Recreate policies using the function (no more recursion!)

-- Users can always read their OWN profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Super admins can read ALL profiles (using the safe function)
CREATE POLICY "Super admin reads all profiles" ON profiles
  FOR SELECT USING (is_super_admin());

-- Super admins can insert new profiles
CREATE POLICY "Super admin inserts profiles" ON profiles
  FOR INSERT WITH CHECK (is_super_admin());

-- Super admins can update any profile
CREATE POLICY "Super admin updates profiles" ON profiles
  FOR UPDATE USING (is_super_admin());

-- Super admins can delete any profile
CREATE POLICY "Super admin deletes profiles" ON profiles
  FOR DELETE USING (is_super_admin());

-- Users can insert their own profile (needed for signup flow)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Done! The infinite recursion is fixed.

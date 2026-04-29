-- ============================================
-- SARV Live Tracking Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the bus_locations table
CREATE TABLE IF NOT EXISTS bus_locations (
  bus_id TEXT PRIMARY KEY,
  driver_id UUID REFERENCES auth.users(id),
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  speed DOUBLE PRECISION DEFAULT 0,
  heading DOUBLE PRECISION DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row-Level Security
ALTER TABLE bus_locations ENABLE ROW LEVEL SECURITY;

-- 3. Enable Supabase Realtime for this table
-- This is critical to broadcast location updates to the map!
ALTER PUBLICATION supabase_realtime ADD TABLE bus_locations;

-- 4. Policy: Anyone authenticated can read bus locations
CREATE POLICY "Anyone can view live locations" ON bus_locations
  FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Policy: Drivers can insert their own bus location
CREATE POLICY "Drivers can insert locations" ON bus_locations
  FOR INSERT WITH CHECK (
    auth.uid() = driver_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'driver')
  );

-- 6. Policy: Drivers can update their own bus location
CREATE POLICY "Drivers can update locations" ON bus_locations
  FOR UPDATE USING (
    auth.uid() = driver_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'driver')
  );

-- Done! Realtime GPS tracking is now supported.

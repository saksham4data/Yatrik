-- Supabase Schema for Grey_Bus Migration

-- 1. Buses Table
CREATE TABLE IF NOT EXISTS buses (
    id SERIAL PRIMARY KEY,
    bus_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    route_start VARCHAR(100) NOT NULL,
    route_end VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Stops Table
CREATE TABLE IF NOT EXISTS stops (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES buses(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    stop_order INTEGER NOT NULL,
    arrival_time TIME NOT NULL,
    departure_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Schedules Table
CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES buses(id) ON DELETE CASCADE,
    schedule_date DATE NOT NULL,
    departure_time TIME,
    arrival_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Bus Locations Table
CREATE TABLE IF NOT EXISTS bus_locations (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES buses(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Passenger Profiles (Extending Supabase Auth Users)
-- Note: Supabase stores users in auth.users automatically when they sign up.
-- We link this table to auth.users using user_id.
CREATE TABLE IF NOT EXISTS passenger_profiles (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email VARCHAR(255) CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    address TEXT,
    addr1 VARCHAR(255),
    addr2 VARCHAR(255),
    postcode VARCHAR(20),
    state VARCHAR(100),
    area VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE passenger_profiles ENABLE ROW LEVEL SECURITY;

-- Setup Public Read Access Policies (Assuming schedules/buses are public)
CREATE POLICY "Public read access to buses" ON buses FOR SELECT USING (true);
CREATE POLICY "Public read access to stops" ON stops FOR SELECT USING (true);
CREATE POLICY "Public read access to schedules" ON schedules FOR SELECT USING (true);
CREATE POLICY "Public read access to locations" ON bus_locations FOR SELECT USING (true);

-- Allow public inserts/updates temporarily for seeding
CREATE POLICY "Public insert access to buses" ON buses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access to buses" ON buses FOR UPDATE USING (true);
CREATE POLICY "Public insert access to stops" ON stops FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access to schedules" ON schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access to locations" ON bus_locations FOR INSERT WITH CHECK (true);

-- Passenger profiles should only be readable/writable by the owner
CREATE POLICY "Users can view own profile" ON passenger_profiles 
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON passenger_profiles 
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON passenger_profiles 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

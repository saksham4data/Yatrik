const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parser');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to read CSV
const readCsv = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../../data', filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

async function seed() {
  try {
    console.log('Starting DB Seed Process...');

    // 1. Seed Buses
    console.log('Seeding buses.csv...');
    const buses = await readCsv('buses.csv');
    const { error: busErr } = await supabase.from('buses').upsert(
      buses.map(b => ({
        id: parseInt(b.id),
        bus_number: b.bus_number,
        name: b.name,
        route_start: b.route_start,
        route_end: b.route_end
      }))
    );
    if (busErr) throw busErr;

    // 2. Seed Stops
    console.log('Seeding stops.csv...');
    const stops = await readCsv('stops.csv');
    // Supabase will auto-generate 'id' since it wasn't in the CSV
    const { error: stopsErr } = await supabase.from('stops').insert(
      stops.map(s => ({
        bus_id: parseInt(s.bus_id),
        name: s.name,
        stop_order: parseInt(s.order),
        arrival_time: s.arrival_time,
        departure_time: s.departure_time || null
      }))
    );
    if (stopsErr) throw stopsErr;

    // 3. Seed Schedules
    console.log('Seeding schedules.csv...');
    const schedules = await readCsv('schedules.csv');
    const { error: schedErr } = await supabase.from('schedules').insert(
      schedules.map(s => ({
        bus_id: parseInt(s.bus_id),
        schedule_date: s.date,
        departure_time: s.departure_time || null,
        arrival_time: s.arrival_time
      }))
    );
    if (schedErr) throw schedErr;

    // 4. Seed Bus Locations
    console.log('Seeding bus_locations.csv...');
    const locations = await readCsv('bus_locations.csv');
    const { error: locErr } = await supabase.from('bus_locations').insert(
      locations.map(l => ({
        bus_id: parseInt(l.bus_id),
        latitude: parseFloat(l.latitude),
        longitude: parseFloat(l.longitude),
        last_updated: l.last_updated || new Date().toISOString()
      }))
    );
    if (locErr) throw locErr;

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message || error);
  }
}

seed();

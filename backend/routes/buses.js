const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Bus Search API
router.get('/search', async (req, res) => {
  const { source, destination } = req.query;

  try {
    // Fetch all buses with their related data
    const { data: buses, error } = await supabase.from('buses').select(`
      *,
      stops(*),
      locations:bus_locations(*),
      schedules(*)
    `);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!source || !destination) {
      // Return all buses if no specific route is searched
      return res.json(buses);
    }

    // Filter buses that travel from 'source' to 'destination' in the correct order
    const filteredBuses = buses.filter(bus => {
      const srcStop = bus.stops.find(s => s.name.toLowerCase() === source.toLowerCase());
      const destStop = bus.stops.find(s => s.name.toLowerCase() === destination.toLowerCase());
      
      // Ensure both stops exist and source comes before destination
      if (srcStop && destStop) {
        return srcStop.stop_order < destStop.stop_order;
      }
      return false;
    });

    res.json(filteredBuses);

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

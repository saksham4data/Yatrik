export default function MyTrackings() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Trackings</h2>
      <p>Here you can view the live locations of your booked buses.</p>
      <div style={{ padding: '15px', border: '1px solid #eee', marginTop: '20px' }}>
        <h3>No active trackings</h3>
        <p>You haven't booked any trips recently.</p>
      </div>
    </div>
  )
}

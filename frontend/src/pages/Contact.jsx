export default function Contact() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Contact Us</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <input type="text" placeholder="Your Name" style={{ padding: '10px' }} />
        <input type="email" placeholder="Your Email" style={{ padding: '10px' }} />
        <textarea placeholder="Your Message" rows="5" style={{ padding: '10px' }}></textarea>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>Send Message</button>
      </form>
    </div>
  )
}

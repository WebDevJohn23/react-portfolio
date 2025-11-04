import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <a className="anchor" id="contact"></a>
      <div className="divider"></div>
      <h2 id="section-title">
        Get In <span>Touch</span>
      </h2>
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            className="contact-form-field"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="contact-form-field"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            className="contact-form-field"
            name="message"
            placeholder="Tell me about your needs..."
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit" className="contact-form-submit">
            Send Message
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

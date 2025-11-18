// PAGE: src/components/sections/Contact.js
import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { getHomepage } from '../../api/getHomepage.js';
import './Contact.scss';

function getContactHeadline(data) {
  return data?.contact_section?.['contact_section_headline'] ?? '';
}

function getContactSubHeadline(data) {
  return data?.contact_section?.['contact_section_subheadline'] ?? '';
}

function getAdditionalText(data) {
  return data?.contact_section?.['contact_section_additional_text'] ?? '';
}

function getAdditionalTextUrl(data) {
  return data?.contact_section?.['contact_section_additional_text_url'] ?? '';
}

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  // Fetch contact copy from WordPress
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getHomepage({ signal: ac.signal });
        setContactData(data?.acf);
      } catch (e) {
        console.error('Failed to load contact data:', e);
      }
    })();
    return () => ac.abort();
  }, []);

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

  const contactHeadline = getContactHeadline(contactData);
  const contactSubHeadline = getContactSubHeadline(contactData);
  const additionalText = getAdditionalText(contactData);
  const additionalTextUrl = getAdditionalTextUrl(contactData);
  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <a className="anchor" id="contact"></a>
      <div className="divider"></div>
      <h2 id="section-title">
        Get In <span>Touch</span>
      </h2>
      <div className="contact-form-container">
        <h3 className="contact-headline">{contactHeadline}</h3>
        <span className="contact-subheadline">{contactSubHeadline}</span>

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
          <div>
            <button type="submit" className="contact-form-submit contact-form-field">
              Send Message
            </button>
          </div>

          {status && <p className="form-status">{status}</p>}
        </form>
        <div className="contact-additional">
          <span className="contact-additional-text">{additionalText} </span>
          <a href={`https://${additionalTextUrl}`}>
            {' '}
            <span className="contact-additional-textUrl">{additionalTextUrl}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

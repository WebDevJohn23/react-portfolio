// PAGE: src/components/sections/Contact.js
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { getHomepage } from '../../api/getHomepage.js';
import './Contact.scss';

function getContactHeadline(data) {
  const raw = data?.contact_section?.['contact_section_headline'] ?? '';
  return typeof raw === 'string' ? raw : '';
}

function getContactSubHeadline(data) {
  const raw = data?.contact_section?.['contact_section_subheadline'] ?? '';
  return typeof raw === 'string' ? raw : '';
}

function getAdditionalText(data) {
  const raw = data?.contact_section?.['contact_section_additional_text'] ?? '';
  return typeof raw === 'string' ? raw : '';
}

function getAdditionalTextUrl(data) {
  const raw = data?.contact_section?.['contact_section_additional_text_url'] ?? '';
  return typeof raw === 'string' ? raw : '';
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

  // Validate URL
  const safeUrl =
    additionalTextUrl && /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})/.test(additionalTextUrl)
      ? `https://${additionalTextUrl}`
      : null;

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <a className="anchor" id="contact"></a>
      <div className="divider"></div>
      <h2 id="section-title">
        Get In <span>Touch</span>
      </h2>

      <div className="contact-form-container">
        {/* HEADLINES */}
        <h3
          className="contact-headline"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contactHeadline) }}
        />

        <span
          className="contact-subheadline"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contactSubHeadline) }}
        />

        {/* FORM */}
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
            <button type="submit" className="button button--primary button--full">
              Send Message
            </button>
          </div>

          {status && <p className="form-status">{status}</p>}
        </form>

        {/* ADDITIONAL TEXT */}
        <div className="contact-additional">
          <span
            className="contact-additional-text"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(additionalText) }}
          />

          {safeUrl && (
            <a href={safeUrl} target="_blank" rel="noopener noreferrer">
              <span className="contact-additional-textUrl">{additionalTextUrl}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

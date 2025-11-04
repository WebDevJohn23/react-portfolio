import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import { getHomepage } from '../../api/getHomepage.js';

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
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
    emailjs
      .send('service_o9i6v3c', 'template_7oblvso', formData, publicKey)
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
        <h3 className="contact-headline" dangerouslySetInnerHTML={{ __html: contactHeadline }} />
        <span
          className="contact-subheadline"
          dangerouslySetInnerHTML={{ __html: contactSubHeadline }}
        />

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
          <span
            className="contact-additional-text"
            dangerouslySetInnerHTML={{ __html: additionalText + ' ' }}
          />
          <span
            className="contact-additional-textUrl"
            dangerouslySetInnerHTML={{ __html: additionalTextUrl }}
          />
        </div>
      </div>
    </section>
  );
}

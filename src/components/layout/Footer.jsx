// PAGE: src/components/layout/Footer.jsx
import './Footer.scss';
import { useEffect } from 'react';

const updatedAt =
  // eslint-disable-next-line no-undef
  typeof __BUILD_DATE__ !== 'undefined' ? new Date(__BUILD_DATE__).toLocaleDateString() : 'unknown';

export default function Footer() {
  useEffect(() => {
    // Dynamically inject the feedback widget script
    const script = document.createElement('script');
    script.src = 'https://feedback.johnathanjulig.com/widget.js';
    script.setAttribute('data-site', 'react-portfolio');
    script.setAttribute('data-api-url', 'https://feedback.johnathanjulig.com');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="global-footer">
      This site last updated: {updatedAt} – additional improvements in progress.
    </footer>
  );
}

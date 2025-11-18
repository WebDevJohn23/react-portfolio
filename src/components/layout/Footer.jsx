// PAGE: src/components/layout/Footer.jsx
import './Footer.scss';

const updatedAt =
  typeof __BUILD_DATE__ !== 'undefined' ? new Date(__BUILD_DATE__).toLocaleDateString() : 'unknown';

export default function Footer() {
  return (
    <footer className="global-footer">
      This site last updated: {updatedAt} – additional imporvements in progress.
    </footer>
  );
}

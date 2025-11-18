// PAGE: src/app.jsx
// Header + main content
import { Header, MainContent } from './components';

export default function App() {
  return (
    <>
      <Header />
      <MainContent />
      <p
        style={{
          fontSize: '0.8rem',
          opacity: 0.65,
          textAlign: 'center',
          marginTop: '4rem',
          marginBottom: '3rem',
        }}
      >
        Last updated: November 3rd, 2025 – additional updates in progress.
      </p>
    </>
  );
}

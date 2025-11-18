// PAGE: src/app.jsx
// Header + main content
import './App.css';
import { Header, MainContent } from './components';

export default function App() {
  return (
    <>
      <Header />
      <MainContent />
      <footer className="global-footer">
        Last updated: November 18th, 2025 – additional updates in progress.
      </footer>
    </>
  );
}

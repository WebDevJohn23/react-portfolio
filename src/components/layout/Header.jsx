// PAGE: src/components/layout/Header.jsx
// Site header with navigation links
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="#">Johnathan Julig</a>
      </div>
      <div className="header-right">
        <ul className="menu-item-list">
          <li className="menu-item">
            <a href="#stack">Stack</a>
          </li>
          <li className="menu-item">
            <a href="#projects">Projects</a>
          </li>
          <li className="menu-item">
            <a href="#about">About</a>
          </li>
          <li className="menu-item">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

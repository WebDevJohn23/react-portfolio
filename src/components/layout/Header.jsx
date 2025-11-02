import './Header.scss';
export default function Header() {
    return (
        <header className="header">
            <div className="logo padding-20">
                <a href="#">Johnathan Julig</a>
            </div>
            <div className="header-right">
<ul>
    <li className="menu-item padding-20"><a href="#stack">Stack</a></li>
    <li className="menu-item padding-20"><a href="#projects">Projects</a></li>
    <li className="menu-item padding-20"><a href="#about">About</a></li>
    <li className="menu-item padding-20"><a href="#contact">Contact</a></li>
</ul>
            </div>
        </header>
    );
}
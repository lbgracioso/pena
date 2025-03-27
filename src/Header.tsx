import './css/Header.css';

function Header() {
    return (
        <header className="header">
            <h1>Pena</h1>
            <nav>
                <ul>
                    <li><a href="https://github.com/lbgracioso/pena">Contribute on GitHub</a></li>
                    <li>
                        <iframe src="https://github.com/sponsors/lbgracioso/button" title="Sponsor" height="32" width="114"></iframe>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
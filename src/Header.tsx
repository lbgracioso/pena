import './css/Header.css';
import I18n from "./components/i18n";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {FaSun, FaMoon} from "react-icons/fa";

function Header() {

    const {t} =  useTranslation();

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

        useEffect(() => {
            document.body.className = theme;
            localStorage.setItem("theme", theme);
        }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    return (
        <header className="header">
            <h1>Pena</h1>
            <nav>
                <ul>
                    <li><I18n /></li>
                    <li>
                        <button onClick={toggleTheme} className="theme-toggle">
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                        </button>
                    </li>
                    <li><a href="https://github.com/lbgracioso/pena">{t("Contribute")}</a></li>
                    <li>
                        <iframe src="https://github.com/sponsors/lbgracioso/button"
                                title={t("Sponsor")} height="32" width="114"></iframe>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
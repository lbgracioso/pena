import './css/Header.css';
import I18n from "./components/i18n";
import {useTranslation} from "react-i18next";

function Header() {

    const {t} =  useTranslation();

    return (
        <header className="header">
            <h1>Pena</h1>
            <nav>
                <ul>
                    <li>
                        <I18n />
                    </li>
                    <li><a href="https://github.com/lbgracioso/pena">{t("Contribute")}</a></li>
                    <li>
                        <iframe src="https://github.com/sponsors/lbgracioso/button" title={t("Sponsor")} height="32" width="114"></iframe>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
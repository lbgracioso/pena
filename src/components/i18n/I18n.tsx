import { useTranslation } from 'react-i18next';
import Flag from './Flag';

const I18n = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language: 'pt-BR' | 'en-US') => {
        i18n.changeLanguage(language);
    };

    const selectedLanguage = i18n.language;

    return (
        <div className="flags-container">
            <Flag
                country="br"
                isSelected={selectedLanguage === 'pt-BR'}
                onClick={() => handleChangeLanguage('pt-BR')}
            />
            <Flag
                country="us"
                isSelected={selectedLanguage === 'en-US'}
                onClick={() => handleChangeLanguage('en-US')}
            />
        </div>
    );
};

export default I18n;

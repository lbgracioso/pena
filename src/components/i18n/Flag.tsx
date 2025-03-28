import React from 'react';
import { US, BR } from 'country-flag-icons/react/3x2';

interface FlagProps {
    country: 'us' | 'br';
    isSelected: boolean;
    onClick: () => void;
}

const Flag: React.FC<FlagProps> = ({ country, isSelected, onClick }) => {
    const FlagComponent = country === 'us' ? US : BR;

    return (
        <FlagComponent
            title={country === 'us' ? 'United States' : 'Brazil'}
            className={`flag-icon ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            style={{ cursor: 'pointer', fontSize: '2rem', margin: '0 5px' }}
        />
    );
};

export default Flag;

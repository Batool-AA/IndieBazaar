import React, { useState } from 'react';
import './dropdown.css'; // Ensure this CSS file contains the styles above

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Search');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option); // Pass selected option to parent component if needed
    };

    return (
        <div className="dropdown-container" onClick={toggleDropdown}>
            <span className="dropdown-icon">▼</span>
            <span className="dropdown-selected">{selectedOption}</span>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

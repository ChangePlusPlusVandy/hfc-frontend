import React, { useEffect, useRef, useState } from "react";
import CloseIcon from './CloseIcon';
import Icon from './Icon';

import "./Dropdown.css";


const Dropdown = ({
    placeHolder,
    options,
    isMulti,
    isSearchable,
    onChange,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        if (isMulti) {
            return (
                <div className="dropdown-tags">
                    {selectedValue.map((option) => (
                        <div key={option.value} className="dropdown-tag-item">
                            {option.label}
                            <span
                                onClick={(e) => onTagRemove(e, option)}
                                className="dropdown-tag-close"
                            >
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return selectedValue.label;
    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option) => {
        if (isMulti) {
            return (
                selectedValue.filter((o) => o.value === option.value).length > 0
            );
        }

        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >=
                0
        );
    };

    return (
        <div className="dropdown-container">
            <div
                ref={inputRef}
                onClick={handleInputClick}
                className="dropdown-input"
            >
                <div className="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    {isSearchable && (
                        <div className="search-box">
                            <input
                                onChange={onSearch}
                                value={searchValue}
                                ref={searchRef}
                            />
                        </div>
                    )}
                    {getOptions().map((option) => (
                        <div
                            onClick={() => onItemClick(option)}
                            key={option.value}
                            className={`dropdown-item ${
                                isSelected(option) && "selected"
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

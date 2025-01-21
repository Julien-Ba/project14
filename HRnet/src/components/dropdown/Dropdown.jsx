import './dropdown.scss';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { convertString } from 'str-case-converter';
import { ChevronDown } from '../icons';

export default function Dropdown({ id, className, options, onSelect }) {
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [activeIndex, setActiveIndex] = useState(0);
    const [spacerPosition, setSpacerPosition] = useState(0);

    const handleSelect = useCallback(
        (option) => {
            setIsOpen(false);
            setInputValue(option);
            setActiveIndex(0);
            // push to the macro task queue to make sure it reset the options after the filtering once it has been selected
            setTimeout(() => {
                setFilteredOptions(options);
            }, 0);
            if (onSelect) onSelect(option);
        },
        [options, onSelect]
    );

    useEffect(() => {
        if (isOpen && dropdownRef.current && listRef.current) {
            // calculate the distance between the top of the screen and the bottom of the dropdown
            // allow us to setup a 'margin-bottom' on a position absolute element
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const listHeight = listRef.current.offsetHeight;
            const absolutePosition =
                dropdownRect.top + window.scrollY + dropdownRect.height + listHeight;
            setSpacerPosition(absolutePosition);
        }

        function scrollIntoView(index) {
            if (!filteredOptions[index]) return;
            const element = document.getElementById(
                `${id}-option-${convertString.toKebab(
                    filteredOptions[index].name || filteredOptions[index]
                )}`
            );
            if (element) {
                element.scrollIntoView({ block: 'nearest' });
            }
        }

        function closeDropdown() {
            setIsOpen(false);
            setActiveIndex(0);
        }

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        function handleCloseKeys(event) {
            if (event.key === 'Escape') {
                closeDropdown();
            } else if (event.key === 'Enter') {
                if (filteredOptions.length > 0) {
                    const selectedOption = filteredOptions[activeIndex];
                    handleSelect(selectedOption.name || selectedOption);
                }
            }
        }

        function handleNavigateKeys(event) {
            if (!dropdownRef || !dropdownRef.current.contains(event.target)) return;
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                if (!isOpen) setIsOpen(true);
                setActiveIndex((prev) => {
                    let newIndex;
                    if (event.key === 'ArrowDown')
                        newIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
                    if (event.key === 'ArrowUp')
                        newIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
                    scrollIntoView(newIndex);
                    return newIndex;
                });
            }
        }

        const controller = new AbortController();
        document.addEventListener('keydown', handleNavigateKeys, {
            signal: controller.signal,
        });
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside, {
                signal: controller.signal,
            });
            document.addEventListener('keydown', handleCloseKeys, {
                signal: controller.signal,
            });
        }
        return () => controller.abort();
    }, [isOpen, activeIndex, filteredOptions, id, handleSelect]);

    useEffect(() => {
        const filtered = options.filter((option) => {
            const optionName = option.name || option;
            return optionName.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredOptions(filtered);
        setActiveIndex(0);
    }, [inputValue, options]);

    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);
        if (!isOpen) setIsOpen(true);
    }

    function handleInputClick(event) {
        setIsOpen((prev) => !prev);
        if (inputValue) {
            event.target.select();
        }
    }

    return (
        <>
            <div
                className='dropdown'
                role='combobox'
                aria-expanded={isOpen}
                aria-haspopup='listbox'
                aria-controls={`${id}-listbox`}
                ref={dropdownRef}
            >
                <div className='dropdown__input-wrapper'>
                    <input
                        className={className ? `${className} dropdown__input` : 'dropdown__input'}
                        type='text'
                        aria-autocomplete='list'
                        id={id}
                        name={id}
                        onClick={handleInputClick}
                        value={inputValue}
                        onChange={handleInputChange}
                        {...(isOpen && filteredOptions.length > 0
                            ? {
                                  'aria-activedescendant': `${id}-option-${convertString.toKebab(
                                      filteredOptions[activeIndex].name ||
                                          filteredOptions[activeIndex]
                                  )}`,
                              }
                            : {})}
                    />
                    <ChevronDown className='dropdown__icon' aria-hidden='true' rotate={isOpen} />
                </div>
                {isOpen && (
                    <ul role='listbox' ref={listRef} id={`${id}-listbox`} aria-labelledby={id}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const optionName = option.name || option;
                                return (
                                    <li
                                        role='option'
                                        aria-selected={
                                            inputValue === optionName || index === activeIndex
                                        }
                                        key={optionName}
                                        id={`${id}-option-${convertString.toKebab(optionName)}`}
                                        onClick={() => handleSelect(optionName)}
                                        className={
                                            index === activeIndex ? 'dropdown__option--active' : ''
                                        }
                                    >
                                        {optionName}
                                    </li>
                                );
                            })
                        ) : (
                            <li className='dropdown__no-results'>No matches found</li>
                        )}
                    </ul>
                )}
            </div>
            {isOpen &&
                // place the spacer in the root so we can set the position relative to it
                createPortal(
                    <div
                        className='spacer'
                        style={{
                            position: 'absolute',
                            height: '1rem',
                            left: 0,
                            right: 0,
                            top: `${spacerPosition}px`,
                        }}
                        aria-hidden='true'
                    />,
                    document.getElementById('root')
                )}
        </>
    );
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
};

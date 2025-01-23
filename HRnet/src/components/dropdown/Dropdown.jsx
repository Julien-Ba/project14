import './dropdown.scss';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { convertString } from 'str-case-converter';
import DropdownSpacer from './subcomponents/DropdownSpacer';
import DropdownOptions from './subcomponents/DropdownOptions';
import DropdownInput from './subcomponents/DropdownInput';

export default function Dropdown({ id, className, options, onSelect, value = '' }) {
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [activeIndex, setActiveIndex] = useState(0);
    const [spacerPosition, setSpacerPosition] = useState(0);

    /**
     * Handler function used in both effect and element
     */
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

    /**
     * Allow the value to be controlled by the parent
     * eg: set a default value or reset it on form submit
     */
    useEffect(() => {
        setInputValue(value);
        setFilteredOptions(options);
    }, [value, options]);

    /**
     * Event handlers effect
     */
    useEffect(() => {
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
            if (event.key === 'Escape' || event.key === 'Tab') {
                closeDropdown();
            } else if (event.key === 'Enter') {
                event.preventDefault();
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

    /**
     * Search filter effect
     */
    useEffect(() => {
        // avoid filter when a default value is set
        if (inputValue === '' || inputValue !== value) {
            const filtered = options.filter((option) => {
                const optionName = option.name || option;
                return optionName.toLowerCase().includes(inputValue.toLowerCase());
            });
            setFilteredOptions(filtered);
            setActiveIndex(0);
        }
    }, [inputValue, options, value]);

    /**
     * calculate the distance between the top of the screen and the bottom of the dropdown
     * allow us to setup a 'margin-bottom' on a position absolute element
     */
    useEffect(() => {
        if (isOpen && dropdownRef.current && listRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const listHeight = listRef.current.offsetHeight;
            const absolutePosition =
                dropdownRect.top + window.scrollY + dropdownRect.height + listHeight;
            setSpacerPosition(absolutePosition);
        }
    }, [isOpen]);

    /**
     * Handler functions used directly in elements
     */
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
        <div
            className='dropdown'
            role='combobox'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={`${id}-listbox`}
            ref={dropdownRef}
        >
            <DropdownInput
                className={className}
                id={id}
                handleInputClick={handleInputClick}
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                filteredOptions={filteredOptions}
                activeIndex={activeIndex}
                isOpen={isOpen}
            />
            {isOpen && (
                <ul role='listbox' ref={listRef} id={`${id}-listbox`} aria-labelledby={id}>
                    <DropdownOptions
                        filteredOptions={filteredOptions}
                        inputValue={inputValue}
                        activeIndex={activeIndex}
                        id={id}
                        handleSelect={handleSelect}
                    />
                </ul>
            )}
            <DropdownSpacer isOpen={isOpen} spacerPosition={spacerPosition} />
        </div>
    );
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    value: PropTypes.string,
};

import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';

export default function DropdownOptions({
    filteredOptions,
    inputValue,
    activeIndex,
    id,
    handleSelect,
}) {
    if (filteredOptions.length < 1) {
        return <li className='dropdown__no-results'>No matches found</li>;
    }

    return (
        <>
            {filteredOptions.map((option, index) => {
                const optionName = option.name || option;
                return (
                    <li
                        role='option'
                        aria-selected={inputValue === optionName || index === activeIndex}
                        key={optionName}
                        id={`${id}-option-${convertString.toKebab(optionName)}`}
                        onClick={() => handleSelect(optionName)}
                        className={index === activeIndex ? 'dropdown__option--active' : ''}
                    >
                        {optionName}
                    </li>
                );
            })}
        </>
    );
}

DropdownOptions.propTypes = {
    filteredOptions: PropTypes.array.isRequired,
    inputValue: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

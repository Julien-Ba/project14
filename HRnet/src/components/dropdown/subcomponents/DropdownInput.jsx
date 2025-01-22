import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';
import { ChevronDown } from '@components/icons';

export default function DropdownInput({
    className,
    id,
    handleInputClick,
    inputValue,
    handleInputChange,
    filteredOptions,
    activeIndex,
    isOpen,
}) {
    return (
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
                              filteredOptions[activeIndex].name || filteredOptions[activeIndex]
                          )}`,
                      }
                    : {})}
            />
            <ChevronDown className='dropdown__icon' aria-hidden='true' rotate={isOpen} />
        </div>
    );
}

DropdownInput.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    handleInputClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    filteredOptions: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

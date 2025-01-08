import PropTypes from 'prop-types';
import { snakeToKebab } from '../../../utils/stringsFormat';

export default function FormSelect({ options, selectName, formName, ...props }) {
    const kebabFormName = snakeToKebab(formName);
    const kebabSelectName = snakeToKebab(selectName);

    return (
        <select
            className={`${kebabFormName}-form__select`}
            id={kebabFormName + kebabSelectName}
            name={kebabFormName + kebabSelectName}
            {...props}
        >
            {options.map((option) => (
                <option className={`${kebabFormName}-form__option`} key={option.name || option}>
                    {option.name || option}
                </option>
            ))}
        </select>
    );
}

FormSelect.propTypes = {
    options: PropTypes.array,
    selectName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
};

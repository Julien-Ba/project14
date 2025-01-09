import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../store/atoms';
import { snakeToCamel, snakeToKebab } from '../../../utils/stringsFormat';

export default function FormSelect({ options, selectName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);

    const camelFormName = snakeToCamel(formName);
    const kebabFormName = snakeToKebab(formName);
    const camelSelectName = snakeToCamel(selectName);
    const kebabSelectName = snakeToKebab(selectName);

    return (
        <select
            className={`${kebabFormName}-form__select`}
            id={kebabFormName + kebabSelectName}
            name={kebabFormName + kebabSelectName}
            value={formData[camelFormName]?.[camelSelectName] || ''}
            onChange={(event) =>
                setFormData({
                    ...formData,
                    [camelFormName]: {
                        ...formData[camelFormName],
                        [camelSelectName]: event.target.value,
                    },
                })
            }
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

import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../store/atoms';
import { convertString } from 'str-case-converter';

export default function FormSelect({ options, selectName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);

    const camelFormName = convertString.toCamel(formName);
    const kebabFormName = convertString.toKebab(formName);
    const camelSelectName = convertString.toCamel(selectName);
    const kebabSelectName = convertString.toKebab(selectName);

    return (
        <select
            className={`${kebabFormName}-form__select`}
            id={`${kebabFormName}-${kebabSelectName}`}
            name={`${kebabFormName}-${kebabSelectName}`}
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

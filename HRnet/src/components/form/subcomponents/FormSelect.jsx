import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../store/atoms';
import { convertString } from 'str-case-converter';
import Dropdown from '../../dropdown/Dropdown';

export default function FormSelect({ options, selectName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);

    const camelFormName = convertString.toCamel(formName);
    const kebabFormName = convertString.toKebab(formName);
    const camelSelectName = convertString.toCamel(selectName);
    const kebabSelectName = convertString.toKebab(selectName);

    return (
        <>
            <Dropdown
                id={`${kebabFormName}-${kebabSelectName}`}
                className={'form__input'}
                options={options}
                onSelect={(value) =>
                    setFormData({
                        ...formData,
                        [camelFormName]: {
                            ...formData[camelFormName],
                            [camelSelectName]: value,
                        },
                    })
                }
                {...props}
            />
            {/* 
            <select
                className='form__select'
                name={`${kebabFormName}-${kebabSelectName}`}
                id={`${kebabFormName}-${kebabSelectName}`}
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
                    <option className='form__option' key={option.name || option}>
                        {option.name || option}
                    </option>
                ))}
            </select> 
            */}
        </>
    );
}

FormSelect.propTypes = {
    options: PropTypes.array,
    selectName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
};

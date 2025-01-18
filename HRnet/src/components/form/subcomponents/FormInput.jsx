import { useAtom, useSetAtom } from 'jotai';
import PropTypes from 'prop-types';
import { formDataAtom, formErrorAtom } from '../../../store/atoms';
import { convertString } from 'str-case-converter';
import FormInputDate from './FormInputDate';

export default function FormInput({ type, inputName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);
    const setFormError = useSetAtom(formErrorAtom);

    const camelFormName = convertString.toCamel(formName);
    const camelInputName = convertString.toCamel(inputName);

    if (type === 'date') {
        return <FormInputDate inputName={inputName} formName={formName} {...props} />;
    }

    return (
        <input
            className='form__input'
            type={type ? type : 'text'}
            {...props}
            value={formData[camelFormName]?.[camelInputName] || ''}
            onChange={(event) => {
                setFormError({});
                setFormData({
                    ...formData,
                    [camelFormName]: {
                        ...formData[camelFormName],
                        [camelInputName]: event.target.value,
                    },
                });
            }}
        />
    );
}

FormInput.propTypes = {
    inputName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    type: PropTypes.string,
};

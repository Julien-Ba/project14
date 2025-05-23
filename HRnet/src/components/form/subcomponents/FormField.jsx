import PropTypes from 'prop-types';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { useAtomValue } from 'jotai';
import { formErrorAtom } from '@store/atoms';
import { convertString } from 'str-case-converter';

export default function FormField({ formName, field, ...props }) {
    const formError = useAtomValue(formErrorAtom);
    const kebabFormName = convertString.toKebab(formName);
    const kebabFieldName = convertString.toKebab(field.name);
    const camelFieldName = convertString.toCamel(field.name);
    const titleFieldName = convertString.toTitle(field.name);

    return (
        <div className='form__field'>
            <label
                id={`${kebabFormName}-${kebabFieldName}-label`}
                className='form__label'
                htmlFor={`${kebabFormName}-${kebabFieldName}`}
            >
                {titleFieldName}
            </label>
            {field?.type === 'select' ? (
                <FormSelect
                    options={field.options}
                    selectName={field.name}
                    formName={formName}
                    {...props}
                />
            ) : (
                <FormInput
                    type={field?.type}
                    inputName={field.name}
                    formName={formName}
                    {...props}
                />
            )}
            {formError[camelFieldName] && <div className='error'>{formError[camelFieldName]}</div>}
        </div>
    );
}

FormField.propTypes = {
    formName: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
};

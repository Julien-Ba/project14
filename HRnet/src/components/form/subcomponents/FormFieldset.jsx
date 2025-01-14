import PropTypes from 'prop-types';
import FormField from './FormField';
import { convertString } from 'str-case-converter';

export default function FormFieldset({ formName, fieldset, ...props }) {
    const kebabFormName = convertString.toKebab(formName);
    const titleFieldsetName = convertString.toTitle(fieldset.name);

    return (
        <fieldset className={`${kebabFormName}-form__fieldset`}>
            <legend className={`${kebabFormName}-form__legend`}>{titleFieldsetName}</legend>
            {fieldset.fields.map((field) => (
                <FormField key={field.name} formName={formName} field={field} {...props} />
            ))}
        </fieldset>
    );
}

FormFieldset.propTypes = {
    fieldset: PropTypes.object.isRequired,
    formName: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import FormField from './FormField';
import { snakeToKebab, snakeToTitle } from '../../../utils/stringsFormat';

export default function FormFieldset({ fields, fieldsetName, formName }) {
    const kebabFormName = snakeToKebab(formName);
    const titleFieldsetName = snakeToTitle(fieldsetName);

    return (
        <fieldset className={`${kebabFormName}-form__fieldset`}>
            <legend className={`${kebabFormName}-form__legend`}>{titleFieldsetName}</legend>
            {fields.map((field) => (
                <FormField key={field.name} fieldName={field.name} formName={formName} {...field} />
            ))}
        </fieldset>
    );
}

FormFieldset.propTypes = {
    fields: PropTypes.array.isRequired,
    fieldsetName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
};

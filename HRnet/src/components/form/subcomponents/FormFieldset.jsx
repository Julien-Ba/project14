import PropTypes from 'prop-types';
import FormField from './FormField';
import { snakeToKebab, snakeToTitle } from '../../../utils/stringsFormat';

export default function FormFieldset({ formName, fieldset }) {
    const kebabFormName = snakeToKebab(formName);
    const titleFieldsetName = snakeToTitle(fieldset.name);

    return (
        <fieldset className={`${kebabFormName}-form__fieldset`}>
            <legend className={`${kebabFormName}-form__legend`}>{titleFieldsetName}</legend>
            {fieldset.fields.map((field) => (
                <FormField key={field.name} formName={formName} field={field} />
            ))}
        </fieldset>
    );
}

FormFieldset.propTypes = {
    fieldset: PropTypes.object.isRequired,
    formName: PropTypes.string.isRequired,
};

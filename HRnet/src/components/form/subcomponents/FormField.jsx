import PropTypes from 'prop-types';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { snakeToKebab, snakeToTitle } from '../../../utils/stringsFormat';

export default function FormField({ formName, field, ...props }) {
    const kebabFormName = snakeToKebab(formName);
    const titleFieldName = snakeToTitle(field.name);

    return (
        <div className={`${kebabFormName}-form__field`}>
            <label className={`${kebabFormName}-form__label`}>{titleFieldName}</label>
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
        </div>
    );
}

FormField.propTypes = {
    formName: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
};

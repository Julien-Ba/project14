import PropTypes from 'prop-types';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { snakeToKebab, snakeToTitle } from '../../../utils/stringsFormat';

export default function FormField({ type, fieldName, options, formName, ...props }) {
    const kebabFormName = snakeToKebab(formName);
    const titleFieldName = snakeToTitle(fieldName);

    return (
        <div className={`${kebabFormName}-form__field`}>
            <label className={`${kebabFormName}-form__label`}>{titleFieldName}</label>
            {type === 'select' ? (
                <FormSelect
                    options={options}
                    selectName={fieldName}
                    formName={formName}
                    {...props}
                />
            ) : (
                <FormInput type={type} inputName={fieldName} formName={formName} {...props} />
            )}
        </div>
    );
}
FormField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.array,
};

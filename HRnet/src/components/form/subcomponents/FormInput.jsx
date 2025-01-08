import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import { formDataAtom } from '../../../store/atoms';
import { snakeToCamel, snakeToKebab } from '../../../utils/stringsFormat';

export default function FormInput({ type, inputName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);

    const camelFormName = snakeToCamel(formName);
    const kebabFormName = snakeToKebab(formName);
    const camelInputName = snakeToCamel(inputName);
    const kebabInputName = snakeToKebab(inputName);

    return (
        <input
            className={`${kebabFormName}-form__input`}
            type={type ? type : 'text'}
            id={`${kebabFormName}-${kebabInputName}`}
            {...props}
            value={formData[camelFormName][camelInputName]}
            onChange={(value) =>
                setFormData({
                    ...formData,
                    [camelFormName]: {
                        ...formData[camelFormName],
                        [camelInputName]: value,
                    },
                })
            }
        />
    );
}

FormInput.propTypes = {
    inputName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    type: PropTypes.string,
};

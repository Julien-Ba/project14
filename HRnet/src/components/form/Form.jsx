import './form.scss';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../store/atoms';
import { snakeToCamel, snakeToKebab, snakeToTitle } from '../../utils/stringsFormat';
import FormFieldSet from './subcomponents/FormFieldset';
import FormField from './subcomponents/FormField';

export default function Form({ name, fields, onSubmit }) {
    const [formData, setFormData] = useAtom(formDataAtom);
    const camelFormName = snakeToCamel(name);
    const kebabFormName = snakeToKebab(name);
    const titleFormName = snakeToTitle(name);

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = onSubmit(formData[camelFormName]);
        if (result.isValid)
            setFormData({
                ...formData,
                [camelFormName]: Object.keys(formData[camelFormName]).reduce(
                    (acc, key) => ({
                        ...acc,
                        [key]: '',
                    }),
                    {}
                ),
            });
        if (result.error) {
            console.log(result.error);
            return;
        }
    };

    return (
        <div className={`${kebabFormName}-form`}>
            <h2 className={`${kebabFormName}-form__title`}>{titleFormName}</h2>
            <form action='' onSubmit={handleSubmit} className={`${kebabFormName}-form__form`}>
                {fields.map((field) =>
                    field.type === 'fieldset' ? (
                        <FormFieldSet key={field.name} formName={name} fieldset={field} />
                    ) : (
                        <FormField key={field.name} formName={name} field={field} />
                    )
                )}
                <button className={`${kebabFormName}-form__submit`}>Save</button>
            </form>
        </div>
    );
}

Form.propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

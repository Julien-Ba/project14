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
        onSubmit(formData[camelFormName]);
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
    };

    return (
        <div className={`${kebabFormName}-form`}>
            <h2 className={`${kebabFormName}-form__title`}>{titleFormName}</h2>
            <form action='' onSubmit={handleSubmit} className={`${kebabFormName}-form__form`}>
                {fields.map((field) =>
                    field.type === 'fieldset' ? (
                        <FormFieldSet
                            key={field.name}
                            fields={field.fields}
                            fieldsetName={field.name}
                            formName={name}
                        />
                    ) : (
                        <FormField
                            key={field.name}
                            {...field}
                            fieldName={field.name}
                            formName={name}
                        />
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

import './form.scss';
import PropTypes from 'prop-types';
import { useAtom, useAtomValue } from 'jotai';
import { defaultFormDataAtom, formDataAtom } from '../../store/atoms';
import { snakeToCamel, snakeToKebab, snakeToTitle } from '../../utils/stringsFormat';
import FormFieldSet from './subcomponents/FormFieldset';
import FormField from './subcomponents/FormField';
import { useEffect } from 'react';

export default function Form({ name, fields, onSubmit }) {
    const defaultFormData = useAtomValue(defaultFormDataAtom);
    const [formData, setFormData] = useAtom(formDataAtom);

    useEffect(() => {
        console.table(formData);
    }, [formData]);

    const camelFormName = snakeToCamel(name);
    const kebabFormName = snakeToKebab(name);
    const titleFormName = snakeToTitle(name);

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = onSubmit(formData[camelFormName]);
        if (result.isValid) {
            setFormData({
                ...formData,
                [camelFormName]: { ...defaultFormData[camelFormName] },
            });
            console.log('isValid');
            return;
        }
        if (result.error) {
            console.log(`${result.error.fieldName} ${result.error.error}`);
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

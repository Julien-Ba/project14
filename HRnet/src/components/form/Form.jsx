import './form.scss';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';
import { useAtom, useAtomValue } from 'jotai';
import { defaultFormDataAtom, formDataAtom, formErrorAtom } from '../../store/atoms';
import FormFieldSet from './subcomponents/FormFieldset';
import FormField from './subcomponents/FormField';

export default function Form({ name, fields, onSubmit, ...props }) {
    const defaultFormData = useAtomValue(defaultFormDataAtom);
    const [formData, setFormData] = useAtom(formDataAtom);
    const [formError, setFormError] = useAtom(formErrorAtom);

    useEffect(() => {
        console.table(formData);
    }, [formData]);

    const camelFormName = convertString.toCamel(name);
    const kebabFormName = convertString.toKebab(name);
    const titleFormName = convertString.toTitle(name);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError({});
        const result = await onSubmit(formData[camelFormName]);
        if (result.isValid) {
            setFormData({
                ...formData,
                [camelFormName]: { ...defaultFormData[camelFormName] },
            });
            return;
        }
        if (result.error) {
            setFormError({
                ...formError,
                [result.error.fieldName]: result.error.error,
            });
            return;
        }
    };

    return (
        <div className={`${kebabFormName}-form`}>
            <h2 className={`${kebabFormName}-form__title`}>{titleFormName}</h2>
            <form action='' onSubmit={handleSubmit} className={`${kebabFormName}-form__form`}>
                {fields.map((field) =>
                    field.type === 'fieldset' ? (
                        <FormFieldSet
                            key={field.name}
                            formName={name}
                            fieldset={field}
                            {...props}
                        />
                    ) : (
                        <FormField key={field.name} formName={name} field={field} {...props} />
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

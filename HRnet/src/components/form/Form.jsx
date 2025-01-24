import './form.scss';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';
import { useAtom } from 'jotai';
import { defaultFormDataAtom, formDataAtom, formErrorAtom } from '@store/atoms';
import FormFieldSet from './subcomponents/FormFieldset';
import FormField from './subcomponents/FormField';
import Modal from '@components/modal/Modal';

export default function Form({ name, fields, onSubmit, ...props }) {
    const [defaultFormData, setDefaultFormData] = useAtom(defaultFormDataAtom);
    const [formData, setFormData] = useAtom(formDataAtom);
    const [formError, setFormError] = useAtom(formErrorAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const camelFormName = convertString.toCamel(name);

    const defaultFields = useMemo(() => {
        const unwrappedFields = {};
        const unwrapFields = (fieldsArray) => {
            fieldsArray.forEach((field) => {
                if (field.type !== 'fieldset') {
                    unwrappedFields[convertString.toCamel(field.name)] = '';
                } else {
                    unwrapFields(field.fields);
                }
            });
        };
        unwrapFields(fields);
        return unwrappedFields;
    }, [fields]);

    useEffect(() => {
        if (!defaultFormData[camelFormName]) {
            setDefaultFormData((prev) => ({
                ...prev,
                [camelFormName]: defaultFields,
            }));
            setFormData((prev) => ({
                ...prev,
                [camelFormName]: defaultFields,
            }));
        }
    }, [camelFormName, defaultFormData, setDefaultFormData, defaultFields, setFormData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.activeElement?.blur();
        setFormError({});
        const result = await onSubmit(formData[camelFormName]);
        if (result.isValid) {
            setFormData({
                ...formData,
                [camelFormName]: { ...defaultFormData[camelFormName] },
            });
            setIsModalOpen(true);
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
        <div className={`form ${convertString.toKebab(name)}-form`}>
            <h2 className='form__title'>{convertString.toTitle(name)}</h2>
            <form onSubmit={handleSubmit} className='form__form'>
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
                <button className='form__submit' type='submit'>
                    Save
                </button>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p>Employee Created!</p>
            </Modal>
        </div>
    );
}

Form.propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

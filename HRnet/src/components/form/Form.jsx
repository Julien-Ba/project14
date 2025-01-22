import './form.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';
import { useAtom, useAtomValue } from 'jotai';
import { defaultFormDataAtom, formDataAtom, formErrorAtom } from '@store/atoms';
import FormFieldSet from './subcomponents/FormFieldset';
import FormField from './subcomponents/FormField';
import Modal from '@components/modal/Modal';

export default function Form({ name, fields, onSubmit, ...props }) {
    const defaultFormData = useAtomValue(defaultFormDataAtom);
    const [formData, setFormData] = useAtom(formDataAtom);
    const [formError, setFormError] = useAtom(formErrorAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className={`form ${kebabFormName}-form`}>
            <h2 className='form__title'>{titleFormName}</h2>
            <form action='' onSubmit={handleSubmit} className='form__form'>
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
                <button className='form__submit'>Save</button>
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

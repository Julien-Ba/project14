import { useAtom, useSetAtom } from 'jotai';
import PropTypes from 'prop-types';
import { formDataAtom, formErrorAtom } from '../../../store/atoms';
import { convertString } from 'str-case-converter';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function FormInputDate({ inputName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);
    const setFormError = useSetAtom(formErrorAtom);

    const camelFormName = convertString.toCamel(formName);
    const kebabFormName = convertString.toKebab(formName);
    const camelInputName = convertString.toCamel(inputName);
    const kebabInputName = convertString.toKebab(inputName);

    function formatDate(date) {
        if (!date) return '';
        // only keep the first part of the date, ignore the time etc ...
        return date.toISOString().split('T')[0];
    }

    return (
        <DatePicker
            className='form__input'
            name={`${kebabFormName}-${kebabInputName}`}
            id={`${kebabFormName}-${kebabInputName}`}
            {...props}
            format='dd/MM/yyyy'
            dayPlaceholder='DD'
            monthPlaceholder='MM'
            yearPlaceholder='YYYY'
            value={formData[camelFormName]?.[camelInputName] || ''}
            onChange={(date) => {
                setFormError({});
                setFormData({
                    ...formData,
                    [camelFormName]: {
                        ...formData[camelFormName],
                        [camelInputName]: formatDate(date),
                    },
                });
            }}
        />
    );
}

FormInputDate.propTypes = {
    inputName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
};

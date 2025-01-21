import { useAtom, useSetAtom } from 'jotai';
import PropTypes from 'prop-types';
import { formDataAtom, formErrorAtom } from '../../../store/atoms';
import { convertString } from 'str-case-converter';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useCallback, useEffect } from 'react';

export default function FormInputDate({ inputName, formName, ...props }) {
    const kebabFormName = useCallback(() => {
        return convertString.toKebab(formName);
    }, [formName]);
    const kebabInputName = useCallback(() => {
        return convertString.toKebab(inputName);
    }, [inputName]);

    useEffect(() => {
        // set an id on the first input to associate with the label for better accessibility
        const inputElement = document.querySelector(
            `input[name=${kebabFormName()}-${kebabInputName()}] ~ .react-date-picker__inputGroup__input`
        );
        if (inputElement) {
            inputElement.id = `${kebabFormName()}-${kebabInputName()}`;
        }
    }, [kebabFormName, kebabInputName]);

    const [formData, setFormData] = useAtom(formDataAtom);
    const setFormError = useSetAtom(formErrorAtom);

    const camelFormName = convertString.toCamel(formName);
    const camelInputName = convertString.toCamel(inputName);

    function formatDate(date) {
        if (!date) return '';
        // only keep the first part of the date, ignore the time etc ...
        return date.toISOString().split('T')[0];
    }

    return (
        <DatePicker
            className='form__input'
            name={`${kebabFormName()}-${kebabInputName()}`}
            {...props}
            format='dd/MM/yyyy'
            dayAriaLabel='Day'
            dayPlaceholder='DD'
            monthAriaLabel='Month'
            monthPlaceholder='MM'
            yearAriaLabel='Year'
            yearPlaceholder='YYYY'
            nativeInputAriaLabel='Date'
            calendarAriaLabel='Toggle calendar'
            clearAriaLabel='Clear value'
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

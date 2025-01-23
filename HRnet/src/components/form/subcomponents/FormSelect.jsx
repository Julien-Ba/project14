import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { formDataAtom } from '@store/atoms';
import { convertString } from 'str-case-converter';
import Dropdown from '@components/dropdown/Dropdown';

export default function FormSelect({ options, selectName, formName, ...props }) {
    const [formData, setFormData] = useAtom(formDataAtom);

    const camelFormName = convertString.toCamel(formName);
    const kebabFormName = convertString.toKebab(formName);
    const camelSelectName = convertString.toCamel(selectName);
    const kebabSelectName = convertString.toKebab(selectName);

    return (
        <>
            <Dropdown
                id={`${kebabFormName}-${kebabSelectName}`}
                className={'form__input'}
                options={options}
                value={formData[camelFormName]?.[camelSelectName] || ''}
                onSelect={(value) =>
                    setFormData({
                        ...formData,
                        [camelFormName]: {
                            ...formData[camelFormName],
                            [camelSelectName]: value,
                        },
                    })
                }
                {...props}
            />
        </>
    );
}

FormSelect.propTypes = {
    options: PropTypes.array,
    selectName: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
};

import validateForm from './createEmployeeFormVaildation';

export default function submitEmployeeCreation(formData) {
    console.table(formData);
    const result = Object.keys(formData).map((fieldName) =>
        validateForm(fieldName, formData[fieldName])
    );
    return result;
}

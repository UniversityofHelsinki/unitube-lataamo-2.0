import Form from 'react-bootstrap/Form';

const CheckBox = ({ label, ...rest }) => {
    return (
        <Form.Check type="checkbox" label={label} { ...rest } />
    );
}
export default CheckBox;

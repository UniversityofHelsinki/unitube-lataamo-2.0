import Form from 'react-bootstrap/Form';

const CheckBox = ({label}) => {
    return (
        <Form.Check type="checkbox" label={label} />
    );
}
export default CheckBox;

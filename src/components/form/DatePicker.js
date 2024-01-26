import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactDatePicker } from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fi, enUS, sv } from 'date-fns/locale/';
import './DatePicker.css';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT } from '../../Constants';
import { Form } from 'react-bootstrap';

registerLocale('fi', fi);
registerLocale('en', enUS);
registerLocale('sv', sv);

const getLocale = (language) => (({
    fi: 'fi',
    sv: 'sv',
    en: 'en'
  })[language] || 'fi');

const DatePicker = ({ message, ...rest }) => {
  const { i18n } = useTranslation();

  const onChange = (date) => {
    if (rest.onChange) {
      rest.onChange(date);
    }
  };

  const messageType = ({
    'light': 'text-secondary',
    'neutral': '',
    'warning': 'text-danger'
  })[message?.type];


  return (
    <>
    <ReactDatePicker
      className="form-control"
      dateFormat={DATE_FORMAT}
      locale={getLocale(i18n.language)} 
      dropdownMode="select"
      onChange={onChange}
      showPopperArrow={false}
      showMonthYearDropdown
      { ...rest } />
      <Form.Text className={messageType}>{message?.content}</Form.Text>
    </>
  );
};

DatePicker.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  })
};

export default DatePicker;

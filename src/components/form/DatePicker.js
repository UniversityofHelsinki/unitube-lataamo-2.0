import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactDatePicker } from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fi, enUS, sv } from 'date-fns/locale/';
import { parse } from 'date-fns'
import './DatePicker.css';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT } from '../../Constants';
import Message from './Message';

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
    if (rest.onChange && date) {
      rest.onChange(date.toISOString());
    }
  };

  const onChangeRaw = (event) => {
    const rawDate = event.target.value;
    try {
      if (rawDate && rest.onChange) {
        const date = parse(rawDate, DATE_FORMAT, new Date());
        rest.onChange(date.toISOString());
      }
    } catch (error) {
      rest.onChange(null);
    }
  };

  return (
    <>
    <ReactDatePicker
      className="form-control"
      dateFormat={DATE_FORMAT}
      locale={getLocale(i18n.language)} 
      dropdownMode="select"
      showPopperArrow={false}
      preventOpenOnFocus={true}
      showMonthYearDropdown
      { ...rest } 
      onChange={onChange}
      onChangeRaw={onChangeRaw}
      />
      <Message type={message?.type}>{message?.content}</Message>
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

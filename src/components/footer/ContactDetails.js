import React from 'react';
import PropTypes from 'prop-types';

const ContactDetails = () => {
  return (
    <>
      <p>
        <strong>
          Helsingin yliopisto
        </strong>
      </p>
      <p>
        PL 4 (Yliopistonkatu 3)
        00014 Helsingin yliopisto
      </p>
      <p>
        Puhelinvaihde: 02941 911
      </p>
      <p>
        Unitube-lataamon huoltoikkuna on tiistaisin klo 8.00–10.00. Palvelussa saattaa tuolloin ilmetä pieniä häiriöitä!
      </p>
    </>
  );
};

ContactDetails.propTypes = {
};

export default ContactDetails;

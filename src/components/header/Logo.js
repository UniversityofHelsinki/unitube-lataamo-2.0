import React from 'react';
import { useTranslation } from 'react-i18next';
import useSearchParams from '../../hooks/useSearchParams';
import HyColors from '../utilities/HyColors';
import HyLogo from '../utilities/HyLogo';
import { belowBreakpoint, leftSideIsHidden, hideLeft } from '../utilities/visibilities';
import './Logo.css';

const Logo = () => {
  const { t } = useTranslation();
  const [_searchParams, setSearchParams] = useSearchParams();

  const goToFrontPage = () => {
    setSearchParams({});
    if (belowBreakpoint()) {
      hideLeft();
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    goToFrontPage();
  };

  return (
    <div className="logo">
      <div aria-hidden="true">
        <HyLogo width={48} height={48} fill={HyColors.black} />
      </div>
      <a href="/" onClick={onClick}>
        <h1>
          {t('unitube_lataamo')}
        </h1>
      </a>
    </div>
  );
};

Logo.propTypes = {
};

export default Logo;

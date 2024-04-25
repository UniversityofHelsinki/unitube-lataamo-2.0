import React from 'react';
import { useTranslation } from 'react-i18next';
import useSearchParams from '../../hooks/useSearchParams';
import useVisibilities from '../../hooks/useVisibilities';
import HyColors from '../utilities/HyColors';
import HyLogo from '../utilities/HyLogo';
import './Logo.css';

const Logo = () => {
  const { t } = useTranslation();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [_leftHidden, rightHidden, swap] = useVisibilities();

  const goToFrontPage = () => {
    setSearchParams({});
    if (rightHidden) {
      swap();
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    goToFrontPage();
  };

  return (
    <div className="logo">
      <HyLogo width={48} height={48} fill={HyColors.black} />
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

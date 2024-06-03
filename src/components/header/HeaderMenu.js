import React, {useState} from 'react';
import './HeaderMenu.css';
import {ReactComponent as FullScreen} from '../utilities/icons/arrows-expand.svg';
import {ReactComponent as Contract} from "../utilities/icons/arrows-contract.svg";
import {useTranslation} from 'react-i18next';
import {leftSideIsHidden, toggleLeftSide} from '../utilities/visibilities';


const HeaderMenu = () => {
    const { t } = useTranslation();
    const [isFullScreen, setFullScreen] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        setFullScreen(!isFullScreen);
        toggleLeftSide();
    };

    return (
        <div className="header-menu">
            <button onClick={onClick}>
                {isFullScreen ? <Contract width="35" height="35" aria-label={t('header_menu_label')}/> : <FullScreen width="35" height="35" aria-label={t('header_menu_label')}/>}
            </button>
            <span aria-live="polite" className="screenreader-only">
            {leftSideIsHidden() ? t('header_menu_hidden') : t('header_menu_visible')}
        </span>
        </div>
    );
};

HeaderMenu.propTypes = {

};

export default HeaderMenu;

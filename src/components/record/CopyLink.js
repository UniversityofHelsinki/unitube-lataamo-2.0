import React, {useState} from 'react';
import PropTypes from "prop-types";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useTranslation} from "react-i18next";
import { ReactComponent as Copy } from './../utilities/icons/copy.svg';

const CopyLink = () => {

    const { t } = useTranslation();
    const [data, setData] = useState({value:'Kopioitava tieto', copied: false});

    return (
        <CopyToClipboard text={data.value}
             onCopy={() => setData({copied: true})}>
            <Copy height="20px" width="20px" />
        </CopyToClipboard>
    );
};

CopyLink.propTypes = {
};

export default CopyLink;

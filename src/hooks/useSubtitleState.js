import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useRecords from "./useRecords";

const getSubtitleStatus = async (identifier) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/monitor/${identifier}`;
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

const useSubtitleState = () => {
    const [subtitlestate, setSubtitlestate] = useState(null);
    const [identifier, setIdentifier] = useState(null);

    useEffect(() => {
        if (identifier) {
            (async () => {
                setSubtitlestate( await getSubtitleStatus(identifier));
            })();
        }
    },[identifier]);

    const readSubtitleState = (identifier) => {
        setIdentifier(identifier);
    }

    return [subtitlestate, readSubtitleState];
};

useRecords.PropTypes = {
    identifier: PropTypes.string
};

export default useSubtitleState;
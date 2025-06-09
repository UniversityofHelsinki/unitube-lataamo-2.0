import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const doSubtitleConverion = async (identifier) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${identifier}/exportVTTFile`
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Unexpected status code ${response.status} while subtitleconverssion from ${URL}.`);
    } catch (error) {
        console.error(error.message);
    }
};

const useSubtitleConversion = (identifier) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const message = useSelector((state) => state.vttfiles.conversion);

    useEffect(() => {
    }, [error, message]);

    const save = async (record) => {
                try {
                    dispatch({
                        type: 'SET_CONVERSION',
                        payload: await doSubtitleConverion(record.identifier)
                    });
                    setError(null);
                } catch (error) {
                    console.error(error.message);
                    setError({ source: error, identifier: record?.identifier });
                }
    }
    return [save, message, error];
};

export default useSubtitleConversion;

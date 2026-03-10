import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getVTTFiles = async (record) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}/getVTTFiles`
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return {
                ...await response.json(),
            };
        }
        throw new Error(`Unexpected status code from ${URL}`, {
            cause: { status: response.status }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const useVTTFiles = (load = false) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const vttFiles = useSelector((state) => state.vttfiles.vttfilesdata);
    const [error, setError] = useState(null);

    const shouldLoad = searchParams.record &&
        (!vttFiles || vttFiles.identifier !== searchParams.record) &&
        (!error || error.identifier !== searchParams.record);

    useEffect(() => {
        if (load && shouldLoad) {
            (async () => {
                try {
                    dispatch({
                        type: 'GET_VTTFILES',
                        payload: await getVTTFiles(searchParams.record)
                    });
                    setError(null);
                } catch (error) {
                    setError({ source: error, identifier: searchParams.record });
                }
            })();
        }
    }, [searchParams.record, vttFiles?.identifier, error, dispatch]);

    const reload = () => {
        dispatch({ type: 'GET_VTTFILES' });
        setError(null);
    };

    const loading = shouldLoad;
    return [vttFiles, loading, reload, error];
};

export default useVTTFiles;

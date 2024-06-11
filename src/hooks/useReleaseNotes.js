import {useEffect, useState} from "react";

const getReleaseNotes = async () => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/releaseNotes`;
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Unexpected status code from ${URL}`);
    } catch (error) {
        console.error(error);
        throw new Error(`Error occurred while getting records ${URL}`, {
            cause: error
        });
    }
};

const useReleaseNotes = () => {
    const [releaseNotes, setReleaseNotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReleaseNotes();
            setReleaseNotes(data);
        };

        fetchData();
    }, []);

    return releaseNotes;
};

export default useReleaseNotes;

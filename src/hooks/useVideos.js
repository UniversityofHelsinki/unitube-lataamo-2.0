import {useEffect, useState} from "react";

const getVideos = (record, setVideos) => async () => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoUrl/${record}`;
    try {
        const response = await fetch(URL);
        if (response.status === 200) {
            setVideos(await response.json());
        }
    } catch (error) {
        return error.message;
    }
};

const useVideos = (record) => {
    const [videos, setVideos] = useState(null);
    useEffect(() => {
        if (record && !videos) {
            getVideos(record, setVideos)();
        }
    }, [record]);
    return videos || []; // Ensure that it always returns an array
};

export default useVideos;

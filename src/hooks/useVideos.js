import {useEffect, useState} from "react";

const getVideos = async (record) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoUrl/${record}`;
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

const useVideos = (record) => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () => {
      if (record) {
        setVideos(await getVideos(record));
      }
    })();
  }, [record]);

  return videos || [];
};

export default useVideos;

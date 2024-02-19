import { useEffect, useState } from "react";

const get = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/getUserSeriesDropDownList`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const useCollectionDropdown = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!content) {
      (async () => setContent(await get()))();
    }
  }, []);

  const loading = !content;
  return [content, loading];
};

export default useCollectionDropdown;

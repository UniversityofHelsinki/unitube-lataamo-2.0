const useHttp = (url) => {
  const get = async (dispatch) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(error);
      throw new Error('http error in GET', {
        cause: error
      });
    }
  };

  return [() => get];

};

export default useHttp;

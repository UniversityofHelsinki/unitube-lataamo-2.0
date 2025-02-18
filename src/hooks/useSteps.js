const useSteps = (functions = []) => {

  const start = async (callback, errorCallback) => {
    for (let i = 0; i < functions.length; i++) {
      const fn = functions[i];
      callback(i);
      try {
        await fn();
        const lastOne = i+1 === functions.length; 
        if (lastOne) {
          callback(i+1);
        }
      } catch (error) {
        console.error(error.message);
        errorCallback(i);
      }
    }
  };

  return [start];
};

export default useSteps;

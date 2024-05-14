const get = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const set = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error.message);
  }
};

const useLocalStorage = () => {
  return [get, set];
}
export default useLocalStorage;



const useClipboard = () => {
  const copy = (value) => {
    navigator.clipboard.writeText(value);
  };
  
  return [copy];
};

export default useClipboard;

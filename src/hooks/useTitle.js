import { DEFAULT_TITLE } from "../Constants";

const useTitle = () => {

  const set = (value) => {
    const titleElement = document.querySelector("title");
    const newTitle = `${DEFAULT_TITLE} - ${value}`;
    if (titleElement.innerText !== newTitle) {
      titleElement.innerText = newTitle;
    }
  };

  const reset = () => {
    document.querySelector("title").innerText = `${DEFAULT_TITLE}`;
  };

  return [set, reset];

};

export default useTitle;

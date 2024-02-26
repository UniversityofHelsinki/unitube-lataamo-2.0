
export const onKeyDown = (fn) => {
  return (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      fn(event);
      event.preventDefault();
    }
  };
};

export const onEnter = (fn) => {
  return (event) => {
    if (event.code === 'Enter') {
      fn(event);
      event.preventDefault();
    }
  };
};

export default onKeyDown;

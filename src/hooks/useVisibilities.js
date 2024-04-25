import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBreakpoint from "./useBreakpoint";

const useVisibilities = () => {
  const dispatch = useDispatch();
  const breakpoint = useBreakpoint('xl');
  const { left: leftVisible, right: rightVisible } = useSelector((state) => state.visibilities);

  useEffect(() => {
    const aboveBreakpoint = !breakpoint?.matches;
    if (aboveBreakpoint) {
      dispatch({ type: 'SET_LEFT_VISIBILITY', payload: true });
    }
  }, [breakpoint]);

  const belowBreakpoint = breakpoint?.matches;

  const swap = () => {
    if (belowBreakpoint) {
      dispatch({ type: 'SET_LEFT_VISIBILITY', payload: false });
    }
  };

  const toggleLeft = () => {
    dispatch({ type: 'SET_LEFT_VISIBILITY', payload: !leftVisible });
  };


  if (belowBreakpoint) {
    const leftHidden = !leftVisible;
    const rightHidden = !leftHidden;
    return [leftHidden, rightHidden, swap, toggleLeft];
  }

  return [!leftVisible, !rightVisible, swap, toggleLeft];
};

export default useVisibilities;

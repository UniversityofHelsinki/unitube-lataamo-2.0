import useMediaQuery from "./useMediaQuery";

const breakpoints = {
  'sm': '576px',
  'md': '768px',
  'lg': '992px',
  'xl': '1200px',
  'xxl': '1400px'
};

const useBreakpoint = (breakpoint) => {
  const mediaQuery = useMediaQuery(`(max-width: ${breakpoints[breakpoint]})`);

  return mediaQuery;
};

export default useBreakpoint;

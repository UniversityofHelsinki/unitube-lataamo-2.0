import { BREAKPOINT, LEFT_CONTAINER_ID, RIGHT_CONTAINER_ID } from "../../Constants";


export const belowBreakpoint = () => {
  const mediaQuery = window.matchMedia('(max-width: 1200px)');
  return mediaQuery.matches;
};

export const leftSideIsHidden = () => {
  return document.querySelector(`#${LEFT_CONTAINER_ID}`)?.classList.contains('hidden');
};

export const toggleLeftSide = () => {
  const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
  const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
  left.classList.toggle('hidden');
  right.classList.toggle(`col-${BREAKPOINT}-8`);
  right.classList.toggle(`col-${BREAKPOINT}-12`);

  if (belowBreakpoint()) {
    right.classList.toggle('hidden');
  }

};

export const swapVisibleSide = () => {
  const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
  const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
  const mediaQuery = window.matchMedia('(max-width: 1200px)');
  const belowBreakpoint = mediaQuery.matches;

  if (belowBreakpoint) {
    left.classList.toggle(`col-${BREAKPOINT}-4`);
    left.classList.toggle(`col-${BREAKPOINT}-12`);

    right.classList.toggle(`col-${BREAKPOINT}-8`);
    right.classList.toggle(`col-${BREAKPOINT}-12`);

    left.classList.toggle('hidden');
    right.classList.toggle('hidden');
  }
};

export const listenForBreakpointChanges = () => {
  const mediaQuery = window.matchMedia(`(max-width: 1200px)`);
  mediaQuery.addEventListener("change", (event) => {
    const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
    const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
    const belowBreakpoint = event.matches;
    const aboveBreakpoint = !belowBreakpoint;

    if (aboveBreakpoint) {
      left.classList.remove('hidden');
      left.classList.remove(`col-${BREAKPOINT}-12`);
      left.classList.add(`col-${BREAKPOINT}-4`);

      right.classList.remove('hidden');
      right.classList.remove(`col-${BREAKPOINT}-12`);
      right.classList.add(`col-${BREAKPOINT}-8`);
    } else {
      left.classList.add('hidden');
      right.classList.toggle(`col-${BREAKPOINT}-8`);
      right.classList.toggle(`col-${BREAKPOINT}-12`);
    }
  });
};

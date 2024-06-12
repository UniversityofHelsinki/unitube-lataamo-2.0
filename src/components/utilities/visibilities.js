import { BREAKPOINT, LEFT_CONTAINER_ID, MENU_ICON_ID, RIGHT_CONTAINER_ID } from "../../Constants";


export const belowBreakpoint = () => {
  const mediaQuery = window.matchMedia('(max-width: 1200px)');
  return mediaQuery.matches;
};

export const leftExists = () => {
  return Boolean(document.querySelector(`#${LEFT_CONTAINER_ID}`));
};

export const leftSideIsHidden = () => {
  return document.querySelector(`#${LEFT_CONTAINER_ID}`)?.classList.contains('hidden');
};

export const hideRight = () => {
  const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
  right.classList.add("hidden");
};

export const showRight = () => {
  const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
  right.classList.remove("hidden");
};

export const hideLeft = () => {
  const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
  left.classList.add('width-transition');
  left.classList.add('hide-after-slide');
};

export const showLeft = () => {
  const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
  left.classList.remove("hidden");
  hideRight();
  setTimeout(
    () => left.classList.remove("hide-after-slide")
  );
};

export const showHamburgerIcon = () => {
  const menuIconOpen = document.querySelector(`#${MENU_ICON_ID}-open`);
  const menuIconClose = document.querySelector(`#${MENU_ICON_ID}-close`);
  menuIconOpen.classList.remove('hidden');
  menuIconClose.classList.add('hidden');
};

export const showCloseIcon = () => {
  const menuIconOpen = document.querySelector(`#${MENU_ICON_ID}-open`);
  const menuIconClose = document.querySelector(`#${MENU_ICON_ID}-close`);
  menuIconOpen.classList.add('hidden');
  menuIconClose.classList.remove('hidden');
};

export const listenForBreakpointChanges = () => {
  const mediaQuery = window.matchMedia(`(max-width: 1200px)`);
  mediaQuery.addEventListener("change", (event) => {
    const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
    const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);

    const belowBreakpoint = event.matches;
    const aboveBreakpoint = !belowBreakpoint;
    const desktopView = left && right && aboveBreakpoint;
    const mobileView = left && right && belowBreakpoint;

    if (desktopView) {
      left.classList.remove('hidden');
      left.classList.remove('width-transition');
      left.classList.remove('hide-after-slide');

      left.classList.remove(`col-${BREAKPOINT}-12`);
      left.classList.add(`col-${BREAKPOINT}-4`);

      right.classList.remove('hidden');
      right.classList.remove(`col-${BREAKPOINT}-12`);
      right.classList.add(`col-${BREAKPOINT}-8`);

    } else if (mobileView) {
      left.classList.add('width-transition');
      left.classList.add('hidden');
      left.classList.add('hide-after-slide');

      right.classList.remove(`col-${BREAKPOINT}-8`);
      right.classList.add(`col-${BREAKPOINT}-12`);

    }
  });
};

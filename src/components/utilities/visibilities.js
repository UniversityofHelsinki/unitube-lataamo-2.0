import { BREAKPOINT, LEFT_CONTAINER_ID, MENU_ICON_ID, RIGHT_CONTAINER_ID } from "../../Constants";


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
  const menuIconOpen = document.querySelector(`#${MENU_ICON_ID}-open`);
  const menuIconClose = document.querySelector(`#${MENU_ICON_ID}-close`);

  if (!left || !right) {
    return;
  }

  const willBeShown = left.classList.contains('hidden');
  if (willBeShown) {
    left.classList.remove('hidden');
    right.classList.add('hidden');

    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');

    setTimeout(
      () => left.classList.remove('hide-after-slide')
    );

  } else {
    left.classList.add('hide-after-slide');

    menuIconClose.classList.add('hidden');
    menuIconOpen.classList.remove('hidden');
  }

};

export const hideLeftIfNeeded = () => {
  const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
  const menuIconOpen = document.querySelector(`#${MENU_ICON_ID}-open`);
  const menuIconClose = document.querySelector(`#${MENU_ICON_ID}-close`);

  if (belowBreakpoint()) {
    left.classList.add('width-transition');
    left.classList.add('hidden');
    left.classList.add('hide-after-slide');

    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
  }
};

export const listenForBreakpointChanges = () => {
  const mediaQuery = window.matchMedia(`(max-width: 1200px)`);
  mediaQuery.addEventListener("change", (event) => {
    const left = document.querySelector(`#${LEFT_CONTAINER_ID}`);
    const right = document.querySelector(`#${RIGHT_CONTAINER_ID}`);
    const menuIcon = document.querySelector(`#${MENU_ICON_ID}`);
    const menuIconOpen = document.querySelector(`#${MENU_ICON_ID}-open`);
    const menuIconClose = document.querySelector(`#${MENU_ICON_ID}-close`);
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

      menuIcon.classList.add('hidden');

      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');

    } else if (mobileView) {
      left.classList.add('width-transition');
      left.classList.add('hidden');
      left.classList.add('hide-after-slide');

      right.classList.remove(`col-${BREAKPOINT}-8`);
      right.classList.add(`col-${BREAKPOINT}-12`);

      menuIcon.classList.remove('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  });
};

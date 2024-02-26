import { ROLE_ANONYMOUS, ROLE_KATSOMO, ROLE_KATSOMO_TUOTANTO, ROLE_USER_UNLISTED, STATUS } from "../../Constants";

export const asAccessControlLists = (publicity, moodleNumbers) => {
  const moodleNumberAcls = moodleNumbers.map(number => 
    [`${number}_Instructor`, `${number}_Learner`]
  ).flat();
  if (publicity === ROLE_ANONYMOUS) {
    return [ publicity, ROLE_KATSOMO_TUOTANTO, ...moodleNumberAcls ];
  } else if (publicity === ROLE_USER_UNLISTED) {
    return [ publicity, ...moodleNumberAcls ];
  }
  return moodleNumberAcls;
};

export const asVisibility = (acl, moodleNumbers) => {
  for (const role of [ROLE_ANONYMOUS, ROLE_KATSOMO_TUOTANTO, ROLE_KATSOMO]) {
    if (acl.includes(role)) {
      return [ STATUS.PUBLISHED, ...moodleNumbers ];
    }
  }

  if (acl.includes[ROLE_USER_UNLISTED]) {
    return [ STATUS.UNLISTED, ...moodleNumbers ];
  }

  return [ STATUS.PRIVATE, ...moodleNumbers ];
};

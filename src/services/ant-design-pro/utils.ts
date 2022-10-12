import { CONSTANTS_BEARER_TOKEN, CONSTANTS_USER_ID } from '@/constants/local-storage-constants';

export const isCurrentUserLoggedOut = () => {
  if (
    !localStorage.getItem(CONSTANTS_BEARER_TOKEN) ||
    localStorage.getItem(CONSTANTS_BEARER_TOKEN) === ''
  ) {
    return true;
  }
  if (!localStorage.getItem(CONSTANTS_USER_ID) || localStorage.getItem(CONSTANTS_USER_ID) === '') {
    return true;
  }
  return false;
};

export const loginPath = '/user/login';

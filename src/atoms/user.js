import {atomWithStorage} from 'jotai/utils';

// if user accept cookies
export const accessTokenAtom = atomWithStorage('accessToken', '');
export const userIdAtom = atomWithStorage('userId', '');

// if user decline cookies
// export const accessTokenWithoutStorageAtom = atom('');
// export const userIdWithoutStorageAtom = atom('');

// export const isCookieAcceptedAtom = atomWithStorage('cookies', false);

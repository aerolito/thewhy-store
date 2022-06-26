import {useAtom} from 'jotai';
import {accessTokenAtom} from '../../atoms/user';

export const userToken = () => {
  const [accessToken] = useAtom(accessTokenAtom);

  if (!accessToken) {
    return false;
  }

  return true;
};

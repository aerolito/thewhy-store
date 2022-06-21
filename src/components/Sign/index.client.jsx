import {useAtom} from 'jotai';
import {signStateAtom} from './atoms/sign-state';
import SignIn from './SignIn.client';
import SignDecision from './SignDecision.client';
import ResetPassword from './ResetPassword.client';

export default function Sign() {
  const [signState] = useAtom(signStateAtom);

  return (
    <>
      <div className="z-30 fixed w-screen h-screen mt-[-96px] bg-black opacity-30"></div>
      <div className="z-40">
        {signState === 'decision' ? (
          <SignDecision />
        ) : signState === 'reset' ? (
          <ResetPassword />
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
}

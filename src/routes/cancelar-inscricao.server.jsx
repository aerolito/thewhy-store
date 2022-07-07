import EmailInput from '../components/CancelSub/EmailInput.client';
import {Slogan} from '../components/Layout/Slogan.server';

export default function CancelSubscription(req) {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-12 max-w-[770px] md:mt-[-20px] m-auto w-full">
        <h2 className="text-principal font-bold text-subtitle text-center">
          cancelar inscrição
        </h2>
        <EmailInput />
        <span className="text-principal font-bold text-text text-center">
          Sentimos muito que queira cancelar sua inscrição.
        </span>
      </div>
    </>
  );
}

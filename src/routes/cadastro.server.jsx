import {BackButton} from '../components/BackButton.client';
import SignUpForm from '../components/Sign/SignUpForm.client';
import {Slogan} from '../components/Slogan.server';

export default function SignupPage() {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-[2rem] w-full">
        <h2 className="text-principal font-bold text-subtitleMobile md:text-subtitle text-left">
          cadastro
        </h2>

        <hr />

        <h4 className="text-smallTitle text-principal font-bold">
          dados pessoais
        </h4>

        <SignUpForm />
      </div>
    </>
  );
}

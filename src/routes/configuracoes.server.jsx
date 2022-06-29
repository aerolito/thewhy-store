import SettingsForm from '../components/Sign/SettingsForm.client';
import {Slogan} from '../components/Layout/Slogan.server';

export default function Settings() {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-[2rem] w-full">
        <h2 className="text-principal font-bold text-subtitleMobile md:text-subtitle text-left">
          configurações
        </h2>

        <hr />

        <h4 className="text-smallTitle text-principal font-bold">
          dados pessoais
        </h4>
        <SettingsForm />
      </div>
    </>
  );
}

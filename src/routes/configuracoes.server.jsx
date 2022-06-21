import {BackButton} from '../components/BackButton.client';
import SettingsForm from '../components/SettingsForm.client';
import {Slogan} from '../components/Slogan.server';

export default function Settings() {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-12 w-full">
        <h2 className="text-principal font-bold text-subtitleMobile md:text-subtitle text-left">
          configurações
        </h2>

        <hr />
        <SettingsForm />
      </div>
    </>
  );
}

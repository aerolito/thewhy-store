import ContactForm from '../components/Sign/ContactForm.client';
import {Slogan} from '../components/Layout/Slogan.server';

export default function ContactPage() {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-[2rem] w-full">
        <h2 className="text-principal font-bold text-subtitleMobile md:text-subtitle text-left">
          Fale conosco
        </h2>

        <hr />
        <ContactForm />
      </div>
    </>
  );
}

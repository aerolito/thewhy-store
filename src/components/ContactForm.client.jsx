import {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {toast} from './Toast.client';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      return toast.warning('Preencha todos os campos');
    }

    setIsLoading(true);

    emailjs
      .sendForm(
        'service_q59argr',
        'template_ybyg719',
        form.current,
        'danUbQ1kKDG1DrsA2',
      )
      .then(
        (result) => {
          setIsLoading(false);
          setEmail('');
          setMessage('');
          return toast.success(`Email enviado com sucesso`);
        },
        (error) => {
          setIsLoading(false);
          return toast.error(
            `Desculpe, tivemos um problema ao enviar o email.`,
          );
        },
      );
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="text-center flex flex-col justify-center items-left pt-10"
    >
      <div className="flex flex-col gap-[1rem] text-left">
        <label className="text-principal font-bold text-text">E-mail</label>
        <input
          className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
          placeholder="Insira seu e-mail"
          type="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[1rem] text-left">
        <label className="text-principal font-bold text-text">Mensagem</label>
        <textarea
          className="text-principal text-text border-black border-[1px] rounded-[9px] mb-12 min-h-[200px] max-w-[458px] py-2 px-4"
          name="message"
          placeholder="Insira sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <input
        disabled={isLoading}
        type="submit"
        className={` ${
          isLoading && 'opacity-30 cursor-default'
        }  px-8 py-2 mb-12 text-white font-bold w-fit cursor-pointer bg-black rounded-[38px]`}
        value={isLoading ? '...' : 'feito!'}
      />
    </form>
  );
}

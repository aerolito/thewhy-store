import {useNavigate} from '@shopify/hydrogen/client';
import {getAuth} from 'firebase/auth';
import {useAtom} from 'jotai';
import {useState, useEffect} from 'react';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {app} from '../../configs/firebase';
import {handleSignup} from '../../services/handleSignup';
import {toast} from '../Toast.client';
import CpfCnpjInput from 'react-cpf-cnpj-input';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [cpf, setCpf] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const onClickToSign = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !cpf || !phoneNumber) {
      setIsLoading(false);
      return toast.error(`Nome, email e senha são obrigatórios`);
    }

    if (!termsAccepted) {
      setIsLoading(false);
      return toast.error(`Aceitar os termos é obrigatório`);
    }

    const user = await handleSignup(
      auth,
      email,
      password,
      name,
      cpf,
      phoneNumber,
      birthdate,
    );

    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate('/', {replace: true});
  };

  useEffect(() => {
    setIsWishlistModalOpen(false);
  }, []);

  return (
    <div className="text-center flex flex-col justify-center items-left">
      <div className="flex w-full justify-between flex-col md:flex-row">
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              NOME COMPLETO:
            </label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              type="text"
              placeholder="Preencha com seu nome"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">EMAIL:</label>

            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              type="email"
              placeholder="exemplo@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              CRIE SUA SENHA DE ACESSO:
            </label>

            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              type="password"
              placeholder="Preencha com uma senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              CPF / CNPJ:
            </label>
            <CpfCnpjInput
              value={cpf}
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              placeholder="Preencha com seu cpf"
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              TELEFONE:
            </label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              type="text"
              placeholder="Telefone (apenas números)"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              DATA DE NASCIMENTO:
            </label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] md:w-[350px] py-2 px-4"
              type="text"
              placeholder="Data de Nascimento (11/11/1111)"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-[0.75rem] items-center">
        <input
          type="checkbox"
          className="w-[18px] h-[18px] cursor-pointer"
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label className="text-principal text-text">
          Li e estou de acordo com os
          <a href="/termos" className="font-bold cursor-pointer">
            {' '}
            termos de uso
          </a>
        </label>
      </div>

      <button
        onClick={onClickToSign}
        className={` ${
          isLoading && 'opacity-30 cursor-default'
        } px-8 py-2 m-auto mt-8 mb-20 text-white font-bold w-fit cursor-pointer bg-black rounded-[38px]`}
      >
        {isLoading ? '...' : 'feito!'}
      </button>
    </div>
  );
}

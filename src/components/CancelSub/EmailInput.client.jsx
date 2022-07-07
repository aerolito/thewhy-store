import {useState} from 'react';
import {handleCancelSubscription} from '../../services/handleCancelSubscription';
import {toast} from '../Popups/Toast.client';

export default function EmailInput() {
  const [email, setEmail] = useState('');

  const cancelSubscription = () => {
    if (!email) {
      return toast.warning('Você precisa digitar o e-mail.');
    }

    const res = handleCancelSubscription(email);

    if (res) {
      toast.success('Inscrição cancelada.');
      setEmail('');
    }
  };

  return (
    <input
      className="w-full m-auto max-w-[400px] text-principal text-text border-principal p-2 border-[3px] rounded-full px-8 pr-14 h-[60px]"
      placeholder="Insira seu email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          cancelSubscription();
        }
      }}
    />
  );
}

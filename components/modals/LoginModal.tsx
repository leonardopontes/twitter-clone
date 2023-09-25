import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

// Atribuir Login de Modal, contendo...
const LoginModal = () => {
  // login de Modal ligando ao uso de Login Modal
  const loginModal = useLoginModal();
  // registro de Modal ligando ao uso de Registro Modal
  const registerModal = useRegisterModal();

  // email e definir Email ligado ao uso uso de Estado vazio
  const [email, setEmail] = useState('');
  // senha e definir senha ligado ao uso uso de Estado vazio
  const [password, setPassword] = useState('');
  // está carregando e definir se está carregando ligado ao uso uso de Estado falso
  const [isLoading, setIsLoading] = useState(false);

  // Envio ativado ligado ao uso de Callback de forma assíncrona, contendo...
  const onSubmit = useCallback(async () => {
    // Exceção de tentar, definir se está carregando de forma verdadeira
    try {
      setIsLoading(true);

      // aguardar iniciar sessão, contendo credenciais, sendo... email e senha
      await signIn('credentials', {
        email,
        password,
      });

      // exibir mensagem de sucesso 'Logado' utilizando toast
      toast.success('Logged in');

      // login de Modal Fechado ativado
      loginModal.onClose();
      // pegar erro utilizando toast com erro a mensagem de 'Algo deu errado'
    } catch (error) {
      toast.error('Something went wrong');
      // finalizar, definir se está carregando de forma falsa
    } finally {
      setIsLoading(false);
    }
    // Envolver na estrutura email, senha e login de Modal
  }, [email, password, loginModal]);

  // Alternar ativando, com uso de Callback, contendo...
  const onToggle = useCallback(() => {
    // login de Modal Fechado ativado
    loginModal.onClose();
    // registro de Modal Aberto ativado
    registerModal.onOpen();
    // Envolver na estrutura login Modal e registro Modal
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twitter?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;

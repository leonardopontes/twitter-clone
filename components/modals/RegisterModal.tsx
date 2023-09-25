import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

// Registro Modal, contendo...
const RegisterModal = () => {
  // login Modal ligado ao uso de Login Modal
  const loginModal = useLoginModal();
  // registro Modal ligado ao uso de Registro Modal
  const registerModal = useRegisterModal();

  // email e definir Email ligado ao uso uso de Estado vazio
  const [email, setEmail] = useState('');
  // senha e definir senha ligado ao uso uso de Estado vazio
  const [password, setPassword] = useState('');
  // nome de usuário e definir nome de Usuário ao uso uso de Estado vazio
  const [username, setUsername] = useState('');
  // nome e definir nome ligado ao uso de Estado vazio
  const [name, setName] = useState('');
  // está carregando e definir se está carregando ligado ao uso uso de Estado falso
  const [isLoading, setIsLoading] = useState(false);

  // Alternar ativando, com uso de Callback, contendo...
  const onToggle = useCallback(() => {
    // Sendo verdadeiro está carregando tendo um retorno
    if (isLoading) {
      return;
    }
    // registro de Modal Fechado ativado
    registerModal.onClose();
    // login de Modal aberto ativado
    loginModal.onOpen();
    // Envolver na estrutura login Modal, registro Modal e está carregando
  }, [loginModal, registerModal, isLoading]);

  // Envio ativado ligado ao uso de Callback de forma assíncrona, contendo...
  const onSubmit = useCallback(async () => {
    // Exceção de tentar, definir se está carregando de forma verdadeira
    try {
      setIsLoading(true);

      // aguardar enquanto axios cria na rota '/api/register', contendo... email, senha, nome de usuário e nome
      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      // definir se está carregando de forma falsa
      setIsLoading(false)

      // utilizando toast, exibir mensagem de sucesso: 'Conta criada'
      toast.success('Account created.');

      // iniciar sessão, contendo credenciais, sendo... email e senha
      signIn('credentials', {
        email,
        password,
      });

      // registro de Modal Fechado ativado
      registerModal.onClose();
      // pegar erro utilizando toast com erro a mensagem de 'Algo deu errado'
    } catch (error) {
      toast.error('Something went wrong');
      // finalizar, definir se está carregando de forma falsa
    } finally {
      setIsLoading(false);
    }
    // Envolver na estrutura email, senha, registro Modal, nome de usuário e nome
  }, [email, password, registerModal, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input 
        disabled={isLoading}
        placeholder="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;

import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsDot } from 'react-icons/bs';

// Definir uma Interface de Propriedade dos Itens Sidebar
interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

// Atribuir SidebarItem com React.FC<> igualando a propriedades, contendo...
const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  // Atribuição ao uso de Rotas
  const router = useRouter();
  // Atribuição ao uso de Login Modal
  const loginModal = useLoginModal();

  // Atribuição de dados com Atuais Usuários, igualando ao uso de Atuais Usuários
  const { data: currentUser } = useCurrentUser();

  // Atribuição de lidar com Click igualando ao uso de Callback, sendo assim...
  const handleClick = useCallback(() => {
    // Se for verdade o click, retornar o click
    if (onClick) {
      return onClick();
    }

    // Se for verdade a autenticação e a negação de Atuais Usuários...
    if (auth && !currentUser) {
      // o LoginModal (Modal de Login) será aberto
      loginModal.onOpen();
    // Se for falso e aqui for verdadeiro o href...
    } else if (href) {
      // rotas puxando href
      router.push(href);
    }
  // Sempre que o trecho for executado, terá esses itens
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;
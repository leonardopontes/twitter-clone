import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

// Atribuir Botão de Tweet Sidebar, contendo...
const SidebarTweetButton = () => {
  // rotas ligando ao uso de Rotas
  const router = useRouter();
  // loginModal ligando ao uso de Login Modal
  const loginModal = useLoginModal();
  // dados com Atuais Usuários ligando ao uso de Atuais Usuários
  const { data: currentUser } = useCurrentUser();

  // click ativado ligando ao uso de Callbacks, contendo...
  const onClick = useCallback(() => {
    // Se for verdade a negação de atuais Usuários
    if (!currentUser) {
      // retornar login Modal aberto
      return loginModal.onOpen();
    }

    router.push('/');
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <FaFeather size={24} color="white" />
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      ">
        <p 
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        ">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;

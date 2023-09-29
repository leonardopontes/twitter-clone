import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

// uso de Seguir ligando a = (Id do usuário como: string) contendo... => {
const useFollow = (userId: string) => {
  // {dados: Usuário atual, mutação: mutação com Usuário atual } ligando a = uso de Usuário Atual();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // {mutação: mutação Buscando Usuário } ligando a = uso de Usuário com(Id do usuário);
  const { mutate: mutateFetchedUser } = useUser(userId);

  // Modal de login ligado a = uso de Modal de Login();
  const loginModal = useLoginModal();

  // está Seguindo ligado a = uso de Memo (() contendo... => {
  const isFollowing = useMemo(() => {
    // lista ligado a = Usuário atual?.Seguindo Ids || Array vazio;
    // || = (Operador OR. retorna true se pelo menos uma das expressões for avaliada como verdadeira. Se ambas as expressões forem falsas, o operador || retorna false.
    const list = currentUser?.followingIds || [];

    // retornar lista.incluindo com(Id de usuário);
    return list.includes(userId);
  // }, Envolver na Estrutura [Usuário atual, Id de usuário]);
  }, [currentUser, userId]);

  // alternar Seguir ligado a = uso de Callback(assíncrono () contendo... => {
  const toggleFollow = useCallback(async () => {

    // sendo verdade a negação (!Usuário atual) {
    if (!currentUser) {
      // retornar Modal de login.Abrir ligado();
      return loginModal.onOpen();
    }

    // tentar {
    try {
      // deixar solicitar;
      let request;

      // sendo verdade (está Seguindo) {
      if (isFollowing) {
        // solicitar ligando a = () => axios.deletar na rota('/api/follow', { dados: { Id de usuário } });
        request = () => axios.delete('/api/follow', { data: { userId } });
      // } sendo falso {
      } else {
        // solicitar ligando a = () => axios.post na rota('/api/follow', { Id de usuário });
        // post = envia dados para API
        request = () => axios.post('/api/follow', { userId });
      }

      // aguardar solicitamento();
      await request();
      // mutação de Usuário Atual();
      mutateCurrentUser();
      // mutação de Buscar Usuário();
      mutateFetchedUser();

      // toast.sucesso('Sucesso');
      toast.success('Success');
    // } pegar (erro) { 
    } catch (error) {
      // toast.erro('Algo deu errado');
      toast.error('Something went wrong');
    }
  // }, Envolver na Estrutura [Usuário atual, está Seguindo, Id de usuário, mutação de Usuário Atual, mutação de Buscar Usuário, Modal de login]);  
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow;

import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

// uso de Like ligando a = ({ Id de post, Id de usuário} sendo: { Id de post: string, Id de usuário?: string }) contendo... => {
const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  // { dados: Usuário atual } ligando a = uso de Usuário Atual();
  const { data: currentUser } = useCurrentUser();
  // { dados: Post buscado, mutação: mutação Post buscado } ligando a = uso de Post(Id de post);
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  // { mutação: mutação Posts buscado } ligando a = uso de Posts(Id de usuário);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  // Modal de login ligado a = uso de Modal de Login();
  const loginModal = useLoginModal();

  // tem Like ligado a = uso de Memo (() contendo... => {
  const hasLiked = useMemo(() => {
    // lista ligado a = Post buscado?.liked Ids || Array vazio;
    // || = (Operador OR. retorna true se pelo menos uma das expressões for avaliada como verdadeira. Se ambas as expressões forem falsas, o operador || retorna false.
    const list = fetchedPost?.likedIds || [];

    // retornar lista.incluindo com(Usuário atual?.Id);
    return list.includes(currentUser?.id);
  // }, Envolver na Estrutura [Post buscado, Id de usuário]);  
  }, [fetchedPost, currentUser]);

  // alternar Curtida ligado a = uso de Callback(assíncrono () contendo... => {
  const toggleLike = useCallback(async () => {
    // sendo verdade a negação (!Usuário atual) {
    if (!currentUser) {
      // retornar Modal de login.Abrir ligado();
      return loginModal.onOpen();
    }

    // tentar {
    try {
      // deixar solicitar;
      let request;

      // sendo verdade (tem Like) {
      if (hasLiked) {
        // solicitar ligando a = () => axios.deletar na rota('/api/like', { dados: { Id de post } });
        request = () => axios.delete('/api/like', { data: { postId } });
      // sendo falso {  
      } else {
        // solicitar ligando a = () => axios.post na rota('/api/like', { Id de post });
        // post = envia dados para API
        request = () => axios.post('/api/like', { postId });
      }

      // aguardar solicitamento();
      await request();
      // mutação de Post buscado();
      mutateFetchedPost();
      // mutação de Posts buscado();
      mutateFetchedPosts();

      // toast.sucesso('Sucesso');
      toast.success('Success');
    // pegar (erro) {   
    } catch (error) {
      // toast.erro('Algo deu errado');
      toast.error('Something went wrong');
    }
  // }, Envolver na Estrutura [Usuário atual, tem Curtida, Id de post, mutação de Posts Buscado, mutação de Post Buscado, Modal de login]);    
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;

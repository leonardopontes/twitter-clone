import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
// Definir uma interface de Propriedade de Item de Post
interface PostItemProps {
  // dados possuindo: Registro de <string, qualquer>; 
  data: Record<string, any>;
  // Id de usuário possuindo?: string;
  userId?: string;
}

// Item de Post possuindo: React.FC<interface> ligando a ({ dados ligando a um Objeto vazio e Id de usuário }) contendo...
const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  // roteador ligando ao uso de Roteador
  const router = useRouter();
  // login Modal ligando ao uso de Login Modal
  const loginModal = useLoginModal();

  // { dados possuindo: Usuário atual } igualando ao uso de Usuário Atual
  const { data: currentUser } = useCurrentUser();
  // { curtiu e Alternar curtida } igualando ao uso de Curtida com ({ Id do post possuindo: id. da data, Id do usuário});
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId});

  // ir para Usuário ligando ao uso de Callback com ((evento: qualquer) contendo...
  const goToUser = useCallback((ev: any) => {
    // evento. de parar Propagação
    ev.stopPropagation();
    // roteador. inserido na rota ((`/users/${data.user.id}`) com dados de usuário do id)
    router.push(`/users/${data.user.id}`)
    // Envolver na estrutura roteador, dados de usuário do id
  }, [router, data.user.id]);

  // ir para Post ligando ao uso de Callback, contendo...
  const goToPost = useCallback(() => {
    // roteador. inserido na rota ((`/posts/${data.user.id}`) com dados de usuário do id)
    router.push(`/posts/${data.id}`);
    // Envolver na estrutura roteador, dados do id
  }, [router, data.id]);

  // Curtida ativada ligando ao uso de Callback, com (chamada assíncrona com (evento: qualquer) contendo......
  const onLike = useCallback(async (ev: any) => {
    // evento. de parar Propagação
    ev.stopPropagation();

    // Sendo verdade a negação de Usuário atual, retornar login Modal. onAberto
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // alternar Curtida
    toggleLike();
    // Envolver na estrutura login Modal, Usuário atual, alternar Curtida
  }, [loginModal, currentUser, toggleLike]);

  // Icon de Like ligando a curtiu ? contendo as alternações entre AiFillHeart : AiOutlineHeart;
  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  // criado Em ligado ao uso Memo, contendo...
  const createdAt = useMemo(() => {
    // sendo verdade a negação de dados? criado Em...
    if (!data?.createdAt) {
      // retornar nulo
      return null;
    }

    // retornar formatar Distancia Ate Agora Estrita com (nova Data com (dados. criado Em));
    return formatDistanceToNowStrict(new Date(data.createdAt));
    // Envolver na estrutura dados. criado Em
  }, [data.createdAt])

  return (
    <div 
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {data.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div 
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;

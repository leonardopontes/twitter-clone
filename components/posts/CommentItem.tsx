import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

// Definir uma interface de Propriedade de comentários Feed
interface CommentItemProps {
  // dados possuindo: Registro de <string, qualquer>;
  data: Record<string, any>;
}

// Item de comentário possuindo: React.FC<interface> ligando a ({ dados ligando a um Array vazio }) contendo...
const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  // roteador ligando ao uso de Roteador
  const router = useRouter();

  // ir para Usuário ligando ao uso de Callback com ((evento: qualquer) contendo...
  const goToUser = useCallback((ev: any) => {
    // evento. de parar Propagação
    ev.stopPropagation();

    // roteador. inserido na rota ((`/users/${data.user.id}`) com dados de usuário do id)
    router.push(`/users/${data.user.id}`)
    // Envolver na estrutura roteador, dados de usuário do id
  }, [router, data.user.id]);

  // criado Em ligado ao uso Memo, contendo...
  const createdAt = useMemo(() => {
    // sendo verdade a negação de dados? e criado Em...
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
        </div>
      </div>
    </div>
  )
}

export default CommentItem;

import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

// Definir uma interface de Propriedade Avatar {
interface AvatarProps {
  // Id de usuário possuindo: string;
  userId: string;
  // é Grande? possuindo: boolean;
  isLarge?: boolean;
  // tem Borda? possuindo: boolean;
  hasBorder?: boolean;
}

// Avatar possuindo: React.FC<interface> ligando a = ({ Id de usuário, é Grande, tem Borda }) contendo... => {
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  // rota igualando ao = uso de Rota();
  const router = useRouter();

  // { dados possuindo: Usuário buscado } igualando ao = uso de Usuário(com Id de usuário);
  const { data: fetchedUser } = useUser(userId);

  // Click ligado ligando ao = uso de Callback com ((evento: qualquer) contendo... => {
  const onClick = useCallback((event: any) => {
    // evento. de parar Propagação();
    event.stopPropagation();

    // url ligando a = na rota `/users/${userId}`; (Id de usuário)
    const url = `/users/${userId}`;

    // roteador. inserido na (url);
    router.push(url);
    // }, Envolver na estrutura [rota, Id de usuário]);
  }, [router, userId]);

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
}
 
export default Avatar;

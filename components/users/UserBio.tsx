import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

// Definir uma interface de Propriedade da Bio do Usuário {
interface UserBioProps {
  // Id de usuário possuindo: string;
  userId: string;
}

// Bio do Usuário possuindo: React.FC<interface> ligando a = ({ Id de usuário }) contendo... => {
const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  // { dados possuindo: Usuário atual } igualando ao = uso de Usuário Atual();
  const { data: currentUser } = useCurrentUser();
  // { dados possuindo: Usuário buscado } igualando ao = uso de Usuário Atual(com Id de usuário);
  const { data: fetchedUser } = useUser(userId);

  // editar Modal ligando ao = uso de Editar Modal();
  const editModal = useEditModal();

  // { seguir e Alternar Seguidor  } igualando ao = uso de Seguir(com Id de usuário);
  const { isFollowing, toggleFollow } = useFollow(userId);

  // criado Em ligado ao = uso Memo((), contendo... =>
  const createdAt = useMemo(() => {
    // sendo verdade a negação de Usuário buscado? criado Em...
    if (!fetchedUser?.createdAt) {
      // retornar nulo
      return null;
    }

    // retornar formato com (nova Data com (Usuário buscado. criado Em), 'MMMM yyyy');
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
    // }, Envolver na estrutura [Usuário buscado?. criado Em]
  }, [fetchedUser?.createdAt])


  return ( 
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow} 
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {fetchedUser?.bio}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default UserBio;

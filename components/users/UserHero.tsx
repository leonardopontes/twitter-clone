import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

// Definir uma interface de Propriedade da Bio do Usuário {
interface UserHeroProps {
  // Id de usuário possuindo: string;
  userId: string;
}

// Hero do Usuário possuindo: React.FC<interface> ligando a = ({ Id de usuário }) contendo... => {
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  // { dados possuindo: Usuário buscado } igualando ao = uso de Usuário(com Id de usuário);
  const { data: fetchedUser } = useUser(userId);

  return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
   );
}
 
export default UserHero;

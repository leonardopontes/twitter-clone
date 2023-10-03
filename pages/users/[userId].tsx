import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";

// Visualizar Usuário ligando a = função anônima sem parâmetros, contendo... => {
const UserView = () => {
  // rota ligando a = uso de Rotas();
  const router = useRouter();
  // { Id de usuário } ligando a = consultar.rota;
  const { userId } = router.query;

  // { dados: buscar Usuário, está Carregando } ligando a = uso de Usuário(Id de usuário como string);
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  // Se (está carregando || negação de buscar Usuário) { for verdade
  if (isLoading || !fetchedUser) {
    // retornar
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  // retornar
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
   );
}
 
export default UserView;

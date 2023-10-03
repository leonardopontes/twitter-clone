import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// exportar função de pegar Propriedades do Lado Servidor no(contexto: Contexto de Página Next) {
export async function getServerSideProps(context: NextPageContext) {
  // sessão ligando a = aguardar pegar Sessão(contexto);
  const session = await getSession(context);

  // se (negação de sessão) for verdade {
  if (!session) {
    // retornar {
    return {
      // redirecionar: {
      redirect: {
        // destinar: raíz da rota,
        destination: '/',
        // permanente: falso,
        permanent: false,
      }
    }
  }
  // retornar {
  return {
    // propriedade: {
    props: {
      // sessão
      session
    }
  }
}

const Notifications = () => {
  return ( 
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications;

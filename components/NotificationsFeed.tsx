import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";

// Feed com Notificações ligando a = () contendo... => {
const NotificationsFeed = () => {
  // {dados com: Usuário atual, mutação com: mutação no Usuário atual} ligando ao = uso de Usuários Atuais();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // {dados com: buscar Notificações ligando a = [] } ligando ao = uso de Notificações(com Atual Usuário?.com id);
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  // uso de Efeito(() contendo... => {
  useEffect(() => {
    // mutação de Usuário Atual();
    mutateCurrentUser();
    // }, Envolver na estrutura [mutação de Usuário Atual]);
  }, [mutateCurrentUser]);

  // Se for verdade se o (comprimento. de buscar Notificações for igual a 0 em valor e tipo ===){
  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }
  
  return ( 
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
        </div>
        ))}
    </div>
   );
}
 
export default NotificationsFeed;

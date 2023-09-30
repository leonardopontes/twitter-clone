import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Notificações ligado a = (Id de usuário?: string) contendo... => {
const useNotifications = (userId?: string) => {
  // url ligado a = Id de usuário ? na rota `/api/notifications/${userId}` : nulo;
  const url = userId ? `/api/notifications/${userId}` : null;
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR(url, buscador);
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;

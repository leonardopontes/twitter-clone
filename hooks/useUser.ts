import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Usuário ligado a = (Id de usuário: string) contendo... => {
const useUser = (userId: string) => {
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR(Id de usuário ? na rota `/api/users/${userId}` : nulo, buscando);
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUser;

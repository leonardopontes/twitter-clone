import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Usuários ligado a = () contendo... => {
const useUsers = () => {
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR na rota('/api/users', buscando);
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUsers;

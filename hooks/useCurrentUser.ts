import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Atuais Usuários ligado a = () contendo... => {
const useCurrentUser = () => {
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR na rota('/api/current', buscador);
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;

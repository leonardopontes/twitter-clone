import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Posts ligado a = (Id de usuário?: string) contendo... => {
const usePosts = (userId?: string) => {
  // url ligado a = Id de usuário ? na rota `/api/posts?userId=${userId}` : '/api/posts';
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR(url, buscador);
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;

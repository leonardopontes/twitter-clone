import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// uso de Post ligado a = (Id de post?: string) contendo... => {
const usePost = (postId: string) => {
  // { dados, erro, está Carregando, mutação } ligado a = uso de SWR(Id de post ? na rota `/api/posts/${postId}` : nulo, buscador);
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;

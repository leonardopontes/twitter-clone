import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

// Definir uma interface de Propriedade de Item de Post
interface PostFeedProps {
  // Id de usuário possuindo?: string;
  userId?: string;
}

// Item de Post possuindo: React.FC<interface> ligando a ({ Id de usuário }) contendo...
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  // { dados possuindo: posts igualando a um Array vazio } igualando ao uso de Posts com (Id de usuário)
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;

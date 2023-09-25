import CommentItem from './CommentItem';

// Definir uma interface de Propriedade de comentários Feed
interface CommentFeedProps {
  // comentários?: contendo Registro de <string, qualquer> e um Array vazio;
  comments?: Record<string, any>[];
}

// comentários Feed possuindo: React.FC<interface> ligando a ({ comentários que liga a um array vazio }) contendo...
const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  // retorno
  return (
    <>
      {/* {mapear.comentários com((comentário: possuindo Registro de <string, qualquer>,) contendo... */}
      {comments.map((comment: Record<string, any>,) => (
        {/* chave ligando a {comentário. com base no id} e dados ligando a {comentário} */}
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;

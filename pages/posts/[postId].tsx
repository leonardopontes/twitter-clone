import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

// Visualizar Post ligando a = função anônima sem parâmetros, contendo... => {
const PostView = () => {
  // rota ligando a = uso de Rotas();
  const router = useRouter();
  // { Id de post } ligando a = consultar.rota;
  const { postId } = router.query;

  // { dados: buscar Post, está carregando } ligando a = uso de Post(Id de post como string);
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  // Se (está carregando || negação de buscar Post) { for verdade
  if (isLoading || !fetchedPost) {
    // retornar
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  // retornar
  return ( 
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
   );
}
 
export default PostView;

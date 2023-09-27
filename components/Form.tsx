import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';

// Definir uma interface de Propriedade de Formulário {
interface FormProps {
  // espaço reservado possuindo: string;
  placeholder: string;
  // é Comentário? possuindo: boolean;
  isComment?: boolean;
  // Id de Post? possuindo: string;
  postId?: string;
}

// Formulário possuindo: React.FC<interface> ligando a = ({ espaço reservado, é Comentário, Id de post }) contendo... => {
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  // Modal de registro igualando ao = uso de Modal de Registro();
  const registerModal = useRegisterModal();
  // Modal de login igualando ao = uso de Modal de Login();
  const loginModal = useLoginModal();

  // { dados possuindo: Usuário atual } igualando ao = uso de Usuário Atual();
  const { data: currentUser } = useCurrentUser();
  // { mutação possuindo: mutação de Posts } igualando ao = uso de Posts();
  const { mutate: mutatePosts } = usePosts();
  // { mutação possuindo: mutação de Post } igualando ao = uso de Post(com Id do Post como string);
  const { mutate: mutatePost } = usePost(postId as string);

  // [corpo, definir Corpo] ligado ao = uso de Estado('') vazio;
  const [body, setBody] = useState('');
  // [está Carregando, definir se Está Carregando] ligado ao = uso de Estado(falso);
  const [isLoading, setIsLoading] = useState(false);

  // Envio ativado, ligando ao = uso de Callback(assíncrono () contendo... => {
  const onSubmit = useCallback(async () => {
    // Exceção de tentar {, definir se Está Carregando de forma (verdadeira)
    try {
      setIsLoading(true);

      // url ligando a = é Comentário ? na rota `/api/comments?postId=${postId}`; (Id de Post) e na rota : '/api/posts';
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      // aguardar axios.cria na (url, { corpo });
      await axios.post(url, { body });

      // toast.sucesso('Tweet criado');
      toast.success('Tweet created');
      // definirCorpo('') vazio;
      setBody('');
      // mutação de Posts();
      mutatePosts();
      // mutação de Post();
      mutatePost();
    // } pegar (erro) { 
    } catch (error) {
      // toast.erro('Algo deu errado');
      toast.error('Something went wrong');
    // } finalizar {  
    } finally {
      // definir se Está Carregando(falso);
      setIsLoading(false);
    }
    // }, Envolver na estrutura [corpo, mutação de Posts, é Comentário, Id de post, mutação de Post]);
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}>
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

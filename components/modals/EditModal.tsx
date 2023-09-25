import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

// Atribuir Edição de Modal, contendo...
const EditModal = () => {
  // dados com atual Usuário, ligando ao uso de Atual Usuário
  const { data: currentUser } = useCurrentUser();
  // mutação com mutação na Busca de Usuário, ligando ao uso de Usuário recebendo atual Usuário e id
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  // edição de modal ligado ao uso de Edição de Modal
  const editModal = useEditModal();

  // Imagem do perfil e definir Imagem do Perfil ligado ao uso de Estado vazio
  const [profileImage, setProfileImage] = useState('');
  // Imagem coberta e definir Imagem Coberta ligado ao uso de Estado vazio
  const [coverImage, setCoverImage] = useState('');
  // Nome e definir Nome ligado ao uso de Estado vazio
  const [name, setName] = useState('');
  // Nome de usuário e definir nome de Usuário ligado ao uso de Estado vazio
  const [username, setUsername] = useState('');
  // bio e definir Bio ligado ao uso de Estado vazio 
  const [bio, setBio] = useState('');

  // uso de Efeito...
  useEffect(() => {
    // definir Imagem de Perfil, recebendo atual Usuário  com Imagem de perfil
    setProfileImage(currentUser?.profileImage)
    // definir Imagem coberta, recebendo atual Usuário com Imagem coberta
    setCoverImage(currentUser?.coverImage)
    // definir Nome, recebendo atual Usuário com nome 
    setName(currentUser?.name)
    // definir Nome de usuário, recebendo atual Usuário com nome de usuário
    setUsername(currentUser?.username)
    // definir Bio, recebendo atual Usuário com Bio
    setBio(currentUser?.bio)
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);
  
  // está carregando, definir se está carregando, ligando ao uso de Estado falso
  const [isLoading, setIsLoading] = useState(false);

  // Envio ativado, ligando ao uso de Callback, recebendo uma função assíncrona, contendo...
  const onSubmit = useCallback(async () => {
    // Exceção de tentar, definir se está carregando de forma verdadeira
    try {
      setIsLoading(true);

      // aguardar enquanto axios corrige a rota '/api/edit', contendo nome, nome de usuário, bio, Imagem de perfil e cobrir Imagem
      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      // modificar usuário obtido
      mutateFetchedUser();

      // Utilização de toast, exibindo com sucesso a mensagem de 'atualizado'
      toast.success('Updated');

      // edição de Modal Fechado ativado
      editModal.onClose();
      // pegar erro utilizando toast com erro a mensagem de 'Algo deu errado'
    } catch (error) {
      toast.error('Something went wrong');
      // finalizar, definir se está carregando de forma falsa
    } finally {
      setIsLoading(false);
    }
    // Envolver na estrutura edição de Modal, nome, nome de usuário, bio, modificar usuário obtido, Imagem de perfil e cobrir Imagem
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <Input 
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading} 
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;

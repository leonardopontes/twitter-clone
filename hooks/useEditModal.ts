import { create } from 'zustand';

// Criar uma interface de Editar Modal de Loja {
interface EditModalStore {
  // Abrir como: booleano;
  isOpen: boolean;
  // Abrir ativado como: () => vazio;
  onOpen: () => void;
  // Fechar ativado como: () => vazio;
  onClose: () => void;
}

// uso de Editar Modal ligado a = criar<Interface>((definir) contendo... => ({
const useEditModal = create<EditModalStore>((set) => ({
  // Abrir como: falso,
  isOpen: false,
  // Abrir ativado como: () => definir({ Abrir como: verdadeiro }),
  onOpen: () => set({ isOpen: true }),
  // Fechar ativado como: () => definir({ Abrir como: falso })
  onClose: () => set({ isOpen: false })
}));


export default useEditModal;

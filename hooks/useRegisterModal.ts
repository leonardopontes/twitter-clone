import { create } from 'zustand';

// Criar uma interface de Registro Modal de Loja {
interface RegisterModalStore {
  // Abrir como: booleano;
  isOpen: boolean;
  // Abrir ativado como: () => vazio;
  onOpen: () => void;
  // Fechar ativado como: () => vazio;
  onClose: () => void;
}

// uso de Registro Modal ligado a = criar<Interface>((definir) contendo... => ({
const useRegisterModal = create<RegisterModalStore>((set) => ({
  // Abrir como: falso,
  isOpen: false,
  // Abrir ativado como: () => definir({ Abrir como: verdadeiro }),
  onOpen: () => set({ isOpen: true }),
  // Fechar ativado como: () => definir({ Abrir como: falso })
  onClose: () => set({ isOpen: false })
}));


export default useRegisterModal;

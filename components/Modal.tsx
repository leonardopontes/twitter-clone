import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

// Definir uma interface de Propriedade de Modal {
interface ModalProps {
  // está Aberto? como: booleano;
  isOpen?: boolean;
  // Fechar ligado como: () => vazio;
  onClose: () => void;
  // Envio ligado como: () => vazio;
  onSubmit: () => void;
  // título? como: string;
  title?: string;
  // corpo? como: React.ReactElement;
  body?: React.ReactElement;
  // footer? como: React.ReactElement;
  footer?: React.ReactElement;
  // ação no Label como: string;
  actionLabel: string;
  // desabilitar? como: booleano;
  disabled?: boolean;
}

// Modal possuindo: React.FC<interface> ligando a = ({ é Aberto, ligar Fechar, ligar Envio, corpo, ação no Label, footer, desabilitar }) contendo... => {
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  // lidar com Fechar ligando a = uso de Callback (() contendo... => {
  const handleClose = useCallback(() => {
    // se (desabilitar) for verdade {
    if (disabled) {
      // retornar;
      return;
    }

    // ligar Fechar();
    onClose();
    // }, Envolver na estrutura [Fechar ligado, desabilitar]);
  }, [onClose, disabled]);

  // lidar com Envio ligando a = uso de Callback (() contendo... => {
  const handleSubmit = useCallback(() => {
    // se (desabilitar) for verdade {
    if (disabled) {
      // retornar;
      return;
    }

    // Envio ligado();
    onSubmit();
    // }, Envolver na estrutura [Envio ligado, desabilitar]);
  }, [onSubmit, disabled]);

  // se a negação (!éAberto) for verdade {
  if (!isOpen) {
    // retornar nulo;
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/*content*/}
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/*header*/}
            <div className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">
                {title}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-10 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

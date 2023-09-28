import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

// Definir uma interface de Propriedade de Header {
interface HeaderProps {
  // mostrar Seta para Trás? possuindo: boolean;
  showBackArrow?: boolean;
  // rótulo como: string
  label: string;
}

// Header possuindo: React.FC<interface> ligando a = ({ mostrar Seta para Trás, rótulo }) contendo... => {
const Header: React.FC<HeaderProps> = ({showBackArrow, label }) => {
  // rota ligando a = uso de Rota();
  const router = useRouter();

  // lidar com Volta ligando a = uso de Callback(() contendo... => {
  const handleBack = useCallback(() => {
    // voltar.rota();
    router.back();
    // }, Envolver na estrutura a [rota]);
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            color="white" 
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className="text-white text-xl font-semibold">
          {label}
        </h1>
      </div>
    </div>
  );
}

export default Header;

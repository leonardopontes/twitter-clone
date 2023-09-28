import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// Definir uma interface de Propriedade de zona de Drop {
interface DropzoneProps {
  // em Mudança: (base64 como: string) contendo => vazio;
  onChange: (base64: string) => void;
  // rótulo como: string;
  label: string;
  // valor? como: string;
  value?: string;
  // desabilitar? como: booleano;
  disabled?: boolean;
}

// Upload de Imagem possuindo: React.FC<interface> ligando a = ({ em Mudança, rótulo, valor, desativar }) contendo... => {
const ImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
  // [base64, definirBase64] ligando ao = uso de Estado(com valor);
  const [base64, setBase64] = useState(value);

  // lidar com Mudança ligando a = uso de Callback((com base64 como: string) contendo... => {
  const handleChange = useCallback((base64: string) => {
    // em Mudança(com base64);
    onChange(base64);
    // }, Envolver na estrutura [em Mudança]);
  }, [onChange]);

  // lidar com Drop ligando a = uso de Callback((com arquivos como: qualquer) contendo... => {
  const handleDrop = useCallback((files: any) => {
      // arquivo ligando a = arquivos iniciando com o valor [0]
      const file = files[0]
      // leitor ligando a = novo Leitor de Arquivo();
      const reader = new FileReader();
      // leitor.carregando ligando a = (evento: qualquer) contendo... => {
      reader.onload = (event: any) => {
        // definir Base64 com (evento.alvo. de .resultado);
        setBase64(event.target.result);
        // lidar com Mudança com (evento.alvo. de .resultado);
        handleChange(event.target.result);
      };
      // leitor.ler Como Dados URL com (arquivo);
      reader.readAsDataURL(file);
    // }, Envolver na estrutura [lidar com Mudança]);
  }, [handleChange])

  // pegar {Propriedade Root, pegar Propriedade Input} ligando a = uso de zona de Drop
  const { getRootProps, getInputProps } = useDropzone({ 
    // máximo de Arquivos: 1,
    maxFiles: 1, 
    // Drop ligado: lidar com Drop,
    onDrop: handleDrop, 
    // desabilitar,
    disabled,
    // aceitar: {
    accept: {
      // 'image/jpeg': [], (começando como vazio)
      'image/jpeg': [],
      // 'image/png': [], (começando como vazio)
      'image/png': [],
    } 
  });

  return ( 
    <div {...getRootProps({className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700'})}>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image
            src={base64}
            height="100"
            width="100"
            alt="Uploaded image"
          />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
   );
}
 
export default ImageUpload;

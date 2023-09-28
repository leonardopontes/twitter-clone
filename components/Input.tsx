// Definir uma interface de Propriedade de Input {
interface InputProps {
  // espaço reservado? como: string;
  placeholder?: string;
  // valor? como: string;
  value?: string;
  // tipo? como: string;
  type?: string;
  // desabilitar? como: booleano;
  disabled?: boolean;
  // mudança Ligada como: (evento com: React.ChangeEvent<HTMLInputElement>) => vazio;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // rótulo? como: string;
  label?: string;
}

// Input possuindo: React.FC<interface> ligando a = ({ espaço reservado, valor, tipo = "texto", desabilitar, rótulo }) contendo... => {
const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
          w-full
          p-4 
          text-lg 
          bg-black 
          border-2
          border-neutral-800 
          rounded-md
          outline-none
          text-white
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
    </div>
   );
}
 
export default Input;

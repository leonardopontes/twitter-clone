// importar uso de Usuários de Hooks de uso de usuários
import useUsers from '@/hooks/useUsers';

// importar Avatar de onde se localiza Avatar
import Avatar from '../Avatar';

// Atribuir Barra de seguir, passando (contendo)...
const FollowBar = () => {
  // Atribuição de dados a usuários se igualando ao estado de uso de Usuários
  const { data: users = [] } = useUsers();

  // Se for verdade o tamanho de usuários terá o valor e tipo igual a 0, e irá retornar nulo
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;

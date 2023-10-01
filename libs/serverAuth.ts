import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

// servidor de Autenticação ligando a = função assíncrona, fazendo uma (requisição em: NextApiRequest, como resposta: NextApiResponse) contendo => {
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // sessão ligando = aguardar enquanto a Sessão do Servidor pega fazendo uma(requisição, resposta, Opções de autenticação);
  const session = await getServerSession(req, res, authOptions);

  // sendo verdade a (negação de sessão?.de usuários?.de email) {
  if (!session?.user?.email) {
    // lançar novo Erro('Não conectado');
    throw new Error('Not signed in');
  } 

  // Usuário atual ligado a = aguardando prisma.encontrar Único.usuário({
  const currentUser = await prisma.user.findUnique({
    // onde: {
    where: {
      // email: sessão.de email.de usuário,
      email: session.user.email,
    }
  });

  // sendo verdade a (negação de Usuário atual) {
  if (!currentUser) {
    // lançar novo Erro('Não conectado');
    throw new Error('Not signed in');
  }

  // retornar { Usuário atual };
  return { currentUser };
};

export default serverAuth;

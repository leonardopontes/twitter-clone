import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'PEGAR') {
  if (req.method !== 'GET') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // usuários ligando a = aguardando prisma.encontrarMuitos.usuário({
    const users = await prisma.user.findMany({
      // ordena Por: {
      orderBy: {
        // criado Em: 'desc'
        createdAt: 'desc'
      }
    });

    // retornar resposta.status(200).json com(usuários);
    return res.status(200).json(users);
  // } pegar (erro) {  
  } catch(error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

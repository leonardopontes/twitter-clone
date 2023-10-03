import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'POST') {
  if (req.method !== 'POST') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { email, nome de usuário, nome, senha } ligando a = = requisição.no corpo;
    const { email, username, name, password } = req.body;
    // hash de Senha ligando a = aguardar bcrypt.hash(senha, contendo 12);
    const hashedPassword = await bcrypt.hash(password, 12);

    // aguardando prisma.criar.usuário({
    const user = await prisma.user.create({
      // dados: {
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });
    // retornar resposta.status(200).json com(usuário);
    return res.status(200).json(user);
  // } pegar (erro) {  
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

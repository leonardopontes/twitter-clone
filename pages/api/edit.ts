import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'CORREÇÃO') {
  if (req.method !== 'PATCH') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
    const { currentUser } = await serverAuth(req, res);

    // { nome, nome de usuário, bio, Imagem de perfil, cobrir Imagem} ligando a = requisição.no corpo;
    const { name, username, bio, profileImage, coverImage } = req.body;

    // sendo verdade a negação (nome || !nome de usuário) {
    if (!name || !username) {
      // lançar novo Erro('Campos ausentes');
      throw new Error('Missing fields');
    }

    // atualizar Usuário ligando a = aguardando prisma.atualizar.usuário({
    const updatedUser = await prisma.user.update({
      // onde: {
      where: {
        // Id: Usuário atual com.Id,
        id: currentUser.id,
      },
      // dados: {
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    // retornar resposta.status(200).json com(atualizar Usuário);
    return res.status(200).json(updatedUser);
  // } pegar (erro) {   
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

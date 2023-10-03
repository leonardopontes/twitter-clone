import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'POST' && método.de requisição !== 'DELETAR') {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { Id de usuário } ligando a = = requisição.no corpo;
    const { userId } = req.body;
    // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
    const { currentUser } = await serverAuth(req, res);

    // sendo verdade a negação (Id de usuário && tipo de Id de usuário !== 'string') {
    if (!userId || typeof userId !== 'string') {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // usuário ligando a = aguardando prisma.encontrarMuitos.usuário({
    const user = await prisma.user.findUnique({
      // onde: {
      where: {
        // id: Id de usuário
        id: userId
      }
    });

    // sendo verdade a negação (de usuário) {
    if (!user) {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // deixar atualizar Ids de seguidores ligando a = [pegando todos...(usuários com.Ids de seguidores || Array vazio)];
    let updatedFollowingIds = [...(user.followingIds || [])];

    // sendo verdade o (método.de requisição === 'POST') {
    if (req.method === 'POST') {
      // deixar atualizar Ids de seguidores.puxando(Id de usuário);
      updatedFollowingIds.push(userId);

      // NOTIFICATION PART START
      // tentar {
      try {
        // aguardando prisma.criar.notificação({
        await prisma.notification.create({
          // dados: {
          data: {
            // corpo: 'Alguém seguiu você!',
            body: 'Someone followed you!',
            // Id de usuário,
            userId,
          },
        });
        
        // aguardando prisma.atualizar.usuário({
        await prisma.user.update({
          // onde: {
          where: {
            // id: Id de usuário,
            id: userId,
          },
          // dados: {
          data: {
            // tem Notificação: verdadeiro,
            hasNotification: true,
          }
        });
      // } pegar (erro) {  
      } catch (error) {
        // console.log(erro);
        console.log(error);
      }
      // NOTIFICATION PART END
      
    }

    // sendo verdade o (método.de requisição === 'DELETAR') {
    if (req.method === 'DELETE') {
      // deixar atualizar Ids de seguidor ligando a = deixar atualizar Ids de seguidor.filtrando((Id de seguidor) => Id de seguidor !== Id usuário);
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
    }

    // atualizar Usuário ligando a = aguardando prisma.atualizar.usuário({
    const updatedUser = await prisma.user.update({
      // onde: {
      where: {
        // id: Usuário atual com.id
        id: currentUser.id
      },
      // dados: {
      data: {
        // Ids de seguidor: atualizar Ids de seguidor
        followingIds: updatedFollowingIds
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

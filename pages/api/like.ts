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
    // { Id de post } ligando a = = requisição.no corpo;
    const { postId } = req.body;
    // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
    const { currentUser } = await serverAuth(req, res);

    // sendo verdade a negação (Id de post || tipo de Id de post !== 'string') {
    if (!postId || typeof postId !== 'string') {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // post ligando a = aguardando prisma.encontrarMuitos.post({
    const post = await prisma.post.findUnique({
      // onde: {
      where: {
        // id: Id de post
        id: postId
      }
    });

    // sendo verdade a negação (de post) {
    if (!post) {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // deixar atualizar Ids de Like ligando a = [pegando todos...(post com.Ids de like || Array vazio)];
    let updatedLikedIds = [...(post.likedIds || [])];

    // sendo verdade o (método.de requisição === 'POST') {
    if (req.method === 'POST') {
      // deixar atualizar Ids de Like.puxando(Id de.Usuário atual);
      updatedLikedIds.push(currentUser.id);
      
      // NOTIFICATION PART START
      // tentar {
      try {
        // post ligando a = aguardando prisma.encontrarMuitos.post({
        const post = await prisma.post.findUnique({
          // onde: {
          where: {
            // id: Id de post,
            id: postId,
          }
        });

        // sendo verdade a negação (de post?com.Id de usuário) {
        if (post?.userId) {
          // aguardar prisma.criar.notificação({
          await prisma.notification.create({
            // dados: {
            data: {
              // corpo: 'Alguém gostou do seu tweet!',
              body: 'Someone liked your tweet!',
              // Id de usuário: post com.Id de usuário
              userId: post.userId
            }
          });

          // aguardando prisma.atualizar.usuário({
          await prisma.user.update({
            // onde: {
            where: {
              // id: post com.Id de usuário
              id: post.userId
            },
            // dados: {
            data: {
              // tem Notificação: verdadeiro,
              hasNotification: true
            }
          });
        }
      // } pegar (erro) {
      } catch(error) {
        // console.log(erro);
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    // sendo verdade o (método.de requisição === 'DELETAR') {
    if (req.method === 'DELETE') {
      // atualizar Ids de Curtir ligando a = atualizar Ids de Curtir.filtrando((Id de curtir) => Id de curtir !== Usuário atual?.Id);
      updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);
    }

    // atualizar Post ligando a = aguardando prisma.atualizar.post({
    const updatedPost = await prisma.post.update({
      // onde: {
      where: {
        // id: Id de post
        id: postId
      },
      // dados: {
      data: {
        // Ids de curtir: atualizar Ids de Curtir
        likedIds: updatedLikedIds
      }
    });

    // retornar resposta.status(200).json com(atualizar Post);
    return res.status(200).json(updatedPost);
  // } pegar (erro) {  
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

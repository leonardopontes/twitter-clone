import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'POST') {
  if (req.method !== 'POST') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
    const { currentUser } = await serverAuth(req, res);
    // { corpo } ligando a = requisição.no corpo;
    const { body } = req.body;
    // { Id de post } ligando a = consultar.requisição;
    const { postId } = req.query;

    // sendo verdade a negação (Id de post || tipo de Id de post !== 'string') {
    if (!postId || typeof postId !== 'string') {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // comentário ligando a = aguardando prisma.criar.comentário({
    const comment = await prisma.comment.create({
      // dados: {
      data: {
        // corpo,
        body,
        // Id de usuário: Usuário atual com base no .id,
        userId: currentUser.id,
        // Id de post
        postId
      }
    });

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

      // sendo verdade (post?.Id de usuário) {
      if (post?.userId) {
        // aguardando prisma.criar.notificação({
        await prisma.notification.create({
          // dados: {
          data: {
            // corpo: 'Alguém respondeu no seu tweet!',
            body: 'Someone replied on your tweet!',
            // Id de usuário: post com.Id de usuário
            userId: post.userId
          }
        });

        // aguardando prisma.atualizar.usuário({
        await prisma.user.update({
          // onde: {
          where: {
            // Id: post com.Id de usuário
            id: post.userId
          },
          // dados: {
          data: {
            // tem Notificação: verdadeiro
            hasNotification: true
          }
        });
      }
    }
    // pegar (erro) {  
    catch (error) {
      // console.log(erro);
      console.log(error);
    }
    // NOTIFICATION PART END

    // retornar resposta.status(200).json com(comentário);
    return res.status(200).json(comment);
  // } pegar (erro) {   
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

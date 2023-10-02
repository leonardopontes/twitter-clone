import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'POST' && método.de requisição !== 'PEGAR') {
  if (req.method !== 'POST' && req.method !== 'GET') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // sendo verdade o (método.de requisição === 'POST') {
    if (req.method === 'POST') {
      // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
      const { currentUser } = await serverAuth(req, res);
      // { corpo } ligando a = requisição.no corpo;
      const { body } = req.body;

      // post ligando a = aguardando prisma.criar.post({
      const post = await prisma.post.create({
        // dados: {
        data: {
          // corpo,
          body,
          // Id de usuário: Usuário atual com base no .id
          userId: currentUser.id
        }
      });

      // retornar resposta.status(200).com json(post);
      return res.status(200).json(post);
    }

    // sendo verdade o (método.de requisição === 'PEGAR') {
    if (req.method === 'GET') {
      // { Id de usuário } ligando a = requisição.de consulta;
      const { userId } = req.query;
      // console.log({ Id de usuário })
      console.log({ userId })

      // deixar posts;
      let posts;
      // sendo verdade (Id de usuário && tipo de Id de usuário === 'string') {
      if (userId && typeof userId === 'string') {
        // posts ligando a = aguardando prisma.encontrarMuitos.post({
        posts = await prisma.post.findMany({
          // onde: {
          where: {
            // Id de usuário
            userId
          },
          // incluir: {
          include: {
            // usuário: verdadeiro,
            user: true,
            // comentários: verdadeiro
            comments: true
          },
          // ordena Por: {
          orderBy: {
            // criado Em: 'desc'
            createdAt: 'desc'
          },
        });
      // } falso {  
      } else {
        // posts ligando a = aguardando prisma.encontrarMuitos.post({
        posts = await prisma.post.findMany({
          // incluir: {
          include: {
            // usuário: verdadeiro,
            user: true,
            // comentários: verdadeiro
            comments: true
          },
          // ordena Por: {
          orderBy: {
            // criado Em: 'desc'
            createdAt: 'desc'
          }
        });
      }

      // retornar resposta.status(200).com json(posts);
      return res.status(200).json(posts);
    }
  // } pegar (erro) {  
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

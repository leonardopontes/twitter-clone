import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'PEGAR') {
  if (req.method !== 'GET') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { Id de post } ligando a = requisição.de consulta;
    const { postId } = req.query;

    // sendo verdade a (negação de Id de post || tipo de Id de post !== 'string') {
    if (!postId || typeof postId !== 'string') {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // post ligando a = aguardando prisma.encontrarMuitos.post({
    const post = await prisma.post.findUnique({
      // onde: {
      where: {
        // id: Id de post,
        id: postId,
      },
      // incluir: {
      include: {
        // usuário: verdadeiro,
        user: true,
        // comentários: {
        comments: {
          // incluir: {
          include: {
            // usuário: verdadeiro,
            user: true
          },
          // ordena Por: {
          orderBy: {
            // criado Em: 'desc'
            createdAt: 'desc'
          }
        },
      },
    });

    // retornar resposta.status(200).com json(post);
    return res.status(200).json(post);
  // } pegar (erro) {
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

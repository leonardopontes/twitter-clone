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
    // { Id de usuário } ligando a = requisição.de consulta;
    const { userId } = req.query;

    // sendo verdade a (negação de Id de usuário || tipo de Id de usuário !== 'string') {
    if (!userId || typeof userId !== 'string') {
      // lançar novo Erro('ID Inválido');
      throw new Error('Invalid ID');
    }

    // Usuário existente ligando a = aguardando prisma.encontrarMuitos.usuário({
    const existingUser = await prisma.user.findUnique({
      // onde: {
      where: {
        // id: Id de usuário
        id: userId
      }
    });

    // Contar seguidores ligando a = aguardando prisma.contar.usuário({
    const followersCount = await prisma.user.count({
      // onde: {
      where: {
        // Ids de seguidores: {
        followingIds: {
          // tem: Id de usuário
          has: userId
        }
      }
    })

    // retornar resposta.status(200).com json({Todos ...Usuário existente, Contar seguidores});
    return res.status(200).json({ ...existingUser, followersCount });
  // } pegar (erro) {  
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
};

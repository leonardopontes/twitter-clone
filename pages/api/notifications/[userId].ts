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

    // notificações ligando a = aguardando prisma.encontrarMuitas.notificação({
    const notifications = await prisma.notification.findMany({
      // onde: {
      where: {
        // Id de usuário,
        userId,
      },
      // ordena Por: {
      orderBy: {
        // criado Em: 'desc'
        createdAt: 'desc'
      }
    });

    // aguardando prisma.atualizar.usuário({
    await prisma.user.update({
      // onde: {
      where: {
        // Id de usuário
        id: userId
      },
      // dados: {
      data: {
        // tem Notificação: falso,
        hasNotification: false,
      }
    });

    // retornar resposta.status(200).com json(notificações);
    return res.status(200).json(notifications);
    // pegar (erro) {
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

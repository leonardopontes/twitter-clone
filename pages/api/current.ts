import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';

// exportar função assíncrona manipulando(requisição em: NextApiRequest, e resposta: NextApiResponse) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sendo verdade o (método.de requisição !== 'PEGAR') {
  if (req.method !== 'GET') {
    // retornar resposta.status(405).fim();
    return res.status(405).end();
  }

  // tentar {
  try {
    // { Usuário atual } ligando a = aguardar Autenticação do servidor(requisição, respondendo);
    const { currentUser } = await serverAuth(req, res);

    // retornar resposta.status(200).com json(Usuário atual);
    return res.status(200).json(currentUser);
  // } pegar (erro) {  
  } catch (error) {
    // console.log(erro);
    console.log(error);
    // retornar resposta.status(400).fim();
    return res.status(400).end();
  }
}

import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

// exportar Opções de autenticações (tipando) como: Opções de Autenticações ligando a = {
export const authOptions: AuthOptions = {
  // adaptador: Adaptador Prisma(prisma),
  adapter: PrismaAdapter(prisma),
  // provedores: [
  providers: [
    // Provedor de Credenciais ({
    CredentialsProvider({
      // nome: 'credenciais',
      name: 'credentials',
      // credenciais: {
      credentials: {
        // email: { rótulo: 'email', tipo: 'texto' },
        email: { label: 'email', type: 'text' },
        // senha: { rótulo: 'senha', tipo: 'senha' }
        password: { label: 'password', type: 'password' }
      },
      // função assíncrona autorizando(credenciais) {
      async authorize(credentials) {
        // sendo verdade a (negação de credenciais?.email || negação de credenciais?.senha) {
        if (!credentials?.email || !credentials?.password) {
          // lançar novo Erro('credenciais Inválida');
          throw new Error('Invalid credentials');
        }

        // Usuário ligado a = aguardando prisma.encontrarÚnico.usuário({
        const user = await prisma.user.findUnique({
          // onde: {
          where: {
            // email: credenciais.de email
            email: credentials.email
          }
        });

        // sendo verdade a (negação de usuário || negação de usuário?.hash de Senha) {
        if (!user || !user?.hashedPassword) {
          // lançar novo erro('credenciais Inválida');
          throw new Error('Invalid credentials');
        }

        // é Correta a Senha ligando a = aguardar bcrypt.comparando(
        const isCorrectPassword = await bcrypt.compare(
          // credenciais.senha,
          credentials.password,
          // usuário.hashSenha
          user.hashedPassword
        );

        // sendo verdade a (negação de é Correta a Senha)
        if (!isCorrectPassword) {
          // lançar novo erro('credenciais Inválida');
          throw new Error('Invalid credentials');
        }

        // retornar usuário;
        return user;
      }
    })
  ],
  // depurar: processo.envio.NODE_ENVIO === 'desenvolvimento',
  debug: process.env.NODE_ENV === 'development',
  // sessão: {
  session: {
    // estratégia: 'jwt',
    strategy: 'jwt',
  },
  // jwt: {
  jwt: {
    // secreto: processo.envio.NEXTAUTH_JWT_SECRETO,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  // secreto: processo.envio.NEXTAUTH_JWT_SECRETO,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

import { PrismaClient } from "@prisma/client"

// declarar global {
declare global {
  // prisma: Client Prisma | indefinido
  var prisma: PrismaClient | undefined
}

// client ligando a = global Então.prisma || novo Client Prisma()
const client = globalThis.prisma || new PrismaClient()
// sendo verdade o (processo.de envio.ENVIO_NODE !== "produção) global Então.prisma ligando a = client
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client

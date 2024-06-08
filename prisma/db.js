// Importar, instanciar e exportar a classe PrismaClient após sua geração com npx prisma generate

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Uma única instância do PrismaClient que será usada por qualquer parte da aplicação que precisar conectar-se com o banco de dados
export default db;

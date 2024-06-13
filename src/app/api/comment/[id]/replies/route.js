import db from "../../../../../../prisma/db";

// Escrever "_request" é uma convenção para ignorar o primeiro parâmetro e conseguir utilizar o segundo parâmetro
export async function GET(_request, { params }) {
  const replies = await db.comment.findMany({
    where: {
      parentId: parseInt(params.id),
    },
    include: {
      author: true,
    },
  });
  return Response.json(replies);
}

"use server";

import { revalidatePath } from "next/cache";
import db from "../../prisma/db";

// Por ser uma server action, ou seja, uma função que será executada no servidor, a função deve ser sempre assíncrona
export async function incrementThumbsUp(post) {
  // await new Promise((resolve) => setTimeout( resolve, 3500))

  await db.post.update({
    where: {
      id: post.id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/${post.slug}`);
}

// Parâmetro formData é injetado automaticamente pelo Next.js e servirá para acessar o valor do textarea do componente de comentário através do seu atributo 'name'
export async function postComment(post, formData) {
  const author = await db.user.findFirst({
    where: {
      username: "anabeatriz_dev",
    },
  });

  await db.comment.create({
    data: {
      text: formData.get("text"),
      authorId: author.id,
      postId: post.id,
    },
  });

  revalidatePath("/");
  revalidatePath(`/${post.slug}`);
}

export async function postReply(parent, formData) {
  const author = await db.user.findFirst({
    where: {
      username: "anabeatriz_dev",
    },
  });

  const post = await db.post.findFirst({
    where: {
      id: parent.postId,
    },
  });

  await db.comment.create({
    data: {
      text: formData.get("text"),
      authorId: author.id,
      postId: post.id,
      // Precisamos indcar o parentId para que o Prisma saiba a qual comentário o novo comentário está respondendo.
      //O ?? (Nullish Coalescing Operator) parent.id é uma forma de garantir que o parentId será o id do comentário pai, caso ele exista, ou o próprio id do comentário pai, caso ele não exista
      parentId: parent.parentId ?? parent.id,
    },
  });
  revalidatePath(`/${post.slug}`);
}

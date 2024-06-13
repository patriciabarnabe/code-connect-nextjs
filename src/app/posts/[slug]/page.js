import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";

import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";
import { CommentList } from "@/components/CommentList";

async function getPostBySlug(slug) {
  // Primeira integração via fetch com a API Rest do JSON-server
  // const url = `http://localhost:3042/posts?slug=${slug}`;

  try {
    //   const response = await fetch(url);
    //   if (!response.ok) throw new Error("Falha na rede.");

    //   const data = await response.json();
    //   if (!data.length) {
    //     logger.info("Post não encontrado.");
    //     return {};
    //   }

    //   logger.info("Post obtido com sucesso!");
    //   const post = data[0];

    // Nova integração utilizando Prisma e PostgreSQL para acessar os dados
    const post = await db.post.findFirst({
      where: { slug },
      include: {
        author: true,
        comments: {
          include: { author: true },
        },
      },
    });

    if (!post) {
      throw new Error(`Post como slug ${slug} não foi encontrado`);
    }

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error) {
    logger.error("Falha ao obter o post com o slug: ", { slug, error });
  }

  redirect("/not-found");
}

export default async function PagePost({ params }) {
  const post = await getPostBySlug(params.slug);
  return (
    <div>
      <CardPost post={post} highlight />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code}>
        <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
      <CommentList comments={post.comments} />
    </div>
  );
}

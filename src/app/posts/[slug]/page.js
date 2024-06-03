import logger from "@/logger";
import { remark } from "remark";
import html from "remark-html";

import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";

async function getPostBySlug(slug) {
  const url = `http://localhost:3042/posts?slug=${slug}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Falha na rede.");

    const data = await response.json();
    if (!data.length) {
      logger.info("Post não encontrado.");
      return {};
    }

    logger.info("Post obtido com sucesso!");
    const post = data[0];

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error) {
    logger.error("Ops, algo deu errado: " + error.message);
    return {};
  }
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
    </div>
  );
}

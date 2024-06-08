import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page) {
  // Primeira integração via fetch com a API Rest do JSON-server
  // try {
  //   const response = await fetch(
  //     `http://localhost:3042/posts?_page=${page}&_per_page=6`
  //   );
  //   if (!response.ok) throw new Error("Falha na rede.");
  //   logger.info("Posts obtidos com sucesso!");
  //   return response.json();
  // } catch (error) {
  //   logger.error("Ops, algo deu errado: " + error.message);
  //   return [];
  // }

  // Nova integração utilizando Prisma e PostgreSQL para acessar os dados
  try {
    const posts = await db.post.findMany({ include: { author: true } });

    return { data: posts, prev: null, next: null };
  } catch (error) {
    logger.error("Falha ao obter os posts", { error });
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  // Paginação baseada nas queries da URL
  const currentPage = searchParams?.page || 1;

  //Renomeando a propriedade 'data' que vem da API para 'posts'
  const { data: posts, prev, next } = await getAllPosts(currentPage);

  return (
    <main className={styles.grid}>
      {posts.map((post) => (
        <CardPost key={post.id} post={post} />
      ))}
      {/* Lógica de renderização condicional */}
      {prev && (
        <Link href={`/?page=${prev}`} className={styles.links}>
          Página anterior
        </Link>
      )}
      {next && (
        <Link href={`/?page=${next}`} className={styles.links}>
          Próxima página
        </Link>
      )}
    </main>
  );
}

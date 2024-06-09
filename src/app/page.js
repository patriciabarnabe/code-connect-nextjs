import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page, searchQuery) {
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
    const where = {}; // Cláusula/condição de busca

    // Configuração de busca de posts por título
    if (searchQuery) {
      where.title = {
        contains: searchQuery,
        mode: "insensitive", // Ignorar a diferença entre letras maiúsculas e minúsculas
      };
    }

    const postsPerPage = 4;

    // Validação para saber se existe ou não uma página anterior
    const prevPage = page > 1 ? page - 1 : null;

    // Validação para saber se existe ou não uma próxima página
    const totalPosts = await db.post.count({ where }); // Quantos posts existem na tabela
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const nextPage = page < totalPages ? page + 1 : null;

    // Skip de posts para paginação
    const skip = (page - 1) * postsPerPage;

    const posts = await db.post.findMany({
      take: postsPerPage, // Pegar apenas os 6 primeiros posts que vierem do banco de dados
      orderBy: { createdAt: "desc" }, // Ordenação pela data mais recente de criação dos posts
      skip,
      where,
      include: { author: true }, // Inclusão do relacionamento entre tabelas User x Post
    });

    return { data: posts, prev: prevPage, next: nextPage };
  } catch (error) {
    logger.error("Falha ao obter os posts", { error });
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  // Paginação baseada nas queries da URL
  const currentPage = parseInt(searchParams?.page || 1);
  const searchQuery = searchParams?.q;

  //Renomeando a propriedade 'data' que vem da API para 'posts'
  const {
    data: posts,
    prev,
    next,
  } = await getAllPosts(currentPage, searchQuery);

  return (
    <main className={styles.grid}>
      {posts.map((post) => (
        <CardPost key={post.id} post={post} />
      ))}
      {/* Lógica de renderização condicional */}
      {prev && (
        <Link
          href={{ pathname: "/", query: { page: prev, q: searchQuery } }}
          className={styles.links}
        >
          Página anterior
        </Link>
      )}
      {next && (
        <Link
          href={{ pathname: "/", query: { page: next, q: searchQuery } }}
          className={styles.links}
        >
          Próxima página
        </Link>
      )}
    </main>
  );
}

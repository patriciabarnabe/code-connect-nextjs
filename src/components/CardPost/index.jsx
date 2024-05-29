import Image from "next/image";
import { Avatar } from "../Avatar";

export const CardPost = ({ post }) => {
  return (
    <article>
      <header>
        <figure>
          <Image src={post.cover} alt={post.title} width={438} height={133} />
        </figure>
      </header>
      <section>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </section>
      <footer>
        <Avatar name={post.author.username} imageSrc={post.author.avatar} />
      </footer>
    </article>
  );
};

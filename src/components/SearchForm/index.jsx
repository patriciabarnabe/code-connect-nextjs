import { Button } from "@/components/Button";
import styles from "./searchform.module.css";

export const SearchForm = () => {
  return (
    // Requisição do tipo GET para a raiz do projeto
    <form className={styles.form} action="/">
      <input
        name="q" // Google já utilizou esse nome para inputs de query/consulta
        className={styles.input}
        placeholder="Digite o que você procura"
      />
      <Button>Buscar</Button>
    </form>
  );
};

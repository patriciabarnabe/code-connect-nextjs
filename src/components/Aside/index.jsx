import styles from "./aside.module.css";
import Image from "next/image";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <img src="/logo.svg" alt="Logo da Code Connect" />
    </aside>
  );
};

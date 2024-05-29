import styles from "./aside.module.css";
import Image from "next/image";
import logo from "../../../public/logo.svg";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Image src={logo} alt="Logo da Code Connect" width={150} height={50} />
    </aside>
  );
};

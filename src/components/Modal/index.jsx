"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

import styles from "./modal.module.css";

// Utilização de uma referênria (hook forwardRef) que irá abrir e fechar o modal. ref será a referência que será passada para o componente pai, ou seja, que o consumidor desse compoonente irá passar para ele.
export const Modal = forwardRef(({ children }, ref) => {
  // Criação de uma referência para o dialog
  const dialogRef = useRef(null);

  const closeModal = () => {
    dialogRef.current.close();
  };

  const openModal = () => {
    dialogRef.current.showModal();
  };

  // Hook React que permite a manipulação de referências de um componente filho a partir de um componente pai, ou seja, quem irá consumir esse componente terá acesso ao método closeModal e openModal via ref. Dessa forma, quem consumir a modal irá criar uma referência dele e conseguirá abrir e fechar o modal.
  useImperativeHandle(ref, () => {
    return {
      closeModal,
      openModal,
    };
  });

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <header className={styles.header}>
        <button onClick={closeModal}>X</button>
      </header>
      {children}
    </dialog>
  );
});

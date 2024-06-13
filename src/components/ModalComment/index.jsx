"use client";

import { useRef } from "react";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";
import { Chat } from "../icons/Chat";
import { Textarea } from "../Textarea";

import styles from "./modalcomment.module.css";
import { SubmitButton } from "../SubmitButton";
import { Subheading } from "../Subheading";

export const ModalComment = ({ action }) => {
  // Criação de uma referência para o modal
  const modalRef = useRef(null);

  return (
    <>
      <Modal ref={modalRef}>
        <form action={action} onSubmit={() => modalRef.current.closeModal()}>
          <Subheading>Deixe seu comentário sobre o post:</Subheading>
          <Textarea
            required
            rows={8}
            name="text"
            placeholder="Digite aqui..."
          />
          <div className={styles.footer}>
            <SubmitButton>Comentar</SubmitButton>
          </div>
        </form>
      </Modal>
      {/* Conexão com os métodos do Modal utilizando o hook useImperativeHandle() feita no arquivo de Modal/index.jsx */}
      <IconButton onClick={() => modalRef.current.openModal()}>
        <Chat />
      </IconButton>
    </>
  );
};

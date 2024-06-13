"use client";

import { IconButton } from "../IconButton";
import { Spinner } from "../Spinner";
import { ThumbsUp } from "../icons/ThumbsUp";

// React&Next hook to get the form status
import { useFormStatus } from "react-dom";

export const ThumbsUpButton = () => {
  // Esse hook retorna um status de pending que representa se a submissão daquele formulário está ativa ou não. Esse status pending é true enquanto a requisição ainda está sendo feita. OBS: Para ser usado, deve estar dentro de um formulário.
  const { pending } = useFormStatus();

  return (
    <IconButton disabled={pending}>
      {pending ? <Spinner /> : <ThumbsUp />}
    </IconButton>
  );
};

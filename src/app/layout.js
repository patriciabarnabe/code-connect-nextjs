import { Prompt } from "next/font/google";
import { Aside } from "@/components/Aside";
import "./globals.css";
// import localFont from "next/font/local";

// const myFont = localFont({
//   src: "../../public/CedarvilleCursive.ttf",
//   display: "swap",
// });

const prompt = Prompt({
  // Variantes: Quando uma fonte não tem variantes, precisamos ser específicos sobre os weights que queremos. Isso é como dizer ao Google: "Só me envie esses pesos específicos, porque é tudo que eu vou usar". Economiza tempo de carregamento e mantém tudo mais leve.
  weight: ["400", "600"],
  // Subset e um filtro que seleciona apenas os caracteres específicos que você precisa
  subsets: ["latin"],
  // Swap: Essa propriedade define como a fonte será exibida durante o carregamento e é um truque que diz ao navegador: "Use a fonte de fallback primeiro e depois troque pela fonte do Google assim que ela estiver pronta!"
  display: "swap",
});

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      {/* Para resolver erro no console: https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c */}
      <body suppressHydrationWarning={true}>
        <div className="app-container">
          <div>
            <Aside />
          </div>
          <div className="main-content">{children}</div>
        </div>
      </body>
    </html>
  );
}

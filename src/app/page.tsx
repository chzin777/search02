

import { IntegrationSurveyForm } from "../components/IntegrationSurveyForm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/images/bg1.png)' }}
        aria-hidden="true"
      />
      {/* Overlay para escurecer o fundo e dar contraste */}
  <div className="absolute inset-0 bg-black/10 z-10" aria-hidden="true" />
      {/* Logo e conteúdo do formulário */}
      <div className="relative z-20 w-full max-w-xl flex flex-col items-center">
        <IntegrationSurveyForm />
      </div>
    </div>
  );
}


import Image from "next/image";
import { FeedbackForm } from "../components/FeedbackForm";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-50 overflow-hidden"
      style={{ backgroundImage: 'url(/images/bg1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
  <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-white/80 rounded-xl shadow-lg p-8 backdrop-blur-md">
        <Image src="/images/logo.png" alt="Logo" width={120} height={120} className="mb-6" priority />
        <h1 className="text-3xl font-bold mb-8 text-center text-neutral-900 drop-shadow">Pesquisa de Satisfação</h1>
        <FeedbackForm />
      </div>
    </main>
  );
}

"use client";
import * as React from "react";
import { RatingSlider } from "./RatingSlider";
import { supabase } from "../lib/supabaseClient";

export const IntegrationSurveyForm: React.FC = () => {
  const [nome, setNome] = React.useState("");
  const [nota, setNota] = React.useState(5);
  const [feedback, setFeedback] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!nome.trim()) {
      setError("O nome é obrigatório.");
      return;
    }
  setLoading(true);
  const { error } = await supabase.from("search02").insert({ nome, nota, comment: feedback });
  setLoading(false);
    if (error) {
      setError("Erro ao enviar. Tente novamente.");
    } else {
      setSuccess(true);
      setNome("");
      setNota(5);
      setFeedback("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 rounded-2xl shadow-2xl border border-gray-200 mx-auto px-4 py-4 md:px-6 md:py-6 flex flex-col items-center gap-4 relative"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
      >
        <img
          src="/images/logo.png"
          alt="Logo R3 Suprimentos"
          className="mb-1 w-20 h-auto drop-shadow-lg mx-auto"
        />
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-1 shadow">
            <span className="block w-6 h-6 rounded-full border-4 border-blue-400 animate-pulse" />
          </div>
          <h2 className="text-lg md:text-xl font-black text-gray-900 text-center mb-0">Queremos ouvir você!</h2>
          <p className="text-gray-600 text-center text-sm mb-1">Sua opinião é fundamental para melhorarmos cada vez mais a experiência de aprendizado.</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="nome" className="font-semibold text-gray-800">Nome <span className="text-red-500">*</span></label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base transition placeholder-gray-400 shadow-sm"
            placeholder="Como você gostaria de ser chamado?"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="font-semibold text-gray-800">Em uma escala de <span className='text-blue-600 font-bold'>0</span> (ruim) a <span className='text-blue-600 font-bold'>10</span> (excelente), quanto o aprendizado de hoje pode contribuir para sua evolução profissional?</label>
          <RatingSlider value={nota} onChange={setNota} />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="feedback" className="font-semibold text-gray-800">Deixe seu comentário</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base transition placeholder-gray-400 shadow-sm resize-none"
            rows={2}
            placeholder="Conte para nós como podemos tornar sua experiência ainda melhor."
          />
        </div>
        {error && <div className="text-red-600 font-semibold text-center animate-pulse w-full">{error}</div>}
        {success && <div className="text-green-600 font-semibold text-center animate-bounce w-full">Resposta enviada com sucesso!</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold py-2 rounded-lg shadow-md transition-all duration-200 text-base tracking-wide disabled:opacity-60 disabled:cursor-not-allowed mt-1 hover:cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Enviando...
            </span>
          ) : "Enviar"}
        </button>
      </form>
    </div>
  );
};

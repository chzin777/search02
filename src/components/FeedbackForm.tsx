"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface FeedbackFormProps {
  onSubmit?: (data: { name: string; score: number; processExperience: string; integrationScore: number }) => void;
}

const supabaseUrl = "https://kxmfaghfbwykuxgalxfm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bWZhZ2hmYnd5a3V4Z2FseGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ4MjksImV4cCI6MjA3MDg0MDgyOX0.CWsJQTL8OLlMdfOzbitlep81-Xl9Ej3c6sEdDbFEvtk";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [score, setScore] = useState(5);
  const [processExperience, setProcessExperience] = useState("");
  const [integrationScore, setIntegrationScore] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, preencha seu nome.");
      return;
    }
    if (!processExperience.trim()) {
      setError("Por favor, descreva sua experiência com o processo seletivo.");
      return;
    }
    setError("");
    // Envia para o Supabase
    const { error: supabaseError } = await supabase.from("search01").insert({ 
      nome: name, 
      nota: score,
      experiencia_processo: processExperience,
      nota_integracao: integrationScore
    });
    if (supabaseError) {
      setError("Erro ao enviar resposta. Tente novamente.");
      return;
    }
    setSubmitted(true);
    onSubmit?.({ name, score, processExperience, integrationScore });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white/80 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 sm:space-y-7 border border-sky-100 backdrop-blur-md animate-fade-in"
    >
  <div className="flex flex-col items-center gap-1">
  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-100 flex items-center justify-center shadow-md mb-1">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1C9BE3" opacity="0.15"/><path d="M24 34c-5.523 0-10-4.03-10-9s4.477-9 10-9 10 4.03 10 9-4.477 9-10 9Zm0-16c-3.866 0-7 2.91-7 7s3.134 7 7 7 7-2.91 7-7-3.134-7-7-7Z" fill="#1C9BE3"/></svg>
        </div>
  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 text-center tracking-tight mb-0.5">Queremos ouvir você!</h2>
  <p className="text-sm sm:text-base text-neutral-600 text-center max-w-xs">Sua opinião é fundamental para melhorarmos cada vez mais a experiência de aprendizado.</p>
      </div>
  <div className="space-y-1.5">
        <Label htmlFor="name" className="mb-1 block text-base font-semibold text-neutral-800">
          Nome <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Como você gostaria de ser chamado?"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
          className={`text-base px-4 py-2 rounded-lg border-2 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition ${error ? 'border-red-400' : 'border-sky-100'}`}
          aria-invalid={!!error}
        />
        {error && (
          <span className="text-red-500 text-sm font-medium animate-fade-in">{error}</span>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="processExperience" className="mb-1 block text-base font-semibold text-neutral-800">
          Como você descreveria sua experiência no processo seletivo da R3 Suprimentos? <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="processExperience"
          placeholder="Descreva brevemente como foi sua participação no processo seletivo..."
          value={processExperience}
          onChange={(e) => setProcessExperience(e.target.value)}
          required
          rows={3}
          className={`w-full text-base px-4 py-2 rounded-lg border-2 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition resize-none ${error ? 'border-red-400' : 'border-sky-100'}`}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="integrationScore" className="mb-1 block text-base font-semibold text-neutral-800">
           Em uma escala de <span className='font-bold text-sky-500'>0</span> (ruim) a <span className='font-bold text-sky-500'>10</span> (excelente), como você avalia o processo de integração inicial na R3 Suprimentos (contratos, cultura organizacional, apresentação dos diferenciais, cronograma de atividades)?
        </Label>
        <div className="flex items-center gap-2 sm:gap-4 mt-2">
          <span className="text-neutral-400 font-semibold">1</span>
          <Slider
            id="integrationScore"
            min={1}
            max={10}
            step={1}
            value={[integrationScore]}
            onValueChange={([val]: number[]) => setIntegrationScore(val)}
            className="flex-1 accent-sky-400 hover:cursor-pointer cursor-pointer"
          />
          <span className="text-neutral-400 font-semibold">10</span>
        </div>
        <div className="text-center mt-1 text-xl sm:text-2xl font-bold text-sky-500 drop-shadow-sm">
          {integrationScore}
        </div>
      </div>

  <div className="space-y-1.5">
        <Label htmlFor="score" className="mb-1 block text-base font-semibold text-neutral-800">
          Em uma escala de <span className='font-bold text-sky-500'>0</span> (ruim) a <span className='font-bold text-sky-500'>10</span> (excelente), quanto o aprendizado de hoje pode contribuir para sua evolução profissional?
        </Label>
  <div className="flex items-center gap-2 sm:gap-4 mt-2">
          <span className="text-neutral-400 font-semibold">0</span>
          <Slider
            id="score"
            min={0}
            max={10}
            step={1}
            value={[score]}
            onValueChange={([val]: number[]) => setScore(val)}
            className="flex-1 accent-sky-400 hover:cursor-pointer cursor-pointer"
          />
          <span className="text-neutral-400 font-semibold">10</span>
        </div>
  <div className="text-center mt-1 text-xl sm:text-2xl font-bold text-sky-500 drop-shadow-sm">
          {score}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full text-base sm:text-lg py-2.5 sm:py-3 mt-3 rounded-xl bg-[#1C9BE3] hover:bg-sky-500 text-white font-bold shadow-lg transition-all duration-200 focus:ring-2 focus:ring-sky-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer cursor-pointer"
        disabled={submitted}
      >
        {submitted ? (
          <span className="flex items-center justify-center gap-2"><svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Enviado!</span>
        ) : (
          "Enviar"
        )}
      </Button>
      {submitted && (
        <div className="text-center text-green-600 font-semibold mt-2 animate-fade-in">Obrigado pelo seu feedback! 🎉</div>
      )}
    </form>
  );
}

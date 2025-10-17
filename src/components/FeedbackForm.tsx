"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface TrainingSection {
  name: string;
  facilitatorName: string;
  experienceDescription: string;
  facilitatorScore: number;
}

interface FormData {
  nome: string;
  nota: number;
  quimicos_experiencia: string;
  quimicos_nota: number;
  papeis_experiencia: string;
  papeis_nota: number;
  dispenseres_experiencia: string;
  dispenseres_nota: number;
  ti_experiencia: string;
  ti_nota: number;
  financeiro_experiencia: string;
  financeiro_nota: number;
  marketing_experiencia: string;
  marketing_nota: number;
  compras_experiencia: string;
  compras_nota: number;
  marketing_place_experiencia: string;
  marketing_place_nota: number;
}

interface FeedbackFormProps {
  onSubmit?: (data: FormData) => void;
}

const supabaseUrl = "https://kxmfaghfbwykuxgalxfm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bWZhZ2hmYnd5a3V4Z2FseGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ4MjksImV4cCI6MjA3MDg0MDgyOX0.CWsJQTL8OLlMdfOzbitlep81-Xl9Ej3c6sEdDbFEvtk";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const trainingSections = [
  { name: "Químicos", facilitatorName: "Químicos" },
  { name: "Papéis", facilitatorName: "Papéis" },
  { name: "Dispenseres", facilitatorName: "Dispenseres" },
  { name: "Tecnologia da Informação e Inovação", facilitatorName: "TI" },
  { name: "Financeiro", facilitatorName: "Financeiro" },
  { name: "Marketing", facilitatorName: "Marketing" },
  { name: "Compras", facilitatorName: "Compras" },
  { name: "Marketing Place", facilitatorName: "Marketing Place" },
];

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [trainings, setTrainings] = useState<TrainingSection[]>(
    trainingSections.map(section => ({
      name: section.name,
      facilitatorName: section.facilitatorName,
      experienceDescription: "",
      facilitatorScore: 5,
    }))
  );
  const [overallIntegrationScore, setOverallIntegrationScore] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateTraining = (index: number, field: keyof TrainingSection, value: string | number) => {
    setTrainings(prev => prev.map((training, i) => 
      i === index ? { ...training, [field]: value } : training
    ));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, preencha seu nome.");
      return;
    }
    
    // Verificar se todas as descrições de experiência foram preenchidas
    for (let i = 0; i < trainings.length; i++) {
      if (!trainings[i].experienceDescription.trim()) {
        setError(`Por favor, descreva sua experiência no treinamento de ${trainings[i].name}.`);
        return;
      }
    }
    
    setError("");
    
    // Preparar dados para envio com colunas específicas
    const formData = {
      nome: name,
      nota: overallIntegrationScore, // Usando a coluna 'nota' existente para avaliação geral
      quimicos_experiencia: trainings[0].experienceDescription,
      quimicos_nota: trainings[0].facilitatorScore,
      papeis_experiencia: trainings[1].experienceDescription,
      papeis_nota: trainings[1].facilitatorScore,
      dispenseres_experiencia: trainings[2].experienceDescription,
      dispenseres_nota: trainings[2].facilitatorScore,
      ti_experiencia: trainings[3].experienceDescription,
      ti_nota: trainings[3].facilitatorScore,
      financeiro_experiencia: trainings[4].experienceDescription,
      financeiro_nota: trainings[4].facilitatorScore,
      marketing_experiencia: trainings[5].experienceDescription,
      marketing_nota: trainings[5].facilitatorScore,
      compras_experiencia: trainings[6].experienceDescription,
      compras_nota: trainings[6].facilitatorScore,
      marketing_place_experiencia: trainings[7].experienceDescription,
      marketing_place_nota: trainings[7].facilitatorScore,
    };

    // Envia para o Supabase na tabela search02
    const { error: supabaseError } = await supabase.from("search02").insert(formData);
    if (supabaseError) {
      setError("Erro ao enviar resposta. Tente novamente.");
      return;
    }
    setSubmitted(true);
    onSubmit?.(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white/80 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 sm:space-y-7 border border-sky-100 backdrop-blur-md animate-fade-in"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-100 flex items-center justify-center shadow-md mb-1">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1C9BE3" opacity="0.15"/><path d="M24 34c-5.523 0-10-4.03-10-9s4.477-9 10-9 10 4.03 10 9-4.477 9-10 9Zm0-16c-3.866 0-7 2.91-7 7s3.134 7 7 7 7-2.91 7-7-3.134-7-7-7Z" fill="#1C9BE3"/></svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 text-center tracking-tight mb-0.5">Avaliação de Treinamento de Integração</h2>
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

      {/* Seções de Treinamentos */}
      {trainings.map((training, index) => (
        <div key={index} className="bg-white/60 rounded-2xl p-4 sm:p-6 space-y-4 border border-sky-50">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-800 border-b border-sky-200 pb-2">
            {index + 1}. Treinamento de {training.name}
          </h3>
          
          <div className="space-y-1.5">
            <Label className="mb-1 block text-base font-semibold text-neutral-800">
              Em poucas palavras, descreva como foi sua participar do treinamento de {training.name}? <span className="text-red-500">*</span>
            </Label>
            <textarea
              placeholder={`Descreva brevemente como foi sua participação no treinamento de ${training.name}...`}
              value={training.experienceDescription}
              onChange={(e) => updateTraining(index, 'experienceDescription', e.target.value)}
              required
              rows={3}
              className="w-full text-base px-4 py-2 rounded-lg border-2 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition resize-none border-sky-100"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="mb-1 block text-base font-semibold text-neutral-800">
              Em uma escala de <span className='font-bold text-sky-500'>1</span> (ruim) a <span className='font-bold text-sky-500'>10</span> (excelente), como foi a abordagem de conteúdos do Facilitador ({training.facilitatorName})?
            </Label>
            <div className="flex items-center gap-2 sm:gap-4 mt-2">
              <span className="text-neutral-400 font-semibold">1</span>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[training.facilitatorScore]}
                onValueChange={([val]: number[]) => updateTraining(index, 'facilitatorScore', val)}
                className="flex-1 accent-sky-400 hover:cursor-pointer cursor-pointer"
              />
              <span className="text-neutral-400 font-semibold">10</span>
            </div>
            <div className="text-center mt-1 text-xl sm:text-2xl font-bold text-sky-500 drop-shadow-sm">
              {training.facilitatorScore}
            </div>
          </div>
        </div>
      ))}

      {/* Pergunta final sobre avaliação geral */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-4 sm:p-6 space-y-4 border border-sky-200">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-800 border-b border-sky-300 pb-2">
          Avaliação Geral
        </h3>
        <div className="space-y-1.5">
          <Label className="mb-1 block text-base font-semibold text-neutral-800">
            Em uma escala de <span className='font-bold text-sky-500'>1</span> (ruim) a <span className='font-bold text-sky-500'>10</span> (excelente), como foi avaliação no treinamento de integração da R3 Suprimentos?
          </Label>
          <div className="flex items-center gap-2 sm:gap-4 mt-2">
            <span className="text-neutral-400 font-semibold">1</span>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[overallIntegrationScore]}
              onValueChange={([val]: number[]) => setOverallIntegrationScore(val)}
              className="flex-1 accent-sky-400 hover:cursor-pointer cursor-pointer"
            />
            <span className="text-neutral-400 font-semibold">10</span>
          </div>
          <div className="text-center mt-1 text-xl sm:text-2xl font-bold text-sky-500 drop-shadow-sm">
            {overallIntegrationScore}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full text-base sm:text-lg py-2.5 sm:py-3 mt-6 rounded-xl bg-[#1C9BE3] hover:bg-sky-500 text-white font-bold shadow-lg transition-all duration-200 focus:ring-2 focus:ring-sky-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer cursor-pointer"
        disabled={submitted}
      >
        {submitted ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Enviado!
          </span>
        ) : (
          "Enviar Avaliação"
        )}
      </Button>
      {submitted && (
        <div className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
          Obrigado pelo seu feedback! 🎉
        </div>
      )}
    </form>
  );
}

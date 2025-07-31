import { Question } from "./types";

export const mockText = `
A água é essencial para a vida. No corpo humano, ela representa cerca de 60% da massa corporal total. 
A hidratação adequada é fundamental para o bom funcionamento dos órgãos, regulação da temperatura 
e transporte de nutrientes. A desidratação pode causar fadiga, dor de cabeça e queda no desempenho cognitivo.

O consumo recomendado de água varia de acordo com idade, clima, atividade física e estado de saúde.
Adultos devem ingerir em média 2 litros por dia. Frutas, vegetais e sopas também contribuem para a hidratação.
`;

export const mockQuestions: Question[] = [
  {
    question: 'What is the capital of Brazil?',
    options: ['São Paulo', 'Brasília', 'Rio de Janeiro', 'Salvador'],
    correctAnswerIndex: 1,
    // answerIndex: 2,
  },
  {
    question: 'When was Brasília founded?',
    options: ['1960', '1945', '1975', '1930'],
    correctAnswerIndex: 0,
    // answerIndex: 0,
  },
];
#!/usr/bin/env node
/**
 * FreeLLMAPI Client - Delega tarefas a modelos gratuitos
 * Uso: node free_llm.js <modelo|auto> <tarefa> [--file <arquivo>]
 *
 * Modos:
 *   - API real: define FREE_LLM_API_BASE e FREE_LLM_API_KEY
 *   - Mock local: usa --mock para simular respostas (para testes)
 */

import { fetch } from 'undici';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FREE_LLM_API_BASE = process.env.FREE_LLM_API_BASE || 'https://api.freellmapi.com/v1';

// Mock responses for testing without API
const MOCK_RESPONSES = {
  'olá': 'Olá! Como posso ajudar você hoje?',
  'resuma': 'Resumo: Este é um resumo simulado do conteúdo fornecido. Os principais pontos são: 1) Tópico principal, 2) Detalhes relevantes, 3) Conclusão.',
  'analise': 'Análise simulada: O conteúdo apresenta estrutura clara com pontos fortes em organização e clareza. Sugestões: melhorar exemplos práticos.',
  'default': 'Resposta simulada do modelo gratuito. Em produção, isso viria da API FreeLLM. Tarefa processada com sucesso.'
};

function getMockResponse(task) {
  const lower = task.toLowerCase();
  if (lower.includes('olá') || lower.includes('ola')) return MOCK_RESPONSES['olá'];
  if (lower.includes('resuma') || lower.includes('resumo')) return MOCK_RESPONSES['resuma'];
  if (lower.includes('analise') || lower.includes('análise')) return MOCK_RESPONSES['analise'];
  return MOCK_RESPONSES['default'];
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Uso: node free_llm.js <modelo|auto> <tarefa> [--file <arquivo>] [--mock]');
    console.error('Exemplo: node free_llm.js auto "Resuma este arquivo" --file docs/arquivo.md');
    console.error('Exemplo (mock): node free_llm.js auto "Olá" --mock');
    process.exit(1);
  }

  let model = args[0];
  let task = '';
  let filePath = null;
  let useMock = false;

  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--file' && i + 1 < args.length) {
      filePath = args[i + 1];
      i++;
    } else if (args[i] === '--mock') {
      useMock = true;
    } else if (task === '') {
      task = args[i];
    } else {
      task += ' ' + args[i];
    }
  }

  if (!task) {
    console.error('Erro: Tarefa não especificada');
    process.exit(1);
  }

  // Read file content if provided
  let fileContent = '';
  if (filePath) {
    try {
      fileContent = readFileSync(filePath, 'utf-8');
      task += '\n\n--- CONTEÚDO DO ARQUIVO ---\n' + fileContent;
    } catch (e) {
      console.error(`Erro ao ler arquivo: ${e.message}`);
      process.exit(1);
    }
  }

  // Model selection logic
  const models = {
    'auto': 'gpt-3.5-turbo',
    'gpt-3.5': 'gpt-3.5-turbo',
    'gpt-4o-mini': 'gpt-4o-mini',
    'claude-haiku': 'claude-3-haiku-20240307',
    'llama-3.1-8b': 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    'mistral-7b': 'mistralai/Mistral-7B-Instruct-v0.3'
  };

  const selectedModel = models[model] || model;

  // Use mock mode if requested or if no API key configured
  if (useMock || !process.env.FREE_LLM_API_KEY) {
    console.log('--- MODO MOCK (simulação) ---');
    const answer = getMockResponse(task);
    console.log('--- RESPOSTA ---');
    console.log(answer);
    console.log('\n--- METADADOS ---');
    console.log(`Modelo simulado: ${selectedModel}`);
    console.log('✅ Resposta gerada em modo mock (sem API real)');
    return;
  }

  try {
    const response = await fetch(`${FREE_LLM_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FREE_LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: 'Você é um assistente útil. Responda em português.' },
          { role: 'user', content: task }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error ${response.status}: ${error}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Sem resposta';

    console.log('--- RESPOSTA ---');
    console.log(answer);
    console.log('\n--- METADADOS ---');
    console.log(`Modelo usado: ${selectedModel}`);
    console.log(`Tokens: ${data.usage?.total_tokens || 'N/A'}`);

    // Check for potential issues
    const issues = [];
    if (answer.includes('não sei') || answer.includes('não tenho') || answer.includes('cannot')) {
      issues.push('Resposta pode indicar limitação do modelo');
    }
    if (answer.length < 50) {
      issues.push('Resposta muito curta - pode estar incompleta');
    }
    if (data.usage?.total_tokens > 1500) {
      issues.push('Alto uso de tokens - considere tarefa mais específica');
    }

    if (issues.length > 0) {
      console.log('\n--- PROBLEMAS DETECTADOS ---');
      issues.forEach(i => console.log(`⚠ ${i}`));
    } else {
      console.log('\n✅ Nenhum problema óbvio detectado na resposta');
    }

  } catch (error) {
    console.error(`Erro: ${error.message}`);
    console.log('\n--- DICA ---');
    console.log('Use --mock para testar sem API: node free_llm.js auto "sua tarefa" --mock');
    process.exit(1);
  }
}

main();
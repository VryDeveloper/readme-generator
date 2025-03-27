import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import SidebarSections from './components/SidebarSections';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import AIGenerator from './components/AIGenerator';
import DownloadButton from './components/DownloadButton';
import './styles/globals.css';

const sectionTemplates = {
  titulo: `# Título do Projeto

Uma breve descrição sobre o que esse projeto faz e para quem ele é destinado.

## Status do Projeto
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)`,

  links: `## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/seu-usuario/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)`,

  referencia: `## 📚 Referências

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Como escrever um README incrível](https://github.com/dbader/readme-template)
- [Markdown Guide](https://www.markdownguide.org/)`,

  api: `## 📋 Documentação da API

#### Retorna todos os itens

\`\`\`http
  GET /api/items
\`\`\`

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| \`api_key\` | \`string\` | **Obrigatório**. A chave da sua API |

#### Retorna um item

\`\`\`http
  GET /api/items/:id
\`\`\`

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :----------------------------------------- |
| \`id\`      | \`string\` | **Obrigatório**. O ID do item que você quer |

`,

  apendice: `## 📝 Apêndice

Informações adicionais sobre o projeto:

- Histórico de versões
- Notas de atualização
- FAQs
- Troubleshooting`,

  documentacao: `## 📖 Documentação

### 📋 Pré-requisitos

- Node.js 14.0 ou superior
- NPM ou Yarn

### 🔧 Instalação

1. Clone o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/seu-projeto.git
\`\`\`

2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

3. Inicie o servidor
\`\`\`bash
npm start
\`\`\``,

  deploy: `## 🚀 Deploy

Para fazer o deploy deste projeto:

\`\`\`bash
  npm run build
  npm run deploy
\`\`\`

O projeto está disponível em: [https://seu-projeto.com](https://seu-projeto.com)`,

  demonstracao: `## 🎮 Demonstração

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

### ⚡ Features

- Tema dark e light
- Preview em tempo real
- Modo tela cheia
- Multiplataforma`
};

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Configurar tema escuro como padrão
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleGenerateReadme = (generatedContent) => {
    setMarkdownContent(generatedContent);
    setShowAIGenerator(false);
  };

  const handleSectionSelect = (sectionId) => {
    const template = sectionTemplates[sectionId];
    if (template) {
      const separator = markdownContent.trim() ? '\n\n' : '';
      setMarkdownContent(prevMarkdown => `${prevMarkdown}${separator}${template}`);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700">
        <SidebarSections 
          onSectionSelect={handleSectionSelect} 
          onAIClick={() => setShowAIGenerator(true)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            README Generator
          </h1>
          <DownloadButton readmeData={markdownContent} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {showAIGenerator ? (
            <div className="h-full flex">
              <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 overflow-auto">
                <div className="p-4">
                  <AIGenerator 
                    onGenerateReadme={handleGenerateReadme} 
                    onBack={() => setShowAIGenerator(false)}
                  />
                </div>
              </div>
              <div className="w-1/2 overflow-auto">
                <MarkdownPreview markdown={markdownContent} />
              </div>
            </div>
          ) : (
            <div className="h-full flex">
              <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 overflow-auto">
                <MarkdownEditor
                  value={markdownContent}
                  onChange={setMarkdownContent}
                />
              </div>
              <div className="w-1/2 overflow-auto">
                <MarkdownPreview markdown={markdownContent} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 
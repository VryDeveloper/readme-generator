import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReadmePreview = ({ readmeData }) => {
  const generateMarkdown = () => {
    const {
      title,
      description,
      installation,
      usage,
      contributing,
      license,
      badges
    } = readmeData;

    let markdown = `# ${title}\n\n`;

    // Adiciona badges se existirem
    if (badges) {
      const badgeList = badges.split(',').map(badge => badge.trim());
      markdown += badgeList.map(badge => `![${badge}](https://img.shields.io/badge/${badge}-blue)`).join(' ') + '\n\n';
    }

    // Descrição
    markdown += `${description}\n\n`;

    // Instalação
    markdown += `## Instalação\n\n\`\`\`bash\n${installation}\n\`\`\`\n\n`;

    // Uso
    markdown += `## Como Usar\n\n${usage}\n\n`;

    // Contribuição
    markdown += `## Como Contribuir\n\n${contributing}\n\n`;

    // Licença
    markdown += `## Licença\n\nEste projeto está licenciado sob a licença ${license} - veja o arquivo [LICENSE](LICENSE) para mais detalhes.\n`;

    return markdown;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Pré-visualização do README
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{generateMarkdown()}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReadmePreview; 
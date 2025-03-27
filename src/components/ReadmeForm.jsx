import React from 'react';

const ReadmeForm = ({ readmeData, setReadmeData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReadmeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título do Projeto
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={readmeData.title}
          onChange={handleChange}
          className="form-input"
          placeholder="Ex: Meu Projeto Incrível"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={readmeData.description}
          onChange={handleChange}
          rows="4"
          className="form-input"
          placeholder="Descreva seu projeto..."
        />
      </div>

      <div>
        <label htmlFor="installation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Instalação
        </label>
        <textarea
          id="installation"
          name="installation"
          value={readmeData.installation}
          onChange={handleChange}
          rows="4"
          className="form-input"
          placeholder="Instruções de instalação..."
        />
      </div>

      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Como Usar
        </label>
        <textarea
          id="usage"
          name="usage"
          value={readmeData.usage}
          onChange={handleChange}
          rows="4"
          className="form-input"
          placeholder="Exemplos de uso..."
        />
      </div>

      <div>
        <label htmlFor="contributing" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Como Contribuir
        </label>
        <textarea
          id="contributing"
          name="contributing"
          value={readmeData.contributing}
          onChange={handleChange}
          rows="4"
          className="form-input"
          placeholder="Instruções para contribuição..."
        />
      </div>

      <div>
        <label htmlFor="license" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Licença
        </label>
        <select
          id="license"
          name="license"
          value={readmeData.license}
          onChange={handleChange}
          className="form-input"
        >
          <option value="MIT">MIT</option>
          <option value="Apache-2.0">Apache 2.0</option>
          <option value="GPL-3.0">GPL 3.0</option>
        </select>
      </div>

      <div>
        <label htmlFor="badges" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Badges (separados por vírgula)
        </label>
        <input
          type="text"
          id="badges"
          name="badges"
          value={readmeData.badges}
          onChange={handleChange}
          className="form-input"
          placeholder="Ex: build, coverage, version"
        />
      </div>
    </div>
  );
};

export default ReadmeForm; 
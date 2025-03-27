import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownPreview = ({ markdown }) => {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Pré-visualização
        </h2>
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-0.5 rounded-md border border-gray-200 dark:border-gray-600">
          <button 
            onClick={() => setShowSource(false)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              !showSource 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Pré-visualização
          </button>
          <button 
            onClick={() => setShowSource(true)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              showSource 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Código fonte
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {showSource ? (
          <pre className="h-full p-4 whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap">
            {markdown}
          </pre>
        ) : (
          <div className="h-full p-4 prose dark:prose-invert max-w-none overflow-auto">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-4">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{children}</code>,
                pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 overflow-x-auto">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-4">{children}</blockquote>,
                hr: () => <hr className="my-8 border-gray-300 dark:border-gray-600" />,
                table: ({ children }) => <table className="w-full border-collapse mb-4">{children}</table>,
                th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700">{children}</th>,
                td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{children}</td>,
                a: ({ children, href }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
                img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg mb-4" />
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview; 
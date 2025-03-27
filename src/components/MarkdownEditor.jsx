import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Editor
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-2 py-1 text-blue-500 hover:text-blue-600 border border-blue-200 dark:border-blue-800 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <MDEditor
            value={value}
            onChange={onChange}
            preview="edit"
            hideToolbar={false}
            className="w-full h-full !border-0"
            visibleDragbar={false}
            height="100%"
            textareaProps={{
              placeholder: "# Título do Projeto\n\nUma breve descrição sobre o que esse projeto faz e para quem ele é",
              style: { 
                background: 'transparent',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }
            }}
            style={{
              background: 'transparent',
              height: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor; 
'use client';

import { DocumentMetadata } from '@/types';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface DocumentListProps {
  documents: DocumentMetadata[];
  currentDocumentId: string | null;
  onSelectDocument: (id: string) => void;
  onNewDocument: () => void;
  onDeleteDocument: (id: string) => void;
}

export default function DocumentList({
  documents,
  currentDocumentId,
  onSelectDocument,
  onNewDocument,
  onDeleteDocument,
}: DocumentListProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const sortedDocuments = [...documents].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Draft</h1>
        <button
          onClick={onNewDocument}
          className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <Plus size={18} />
          New Document
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedDocuments.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            No documents yet. Create one to get started!
          </div>
        ) : (
          <div className="py-2">
            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`group relative px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentDocumentId === doc.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={() => onSelectDocument(doc.id)}
              >
                <div className="flex items-start gap-2">
                  <FileText size={16} className="mt-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {doc.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(doc.updatedAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${doc.title}"?`)) {
                        onDeleteDocument(doc.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-opacity"
                    title="Delete document"
                  >
                    <Trash2 size={14} className="text-red-600 dark:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        {documents.length} document{documents.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

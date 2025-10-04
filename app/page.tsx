'use client';

import { useEffect, useState, useCallback } from 'react';
import { Document } from '@/types';
import { storage } from '@/lib/storage';
import Editor from '@/components/Editor';
import DocumentList from '@/components/DocumentList';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const allDocs = storage.getAllDocuments();
    setDocuments(allDocs);

    let currentDoc: Document | null = null;
    const savedDocId = storage.getCurrentDocumentId();

    if (savedDocId) {
      currentDoc = storage.getDocument(savedDocId);
    }

    if (!currentDoc && allDocs.length > 0) {
      currentDoc = allDocs[0];
    }

    if (!currentDoc) {
      currentDoc = storage.createNewDocument();
      storage.saveDocument(currentDoc);
      storage.setCurrentDocumentId(currentDoc.id);
      setDocuments([currentDoc]);
    }

    setCurrentDocument(currentDoc);
  }, []);

  const handleContentChange = useCallback((content: string) => {
    if (!currentDocument) return;

    const updatedDoc = {
      ...currentDocument,
      content,
      updatedAt: Date.now(),
    };

    setCurrentDocument(updatedDoc);
    storage.saveDocument(updatedDoc);
    setDocuments(storage.getAllDocuments());
  }, [currentDocument]);

  const handleTitleChange = useCallback((title: string) => {
    if (!currentDocument) return;

    const updatedDoc = {
      ...currentDocument,
      title: title || 'Untitled',
      updatedAt: Date.now(),
    };

    setCurrentDocument(updatedDoc);
    storage.saveDocument(updatedDoc);
    setDocuments(storage.getAllDocuments());
  }, [currentDocument]);

  const handleSelectDocument = useCallback((id: string) => {
    const doc = storage.getDocument(id);
    if (doc) {
      setCurrentDocument(doc);
      storage.setCurrentDocumentId(id);
    }
  }, []);

  const handleNewDocument = useCallback(() => {
    const newDoc = storage.createNewDocument();
    storage.saveDocument(newDoc);
    storage.setCurrentDocumentId(newDoc.id);
    setCurrentDocument(newDoc);
    setDocuments(storage.getAllDocuments());
  }, []);

  const handleDeleteDocument = useCallback((id: string) => {
    storage.deleteDocument(id);
    const remainingDocs = storage.getAllDocuments();
    setDocuments(remainingDocs);

    if (currentDocument?.id === id) {
      if (remainingDocs.length > 0) {
        const nextDoc = remainingDocs[0];
        setCurrentDocument(nextDoc);
        storage.setCurrentDocumentId(nextDoc.id);
      } else {
        const newDoc = storage.createNewDocument();
        storage.saveDocument(newDoc);
        storage.setCurrentDocumentId(newDoc.id);
        setCurrentDocument(newDoc);
        setDocuments([newDoc]);
      }
    }
  }, [currentDocument]);

  if (!isMounted || !currentDocument) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DocumentList
        documents={storage.getDocumentMetadata()}
        currentDocumentId={currentDocument.id}
        onSelectDocument={handleSelectDocument}
        onNewDocument={handleNewDocument}
        onDeleteDocument={handleDeleteDocument}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-8 py-4 bg-white dark:bg-gray-900 flex items-center justify-between">
          <input
            type="text"
            value={currentDocument.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-2xl font-semibold flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Untitled"
          />
          <ThemeToggle />
        </div>
        
        <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
          <Editor
            content={currentDocument.content}
            onChange={handleContentChange}
            placeholder="Start writing your thoughts..."
          />
        </div>
      </div>
    </div>
  );
}

import { Document, DocumentMetadata } from '@/types';

const STORAGE_KEY = 'draft-documents';
const CURRENT_DOC_KEY = 'draft-current-document';

export const storage = {
  getAllDocuments(): Document[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getDocument(id: string): Document | null {
    const documents = this.getAllDocuments();
    return documents.find(doc => doc.id === id) || null;
  },

  saveDocument(document: Document): void {
    if (typeof window === 'undefined') return;
    
    const documents = this.getAllDocuments();
    const index = documents.findIndex(doc => doc.id === document.id);
    
    if (index >= 0) {
      documents[index] = document;
    } else {
      documents.push(document);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  },

  deleteDocument(id: string): void {
    if (typeof window === 'undefined') return;
    
    const documents = this.getAllDocuments();
    const filtered = documents.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  getDocumentMetadata(): DocumentMetadata[] {
    return this.getAllDocuments().map(doc => ({
      id: doc.id,
      title: doc.title,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  },

  getCurrentDocumentId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CURRENT_DOC_KEY);
  },

  setCurrentDocumentId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CURRENT_DOC_KEY, id);
  },

  createNewDocument(): Document {
    const now = Date.now();
    return {
      id: `doc-${now}`,
      title: 'Untitled',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
  },
};

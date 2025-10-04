# Draft - Your Personal Writing Companion

A simple, powerful text editor built with Next.js and TipTap. Write, organize, and manage your thoughts with a clean, Notion-inspired interface.

## Features (Phase 1)

- ✅ Rich text editor with formatting options (bold, italic, underline, headings, lists, etc.)
- ✅ Multiple document management
- ✅ Auto-save to localStorage
- ✅ Clean, distraction-free writing interface
- ✅ Document list sidebar with timestamps
- ✅ Fast and responsive

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TipTap** - Powerful rich text editor
- **Tailwind CSS** - Styling
- **localStorage** - Data persistence (browser-based)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Start writing immediately. Your documents are saved automatically to your browser's localStorage.

## Usage

- **Create a new document:** Click the "New Document" button in the sidebar
- **Switch documents:** Click any document in the sidebar
- **Edit title:** Click on "Untitled" at the top to rename your document
- **Format text:** Use the toolbar buttons or keyboard shortcuts
- **Delete document:** Hover over a document in the sidebar and click the trash icon

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

## Future Phases

- **Phase 2:** Inline AI chat with LLM integration
- **Phase 3:** Polish notes feature (AI-powered)
- **Phase 4:** Backend with Supabase (sync across devices)
- **Phase 5:** Publishing to Medium
- **Phase 6:** Advanced search and tags

## Project Structure

```
draft/
├── app/
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Editor.tsx         # TipTap editor component
│   ├── DocumentList.tsx   # Sidebar with documents
│   └── Toolbar.tsx        # Editor toolbar
├── lib/
│   └── storage.ts         # localStorage utilities
├── types/
│   └── index.ts           # TypeScript types
└── package.json
```

## Data Storage

Currently, all documents are stored in your browser's localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Fast and immediate
- ⚠️ Data is local to this browser only
- ⚠️ Clearing browser data will delete documents

Future phases will add cloud storage and sync.

## License

MIT

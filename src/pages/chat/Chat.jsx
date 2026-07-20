import { useState } from 'react'
import { askDocument, uploadDocument } from './chatApi'
import './chat.css'

const firstMessage = {
  role: 'assistant',
  text: 'Upload a PDF, then ask me a question about its content.',
}

export default function Chat() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [documentName, setDocumentName] = useState('')
  const [uploadMessage, setUploadMessage] = useState('No document uploaded yet.')
  const [messages, setMessages] = useState([firstMessage])
  const [question, setQuestion] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(event) {
    event.preventDefault()

    if (!selectedFile) {
      setError('Choose a PDF before clicking upload.')
      return
    }

    setIsUploading(true)
    setError('')
    setUploadMessage('Uploading and indexing the document...')

    try {
      debugger
      const data = await uploadDocument(selectedFile)
      setDocumentName(data.filename)
      setUploadMessage(`${data.chunks_added} text chunks are ready for questions.`)
      setMessages([{
        role: 'assistant',
        text: `${data.filename} is ready. What would you like to know?`,
      }])
    } catch (uploadError) {
      setUploadMessage('The document is not ready yet.')
      setError(uploadError.message)
    } finally {
      setIsUploading(false)
    }
  }

  async function handleQuestion(event) {
    event.preventDefault()
    const cleanQuestion = question.trim()

    if (!cleanQuestion || isAnswering) return

    setMessages((current) => [
      ...current,
      { role: 'user', text: cleanQuestion },
    ])
    setQuestion('')
    setError('')
    setIsAnswering(true)

    try {
      const data = await askDocument(cleanQuestion)
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: data.answer },
      ])
    } catch (chatError) {
      setError(chatError.message)
    } finally {
      setIsAnswering(false)
    }
  }

  const documentIsReady = Boolean(documentName)

  return (
    <main className="rag-page">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" />
            <path d="M14 3v5h4M10 13h5M10 17h5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <p className="eyebrow">FastAPI + React</p>
          <h1>Chat with your document</h1>
          <p className="header-copy">A simple classroom example of Retrieval-Augmented Generation.</p>
        </div>
      </header>

      <div className="rag-layout">
        <aside className="upload-card" aria-labelledby="upload-title">
          <div className="step-number">Step 1</div>
          <h2 id="upload-title">Upload a PDF</h2>
          <p>The backend will read, split, embed, and save the document.</p>

          <form onSubmit={handleUpload}>
            <label className="file-label" htmlFor="document">
              Choose document
            </label>
            <input
              id="document"
              className="file-input"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => {
                setSelectedFile(event.target.files[0] || null)
                setError('')
              }}
            />
            <p className="selected-file">
              {selectedFile ? selectedFile.name : 'PDF files only'}
            </p>
            <button className="primary-button" type="submit" disabled={isUploading}>
              {isUploading ? 'Indexing PDF...' : 'Upload document'}
            </button>
          </form>

          <div className={`document-status ${documentIsReady ? 'is-ready' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>{documentIsReady ? documentName : 'Waiting for a PDF'}</strong>
              <span>{uploadMessage}</span>
            </div>
          </div>
        </aside>

        <section className="chat-card" aria-labelledby="chat-title">
          <div className="chat-heading">
            <div>
              <div className="step-number">Step 2</div>
              <h2 id="chat-title">Ask a question</h2>
            </div>
            <span className="rag-badge">RAG chat</span>
          </div>

          <div className="message-list" aria-live="polite" aria-busy={isAnswering}>
            {messages.map((message, index) => (
              <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}>
                <div className="message-label">
                  {message.role === 'assistant' ? 'Assistant' : 'You'}
                </div>
                <p className="message-bubble">{message.text}</p>
              </div>
            ))}

            {isAnswering && (
              <div className="message-row assistant">
                <div className="message-label">Assistant</div>
                <p className="message-bubble typing">Searching the document...</p>
              </div>
            )}
          </div>

          {error && <p className="error-message" role="alert">{error}</p>}

          <form className="question-form" onSubmit={handleQuestion}>
            <label htmlFor="question">Your question</label>
            <div className="question-controls">
              <input
                id="question"
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={documentIsReady ? 'What is this document about?' : 'Upload a PDF first'}
                disabled={!documentIsReady || isAnswering}
              />
              <button
                className="send-button"
                type="submit"
                disabled={!documentIsReady || !question.trim() || isAnswering}
              >
                Send
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="m5 12 14-7-4 14-3-6-7-1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

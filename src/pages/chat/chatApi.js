const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function readResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Something went wrong. Please try again.')
  }

  return data
}

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  return readResponse(response)
}

export async function askDocument(question) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })

  return readResponse(response)
}

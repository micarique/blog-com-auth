'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PostFormProps {
  formTitle: string
  initialTitle?: string
  initialContent?: string
  onSubmit: (titulo: string, conteudo: string) => Promise<void>
}

export default function PostForm({
  formTitle,
  initialTitle = '',
  initialContent = '',
  onSubmit,
}: PostFormProps) {
  const router = useRouter()
  const [titulo, setTitulo] = useState(initialTitle)
  const [conteudo, setConteudo] = useState(initialContent)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await onSubmit(titulo, conteudo)
    } catch {
      setError('Erro ao salvar o post. Tente novamente.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-6"
      >
        
        <h1 className="text-2xl font-bold text-center">{formTitle}</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Título"
          className="w-full border border-zinc-300 rounded-lg px-4 py-2"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <textarea
          placeholder="Conteúdo"
          className="w-full border border-zinc-300 rounded-lg px-4 py-2 h-40 resize-none"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 rounded-lg bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </main>
  )
}
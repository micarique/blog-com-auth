'use client'

import { useState } from 'react'
import LoadingSpinner from './LoadinSpinner'

interface Props {
  onSubmit: (email: string, password: string) => void
  loading: boolean
}

export default function LoginForm({ onSubmit, loading }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-zinc-800">Acessar Conta</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border border-zinc-300 rounded-lg px-4 py-2"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border border-zinc-300 rounded-lg px-4 py-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-zinc-900 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <LoadingSpinner /> Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </button>
    </form>
  )
}

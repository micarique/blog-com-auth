'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import api from '@/services/api'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import AlertModal from '@/components/AlertModal'

export default function HomePage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setError('')
    setLoginLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      router.push('/posts')
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    setError('')
    setRegisterLoading(true)
    try {
      await api.post('/auth/register', { name, email, password })
      setShowAlert(true)
    } catch (err) {
      setError('Erro ao cadastrar. O e-mail pode já estar em uso.')
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        show={showAlert}
        setShow={setShowAlert}
        message="Cadastro realizado com sucesso! Faça o login para acessar sua conta."
        onConfirm={() => router.push('/')}
      />
      <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-zinc-900">CodeSocial</h1>
          <p className="text-zinc-500 mt-2">
            Conecte-se com mentes criativas. Compartilhe ideias. Inspire-se.
          </p>
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <LoginForm onSubmit={handleLogin} loading={loginLoading} />
          <RegisterForm onSubmit={handleRegister} loading={registerLoading} />
        </div>

        <button
          onClick={() => router.push('/posts')}
          className="mt-10 text-zinc-900 underline hover:text-zinc-700"
        >
          Ver publicações
        </button>
      </main>
    </>
  )
}
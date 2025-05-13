'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AlertModal from './AlertModal'

export default function Header() {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleManage = () => {
    if (!isClient) return

    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    } else {
      setShowAlert(true)
    }
  }

  const handleBack = () => {
    const currentPath = window.location.pathname
    if (currentPath === '/posts') {
      // Se estiver na página /posts, volta para a home
      router.push('/')
    } else if (currentPath.startsWith('/posts/')) {
      // Se estiver em /posts/[id], volta para /posts
      router.push('/posts')
    } else {
      // Caso contrário, volta para a home por padrão
      router.push('/')
    }
  }

  return (
    <>
      <AlertModal
        show={showAlert}
        setShow={setShowAlert}
        message="Você precisa estar logado para acessar suas publicações."
        onConfirm={() => router.push('/')}
      />
      <header className="flex justify-between items-center w-full mx-auto mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Publicações</h1>
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition"
          >
            Voltar
          </button>
          <button
            onClick={handleManage}
            className="bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition ml-auto"
          >
            Gerenciar minhas publicações
          </button>
        </div>
      </header>
    </>
  )
}

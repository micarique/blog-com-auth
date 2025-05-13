'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/services/api'
import { Post } from '@/types/Post'
import { useConfirmDelete } from '@/hooks/useConfirmDelete'
import ConfirmDeletePopup from '@/components/ConfirmDeletePopup'
import AlertModal from '@/components/AlertModal'

export default function DashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showError, setShowError] = useState(false)

  const { isOpen, open, close, confirm } = useConfirmDelete()

  useEffect(() => {
  const fetchPosts = async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      // Redireciona imediatamente sem carregar página
      router.replace('/')
      return
    }

      try {
        const res = await api.get('/posts/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPosts(res.data)
      } catch (err) {
        console.error('Erro ao buscar posts do usuário:', err)
        setShowError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [router])

  const handleDelete = async () => {
    const postIdToDelete = confirm()
    if (!postIdToDelete) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(`/posts/${postIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts(posts.filter((p) => p.id !== postIdToDelete))
      close()
    } catch (err) {
      console.error('Erro ao deletar post:', err)
      alert('Erro ao excluir. Tente novamente.')
      close()
    }
  }

  const handleCancel = () => {
    close()
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>

  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <AlertModal
        show={showError}
        setShow={setShowError}
        message="Você precisa estar logado para acessar o painel."
        onConfirm={() => router.push('/')}
      />

      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Posts</h1>
          <div className="flex justify-between gap-x-4">
            <button
              onClick={() => router.push('/posts')}
              className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
            >
              Voltar
            </button>
            <button
              onClick={() => router.push('/dashboard/newPost')}
              className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
            >
              Novo Post
            </button>
          </div>
        </header>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Você ainda não criou nenhum post.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <h2 className="text-lg font-semibold">{post.titulo}</h2>
                  <p className="text-zinc-600">{post.conteudo}</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Criado em: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/editPost/${post.id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => open(post.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDeletePopup
        isOpen={isOpen}
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </main>
  )
}
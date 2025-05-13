'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/services/api'
import { Post } from '@/types/Post'
import Header from '@/components/Header'

export default function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        console.error('Erro ao buscar post', error)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (!post) return <p className="text-center mt-10 text-zinc-500">Carregando...</p>

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <Header />
      <article className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-zinc-900">{post.titulo}</h1>
        <p className="text-zinc-600 mt-4 whitespace-pre-wrap">{post.conteudo}</p>
        <footer className="mt-6 text-sm text-zinc-500">
          Publicado por <span className="font-medium text-zinc-700">{post.authorName}</span> em{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </footer>
      </article>
    </main>
  )
}
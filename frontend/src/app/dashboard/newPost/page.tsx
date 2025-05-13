'use client'

import PostForm from '@/components/PostForm'
import api from '@/services/api'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  const handleCreate = async (titulo: string, conteudo: string) => {
    const token = localStorage.getItem('token')
    await api.post(
      '/posts',
      { titulo, conteudo },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    router.push('/dashboard')
  }

  return <PostForm formTitle="Novo Post" onSubmit={handleCreate} />
}
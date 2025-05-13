'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import api from '@/services/api'
import PostForm from '@/components/PostForm'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    api
      .get(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTitulo(res.data.titulo)
        setConteudo(res.data.conteudo)
      })
      .catch(() => router.push('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, router])

  const handleUpdate = async (newTitulo: string, newConteudo: string) => {
    const token = localStorage.getItem('token')
    await api.put(
      `/posts/${id}`,
      { titulo: newTitulo, conteudo: newConteudo },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    router.push('/dashboard')
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>

  return (
    <PostForm
      formTitle="Editar Post"
      initialTitle={titulo}
      initialContent={conteudo}
      onSubmit={handleUpdate}
    />
  )
}
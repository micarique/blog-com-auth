'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/services/api'
import Header from '@/components/Header'
import { Post } from '@/types/Post'
import AlertModal from '@/components/AlertModal'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)  // Log para depuração
        setShowModal(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <Header />
      
      {loading && <div className="text-center text-gray-600">Carregando...</div>}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>

      <AlertModal
        show={showModal}
        setShow={setShowModal}
        message="Erro ao buscar publicações. Tente novamente mais tarde."
      />
    </main>
  )
}
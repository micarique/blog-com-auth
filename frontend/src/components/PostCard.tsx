import { Post } from '@/types/Post'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('pt-BR')
    : 'Data não disponível'

  return (
    <div className="rounded-2xl border border-zinc-200 shadow-sm p-6 hover:shadow-md transition duration-200 bg-white flex flex-col justify-between h-full">
      {/* Título */}
      <h2 className="text-xl font-semibold mb-2 truncate">{post.titulo}</h2>

      {/* Conteúdo */}
      <p className="text-sm text-zinc-600 line-clamp-3 mb-4">{post.conteudo}</p>

      {/* Informações do autor e data */}
      <div className="text-xs text-zinc-400 mt-auto">
        Publicado por <strong>{post.authorName}</strong><br />
        em {formattedDate}
      </div>
    </div>
  )
}

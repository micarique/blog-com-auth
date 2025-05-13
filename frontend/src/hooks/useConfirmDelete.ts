import { useState } from 'react'

export const useConfirmDelete = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)

  const open = (id: number) => {
    setPostToDelete(id)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setPostToDelete(null)
  }

  const confirm = () => {
    if (postToDelete) {
      // Retorna o id do post a ser excluído
      return postToDelete
    }
    return null
  }

  return { isOpen, open, close, confirm }
}
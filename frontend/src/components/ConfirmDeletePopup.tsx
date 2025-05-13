import React from 'react'

interface ConfirmDeletePopupProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-300/60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirmar exclusão</h2>
        <p className="mb-6">Tem certeza que deseja excluir este post?</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Sim, excluir
          </button>
          <button
            onClick={onCancel}
            className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeletePopup
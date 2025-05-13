'use client'

import { Dispatch, SetStateAction } from 'react'

interface AlertModalProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  message: string
  onConfirm?: () => void
}

export default function AlertModal({ show, setShow, message, onConfirm }: AlertModalProps) {
  if (!show) return null

  const handleClose = () => {
    setShow(false)
    if (onConfirm) onConfirm()
  }

  return (
    <div className="fixed inset-0 bg-gray-300/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
        <p className="text-zinc-800 text-lg mb-6">{message}</p>
        <button
          onClick={handleClose}
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition"
        >
          OK
        </button>
      </div>
    </div>
  )
}
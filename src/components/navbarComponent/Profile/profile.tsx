// components/ProfileAvatar.tsx
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ProfileAvatar() {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
  }

  return (
    <div className="relative">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer ring-2 ring-blue-500"
      >
        {image ? (
          <Image src={image} alt="profile" width={40} height={40} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-white bg-gray-500">
            U
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Remove Button */}
      {image && (
        <button
          onClick={removeImage}
          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
        >
          ✕
        </button>
      )}
    </div>
  )
}

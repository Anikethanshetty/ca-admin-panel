// components/ProfileAvatar.tsx
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function NavProfileAvatar({children}:{children:React.ReactNode}) {
  const [image, setImage] = useState<string | null>(null)
  

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer ring-2 ring-blue-500"
      >
        {image ? (
          <Image src={image} alt="profile" width={40} height={40} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-white bg-gray-500">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

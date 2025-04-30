'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { db } from '@/utils/firestore'
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import Cookies from 'js-cookie'

type Message = {
  message: string
  sender_id: string
  receiver_id: string
  timestamp: any
}

export default function Chat() {
  const params = useParams()
  const userId = params.userId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')


  const adminId = Cookies.get('adminFbId')
  const roomId = adminId && userId ? [adminId, userId].sort().join('_') : ''
  const bottomRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    if (!roomId) return

    const messagesRef = collection(db, 'chat_rooms', roomId, 'messages')
    const q = query(messagesRef, orderBy('timestamp'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data() as Message)
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [roomId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || !adminId || !userId) return

    const messagesRef = collection(db, 'chat_rooms', roomId, 'messages')
    await addDoc(messagesRef, {
      message: input.trim(),
      sender_id: adminId,
      receiver_id: userId,
      timestamp: serverTimestamp(),
    })

    setInput('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="w-full max-w-2xl h-[700px] border border-blue-300 rounded-xl shadow-lg flex flex-col bg-white overflow-hidden">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold px-4 py-3">
          Chat 
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender_id === adminId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  msg.sender_id === adminId
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-blue-100 text-blue-800'
                } px-4 py-2 rounded-xl max-w-[70%] shadow`}
              >
                <span className="block text-xs font-semibold mb-1">
                  {msg.sender_id === adminId ? 'You' : "Employee"}
                </span>
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-blue-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-all shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

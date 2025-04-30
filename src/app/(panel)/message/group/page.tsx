'use client'

import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { db } from '@/utils/firestore'
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

type Message = {
  message: string
  sender_id: string
  receiver_id: string
  timestamp: any
}

export default function ChatGroup() {
  const [adminId,setAdminId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const adminFbId = Cookies.get("adminFbId")

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      try {
        
        const decoded = jwtDecode<{ id: string }>(token)
        setAdminId(decoded.id)
      } catch (error) {
        console.error('Invalid token', error)
        
        Cookies.remove('token')
      }
    }
  }, [])

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adminId) return

    const messagesRef = collection(db, 'broadcast', adminId, 'messages')
    const q = query(messagesRef, orderBy('timestamp'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data() as Message)
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [adminId]);

  useEffect(() => {
    const createBroadcast = async () => {
      if (!adminId) return
  
      const adminDocRef = doc(db, 'broadcast', adminId)
      const adminDocSnap = await getDoc(adminDocRef)
  
      if (!adminDocSnap.exists()) {
        await setDoc(adminDocRef, { name: "Broadcast" })
      }
    }
  
    createBroadcast()
  }, [adminId])
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || !adminId ) return
    
    const messagesRef = collection(db, 'broadcast', adminId, 'messages')
    await addDoc(messagesRef, {
      message: input.trim(),
      sender_id: adminId,
      receiver_id: adminFbId,
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
          CA Group
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

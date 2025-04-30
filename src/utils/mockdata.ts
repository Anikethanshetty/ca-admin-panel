import { Chat, Message, User } from './messagetypes';

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Morgan',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
  },
  {
    id: 'user2',
    name: 'Jordan Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    lastSeen: new Date(),
  },
];

export const initialMessages: Message[] = [
  {
    id: 'm1',
    text: 'Hey there! How are you doing today?',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: 'read',
  },
  {
    id: 'm2',
    text: 'I\'m doing great, thanks for asking! Just finishing up some work. How about you?',
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
    status: 'read',
  },
  {
    id: 'm3',
    text: 'Pretty good! I was wondering if you wanted to grab lunch later this week?',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
    status: 'read',
  },
  {
    id: 'm4',
    text: 'That sounds perfect. How about Thursday at noon?',
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'read',
  },
  {
    id: 'm5',
    text: 'Thursday works for me! Any preference on where to eat?',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'read',
  },
  {
    id: 'm6',
    text: 'How about that new place downtown? I\'ve heard they have amazing salads and sandwiches.',
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    status: 'read',
  },
  {
    id: 'm7',
    text: 'Perfect! Let\'s plan on that. Looking forward to catching up!',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    status: 'read',
  },
  {
    id: 'm8',
    text: 'Me too! I\'ll send you the address later.',
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'delivered',
  },
];

export const initialChat: Chat = {
  id: 'chat1',
  participants: users,
  messages: initialMessages,
};
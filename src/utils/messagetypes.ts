export type User = {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
    lastSeen?: Date;
  };
  
  export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
  
  export type Message = {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
    status: MessageStatus;
  };
  
  export type Chat = {
    id: string;
    participants: User[];
    messages: Message[];
  };
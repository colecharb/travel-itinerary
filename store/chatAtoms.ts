import { atom } from 'jotai';

export type Message = {
  chatId?: string;
  timestamp: string;
  id: string | undefined;
  sender: 'user' | 'ai';
  text: string;
  destinations?: string[];
  itinerary?: string;
};

export const chatMessagesAtom = atom<Message[]>([]);

import { atom } from 'jotai';

type TDestination = {
  name: string;
  reason: string;
};

type TUserMessage = {
  chatId: string;
  timestamp: string;
  id: string | undefined;
  sender: 'user';
  text: string;
  title?: string;
  destinations?: TDestination[];
  itinerary?: string;
};

type TAiMessage = {
  chatId: string;
  timestamp: string;
  id: string | undefined;
  sender: 'ai';
  text: string;
  title?: string;
  destinations?: TDestination[];
  itinerary?: string;
};

type TGenericMessage = TUserMessage | TAiMessage;

const chatMessagesAtom = atom<TGenericMessage[]>([]);

export type { TDestination, TUserMessage, TAiMessage, TGenericMessage };
export { chatMessagesAtom };
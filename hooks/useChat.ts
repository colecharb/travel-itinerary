import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { chatMessagesAtom, TAiMessage, TUserMessage } from '../store/chatAtoms';
import { v4 as uuid } from 'uuid';

export const useChat = () => {
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useAtom(chatMessagesAtom);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setChatId(uuid()), []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: TUserMessage = {
      chatId,
      timestamp: new Date().toISOString(),
      id: uuid(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const bodyJson = {
        message: input,
        prevResponseId: messages.at(-1)?.id,
        chatId,
        chatHistory: messages,
      };
      // console.log(bodyJson);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyJson),
      });

      // console.log(res);

      const data = await res.json();

      const aiMessage: TAiMessage = {
        timestamp: new Date().toISOString(),
        chatId,
        id: data.id,
        sender: 'ai',
        text: data.text,
        title: data.title,
        destinations: data.destinations,
        itinerary: data.itinerary,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally add error handling here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleSubmit,
  };
};

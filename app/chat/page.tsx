'use client';

import { useChat } from '../../hooks/useChat';
import Message from '@/components/Messages';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { messages, input, setInput, isLoading, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex flex-col max-w-3xl mx-auto h-dvh p-4 overscroll-y-none'>
      {/* <h1 className='text-3xl font-bold mb-4'>Travel Itinerary Chat</h1> */}

      <div className='flex flex-col flex-1 overflow-y-auto mb-4 p-4 gap-10'>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
        {isLoading && <p className='italic text-gray-500'>AI is thinking...</p>}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex gap-2 mt-auto'
      >
        <input
          autoFocus
          type='text'
          className='flex-grow border-1 border-gray-500 rounded-xl px-4 py-2 focus:outline-none focus:border-white'
          placeholder='Where to?'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type='submit'
          aria-label='Send'
          className='w-10 h-10 bg-gray-200 text-black font-black rounded-full flex items-center justify-center disabled:opacity-50'
          disabled={isLoading}
        >
          Go
        </button>
      </form>
    </div>
  );
}

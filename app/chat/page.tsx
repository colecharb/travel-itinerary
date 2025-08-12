'use client';

import { useChat } from '../../hooks/useChat';

export default function Home() {
  const { messages, input, setInput, isLoading, handleSubmit } = useChat();

  return (
    <div className='flex flex-col max-w-3xl mx-auto h-screen p-4'>
      <h1 className='text-3xl font-bold mb-4'>Travel Itinerary Chat</h1>

      <div className='flex-1 overflow-y-auto mb-4 p-4 space-y-4'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex max-w-[70%] p-3 rounded-2xl ${
              msg.sender === 'user' ? 'bg-gray-500/20 text-white ml-auto' : ''
            }`}
          >
            {msg.sender === 'ai' && msg.destinations && msg.itinerary ? (
              <div className='flex flex-col gap-3'>
                <strong>Destinations</strong>
                <div className='flex flex-wrap gap-3 mb-2'>
                  {msg.destinations.map((dest, i) => (
                    <div
                      className={`bg-gray-500/20 px-2 py-1 rounded-md
                        ${Math.random() > 0.5 ? '' : '-'}rotate-${Math.floor(
                        Math.random() * 5,
                      )}
                      `}
                      key={i}
                    >
                      {dest}
                    </div>
                  ))}
                </div>
                <strong>Itinerary</strong>
                <p>{msg.itinerary}</p>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {isLoading && <p className='italic text-gray-500'>AI is thinking...</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex gap-2'
      >
        <input
          type='text'
          className='flex-grow border border-gray-300 rounded px-4 py-2'
          placeholder='Type your message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type='submit'
          className='bg-blue-600 text-white rounded px-6 py-2 disabled:opacity-50'
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

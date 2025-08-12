import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen text-center'>
      <h1 className='text-4xl font-bold mb-6'>Travel Itinerary Planner</h1>
      <p className='mb-6 text-lg'>Plan your dream trip with AI assistance.</p>
      <Link
        href='/chat'
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Start Planning
      </Link>
    </main>
  );
}

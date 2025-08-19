import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-center h-dvh text-center'>
      <h1 className='text-5xl font-bold mb-6'>triptico</h1>
      <p className='mb-6 text-lg'>Plan your dream trip with AI assistance.</p>
      <Link
        href='/chat'
        className='px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-white'
      >
        Try it out
      </Link>
    </main>
  );
}

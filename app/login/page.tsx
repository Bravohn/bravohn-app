// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Bravohn</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your digital copilot for flight training.
        </p>
        <Link href="/login">
          <span className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 cursor-pointer">
            Login
          </span>
        </Link>
      </div>
    </main>
  );
}

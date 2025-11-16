// app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Bravohn</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your digital copilot for flight training.
        </p>
        
        {/* Conteneur pour les boutons d'action */}
        <div className="flex justify-center space-x-4">
          
          {/* Bouton Login */}
          <Link href="/login">
            <span className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition-colors">
              Login
            </span>
          </Link>
          
          {/* Bouton Sign Up */}
          <Link href="/signup">
            <span className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition-colors">
              Sign Up
            </span>
          </Link>

        </div>
      </div>
    </main>
  );
}

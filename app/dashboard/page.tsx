// app/dashboard/page.tsx
'use client'; // Directive TRES importante pour utiliser des hooks comme useState

import { useState } from 'react';
import { searchDocuments } from '../actions'; // Importe notre Server Action

// Définition du type pour un document, pour la clarté du code
type Document = {
  id: number;
  content: string;
  metadata: any;
  similarity: number;
};

export default function DashboardPage() {
  // États pour gérer le chargement et les résultats
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fonction qui sera appelée lors de la soumission du formulaire
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche la page de se recharger
    setLoading(true);
    setResults([]);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    if (query) {
      const response = await searchDocuments(query); // Appel de la Server Action

      if (response.success) {
        setResults(response.documents || []);
      } else {
        setError(response.error || 'An unknown error occurred.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bravohn Dashboard
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Digital Copilot</h2>
        <p className="text-gray-600 mb-4">
          Ask any question about Canadian aviation regulations and manuals.
        </p>
        
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            name="query"
            placeholder="e.g., What are the VFR weather minimums in Class C airspace?"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading} // Désactive le champ pendant le chargement
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={loading} // Désactive le bouton pendant le chargement
          >
            {loading ? 'Searching...' : 'Ask'}
          </button>
        </form>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
          <div className="mt-4 space-y-4">
            {loading && <p className="text-center text-gray-500">Loading results...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {!loading && results.length === 0 && !error && (
              <p className="text-center text-gray-500">Search results will appear here.</p>
            )}

            {results.map((doc) => {
              const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/bravohn-public-assets/${doc.metadata?.source_page_image}`;

              return (
                <div key={doc.id} className="p-4 bg-white rounded-lg border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Colonne de gauche : Texte et métadonnées */}
                  <div>
                    <p className="text-sm text-gray-800">{doc.content}</p>
                    {/* LIGNE MODIFIÉE POUR LE DÉBOGAGE */}
                    <p className="text-xs text-gray-500 mt-2">
                      Source: <strong>{doc.metadata?.source}</strong> | Section: <strong>{doc.metadata?.section || 'N/A'}</strong> | Similarity: {doc.similarity.toFixed(4)}
                        

                      <span className="text-red-500">Image Path: {doc.metadata?.source_page_image || 'NONE'}</span>
                    </p>
                  </div>
                  
                  {/* Colonne de droite : Image de la source */}
                  <div>
                    {doc.metadata?.source_page_image ? (
                      <img 
                        src={imageUrl} 
                        alt={`Source page for ${doc.metadata?.source}`}
                        className="rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                        <p className="text-xs text-gray-400">No source image available (e.g., RAC)</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

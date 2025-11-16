// app/actions.ts
'use server'; // Directive TRES importante qui indique que ce code s'exécute sur le serveur

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialisation des clients API.
// Nous le faisons ici car ce code ne s'exécutera jamais dans le navigateur.
// Nous pouvons donc utiliser nos clés secrètes en toute sécurité.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // ATTENTION: Utilisation de la clé SERVICE_ROLE
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Définition de notre Server Action
export async function searchDocuments(query: string) {
  console.log(`Recherche lancée pour la question : "${query}"`);

  try {
    // Étape 1: Vectoriser la question de l'utilisateur
    // Nous transformons la question en un vecteur pour pouvoir la comparer
    // aux vecteurs de nos documents dans la base de données.
    console.log(' -> Étape 1: Vectorisation de la question...');
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;
    console.log(' -> Vectorisation réussie.');

    // Étape 2: Interroger la base de données Supabase
    // Nous appelons la fonction `match_documents` que nous avons créée en SQL.
    // Elle prend le vecteur de la question et nous retourne les documents les plus similaires.
    console.log(' -> Étape 2: Recherche de similarité dans Supabase...');
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding, // Le vecteur de la question
      match_threshold: 0.5,           // Seuil de similarité (plus le chiffre est élevé, plus les résultats doivent être proches)
      match_count: 5,                  // On demande les 5 meilleurs résultats
    });

    if (error) {
      console.error('Erreur lors de la recherche Supabase:', error);
      return { success: false, error: 'Database search failed.' };
    }

    console.log(` -> Recherche terminée. ${documents.length} documents trouvés.`);
    return { success: true, documents: documents };

  } catch (error) {
    console.error('Erreur inattendue dans la Server Action:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

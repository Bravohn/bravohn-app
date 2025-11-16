// app/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bravohn Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome to your learning dashboard. Your courses and progress will appear here.
      </p>
      
      {/* Espace réservé pour le futur contenu */}
      <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-center text-gray-500">
          Course content will be displayed here.
        </p>
      </div>
    </div>
  );
}

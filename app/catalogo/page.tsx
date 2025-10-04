import { Suspense } from 'react';
import ProductCatalog from '@/components/ProductCatalog';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Catálogo - Réplicas Cuauhtémoc',
  description: 'Explora nuestro catálogo completo de equipo para airsoft de alta calidad.',
};

function CatalogLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Cargando catálogo...</p>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <ProductCatalog />
    </Suspense>
  );
}

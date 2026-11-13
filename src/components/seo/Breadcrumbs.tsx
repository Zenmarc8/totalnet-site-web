import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Fil d’Ariane" className="py-3 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1 hover:text-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Accueil</span>
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast ? (
                <span className="font-medium text-slate-800" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.url)}
                  className="hover:text-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

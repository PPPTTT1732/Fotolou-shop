import React, { useState } from 'react';
import { Download, Share2, Eye, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface MyPhotosScreenProps {
  onToast: (title: string, desc?: string) => void;
}

export const MyPhotosScreen: React.FC<MyPhotosScreenProps> = ({ onToast }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'id' | 'shoots'>('all');

  const photos = [
    {
      id: 'p1',
      type: 'id',
      title: 'Planche E-Photo ANTS / Passeport',
      date: 'Aujourd’hui',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      validity: 'Conforme ICAO / ANTS',
      code: '8Y21-99K2-X10',
    },
    {
      id: 'p2',
      type: 'shoots',
      title: 'Portrait Professionnel Studio',
      date: '14 Août 2026',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      validity: 'Haute Résolution (300 DPI)',
      code: 'PORT-2026-08',
    },
    {
      id: 'p3',
      type: 'id',
      title: 'Photo Visa & Permis',
      date: '10 Août 2026',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      validity: 'Norme 35x45 mm',
      code: 'VISA-3392',
    },
  ];

  const filtered = activeCategory === 'all' ? photos : photos.filter((p) => p.type === activeCategory);

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-4 space-y-4 select-none">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-base font-black text-slate-900 leading-tight">Mes Photos Numériques</h2>
        <p className="text-[11px] text-slate-500">Téléchargez vos photos d'identité certifiées et vos clichés studio.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-xl">
        {[
          { id: 'all', label: 'Toutes' },
          { id: 'id', label: 'Photos d’Identité' },
          { id: 'shoots', label: 'Shootings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-white text-[#4318FF] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Cards List */}
      <div className="space-y-3">
        {filtered.map((photo) => (
          <div key={photo.id} className="p-3 bg-white rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex gap-3 items-center">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-18 h-22 object-cover rounded-2xl border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{photo.validity}</span>
                </div>
                <h3 className="text-xs font-black text-slate-900 leading-tight truncate">{photo.title}</h3>
                <div className="text-[10px] text-slate-400 font-mono">Code ANTS: {photo.code}</div>
                <div className="text-[10px] text-slate-400">Date: {photo.date}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onToast('Téléchargement HD', `${photo.title} téléchargé en HD`)}
                className="flex-1 py-2 px-3 bg-[#4318FF] hover:bg-[#3713D6] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger</span>
              </button>
              <button
                onClick={() => onToast('Lien copié', 'Code ANTS copié dans le presse-papier')}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft, Users, UserPlus, Pencil, Smile, User } from 'lucide-react';
import { Relative } from '../../../types/salon';

interface RelativesListScreenProps {
  relatives: Relative[];
  onBack: () => void;
  onAddRelative: () => void;
  onEditRelative?: (relative: Relative) => void;
}

export const RelativesListScreen: React.FC<RelativesListScreenProps> = ({
  relatives,
  onBack,
  onAddRelative,
  onEditRelative,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          Mes Proches
        </h1>
        <div className="w-6" />
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Top Info Banner with Icon */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#4318FF] text-white flex items-center justify-center mx-auto shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            Gérez les membres de votre famille pour simplifier vos prises de rendez-vous et l'achat de tickets.
          </p>
        </div>

        {/* Relatives List */}
        <div className="space-y-3">
          {relatives.map((rel) => {
            const isMother = rel.iconType === 'mother' || rel.relationship === 'Mère';
            const isChild = rel.iconType === 'child' || rel.relationship === 'Enfant';

            return (
              <div
                key={rel.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-slate-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  {/* Custom Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      isMother
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : isChild
                        ? 'bg-[#EDE9FE] text-[#4318FF]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isChild ? (
                      <Smile className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-sm font-bold text-slate-900">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {rel.relationship}
                      {rel.phone ? ` • ${rel.phone}` : ''}
                    </p>
                  </div>
                </div>

                {/* Edit Pencil Icon */}
                <button
                  onClick={() => onEditRelative?.(rel)}
                  className="p-2 text-slate-400 hover:text-[#4318FF] transition-colors cursor-pointer"
                  title="Modifier"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-5 pt-2 pb-4 bg-white border-t border-slate-100 shrink-0">
        <button
          onClick={onAddRelative}
          className="w-full py-3.5 px-6 bg-[#FFBA08] hover:bg-[#F59E0B] active:scale-[0.99] text-slate-950 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          <span>Ajouter un proche</span>
        </button>
      </div>
    </div>
  );
};

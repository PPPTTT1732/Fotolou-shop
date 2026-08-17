import React, { useState } from 'react';
import { MapPin, ChevronDown, Bell, Search } from 'lucide-react';
import { Salon } from '../../../types/salon';

interface ClientHomeScreenProps {
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onNotificationsClick?: () => void;
}

export const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({
  salons,
  onSelectSalon,
  onNotificationsClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSalons = salons.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900">
      {/* Top Location Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-xs font-bold text-slate-900">Dakar, Sénégal</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </div>

        <button
          onClick={onNotificationsClick}
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4318FF]" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        {/* User Greeting */}
        <div className="pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            Bonjour , <span className="font-extrabold">Diassy</span>
            <span className="text-2xl animate-pulse">👋</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un salon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#F4F7FE] rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4318FF]/30 transition-all"
          />
        </div>

        {/* Salons Proches Section Header */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Salons proches
            </h2>
            <button className="text-xs font-semibold text-[#4318FF] hover:underline cursor-pointer">
              Voir tout
            </button>
          </div>

          {/* Salons List */}
          <div className="space-y-3">
            {filteredSalons.map((salon, index) => (
              <div
                key={salon.id + index}
                onClick={() => onSelectSalon(salon)}
                className="bg-white rounded-2xl p-3 border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  {/* Salon Avatar / Image */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 shrink-0 relative">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Salon Info */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#4318FF] transition-colors">
                      {salon.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-normal">
                      {salon.location}
                    </p>
                    <p className="text-xs text-slate-700 font-medium pt-0.5">
                      <span className="font-bold text-slate-900">{salon.waitingCount}</span> personnes
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="self-start mt-1">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E6F9F0] text-[#05CD99]">
                    Ouvert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

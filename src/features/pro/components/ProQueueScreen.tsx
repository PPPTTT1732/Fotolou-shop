import React, { useState } from 'react';
import { Bell, Filter, UserPlus, X, MoreVertical, Phone, MessageSquare, Trash2 } from 'lucide-react';
import { ProQueueClient } from '../../../types/salon';

interface ProQueueScreenProps {
  queueClients: ProQueueClient[];
  historyClients: ProQueueClient[];
  onServeClient: (client: ProQueueClient) => void;
  onSkipClient: (client: ProQueueClient) => void;
  onAddClient: (newClient: { name: string; phone: string }) => void;
  onDeleteClient?: (client: ProQueueClient) => void;
  onNotificationsClick?: () => void;
  onFilterClick?: () => void;
}

export const ProQueueScreen: React.FC<ProQueueScreenProps> = ({
  queueClients,
  historyClients,
  onServeClient,
  onSkipClient,
  onAddClient,
  onDeleteClient,
  onNotificationsClick,
  onFilterClick,
}) => {
  const [tab, setTab] = useState<'current' | 'history'>('current');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientPhone.trim() && !newClientName.trim()) return;

    onAddClient({
      name: newClientName.trim() || 'Nouveau Client',
      phone: newClientPhone.trim() || '+221 77 000 00 00',
    });

    setNewClientName('');
    setNewClientPhone('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900 relative">
      {/* Top Header with Notification */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-end shrink-0">
        <button
          onClick={onNotificationsClick}
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4318FF]" />
        </button>
      </div>

      {/* Segmented Control [Actuel] [Historiques] */}
      <div className="px-5 pb-3 shrink-0">
        <div className="w-full bg-[#F4F7FE] p-1 rounded-2xl flex items-center">
          <button
            onClick={() => setTab('current')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              tab === 'current'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Actuel
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              tab === 'history'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Historiques
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 pb-20 space-y-4">
        {tab === 'current' ? (
          /* Tab: Actuel (File en direct) */
          <div className="space-y-3.5 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                File en direct
              </h2>
              <button
                onClick={onFilterClick}
                className="flex items-center gap-1 text-xs font-semibold text-[#4318FF] hover:underline cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrer</span>
              </button>
            </div>

            {/* Queue Cards */}
            {queueClients.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <p className="text-sm font-medium">Aucun client dans la file d'attente</p>
                <p className="text-xs">Utilisez le bouton violet pour ajouter un client.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queueClients.map((client, index) => {
                  const isInProgress = client.status === 'in_progress';
                  const formattedNumber = String(client.queueNumber || index + 1).padStart(2, '0');

                  return (
                    <div
                      key={client.id}
                      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3 relative"
                    >
                      {/* Top Info Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Number Badge */}
                          <div className="w-11 h-11 rounded-xl bg-[#EDE9FE] text-[#4318FF] flex items-center justify-center font-black text-base shrink-0">
                            {formattedNumber}
                          </div>

                          {/* Client Name & Phone */}
                          <div className="space-y-0.5">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900">
                              {client.name}
                            </h3>
                            <p className="text-xs text-slate-400 font-normal">
                              {client.phone}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              isInProgress
                                ? 'bg-[#05CD99] text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isInProgress ? 'En cours' : 'En Attente'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons Row: [Sauter] [Servi] [ : ] */}
                      <div className="flex items-center gap-2 pt-1">
                        {/* Sauter Button */}
                        <button
                          onClick={() => onSkipClient(client)}
                          className="flex-1 py-2.5 px-3 bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                        >
                          Sauter
                        </button>

                        {/* Servi Button */}
                        <button
                          onClick={() => onServeClient(client)}
                          className="flex-1 py-2.5 px-3 bg-white border border-[#05CD99] hover:bg-[#E6F9F0] active:scale-[0.98] text-[#05CD99] rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                        >
                          Servi
                        </button>

                        {/* More Menu Trigger */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveMenuId(activeMenuId === client.id ? null : client.id)
                            }
                            className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Context Menu Dropdown */}
                          {activeMenuId === client.id && (
                            <div className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-30 space-y-1">
                              <a
                                href={`tel:${client.phone}`}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <span>Appeler</span>
                              </a>
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  alert(`SMS envoyé à ${client.phone}`);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                <span>Envoyer SMS</span>
                              </button>
                              {onDeleteClient && (
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onDeleteClient(client);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                  <span>Annuler ticket</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Tab: Historiques (Passages recents) */
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Passages recents
              </h2>
              <button
                onClick={onFilterClick}
                className="flex items-center gap-1 text-xs font-semibold text-[#4318FF] hover:underline cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrer</span>
              </button>
            </div>

            {/* History List */}
            <div className="space-y-2.5">
              {historyClients.map((item) => {
                const isServed = item.status === 'served';
                const initial = item.name.charAt(0);
                const isYellow = isServed;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar Square */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base ${
                          isYellow
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#EDE9FE] text-[#4318FF]'
                        }`}
                      >
                        {initial}
                      </div>

                      {/* Info */}
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {item.timeLabel || item.createdAt || 'Hier, 14h36'}
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          isServed
                            ? 'bg-[#E6F9F0] text-[#05CD99]'
                            : 'bg-[#FEE2E2] text-[#EF4444]'
                        }`}
                      >
                        {isServed ? 'SERVI' : 'ANNULÉ'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for adding clients */}
      {tab === 'current' && (
        <div className="absolute bottom-4 right-5 z-20">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-14 h-14 rounded-full bg-[#4318FF] hover:bg-[#3311CC] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-[#4318FF]/30 transition-all cursor-pointer"
          >
            <UserPlus className="w-6 h-6 stroke-[2.4]" />
          </button>
        </div>
      )}

      {/* Modal: Ajouter un client */}
      {isAddModalOpen && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-5 relative animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Ajouter un client
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Nom complet */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800">Nom complet</label>
                  <span className="text-slate-400">(Optionnel)</span>
                </div>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4318FF] focus:bg-white transition-all"
                  autoFocus
                />
              </div>

              {/* Téléphone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="+221 -- --- -- --"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4318FF] focus:bg-white transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.99] text-white rounded-2xl text-sm font-bold transition-all cursor-pointer shadow-md shadow-[#4318FF]/20"
                >
                  Ajouter
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors text-center cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

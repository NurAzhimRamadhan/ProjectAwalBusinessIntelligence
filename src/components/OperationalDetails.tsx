import { Activity, Thermometer, Timer, Users } from 'lucide-react';
import { competitor, peakHoursDetail, socialVoice } from '../data/kopikitaData';

export function OperationalDetails() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* OPERASIONAL */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-amber-600" size={18} />
          <div className="text-sm font-semibold text-slate-900">Operasional per Jam</div>
        </div>

        {/* Wrapper scroll biar kolom ga kepotong */}
        <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200/70 bg-white/60">
          <table className="min-w-[720px] w-full text-xs">
            <thead className="bg-slate-50/70">
              <tr className="text-slate-700">
                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Slot</th>
                <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Transaksi</th>
                <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Antre (m)</th>
                <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Service (m)</th>
                <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Temp (°C)</th>
              </tr>
            </thead>

            <tbody>
              {peakHoursDetail.map((r) => (
                <tr key={r.time} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-900 whitespace-nowrap">{r.time}</span>

                      <span
                        className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] border whitespace-nowrap ${
                          r.label === 'Bottleneck'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {r.label}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right text-slate-900 whitespace-nowrap">{r.transactions}</td>
                  <td className="px-4 py-3 text-right text-slate-900 whitespace-nowrap">{r.avgQueueMinutes}</td>
                  <td className="px-4 py-3 text-right text-slate-900 whitespace-nowrap">{r.avgServiceMinutes}</td>
                  <td className="px-4 py-3 text-right text-slate-900 whitespace-nowrap">{r.avgRoomTempC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 text-slate-700 text-[11px]">
              <Timer size={14} />
              Bottleneck driver
            </div>
            <div className="mt-1 text-slate-900 text-xs leading-relaxed">
              12:00–14:00 antre rata-rata <span className="font-semibold">14 menit</span>.
            </div>
          </div>

          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 text-slate-700 text-[11px]">
              <Thermometer size={14} />
              Heat driver
            </div>
            <div className="mt-1 text-slate-900 text-xs leading-relaxed">
              Jam sibuk memanas hingga <span className="font-semibold">30°C</span>.
            </div>
          </div>
        </div>
      </div>

      {/* VOC + KOMPETITOR */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-amber-600" size={18} />
          <div className="text-sm font-semibold text-slate-900">Voice of Customer & Kompetitor</div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-slate-200/70 p-4 bg-slate-50/70">
            <div className="text-xs text-slate-700 mb-2">Top keluhan (Social Media)</div>
            <ul className="space-y-2">
              {socialVoice.topComplaints.map((c, i) => (
                <li key={i} className="text-xs text-slate-900 flex items-start justify-between gap-3">
                  <span className="leading-relaxed">“{c.text}”</span>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] border whitespace-nowrap ${
                      c.severity === 'Tinggi'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {c.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/70 p-4 bg-slate-50/70">
            <div className="text-xs text-slate-700 mb-2">Benchmark kompetitor</div>
            <div className="text-xs text-slate-900">
              <div className="font-semibold mb-1">{competitor.name}</div>
              <div className="text-slate-700 mb-2">Posisi: {competitor.positioning}</div>

              <div className="flex items-center justify-between mb-2">
                <span>Harga</span>
                <span className="font-semibold text-emerald-700">
                  Rp {competitor.price.toLocaleString('id-ID')}
                </span>
              </div>

              <ul className="list-disc pl-5 space-y-1 text-slate-900/90">
                {competitor.facilities.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
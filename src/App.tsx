import { useMemo, useState } from 'react';
import { Coffee, Sparkles, AlertTriangle } from 'lucide-react';
import {
  formatRupiah,
  monthlyPerformance,
  simulateScenario,
  type ScenarioToggles,
} from './data/kopikitaData';
import { ToggleSwitch } from './components/ToggleSwitch';
import { PredictionChart } from './components/PredictionChart';
import { OperationalDetails } from './components/OperationalDetails';

export default function App() {
  const [toggles, setToggles] = useState<ScenarioToggles>({
    discount20: false,
    addBarista: false,
    improveFacility: false,
  });

  const output = useMemo(() => simulateScenario(toggles), [toggles]);
  const latest = monthlyPerformance[monthlyPerformance.length - 1];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <header className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/70 border border-slate-200/70 flex items-center justify-center glow">
              <Coffee className="text-amber-700" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-slate-900">KopiKita</div>
              <div className="text-sm text-slate-600">
                Interactive Data Science Predictive Dashboard • Tampilan CEO
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
<div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              Data: Jan–Mar (aktual)
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <div className="glass rounded-2xl p-5 glow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Panel Simulasi Keputusan</div>
                  <div className="text-xs text-slate-600">
                    What-if analysis untuk bulan depan (Apr)
                  </div>
                </div>
                <Sparkles className="text-amber-600" size={18} />
              </div>

              <div className="space-y-3">
                <ToggleSwitch
                  checked={toggles.discount20}
                  onChange={(v) => setToggles((p) => ({ ...p, discount20: v }))}
                  label="Terapkan Diskon 20% Bulan Depan"
                  description="Memicu traffic cepat, tapi berisiko memperparah antrean bila bottleneck tidak ditangani."
                />
                <ToggleSwitch
                  checked={toggles.addBarista}
                  onChange={(v) => setToggles((p) => ({ ...p, addBarista: v }))}
                  label="Tambah 1 Barista di Jam Sibuk (12.00–14.00)"
                  description="Mengurangi waktu antre + mempercepat throughput pada puncak 300 transaksi."
                />
                <ToggleSwitch
                  checked={toggles.improveFacility}
                  onChange={(v) => setToggles((p) => ({ ...p, improveFacility: v }))}
                  label="Perbaiki Fasilitas (Tambah AC & WiFi)"
                  description="Menutup gap kompetitor (ruang sejuk + WiFi cepat) dan menahan pelanggan workspace."
                />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white/70 to-amber-50/60 p-4">
                <div className="text-xs text-slate-700 mb-2">Konteks singkat (aktual bulan Mar)</div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-[11px] text-slate-600">Omzet</div>
                    <div className="text-sm font-semibold text-slate-900">
                      Rp {formatRupiah(latest.revenue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-600">Harga</div>
                    <div className="text-sm font-semibold text-slate-900">
                      Rp {formatRupiah(latest.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-600">Loyal</div>
                    <div className="text-sm font-semibold text-slate-900">{latest.loyalCustomers}</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-5 glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-700">Prediksi Omzet Bulan 4 (Apr)</div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      Rp {formatRupiah(output.predictedRevenueApr)}
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-white/70 border border-slate-200/70 flex items-center justify-center">
                    <Sparkles className="text-amber-600" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                  Patokan: Mar Rp {formatRupiah(latest.revenue)} • Simulasi memengaruhi Apr & Mei.
                </div>
              </div>

              <div className="glass rounded-2xl p-5 glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-700">Probabilitas Pelanggan Churn/Kabur</div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">{output.churnProbability}%</div>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${
                      output.churnProbability >= 70
                        ? 'bg-red-500/10 border-red-400/30'
                        : output.churnProbability >= 35
                        ? 'bg-white/70 border-yellow-400/25'
                        : 'bg-emerald-500/10 border-emerald-400/25'
                    }`}
                  >
                    <AlertTriangle
                      className={
                        output.churnProbability >= 70
                          ? 'text-red-300'
                          : output.churnProbability >= 35
                          ? 'text-yellow-300'
                          : 'text-emerald-300'
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                  Driver utama churn: antrean 12:00–14:00 + ruangan panas + kompetitor lebih murah.
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-slate-200/80 bg-gradient-to-br from-white/70 to-amber-50/60">
              <div className="text-sm font-semibold text-slate-900">Pesan ML (Machine Learning(Real-Time))</div>
              <div className="mt-2 text-sm text-slate-700 leading-relaxed">{output.aiMessage}</div>
            </div>

            <PredictionChart
              revenueApr={output.predictedRevenueApr}
              revenueMei={output.predictedRevenueMei}
            />

            <OperationalDetails />
          </section>
        </div>

        <footer className="mt-10 w-full py-6 text-center text-black/75">
      © {new Date().getFullYear()} KopiKita • Nur Azhim Ramadhan 2026
        </footer>
      </div>
    </div>
  );
}
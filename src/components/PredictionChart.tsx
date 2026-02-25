import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatRupiah, monthlyPerformance } from "../data/kopikitaData";

type Props = {
  revenueApr: number;
  revenueMei: number;
};

export function PredictionChart({ revenueApr, revenueMei }: Props) {
  const actual = monthlyPerformance.map((m) => ({
    month: m.month,
    revenueM: Math.round(m.revenue / 100000) / 10, // juta rupiah
  }));

  const predicted = [
    { month: "Apr", revenueM: Math.round(revenueApr / 100000) / 10 },
    { month: "Mei", revenueM: Math.round(revenueMei / 100000) / 10 },
  ];

  const chartData = [...actual, ...predicted];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Grafik Prediksi Omzet
          </div>
          <div className="text-xs text-slate-600">
            Jan–Mar aktual, Apr–Mei dinamis
          </div>
        </div>
        <div className="text-xs text-slate-700">Satuan: Juta Rupiah</div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 18, left: 0, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(15,23,42,0.10)"
            />
            <XAxis dataKey="month" stroke="rgba(15,23,42,0.55)" />
            <YAxis stroke="rgba(15,23,42,0.55)" domain={[0, "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                border: "1px solid rgba(15, 23, 42, 0.14)",
                borderRadius: 12,
              }}
              labelStyle={{ color: "rgba(15,23,42,0.85)" }}
              formatter={(val) => {
                const num = typeof val === "number" ? val : Number(val);
                if (!Number.isFinite(num)) return ["-", "Omzet"];
                return [`Rp ${formatRupiah(num * 1_000_000)}`, "Omzet"];
              }}
            />
            <Bar
              name="Omzet"
              dataKey="revenueM"
              fill="#b45309"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-slate-600">
        Prediksi Apr:{" "}
        <span className="text-slate-900 font-semibold">
          Rp {formatRupiah(revenueApr)}
        </span>{" "}
        • Prediksi Mei:{" "}
        <span className="text-slate-900 font-semibold">
          Rp {formatRupiah(revenueMei)}
        </span>
      </div>
    </div>
  );
}
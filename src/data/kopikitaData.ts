export type MonthKey = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'Mei' | 'Jun';

export type MonthlyPerformance = {
  month: MonthKey;
  cups: number;
  price: number;
  revenue: number;
  loyalCustomers: number;
  newCustomers: number;
  igRating?: number;
};

export const monthlyPerformance: MonthlyPerformance[] = [
  {
    month: 'Jan',
    cups: 1000,
    price: 20000,
    revenue: 20000000,
    loyalCustomers: 300,
    newCustomers: 120,
    igRating: 4.6,
  },
  {
    month: 'Feb',
    cups: 950,
    price: 20000,
    revenue: 19000000,
    loyalCustomers: 270,
    newCustomers: 110,
    igRating: 4.6,
  },
  {
    month: 'Mar',
    cups: 850,
    price: 21000,
    revenue: 17850000,
    loyalCustomers: 220,
    newCustomers: 130,
    igRating: 4.2,
  },
];


export type PeakHourSlice = {
  time: '10:00–12:00' | '12:00–14:00' | '16:00–18:00' | '19:00–21:00';
  transactions: number;
  avgQueueMinutes: number; // estimasi rata-rata waktu antre
  avgServiceMinutes: number; // estimasi rata-rata waktu layanan per transaksi
  avgRoomTempC: number; // estimasi temperatur ruangan
  complaintVolume: number; // indeks 0-100
  label: 'Normal' | 'Bottleneck';
};

export const peakHoursDetail: PeakHourSlice[] = [
  {
    time: '10:00–12:00',
    transactions: 150,
    avgQueueMinutes: 4,
    avgServiceMinutes: 3,
    avgRoomTempC: 27,
    complaintVolume: 18,
    label: 'Normal',
  },
  {
    time: '12:00–14:00',
    transactions: 300,
    avgQueueMinutes: 14,
    avgServiceMinutes: 6,
    avgRoomTempC: 30,
    complaintVolume: 78,
    label: 'Bottleneck',
  },
  {
    time: '16:00–18:00',
    transactions: 200,
    avgQueueMinutes: 6,
    avgServiceMinutes: 4,
    avgRoomTempC: 28,
    complaintVolume: 26,
    label: 'Normal',
  },
  {
    time: '19:00–21:00',
    transactions: 180,
    avgQueueMinutes: 5,
    avgServiceMinutes: 4,
    avgRoomTempC: 28,
    complaintVolume: 22,
    label: 'Normal',
  },
];

export const socialVoice = {
  topComplaints: [
    { text: 'Service is slow now.', tag: 'Operasional', severity: 'Tinggi' },
    { text: 'The place is getting hotter.', tag: 'Fasilitas', severity: 'Sedang' },
    { text: 'Prices went up?', tag: 'Harga', severity: 'Sedang' },
    { text: 'The new coffee shop next door is cheaper.', tag: 'Kompetitor', severity: 'Tinggi' },
  ] as const,
  sentimentIndex: {
    Jan: 68,
    Feb: 64,
    Mar: 49,
  } as Record<'Jan' | 'Feb' | 'Mar', number>,
};

export const competitor = {
  name: 'Coffee Shop Sebelah (Kompetitor Baru)',
  price: 18000,
  facilities: ['Tempat lebih luas', 'Fast Free WiFi', 'Promo Buy 1 Get 1 (opening)'],
  positioning: 'Value + Kenyamanan (Workspace)',
} as const;

export type ScenarioToggles = {
  discount20: boolean;
  addBarista: boolean;
  improveFacility: boolean;
};

export type ScenarioOutput = {
  predictedRevenueApr: number;
  predictedRevenueMei: number;
  churnProbability: number; // 0-100
  aiMessage: string;
};


export function simulateScenario(t: ScenarioToggles): ScenarioOutput {

  let predictedRevenueApr = 15000000;
  let predictedRevenueMei = 12000000;
  let churnProbability = 80;
  let aiMessage = 'Sistem Memprediksi Bahaya: Omzet akan terus turun.';

  const onlyDiscount = t.discount20 && !t.addBarista && !t.improveFacility;
  const onlyOpsFix = !t.discount20 && t.addBarista && t.improveFacility;
  const allOn = t.discount20 && t.addBarista && t.improveFacility;

  if (onlyDiscount) {
    predictedRevenueApr = 19000000;
    predictedRevenueMei = 10000000;
    churnProbability = 90;
    aiMessage =
      'WARNING: Diskon mendatangkan traffic, tapi merusak operasional. Churn meningkat tajam!';
  } else if (onlyOpsFix) {
    predictedRevenueApr = 18000000;
    predictedRevenueMei = 21000000;
    churnProbability = 15;
    aiMessage = 'OPTIMAL: Operasional lancar, pelanggan puas, omzet pulih.';
  } else if (allOn) {
    predictedRevenueApr = 22000000;
    predictedRevenueMei = 23000000;
    churnProbability = 20;
    aiMessage = 'AGRESIF TAPI TERKENDALI: Growth naik, operasional tetap aman.';
  }

  return { predictedRevenueApr, predictedRevenueMei, churnProbability, aiMessage };
}

export function formatRupiah(value: number): string {
  return value.toLocaleString('id-ID');
}

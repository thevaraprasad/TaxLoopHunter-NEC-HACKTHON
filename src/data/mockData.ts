export type RiskClass = 'shell' | 'hold' | 'verified' | 'conglomerate';

export interface CompanyNode {
  id: string;
  shortName: string;
  gstin: string;
  state: string;
  city: string;
  incorporationDate: string;
  turnover: string;
  directorNames: string[];
  directorDins: string[];
  address: string;
  logisticsRating: number;
  riskClass: RiskClass;
  filingYears: number;
  employeePf: boolean;
  utilityPings: boolean;
  ageDays: number;
}

export interface InvoiceEdge {
  id: string;
  from: string;
  to: string;
  amount: number;
  hsn: string;
  date: string;
  ewayBill?: string;
  status: 'loop' | 'verified' | 'hold' | 'exempt' | 'signal-loss';
}

export const companies: CompanyNode[] = [
  { id: 'chem-mum', shortName: 'ChemAxis', gstin: '27AABCT1234A1Z5', state: 'MH', city: 'Mumbai', incorporationDate: '2025-08-18', turnover: '₹18.6 Cr', directorNames: ['Rajat Kothari'], directorDins: ['08921471'], address: 'Plot 14, MIDC Taloja, Navi Mumbai', logisticsRating: 8, riskClass: 'shell', filingYears: 1, employeePf: false, utilityPings: false, ageDays: 408 },
  { id: 'chem-sur', shortName: 'Veda Chem', gstin: '24AABCV8890Q1Z2', state: 'GJ', city: 'Surat', incorporationDate: '2025-04-03', turnover: '₹21.1 Cr', directorNames: ['Rajat Kothari', 'M. Shah'], directorDins: ['08921471'], address: 'Shed 9, Sachin GIDC, Surat', logisticsRating: 12, riskClass: 'shell', filingYears: 1, employeePf: false, utilityPings: false, ageDays: 545 },
  { id: 'chem-hyd', shortName: 'Orion Petro', gstin: '36AABCO6543F1Z8', state: 'TS', city: 'Hyderabad', incorporationDate: '2025-11-22', turnover: '₹17.4 Cr', directorNames: ['M. Shah'], directorDins: ['08921471'], address: 'Unit 22, Jeedimetla Industrial Area', logisticsRating: 10, riskClass: 'shell', filingYears: 0, employeePf: false, utilityPings: false, ageDays: 312 },
  { id: 'chem-pun', shortName: 'Maruti Reclaim', gstin: '27AABCM4456R1Z6', state: 'MH', city: 'Pune', incorporationDate: '2025-06-09', turnover: '₹16.9 Cr', directorNames: ['Rajat Kothari'], directorDins: ['08921471'], address: 'Gate 6, Bhosari MIDC, Pune', logisticsRating: 5, riskClass: 'shell', filingYears: 1, employeePf: false, utilityPings: false, ageDays: 486 },
  { id: 'apex', shortName: 'Apex Precision', gstin: '27AAFFA9988D1Z3', state: 'MH', city: 'Pune', incorporationDate: '2017-02-11', turnover: '₹9.8 Cr', directorNames: ['Anjali Deshmukh'], directorDins: ['05124588'], address: 'Chakan Industrial Estate, Pune', logisticsRating: 96, riskClass: 'hold', filingYears: 9, employeePf: true, utilityPings: true, ageDays: 3518 },
  { id: 'tata-hold', shortName: 'Tata Components', gstin: '27AAACT2727Q1Z1', state: 'MH', city: 'Nashik', incorporationDate: '2013-09-20', turnover: '₹112.4 Cr', directorNames: ['S. Iyer'], directorDins: ['01278942'], address: 'Ambad MIDC, Nashik', logisticsRating: 98, riskClass: 'conglomerate', filingYears: 13, employeePf: true, utilityPings: true, ageDays: 4740 },
  { id: 'verified-msme', shortName: 'Nexon Tools', gstin: '29AABCN7741P1Z4', state: 'KA', city: 'Bengaluru', incorporationDate: '2019-05-14', turnover: '₹6.4 Cr', directorNames: ['Vikram Rao'], directorDins: ['04311829'], address: 'Peenya Phase II, Bengaluru', logisticsRating: 94, riskClass: 'verified', filingYears: 7, employeePf: true, utilityPings: true, ageDays: 2695 },
  { id: 'small-b2b', shortName: 'Kaveri Supplies', gstin: '29AABCK4021E1Z9', state: 'KA', city: 'Mysuru', incorporationDate: '2020-10-01', turnover: '₹1.1 Cr', directorNames: ['N. Kumar'], directorDins: ['06552170'], address: 'Hebbal Industrial Layout, Mysuru', logisticsRating: 88, riskClass: 'verified', filingYears: 6, employeePf: true, utilityPings: true, ageDays: 2190 },
];

export const invoices: InvoiceEdge[] = [
  { id: 'INV-CT-01', from: 'chem-mum', to: 'chem-sur', amount: 124000000, hsn: '7204', date: '2026-09-28 08:12', status: 'loop' },
  { id: 'INV-CT-02', from: 'chem-sur', to: 'chem-hyd', amount: 121520000, hsn: '7204', date: '2026-09-28 19:48', status: 'loop' },
  { id: 'INV-CT-03', from: 'chem-hyd', to: 'chem-pun', amount: 119089600, hsn: '7204', date: '2026-09-29 09:20', status: 'loop' },
  { id: 'INV-CT-04', from: 'chem-pun', to: 'chem-mum', amount: 124000000, hsn: '7204', date: '2026-09-29 17:55', status: 'loop' },
  { id: 'INV-2026-8812', from: 'apex', to: 'tata-hold', amount: 38000000, hsn: '8471', date: '2026-09-29 06:30', ewayBill: '101239847120', status: 'hold' },
  { id: 'INV-VER-04', from: 'verified-msme', to: 'tata-hold', amount: 8200000, hsn: '8471', date: '2026-09-27 11:45', ewayBill: '101239845912', status: 'verified' },
  { id: 'INV-EX-11', from: 'small-b2b', to: 'verified-msme', amount: 42000, hsn: '8471', date: '2026-09-29 15:04', status: 'exempt' },
  { id: 'INV-SL-09', from: 'apex', to: 'verified-msme', amount: 940000, hsn: '7204', date: '2026-09-26 22:10', ewayBill: '101239840118', status: 'signal-loss' },
];

export const routePings = [
  { label: 'Dispatch', place: 'Chakan Plant', time: '06:30', kind: 'origin' },
  { label: 'FASTag', place: 'Khed Toll Plaza', time: '08:14', kind: 'fastag' },
  { label: 'Weighbridge', place: 'Malshej Checkpoint', time: '11:46', kind: 'weight' },
  { label: 'FASTag', place: 'Charoti Toll Plaza', time: '17:02', kind: 'fastag' },
  { label: 'Delivery', place: 'Nashik DC-04', time: '19:28', kind: 'destination' },
];

export const metricSeries = [
  { day: '24 Sep', loops: 2, verified: 62 }, { day: '25 Sep', loops: 4, verified: 68 }, { day: '26 Sep', loops: 3, verified: 71 },
  { day: '27 Sep', loops: 6, verified: 78 }, { day: '28 Sep', loops: 8, verified: 84 }, { day: '29 Sep', loops: 5, verified: 91 }, { day: '30 Sep', loops: 4, verified: 96 },
];

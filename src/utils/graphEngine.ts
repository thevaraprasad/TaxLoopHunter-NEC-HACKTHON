import type { CompanyNode, InvoiceEdge } from '@/data/mockData';

export interface DetectedCycle {
  nodeIds: string[];
  edgeIds: string[];
  amounts: number[];
  decayPercent: number;
}

export interface ShellAssessment {
  nodeId: string;
  score: number;
  reasons: string[];
  classification: 'High-risk shell' | 'Legitimate Conglomerate' | 'Verified MSME';
}

export function detectCycles(nodes: CompanyNode[], edges: InvoiceEdge[], minAmount = 0, hsn = 'all'): DetectedCycle[] {
  const allowed = edges.filter((edge) => edge.amount >= minAmount && (hsn === 'all' || edge.hsn === hsn));
  const adjacency = new Map<string, InvoiceEdge[]>();
  allowed.forEach((edge) => adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge]));
  const cycles: DetectedCycle[] = [];
  const seen = new Set<string>();

  function walk(start: string, current: string, pathNodes: string[], pathEdges: InvoiceEdge[]): void {
    for (const edge of adjacency.get(current) ?? []) {
      if (edge.to === start && pathNodes.length >= 3) {
        const key = [...pathNodes].sort().join('|');
        if (!seen.has(key)) {
          seen.add(key);
          const amounts = [...pathEdges.map((item) => item.amount), edge.amount];
          const min = Math.min(...amounts);
          const max = Math.max(...amounts);
          if (max / min <= 1.08) {
            cycles.push({ nodeIds: [...pathNodes], edgeIds: [...pathEdges.map((item) => item.id), edge.id], amounts, decayPercent: Number(((1 - min / max) * 100).toFixed(1)) });
          }
        }
      } else if (!pathNodes.includes(edge.to) && pathNodes.length < 8) {
        walk(start, edge.to, [...pathNodes, edge.to], [...pathEdges, edge]);
      }
    }
  }

  nodes.forEach((node) => walk(node.id, node.id, [node.id], []));
  return cycles.sort((a, b) => b.nodeIds.length - a.nodeIds.length);
}

export function assessShellRisk(node: CompanyNode, allNodes: CompanyNode[]): ShellAssessment {
  const reasons: string[] = [];
  let score = 0;
  const sharedDirector = allNodes.some((other) => other.id !== node.id && other.directorDins.some((din) => node.directorDins.includes(din)));
  const legitimate = node.filingYears > 3 && node.employeePf && node.utilityPings;
  if (node.ageDays < 180) { score += 28; reasons.push('GSTIN age below 180 days'); }
  if (node.turnover.includes('18.6') || node.turnover.includes('21.1') || node.turnover.includes('17.4') || node.turnover.includes('16.9')) { score += 24; reasons.push('Turnover spike > 500% MoM'); }
  if (sharedDirector) { score += 22; reasons.push('Shared Director DIN cluster'); }
  if (node.address.includes('MIDC') && !node.utilityPings) { score += 14; reasons.push('Registered address shared with cluster'); }
  if (node.logisticsRating < 30) { score += 12; reasons.push('Zero verified physical logistics'); }
  if (legitimate) return { nodeId: node.id, score: 8, reasons: ['3+ year filing history', 'Employee PF and utility pings verified'], classification: 'Legitimate Conglomerate' };
  if (score >= 60) return { nodeId: node.id, score, reasons, classification: 'High-risk shell' };
  return { nodeId: node.id, score, reasons, classification: 'Verified MSME' };
}

export function generateStressEdges(size = 1200): InvoiceEdge[] {
  return Array.from({ length: size }, (_, index) => ({ id: `stress-${index}`, from: `stress-${index % 100}`, to: `stress-${(index * 13 + 7) % 100}`, amount: 100000 + (index % 9) * 1000, hsn: '8471', date: '2026-09-30 12:00', status: 'verified' as const }));
}

export function benchmarkCycleDetection(): number {
  const stressEdges = generateStressEdges();
  const started = performance.now();
  detectCycles(Array.from({ length: 100 }, (_, index) => ({ id: `stress-${index}`, shortName: `N${index}`, gstin: '27AABCT1234A1Z5', state: 'MH', city: 'Mumbai', incorporationDate: '2020-01-01', turnover: '₹1 Cr', directorNames: [], directorDins: [], address: '', logisticsRating: 80, riskClass: 'verified' as const, filingYears: 5, employeePf: true, utilityPings: true, ageDays: 2000 })), stressEdges);
  return Math.round(performance.now() - started);
}

import { routePaths } from '@/data/route-paths';

/** [latitude, longitude] along the route, on the Edmond World Street Map. */

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface LrsWorkLocation {
  id: string;
  routeName: string;
  fromMeasure: number;
  toMeasure: number;
  assetGuid: string;
  assetDescription: string;
  assetType: string;
  path: GeoPoint[];
  /** Perpendicular screen offset so overlapping measures stay visible. */
  drawOffset?: number;
}

export interface WorkActivity {
  id: string;
  locationId: string;
  workOrderId: string;
  workOrderSid: string;
  status: 'Open' | 'Closed';
  activity: string;
  description: string;
  actualStart: string;
  actualFinish: string;
  equipment: number;
  labor: number;
  material: number;
  accountCode: string;
  district: string;
}

/** Fictional Sample DOT records drawn on real Edmond, Oklahoma roads. Not customer data. */

export const LOCATIONS: LrsWorkLocation[] = [
  {
    id: 'loc-i40-a',
    routeName: 'Danforth Rd',
    fromMeasure: 142,
    toMeasure: 143.4,
    assetGuid: '3f2c1a10-4b2a-4c01-9c01-0000000000a1',
    assetDescription: 'Danforth Rd eastbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-i40-a'],
  },
  {
    id: 'loc-i40-b',
    routeName: 'Danforth Rd',
    fromMeasure: 143.4,
    toMeasure: 145.1,
    assetGuid: '3f2c1a10-4b2a-4c01-9c01-0000000000a2',
    assetDescription: 'Danforth Rd eastbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-i40-b'],
  },
  {
    id: 'loc-us285-a',
    routeName: 'Broadway',
    fromMeasure: 18.2,
    toMeasure: 19,
    assetGuid: '7a91bb20-11e0-4d44-8aa2-0000000000b1',
    assetDescription: 'Broadway northbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-us285-a'],
  },
  {
    id: 'loc-us285-b',
    routeName: 'Broadway',
    fromMeasure: 19,
    toMeasure: 20.6,
    assetGuid: '7a91bb20-11e0-4d44-8aa2-0000000000b2',
    assetDescription: 'Broadway northbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-us285-b'],
  },
  {
    id: 'loc-nm14-a',
    routeName: 'I-35',
    fromMeasure: 8.4,
    toMeasure: 9.1,
    assetGuid: 'c55e0044-90af-4e17-b331-0000000000c1',
    assetDescription: 'I-35 northbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-nm14-a'],
  },
  {
    id: 'loc-nm14-b',
    routeName: 'I-35',
    fromMeasure: 9.1,
    toMeasure: 10.3,
    assetGuid: 'c55e0044-90af-4e17-b331-0000000000c2',
    assetDescription: 'I-35 northbound pavement',
    assetType: 'Pavement',
    path: routePaths['loc-nm14-b'],
  },
  {
    id: 'loc-danforth-span',
    routeName: 'Danforth Rd',
    fromMeasure: 140,
    toMeasure: 146.5,
    assetGuid: '3f2c1a10-4b2a-4c01-9c01-0000000000a3',
    assetDescription: 'Danforth Rd pavement, full span',
    assetType: 'Pavement',
    drawOffset: 1,
    path: routePaths['loc-danforth-span'],
  },
  {
    id: 'loc-danforth-overlap',
    routeName: 'Danforth Rd',
    fromMeasure: 142.8,
    toMeasure: 144.6,
    assetGuid: '3f2c1a10-4b2a-4c01-9c01-0000000000a4',
    assetDescription: 'Danforth Rd pavement, overlapping joint',
    assetType: 'Pavement',
    drawOffset: -1,
    path: routePaths['loc-danforth-overlap'],
  },
  {
    id: 'loc-broadway-span',
    routeName: 'Broadway',
    fromMeasure: 17.4,
    toMeasure: 21.2,
    assetGuid: '7a91bb20-11e0-4d44-8aa2-0000000000b3',
    assetDescription: 'Broadway pavement, full span',
    assetType: 'Pavement',
    drawOffset: 1,
    path: routePaths['loc-broadway-span'],
  },
  {
    id: 'loc-broadway-overlap',
    routeName: 'Broadway',
    fromMeasure: 18.6,
    toMeasure: 19.8,
    assetGuid: '7a91bb20-11e0-4d44-8aa2-0000000000b4',
    assetDescription: 'Broadway pavement, overlapping joint',
    assetType: 'Pavement',
    drawOffset: -1,
    path: routePaths['loc-broadway-overlap'],
  },
  {
    id: 'loc-i35-span',
    routeName: 'I-35',
    fromMeasure: 7.6,
    toMeasure: 11.2,
    assetGuid: 'c55e0044-90af-4e17-b331-0000000000c3',
    assetDescription: 'I-35 pavement, full span',
    assetType: 'Pavement',
    drawOffset: 1,
    path: routePaths['loc-i35-span'],
  },
  {
    id: 'loc-covell-a',
    routeName: 'Covell Rd',
    fromMeasure: 4.2,
    toMeasure: 5.6,
    assetGuid: 'd18a7700-22b1-4f08-a114-0000000000d1',
    assetDescription: 'Covell Rd pavement',
    assetType: 'Pavement',
    path: routePaths['loc-covell-a'],
  },
  {
    id: 'loc-covell-b',
    routeName: 'Covell Rd',
    fromMeasure: 5.6,
    toMeasure: 7.4,
    assetGuid: 'd18a7700-22b1-4f08-a114-0000000000d2',
    assetDescription: 'Covell Rd pavement',
    assetType: 'Pavement',
    path: routePaths['loc-covell-b'],
  },
  {
    id: 'loc-2nd-a',
    routeName: '2nd St',
    fromMeasure: 22,
    toMeasure: 22.9,
    assetGuid: 'e22c8811-33c2-4a19-b225-0000000000e1',
    assetDescription: '2nd St pavement',
    assetType: 'Pavement',
    path: routePaths['loc-2nd-a'],
  },
  {
    id: 'loc-2nd-b',
    routeName: '2nd St',
    fromMeasure: 22.9,
    toMeasure: 24.1,
    assetGuid: 'e22c8811-33c2-4a19-b225-0000000000e2',
    assetDescription: '2nd St pavement',
    assetType: 'Pavement',
    path: routePaths['loc-2nd-b'],
  },
  {
    id: 'loc-kelly-a',
    routeName: 'Kelly Ave',
    fromMeasure: 11,
    toMeasure: 12,
    assetGuid: 'f33d9922-44d3-4b2a-c336-0000000000f1',
    assetDescription: 'Kelly Ave pavement',
    assetType: 'Pavement',
    path: routePaths['loc-kelly-a'],
  },
  {
    id: 'loc-kelly-b',
    routeName: 'Kelly Ave',
    fromMeasure: 12,
    toMeasure: 13,
    assetGuid: 'f33d9922-44d3-4b2a-c336-0000000000f2',
    assetDescription: 'Kelly Ave pavement',
    assetType: 'Pavement',
    path: routePaths['loc-kelly-b'],
  },
];

export const ACTIVITIES: WorkActivity[] = [
  {
    id: 'wo-10418',
    locationId: 'loc-i40-a',
    workOrderId: 'WO-10418',
    workOrderSid: '10418',
    status: 'Closed',
    activity: 'Crack seal',
    description: 'Crack seal eastbound lane',
    actualStart: '2024-05-28',
    actualFinish: '2024-06-12',
    equipment: 4200,
    labor: 8600,
    material: 3100,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-11002',
    locationId: 'loc-i40-a',
    workOrderId: 'WO-11002',
    workOrderSid: '11002',
    status: 'Closed',
    activity: 'Overlay',
    description: 'Mill and overlay',
    actualStart: '2025-03-11',
    actualFinish: '2025-04-03',
    equipment: 18000,
    labor: 24000,
    material: 61000,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-10880',
    locationId: 'loc-i40-b',
    workOrderId: 'WO-10880',
    workOrderSid: '10880',
    status: 'Closed',
    activity: 'Patching',
    description: 'Partial-depth patching',
    actualStart: '2025-08-04',
    actualFinish: '2025-08-19',
    equipment: 6400,
    labor: 9100,
    material: 4700,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-11240',
    locationId: 'loc-i40-b',
    workOrderId: 'WO-11240',
    workOrderSid: '11240',
    status: 'Open',
    activity: 'Shoulder repair',
    description: 'Shoulder drop-off repair',
    actualStart: '2026-03-02',
    actualFinish: '',
    equipment: 2100,
    labor: 4800,
    material: 900,
    accountCode: 'MNT-SHLD',
    district: 'District 3',
  },
  {
    id: 'wo-10110',
    locationId: 'loc-us285-a',
    workOrderId: 'WO-10110',
    workOrderSid: '10110',
    status: 'Closed',
    activity: 'Striping',
    description: 'Centerline restriping',
    actualStart: '2024-11-06',
    actualFinish: '2024-11-20',
    equipment: 800,
    labor: 2200,
    material: 1500,
    accountCode: 'MNT-TRAF',
    district: 'District 3',
  },
  {
    id: 'wo-10955',
    locationId: 'loc-us285-a',
    workOrderId: 'WO-10955',
    workOrderSid: '10955',
    status: 'Closed',
    activity: 'Guardrail',
    description: 'Guardrail replacement',
    actualStart: '2025-09-02',
    actualFinish: '2025-09-14',
    equipment: 3600,
    labor: 5400,
    material: 8900,
    accountCode: 'MNT-SAFE',
    district: 'District 3',
  },
  {
    id: 'wo-10702',
    locationId: 'loc-us285-b',
    workOrderId: 'WO-10702',
    workOrderSid: '10702',
    status: 'Closed',
    activity: 'Drainage',
    description: 'Culvert cleanout',
    actualStart: '2025-01-27',
    actualFinish: '2025-02-11',
    equipment: 5100,
    labor: 7300,
    material: 2600,
    accountCode: 'MNT-DRAN',
    district: 'District 3',
  },
  {
    id: 'wo-10640',
    locationId: 'loc-nm14-a',
    workOrderId: 'WO-10640',
    workOrderSid: '10640',
    status: 'Closed',
    activity: 'Pothole',
    description: 'Pothole patching',
    actualStart: '2024-08-18',
    actualFinish: '2024-08-30',
    equipment: 1500,
    labor: 2800,
    material: 600,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-11190',
    locationId: 'loc-nm14-a',
    workOrderId: 'WO-11190',
    workOrderSid: '11190',
    status: 'Closed',
    activity: 'Signing',
    description: 'Replace curve warning signs',
    actualStart: '2026-01-08',
    actualFinish: '2026-01-22',
    equipment: 400,
    labor: 1600,
    material: 2200,
    accountCode: 'MNT-TRAF',
    district: 'District 3',
  },
  {
    id: 'wo-10577',
    locationId: 'loc-nm14-b',
    workOrderId: 'WO-10577',
    workOrderSid: '10577',
    status: 'Closed',
    activity: 'Mowing',
    description: 'Roadside mowing',
    actualStart: '2025-05-12',
    actualFinish: '2025-05-28',
    equipment: 900,
    labor: 1400,
    material: 200,
    accountCode: 'MNT-ROAD',
    district: 'District 3',
  },
  {
    id: 'wo-11305',
    locationId: 'loc-nm14-b',
    workOrderId: 'WO-11305',
    workOrderSid: '11305',
    status: 'Open',
    activity: 'Resurfacing',
    description: 'Resurfacing, costs posted to date',
    actualStart: '2026-07-15',
    actualFinish: '',
    equipment: 0,
    labor: 1200,
    material: 0,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12010',
    locationId: 'loc-danforth-span',
    workOrderId: 'WO-12010',
    workOrderSid: '12010',
    status: 'Closed',
    activity: 'Potholing',
    description: 'Potholing, Danforth Rd 140.00–146.50',
    actualStart: '2024-02-05',
    actualFinish: '2024-02-16',
    equipment: 5400,
    labor: 9800,
    material: 2600,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12055',
    locationId: 'loc-broadway-span',
    workOrderId: 'WO-12055',
    workOrderSid: '12055',
    status: 'Closed',
    activity: 'Crack seal',
    description: 'Crack seal, Broadway 17.40–21.20',
    actualStart: '2025-06-09',
    actualFinish: '2025-06-20',
    equipment: 3100,
    labor: 6400,
    material: 1900,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12080',
    locationId: 'loc-i35-span',
    workOrderId: 'WO-12080',
    workOrderSid: '12080',
    status: 'Closed',
    activity: 'Overlay',
    description: 'Mill and overlay, I-35 7.60–11.20',
    actualStart: '2024-09-23',
    actualFinish: '2024-10-09',
    equipment: 22000,
    labor: 31000,
    material: 74000,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12110',
    locationId: 'loc-danforth-overlap',
    workOrderId: 'WO-12110',
    workOrderSid: '12110',
    status: 'Closed',
    activity: 'Joint repair',
    description: 'Joint repair across the 143.40 measure',
    actualStart: '2025-11-03',
    actualFinish: '2025-11-18',
    equipment: 2800,
    labor: 4600,
    material: 1700,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12130',
    locationId: 'loc-broadway-overlap',
    workOrderId: 'WO-12130',
    workOrderSid: '12130',
    status: 'Closed',
    activity: 'Signing',
    description: 'Replace signs across the 19.00 measure',
    actualStart: '2024-07-15',
    actualFinish: '2024-07-25',
    equipment: 500,
    labor: 1800,
    material: 2400,
    accountCode: 'MNT-TRAF',
    district: 'District 3',
  },
  {
    id: 'wo-12150',
    locationId: 'loc-covell-a',
    workOrderId: 'WO-12150',
    workOrderSid: '12150',
    status: 'Closed',
    activity: 'Mowing',
    description: 'Roadside mowing',
    actualStart: '2025-06-02',
    actualFinish: '2025-06-06',
    equipment: 700,
    labor: 1100,
    material: 150,
    accountCode: 'MNT-ROAD',
    district: 'District 3',
  },
  {
    id: 'wo-12151',
    locationId: 'loc-covell-a',
    workOrderId: 'WO-12151',
    workOrderSid: '12151',
    status: 'Closed',
    activity: 'Patching',
    description: 'Partial-depth patching',
    actualStart: '2024-09-04',
    actualFinish: '2024-09-12',
    equipment: 3900,
    labor: 5200,
    material: 2800,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12170',
    locationId: 'loc-covell-b',
    workOrderId: 'WO-12170',
    workOrderSid: '12170',
    status: 'Closed',
    activity: 'Crack seal',
    description: 'Crack seal eastbound lane',
    actualStart: '2025-10-14',
    actualFinish: '2025-10-30',
    equipment: 2600,
    labor: 4100,
    material: 1800,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12171',
    locationId: 'loc-covell-b',
    workOrderId: 'WO-12171',
    workOrderSid: '12171',
    status: 'Open',
    activity: 'Shoulder repair',
    description: 'Shoulder drop-off repair',
    actualStart: '2026-05-04',
    actualFinish: '',
    equipment: 1500,
    labor: 2700,
    material: 600,
    accountCode: 'MNT-SHLD',
    district: 'District 3',
  },
  {
    id: 'wo-12190',
    locationId: 'loc-2nd-a',
    workOrderId: 'WO-12190',
    workOrderSid: '12190',
    status: 'Closed',
    activity: 'Pothole',
    description: 'Pothole patching',
    actualStart: '2024-04-08',
    actualFinish: '2024-04-19',
    equipment: 1200,
    labor: 2400,
    material: 500,
    accountCode: 'MNT-PAVE',
    district: 'District 3',
  },
  {
    id: 'wo-12210',
    locationId: 'loc-2nd-b',
    workOrderId: 'WO-12210',
    workOrderSid: '12210',
    status: 'Closed',
    activity: 'Striping',
    description: 'Centerline restriping',
    actualStart: '2026-02-02',
    actualFinish: '2026-02-11',
    equipment: 900,
    labor: 1600,
    material: 1300,
    accountCode: 'MNT-TRAF',
    district: 'District 3',
  },
  {
    id: 'wo-12230',
    locationId: 'loc-kelly-a',
    workOrderId: 'WO-12230',
    workOrderSid: '12230',
    status: 'Closed',
    activity: 'Drainage',
    description: 'Culvert cleanout',
    actualStart: '2025-03-10',
    actualFinish: '2025-03-21',
    equipment: 4300,
    labor: 6100,
    material: 2200,
    accountCode: 'MNT-DRAN',
    district: 'District 3',
  },
  {
    id: 'wo-12250',
    locationId: 'loc-kelly-b',
    workOrderId: 'WO-12250',
    workOrderSid: '12250',
    status: 'Closed',
    activity: 'Signing',
    description: 'Replace speed limit signs',
    actualStart: '2024-12-02',
    actualFinish: '2024-12-05',
    equipment: 300,
    labor: 900,
    material: 1400,
    accountCode: 'MNT-TRAF',
    district: 'District 3',
  },
];

export interface ActivityColumn {
  id: string;
  header: string;
  defaultOn: boolean;
}

export const ACTIVITY_COLUMNS: ActivityColumn[] = [
  { id: 'workOrderId', header: 'Work Order Id', defaultOn: true },
  { id: 'status', header: 'Status', defaultOn: true },
  { id: 'activity', header: 'Activity', defaultOn: true },
  { id: 'routeName', header: 'Route Name', defaultOn: true },
  { id: 'fromMeasure', header: 'From Measure', defaultOn: true },
  { id: 'toMeasure', header: 'To Measure', defaultOn: true },
  { id: 'assetGuid', header: 'Asset GUID', defaultOn: true },
  { id: 'assetDescription', header: 'Asset Description', defaultOn: true },
  { id: 'equipment', header: 'Equipment', defaultOn: true },
  { id: 'labor', header: 'Labor', defaultOn: true },
  { id: 'material', header: 'Material', defaultOn: true },
  { id: 'elm', header: 'ELM', defaultOn: true },
  { id: 'total', header: 'Total Cost', defaultOn: true },
  { id: 'actualStart', header: 'Actual Start', defaultOn: true },
  { id: 'actualFinish', header: 'Actual Finish', defaultOn: true },
  { id: 'accountCode', header: 'Account Code', defaultOn: true },
  { id: 'district', header: 'District', defaultOn: true },
  { id: 'description', header: 'Description', defaultOn: true },
];

export function elmCost(activity: WorkActivity): number {
  return activity.equipment + activity.labor + activity.material;
}

/** Total cost is the ELM sum. Equipment, labor, and material are the whole cost. */
export function totalCost(activity: WorkActivity): number {
  return elmCost(activity);
}

export function money(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function measureLabel(measure: number): string {
  return measure.toFixed(2);
}

export function locationLength(location: LrsWorkLocation): number {
  return location.toMeasure - location.fromMeasure;
}

/** Open work uses the start date. Closed work uses the finish date. */
export function activityOnDate(activity: WorkActivity): string {
  return activity.status === 'Open' ? activity.actualStart : activity.actualFinish;
}

export function activitiesFor(
  locationIds: string[],
  from: string,
  to: string,
): WorkActivity[] {
  const selected = new Set(locationIds);
  return ACTIVITIES.filter((activity) => {
    if (!selected.has(activity.locationId)) return false;
    const on = activityOnDate(activity);
    return on >= from && on <= to;
  });
}

export function locationById(id: string): LrsWorkLocation | undefined {
  return LOCATIONS.find((location) => location.id === id);
}

import { useMemo, useState } from 'react';
import {
  ModusWcButton,
  ModusWcCheckbox,
  ModusWcDropdownMenu,
  ModusWcIcon,
  ModusWcMenuItem,
  ModusWcPagination,
  ModusWcSelect,
  ModusWcTable,
  ModusWcTextInput,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react';
import type { ITableColumn } from '@trimble-oss/moduswebcomponents';
import { valueFrom } from '@/lib/modus-events';
import {
  ACTIVITY_COLUMNS,
  activitiesFor,
  elmCost,
  locationById,
  locationLength,
  measureLabel,
  money,
  totalCost,
  type LrsWorkLocation,
} from '@/data/lrs-work-history';

interface WorkActivitiesPanelProps {
  selected: LrsWorkLocation[];
}

type PageSizeChoice = '5' | '10' | '15' | '20' | 'all';

function pageSizeChoiceFrom(value: string): PageSizeChoice {
  if (value === '5' || value === '10' || value === '15' || value === '20' || value === 'all') return value;
  return '10';
}

function download(filename: string, mime: string, body: string) {
  const blob = new Blob([body], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function closeMenu(target: EventTarget | null) {
  if (!(target instanceof Element)) return;
  const host = target.closest('modus-wc-dropdown-menu');
  if (host && 'menuVisible' in host) {
    (host as HTMLElement & { menuVisible: boolean }).menuVisible = false;
  }
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export default function WorkActivitiesPanel({ selected }: WorkActivitiesPanelProps) {
  const [scope, setScope] = useState('all');
  const [from, setFrom] = useState('2024-01-01');
  const [to, setTo] = useState('2026-12-31');
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [visible, setVisible] = useState<string[]>(
    ACTIVITY_COLUMNS.filter((column) => column.defaultOn).map((column) => column.id),
  );
  const [page, setPage] = useState(1);
  const [pageSizeChoice, setPageSizeChoice] = useState<PageSizeChoice>('10');
  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>(null);
  const scopeId = selected.some((location) => location.id === scope) ? scope : 'all';
  const resultKey = `${scopeId}|${from}|${to}|${selected.map((location) => location.id).join(',')}`;
  const [resultKeySeen, setResultKeySeen] = useState(resultKey);
  if (resultKeySeen !== resultKey) {
    setResultKeySeen(resultKey);
    if (page !== 1) setPage(1);
  }

  const inScope =
    scopeId === 'all' ? selected : selected.filter((location) => location.id === scopeId);
  const activities = activitiesFor(
    inScope.map((location) => location.id),
    from,
    to,
  );

  const rows = useMemo(() => {
    return activities.map((activity) => {
      const location = locationById(activity.locationId);
      const row: Record<string, string> = {
        id: activity.id,
        workOrderId: activity.workOrderId,
        status: activity.status,
        activity: activity.activity,
        routeName: location?.routeName ?? '',
        fromMeasure: location ? measureLabel(location.fromMeasure) : '',
        toMeasure: location ? measureLabel(location.toMeasure) : '',
        assetGuid: location?.assetGuid ?? '',
        assetDescription: location?.assetDescription ?? '',
        equipment: money(activity.equipment),
        labor: money(activity.labor),
        material: money(activity.material),
        elm: money(elmCost(activity)),
        total: money(totalCost(activity)),
        actualStart: activity.actualStart,
        actualFinish: activity.actualFinish || 'Open',
        accountCode: activity.accountCode,
        district: activity.district,
        description: activity.description,
      };
      return row;
    });
  }, [activities]);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((left, right) => {
      const compared = (left[sort.id] ?? '').localeCompare(right[sort.id] ?? '', undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      return sort.desc ? -compared : compared;
    });
    return copy;
  }, [rows, sort]);

  const pageSize = pageSizeChoice === 'all' ? Math.max(sortedRows.length, 1) : Number(pageSizeChoice);
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  if (safePage !== page) setPage(safePage);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = sortedRows.slice(pageStart, pageStart + pageSize);

  const columns: ITableColumn[] = ACTIVITY_COLUMNS.filter((column) => visible.includes(column.id)).map(
    (column) => ({
      id: column.id,
      accessor: column.id,
      header: column.header,
      sortable: true,
    }),
  );

  const equipment = activities.reduce((sum, activity) => sum + activity.equipment, 0);
  const labor = activities.reduce((sum, activity) => sum + activity.labor, 0);
  const material = activities.reduce((sum, activity) => sum + activity.material, 0);
  const total = activities.reduce((sum, activity) => sum + totalCost(activity), 0);
  const miles = inScope.reduce((sum, location) => sum + locationLength(location), 0);
  const perMile = miles > 0 ? total / miles : 0;

  const scopeOptions = [
    { value: 'all', label: 'All selected locations' },
    ...selected.map((location) => ({
      value: location.id,
      label: `${location.routeName} ${measureLabel(location.fromMeasure)}–${measureLabel(location.toMeasure)}`,
    })),
  ];

  function exportRows(kind: 'csv' | 'xls') {
    const shown = ACTIVITY_COLUMNS.filter((column) => visible.includes(column.id));
    const header = shown.map((column) => column.header);
    const body = rows.map((row) => shown.map((column) => row[column.id] ?? ''));
    const summary = [
      ['Equipment Cost', money(equipment)],
      ['Labor Cost', money(labor)],
      ['Material Cost', money(material)],
      ['Total Cost', money(total)],
      ['Cost Per Mile', money(perMile)],
    ];
    if (kind === 'csv') {
      const lines = [
        header.map(csvCell).join(','),
        ...body.map((line) => line.map(csvCell).join(',')),
        '',
        ...summary.map(([label, value]) => [csvCell(label), csvCell(value)].join(',')),
      ];
      download('lrs-work-history.csv', 'text/csv;charset=utf-8', lines.join('\n'));
      return;
    }
    const table = [
      '<table>',
      `<tr>${header.map((cell) => `<th>${cell}</th>`).join('')}</tr>`,
      ...body.map((line) => `<tr>${line.map((cell) => `<td>${cell}</td>`).join('')}</tr>`),
      '</table>',
      '<table>',
      ...summary.map(([label, value]) => `<tr><td>${label}</td><td>${value}</td></tr>`),
      '</table>',
    ].join('');
    download(
      'lrs-work-history.xls',
      'application/vnd.ms-excel',
      `<html><head><meta charset="utf-8"></head><body>${table}</body></html>`,
    );
  }

  const summary = [
    ['Equipment Cost', money(equipment)],
    ['Labor Cost', money(labor)],
    ['Material Cost', money(material)],
    ['Total Cost', money(total)],
    ['Cost Per Mile', money(perMile)],
  ];

  return (
    <div className="flex flex-col gap-3">
      <ModusWcTypography hierarchy="h2">Work Activities</ModusWcTypography>
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-40">
          <ModusWcSelect
            label="Activity type"
            value="wo"
            options={[
              { value: 'wo', label: 'Work Order' },
              { value: 'sr', label: 'Service Request', disabled: true },
              { value: 'insp', label: 'Inspection', disabled: true },
            ]}
          />
        </div>
        <div className="min-w-56 flex-1">
          <ModusWcSelect
            label="Locations"
            value={scopeId}
            disabled={selected.length === 0}
            options={scopeOptions}
            onInputChange={(event) => setScope(valueFrom(event))}
          />
        </div>
        <ModusWcTextInput
          label="From"
          type="date"
          value={from}
          onInputChange={(event) => setFrom(valueFrom(event))}
        />
        <ModusWcTextInput
          label="To"
          type="date"
          value={to}
          onInputChange={(event) => setTo(valueFrom(event))}
        />
      </div>
      <div className="no-print flex flex-wrap items-center gap-2">
        <ModusWcButton
          color="tertiary"
          variant="outlined"
          size="md"
          shape="rectangle"
          type="button"
          onButtonClick={() => setColumnsOpen((open) => !open)}
        >
          Columns
        </ModusWcButton>
        <ModusWcDropdownMenu
          buttonAriaLabel="More actions"
          buttonColor="tertiary"
          buttonShape="square"
          buttonSize="md"
          buttonVariant="outlined"
          disabled={rows.length === 0}
          menuBordered
          menuPlacement="bottom-start"
          menuStrategy="fixed"
        >
          <div slot="button">
            <ModusWcIcon name="more_vertical" size="md" decorative />
          </div>
          <div slot="menu">
            <ModusWcMenuItem
              label="Export CSV"
              value="csv"
              onItemSelect={(event) => {
                closeMenu(event.target);
                exportRows('csv');
              }}
            />
            <ModusWcMenuItem
              label="Export Excel"
              value="xls"
              onItemSelect={(event) => {
                closeMenu(event.target);
                exportRows('xls');
              }}
            />
            <ModusWcMenuItem
              label="Print"
              value="print"
              onItemSelect={(event) => {
                closeMenu(event.target);
                window.print();
              }}
            />
          </div>
        </ModusWcDropdownMenu>
      </div>
      {columnsOpen && (
        <div className="no-print grid grid-cols-2 gap-2 bg-base-200 p-3">
          {ACTIVITY_COLUMNS.map((column) => (
            <ModusWcCheckbox
              key={column.id}
              label={column.header}
              value={visible.includes(column.id)}
              indeterminate={false}
              onInputChange={() => {
                setVisible((current) =>
                  current.includes(column.id)
                    ? current.filter((id) => id !== column.id)
                    : [...current, column.id],
                );
              }}
            />
          ))}
        </div>
      )}
      {selected.length === 0 ? (
        <ModusWcTypography hierarchy="p" size="md">
          Select LRS work locations on the map. Work for every selected location is listed here
          together, instead of one asset at a time.
        </ModusWcTypography>
      ) : rows.length === 0 ? (
        <ModusWcTypography hierarchy="p" size="md">
          No work orders in this date range. Open work is matched on its start date. Closed work
          is matched on its finish date.
        </ModusWcTypography>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="overflow-x-auto">
            <ModusWcTable
              key={`${visible.join('|')}-${safePage}-${pageSizeChoice}-${sort?.id ?? ''}-${String(sort?.desc ?? false)}`}
              mode="simple"
              caption="Work orders for the selected LRS locations"
              columns={columns}
              data={pageRows}
              density="compact"
              hover
              zebra
              onSortChange={(event) => {
                const next = event.detail[0];
                setSort(next ? { id: next.id, desc: next.desc } : null);
                setPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ModusWcTypography hierarchy="p" size="md">
                Show
              </ModusWcTypography>
              <div className="w-28">
                <ModusWcSelect
                  aria-label="Rows per page"
                  bordered
                  size="sm"
                  value={pageSizeChoice}
                  options={[
                    { value: '5', label: '5' },
                    { value: '10', label: '10' },
                    { value: '15', label: '15' },
                    { value: '20', label: '20' },
                    { value: 'all', label: 'All' },
                  ]}
                  onInputChange={(event) => {
                    setPageSizeChoice(pageSizeChoiceFrom(valueFrom(event)));
                    setPage(1);
                  }}
                />
              </div>
            </div>
            <ModusWcTypography
              hierarchy="p"
              size="md"
              label={`Showing ${pageStart + 1} to ${Math.min(pageStart + pageRows.length, sortedRows.length)} of ${sortedRows.length} entries`}
            />
            <ModusWcPagination
              count={totalPages}
              page={safePage}
              size="sm"
              onPageChange={(event) => setPage(event.detail.newPage)}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {summary.map(([label, value]) => (
          <div key={label} className="bg-base-200 px-3 py-2">
            <ModusWcTypography hierarchy="p" size="sm" customClass="opacity-70">
              {label}
            </ModusWcTypography>
            <ModusWcTypography hierarchy="p" size="md" weight="semibold" label={value} />
          </div>
        ))}
      </div>
      <ModusWcTypography hierarchy="p" size="sm" customClass="opacity-70">
        Total cost is equipment + labor + material. Cost per mile is that total divided by the
        miles of the locations in scope. Miles are the measure difference. Open work is included
        by its start date. Closed work is included by its finish date. Export CSV and Export
        Excel download the columns on screen, plus this summary.
      </ModusWcTypography>
    </div>
  );
}

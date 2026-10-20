import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlatMap, SHEET_COPY, type SheetId } from "@/components/plat-maps";
import { buildTodo, dayStamp, depositReminder, displayName, isRenterLot, LOTS, matches, matchesFilter, moveOutLot, mowChoice, parseDay, sheetOf, type Lot, type LotFilter, type LotStatus, type MaintJob } from "@/data/lots";

export const Route = createFileRoute("/")({ component: Home });

const STORAGE_KEY = "magnolia-lot-edits";

function loadLots(): Lot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return LOTS;
    const saved = JSON.parse(raw) as Lot[];
    const byId = new Map(saved.map((lot) => [lot.id, lot]));
    return LOTS.map((lot) => {
      const next = byId.get(lot.id);
      if (!next) return lot;
      const status: LotStatus =
        next.status === "Empty" || next.status === "Open" || next.status === "Eviction" ? next.status : "Occupied";
      return { ...lot, ...next, id: lot.id, status, bouncedCheck: next.bouncedCheck ?? "", maintenance: next.maintenance ?? "", dogs: next.dogs === "1" || next.dogs === "2" ? next.dogs : "", cats: next.cats === "1" || next.cats === "2" ? next.cats : "", wiring: next.wiring === "Yes" || next.wiring === "No" ? next.wiring : "", homeIns: next.homeIns === "Yes" || next.homeIns === "No" ? next.homeIns : "", homeInsDate: next.homeInsDate ?? "", readyPower: next.readyPower === "Yes" ? "Yes" : "", readyClean: next.readyClean === "Yes" ? "Yes" : "", readyInspected: next.readyInspected === "Yes" ? "Yes" : "", zillow: next.zillow === "Yes" || next.zillow === "No" ? next.zillow : "", zillowUrl: next.zillowUrl ?? "", homeYear: next.homeYear ?? "", homeMake: next.homeMake ?? "", homeModel: next.homeModel ?? "", homeWidth: next.homeWidth ?? "", homeLength: next.homeLength ?? "", homeWide: next.homeWide === "Single Wide" || next.homeWide === "Double Wide" ? next.homeWide : "", roofAge: next.roofAge ?? "", roofMaterial: next.roofMaterial ?? "", roofInstalled: next.roofInstalled ?? "", roofReplace: next.roofReplace === "Yes" || next.roofReplace === "No" ? next.roofReplace : "", acCleaning: next.acCleaning ?? "", acService: next.acService ?? "", inspectionDate: next.inspectionDate ?? "", inspectionNotes: next.inspectionNotes ?? "", moveIn: next.moveIn ?? "", rentDue: next.rentDue ?? "", deposit: next.deposit ?? "", balance: next.balance ?? "", noticeDate: next.noticeDate ?? "", noticeNote: next.noticeNote ?? "", photo: next.photo ?? "", lease: next.lease?.data ? next.lease : null, rulesReceipt: next.rulesReceipt?.data ? next.rulesReceipt : null, background: next.background?.data ? next.background : null, otherDocs: Array.isArray(next.otherDocs) ? next.otherDocs : [], leaseEnd: next.leaseEnd ?? "", emergencyName: next.emergencyName ?? "", emergencyPhone: next.emergencyPhone ?? "", courtDate: next.courtDate ?? "", courtNote: next.courtNote ?? "", waitName: next.waitName ?? "", waitPhone: next.waitPhone ?? "", history: Array.isArray(next.history) ? next.history : [], maintLog: Array.isArray(next.maintLog) ? next.maintLog : [], noticeFile: next.noticeFile?.data ? next.noticeFile : null };
    });
  } catch {
    return LOTS;
  }
}

function printMap(id: SheetId) {
  const root = document.getElementById(`map-${id}`) ?? document.querySelector(".map-stage");
  const svg = root?.querySelector("svg");
  if (!svg) return;
  const css = [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");
  const page = id === 3 ? "portrait" : "landscape";
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.open();
  win.document.write(`<!doctype html><html><head><title>${SHEET_COPY[id].title}</title><style>
    ${css}
    @page { size: ${page}; margin: 0.4in; }
    html, body { margin: 0; height: auto; background: white; }
    h1 { margin: 0 0 8px; font: 700 16px sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
    svg { width: 100% !important; height: auto !important; max-height: none !important; display: block; }
    * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  </style></head><body><h1>${SHEET_COPY[id].title}</h1></body></html>`);
  win.document.close();
  win.document.body.appendChild(win.document.importNode(svg, true));
  const go = () => {
    if (win.closed || win.document.body.dataset.printed === "1") return;
    win.document.body.dataset.printed = "1";
    win.focus();
    win.print();
  };
  win.onload = () => setTimeout(go, 200);
  setTimeout(go, 500);
}

function printMain() {
  const ids = [1, 2, 3] as const;
  const svgs = ids
    .map((id) => document.querySelector(`#map-${id} svg`))
    .filter((node): node is SVGSVGElement => node instanceof SVGSVGElement);
  if (svgs.length === 0) return;
  const css = [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.open();
  win.document.write(`<!doctype html><html><head><title>Main</title><style>
    ${css}
    @page land { size: landscape; margin: 0.4in; }
    @page port { size: portrait; margin: 0.4in; }
    html, body { margin: 0; height: auto; background: white; }
    h1 { margin: 0 0 8px; font: 700 16px sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
    section.land { page: land; break-after: page; }
    section.port { page: port; break-after: page; }
    svg { width: 100% !important; height: auto !important; max-height: none !important; display: block; }
    * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  </style></head><body></body></html>`);
  win.document.close();
  svgs.forEach((svg, index) => {
    const id = ids[index];
    const section = win.document.createElement("section");
    section.className = id === 3 ? "port" : "land";
    const heading = win.document.createElement("h1");
    heading.textContent = SHEET_COPY[id].title;
    section.append(heading, win.document.importNode(svg, true));
    win.document.body.appendChild(section);
  });
  const go = () => {
    if (win.closed || win.document.body.dataset.printed === "1") return;
    win.document.body.dataset.printed = "1";
    win.focus();
    win.print();
  };
  win.onload = () => setTimeout(go, 200);
  setTimeout(go, 500);
}

function escapeHtml(value: string) {
  const amp = "&" + "amp;";
  const lt = "&" + "lt;";
  const gt = "&" + "gt;";
  const quot = "&" + "quot;";
  const apos = "&" + "#39;";
  return value.replace(/&/g, amp).replace(/</g, lt).replace(/>/g, gt).replace(/"/g, quot).replace(/'/g, apos);
}

function prettyDate(value?: string) {
  const day = parseDay(value);
  const date = day ? new Date(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10))) : new Date();
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function printNotice(lot: Lot) {
  const win = window.open("", "_blank");
  if (!win) return;
  const file = lot.noticeFile?.data ?? "";
  const attached = file.startsWith("data:image/")
    ? `<img src="${file}" alt="Notice" />`
    : file.startsWith("data:application/pdf")
      ? `<iframe src="${file}" title="Notice"></iframe>`
      : "";
  win.document.open();
  win.document.write(`<!doctype html><html><head><title>Notice · Lot ${escapeHtml(lot.lot)}</title><style>
    @page { size: letter; margin: 0.75in; }
    body { margin: 0; color: #1c1916; font: 16px/1.45 Georgia, serif; }
    h1 { margin: 0 0 4px; font-size: 18px; letter-spacing: 0.08em; text-transform: uppercase; }
    .date { margin: 28px 0; }
    .who { margin: 0 0 28px; }
    h2 { margin: 0 0 12px; font-size: 16px; letter-spacing: 0.12em; text-transform: uppercase; }
    p { margin: 0 0 12px; white-space: pre-wrap; }
    img { display: block; max-width: 100%; margin-top: 24px; }
    iframe { width: 100%; height: 70vh; border: 0; margin-top: 24px; }
  </style></head><body>
    <h1>Magnolia Central of Florida Estates</h1>
    <p class="date">${escapeHtml(prettyDate(lot.noticeDate))}</p>
    <p class="who">${escapeHtml(displayName(lot))}<br>${escapeHtml(`${lot.address} ${lot.street}`.trim())}<br>Lot ${escapeHtml(lot.lot)}</p>
    <h2>Notice</h2>
    <p>${escapeHtml(lot.noticeNote?.trim() || "This notice is for the resident at the address above.")}</p>
    ${attached}
  </body></html>`);
  win.document.close();
  const go = () => {
    if (win.closed) return;
    win.focus();
    win.print();
  };
  win.onload = () => setTimeout(go, 250);
  setTimeout(go, 600);
}

const EXPORT_COLUMNS: { key: keyof Lot; label: string }[] = [
  { key: "lot", label: "Lot" },
  { key: "address", label: "Address" },
  { key: "street", label: "Street" },
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "renter", label: "Renter/Owner" },
  { key: "rent", label: "Rental Amount" },
  { key: "moveIn", label: "Move-in" },
  { key: "rentDue", label: "Rent due" },
  { key: "deposit", label: "Deposit" },
  { key: "balance", label: "Still owed" },
  { key: "noticeDate", label: "Notice date" },
  { key: "noticeNote", label: "Notice note" },
  { key: "issues", label: "Issues" },
  { key: "maintenance", label: "Maintenance" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "noMow", label: "MOW" },
  { key: "lateRent", label: "Late Rent" },
  { key: "bouncedCheck", label: "Bounced Check" },
  { key: "roofAge", label: "Roof age" },
  { key: "roofMaterial", label: "Roof material" },
  { key: "roofInstalled", label: "Roof installed" },
  { key: "roofReplace", label: "Roof needs replaced" },
  { key: "dogs", label: "Dogs" },
  { key: "cats", label: "Cats" },
  { key: "wiring", label: "Home wiring insurance" },
  { key: "homeIns", label: "Home insurance" },
  { key: "homeInsDate", label: "Insurance expires" },
  { key: "readyPower", label: "Power on" },
  { key: "readyClean", label: "Cleaned" },
  { key: "readyInspected", label: "Inspected" },
  { key: "zillow", label: "Listed on Zillow" },
  { key: "zillowUrl", label: "Zillow link" },
  { key: "homeYear", label: "Year" },
  { key: "homeMake", label: "Make" },
  { key: "homeModel", label: "Model" },
  { key: "homeWidth", label: "Width" },
  { key: "homeLength", label: "Length" },
  { key: "homeWide", label: "Single or double" },
];

function csvCell(value: string) {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function downloadRegister(lots: Lot[]) {
  const lines = [
    EXPORT_COLUMNS.map((col) => csvCell(col.label)).join(","),
    ...lots.map((lot) => EXPORT_COLUMNS.map((col) => csvCell(String(lot[col.key] ?? ""))).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "magnolia-register.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((line) => line.some((item) => item.trim()));
}

function importRegister(text: string, current: Lot[]) {
  const rows = parseCsv(text);
  if (rows.length < 2) return current;
  const header = rows[0].map((item) => item.trim().toLowerCase());
  const lotIndex = header.findIndex((item) => item === "lot");
  if (lotIndex < 0) return current;
  const keys = header.map((name) => EXPORT_COLUMNS.find((col) => col.label.toLowerCase() === name)?.key);
  const incoming = new Map<string, Partial<Lot>>();
  for (const line of rows.slice(1)) {
    const lotNo = line[lotIndex]?.trim();
    if (!lotNo) continue;
    const patch: Partial<Lot> = {};
    keys.forEach((key, index) => {
      if (!key || key === "id" || key === "lot") return;
      (patch as Record<string, string>)[key] = line[index] ?? "";
    });
    incoming.set(lotNo, patch);
  }
  return current.map((lot) => {
    const patch = incoming.get(lot.lot);
    if (!patch) return lot;
    const status: LotStatus =
      patch.status === "Empty" || patch.status === "Open" || patch.status === "Eviction" || patch.status === "Occupied"
        ? patch.status
        : lot.status;
    return { ...lot, ...patch, id: lot.id, lot: lot.lot, status, photo: lot.photo, lease: lot.lease, rulesReceipt: lot.rulesReceipt, background: lot.background, otherDocs: lot.otherDocs };
  });
}

function readAsData(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function fileToData(file: File) {
  if (file.type.startsWith("image/")) {
    const raw = await readAsData(file);
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const max = 720;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(raw);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => resolve(raw);
      img.src = raw;
    });
  }
  if (file.size > 1_200_000) return "";
  return readAsData(file);
}

function downloadEverything(lots: Lot[]) {
  const blob = new Blob([JSON.stringify({ saved: new Date().toISOString(), lots }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "magnolia-backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importEverything(text: string, current: Lot[]) {
  const parsed = JSON.parse(text) as { lots?: Lot[] } | Lot[];
  const incoming = Array.isArray(parsed) ? parsed : parsed.lots ?? [];
  const byId = new Map(incoming.map((lot) => [lot.id, lot]));
  return current.map((lot) => {
    const next = byId.get(lot.id);
    if (!next) return lot;
    const status: LotStatus =
      next.status === "Empty" || next.status === "Open" || next.status === "Eviction" ? next.status : "Occupied";
    return { ...lot, ...next, id: lot.id, lot: lot.lot, status };
  });
}

function lotNumberIn(text: string) {
  const match = text.match(/\blot\s*#?\s*(\d+(?:\.5)?)\b/i);
  return match?.[1] ?? "";
}

function lastToken(name: string) {
  const head = name.split(",")[0]?.trim() || name.trim();
  return head.split(/\s+/).pop()?.toLowerCase() ?? "";
}

function moneyText(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

function importFromQuickBooks(text: string, current: Lot[]) {
  const hits = parseQuickBooks(text);
  const used = new Set<string>();
  let updated = 0;
  let missed = 0;
  const next = current.map((lot) => ({ ...lot }));
  for (const hit of hits) {
    const lot = matchQuickBooksLot(next, hit);
    if (!lot || used.has(lot.id)) {
      missed += 1;
      continue;
    }
    used.add(lot.id);
    let changed = false;
    if (hit.phone && hit.phone !== lot.phone) {
      lot.phone = hit.phone;
      changed = true;
    }
    if (hit.email && hit.email !== lot.email) {
      lot.email = hit.email;
      changed = true;
    }
    if (hit.balance != null) {
      const shown = moneyText(hit.balance);
      if (shown !== (lot.balance ?? "")) {
        lot.balance = shown;
        changed = true;
      }
    } else if (hit.paid && hit.paid > 0) {
      const owed = Number(String(lot.balance ?? "").replace(/[$,]/g, ""));
      if (Number.isFinite(owed)) {
        lot.balance = moneyText(Math.max(0, owed - hit.paid));
        changed = true;
      }
    }
    if (changed) updated += 1;
  }
  return { lots: next, updated, missed };
}

type QbHit = { lotNo: string; name: string; phone: string; email: string; balance: number | null; paid: number };

function parseQuickBooks(text: string): QbHit[] {
  if (/(^|\n)!?(CUST|TRNS|ENDTRNS)\b/.test(text) && text.includes("\t")) return parseIif(text);
  return parseQuickBooksCsv(text);
}

function parseIif(text: string): QbHit[] {
  const byName = new Map<string, QbHit>();
  let headers: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cols = line.split("\t");
    if (line.startsWith("!")) {
      headers = cols.map((col) => col.replace(/^!/, "").toUpperCase());
      continue;
    }
    const rec: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (header) rec[header] = cols[index] ?? "";
    });
    const kind = (cols[0] ?? "").toUpperCase();
    if (kind === "CUST") {
      const name = rec.NAME || rec.COMPANYNAME || "";
      const hit = byName.get(name.toLowerCase()) ?? blankHit(name);
      hit.lotNo = hit.lotNo || lotNumberIn([name, rec.NOTE, rec.BADDR1, rec.BADDR2, rec.BADDR3].join(" "));
      hit.phone = hit.phone || rec.PHONE1 || rec.PHONE || "";
      hit.email = hit.email || rec.EMAIL || "";
      const balance = numberOrNull(rec.BALANCE || rec.OPENBALANCE || "");
      if (balance != null) hit.balance = balance;
      byName.set(name.toLowerCase(), hit);
    }
    if (kind === "TRNS" && (rec.TRNSTYPE || "").toUpperCase() === "PAYMENT") {
      const name = rec.NAME || "";
      const hit = byName.get(name.toLowerCase()) ?? blankHit(name);
      hit.lotNo = hit.lotNo || lotNumberIn(`${name} ${rec.MEMO ?? ""} ${rec.DOCNUM ?? ""}`);
      const paid = numberOrNull(rec.AMOUNT || "");
      if (paid != null) hit.paid += Math.abs(paid);
      byName.set(name.toLowerCase(), hit);
    }
  }
  return [...byName.values()].filter((hit) => hit.name || hit.lotNo);
}

function parseQuickBooksCsv(text: string): QbHit[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const col = (...names: string[]) => header.findIndex((cell) => names.some((name) => cell.includes(name)));
  const nameCol = col("customer", "name");
  const phoneCol = col("phone");
  const emailCol = col("email", "e-mail");
  const balanceCol = col("balance", "open balance", "amount due");
  const lotCol = col("lot");
  if (nameCol < 0 && lotCol < 0) return [];
  return rows.slice(1).map((row) => {
    const name = row[nameCol] ?? "";
    return {
      lotNo: lotNumberIn(`${row[lotCol] ?? ""} ${name}`),
      name,
      phone: phoneCol >= 0 ? row[phoneCol] ?? "" : "",
      email: emailCol >= 0 ? row[emailCol] ?? "" : "",
      balance: balanceCol >= 0 ? numberOrNull(row[balanceCol] ?? "") : null,
      paid: 0,
    };
  });
}

function blankHit(name: string): QbHit {
  return { lotNo: lotNumberIn(name), name, phone: "", email: "", balance: null, paid: 0 };
}

function numberOrNull(value: string) {
  const cleaned = value.replace(/[$,\s]/g, "");
  if (!cleaned || cleaned === "-") return null;
  const amount = Number(cleaned);
  return Number.isFinite(amount) ? amount : null;
}

function matchQuickBooksLot(lots: Lot[], hit: QbHit) {
  if (hit.lotNo) {
    const byLot = lots.find((lot) => lot.lot === hit.lotNo);
    if (byLot) return byLot;
  }
  const stripped = hit.name.replace(/^lot\s*\d+(?:\.5)?\s*[-–:]?\s*/i, "").trim();
  const token = lastToken(stripped);
  if (!token || token.length < 2) return undefined;
  const named = lots.filter((lot) => {
    const lotToken = lastToken(lot.name);
    return lotToken === token || lot.name.trim().toLowerCase() === stripped.toLowerCase();
  });
  return named.length === 1 ? named[0] : undefined;
}

function Home() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const backupRef = useRef<HTMLInputElement>(null);
  const quickBooksRef = useRef<HTMLInputElement>(null);
  const [sheet, setSheet] = useState<SheetId>(1);
  const [main, setMain] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LotFilter>("all");
  const [selected, setSelected] = useState<string | null>("1");
  const [view, setView] = useState<"map" | "register" | "todo">("map");
  const [homes, setHomes] = useState(false);
  const [mapsOpen, setMapsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [qbNote, setQbNote] = useState("");

  const [lots, setLots] = useState<Lot[]>(LOTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLots(loadLots());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lots));
  }, [lots, hydrated]);

  function saveLot(next: Lot) {
    setLots((prev) => prev.map((item) => (item.id === next.id ? next : item)));
  }

  const visible = useMemo(() => {
    return lots.filter((lot) => matchesFilter(lot, filter) && matches(lot, query));
  }, [lots, filter, query]);

  const sig = `${filter}|${query}`;
  const prevSig = useRef(sig);

  useEffect(() => {
    if (prevSig.current === sig) return;
    prevSig.current = sig;
    if (!query.trim() && filter === "all") return;
    if (visible.length === 1) {
      setSelected(visible[0].id);
      const next = sheetOf(visible[0].id);
      if (next) {
        setSheet(next);
        setView("map");
        setMain(false);
      } else {
        setView("register");
        setHomes(false);
      }
      return;
    }
    const sheets = new Set(visible.map((lot) => sheetOf(lot.id)).filter((n): n is SheetId => n != null));
    if (sheets.size === 1 && visible.length > 0 && visible.every((lot) => sheetOf(lot.id))) {
      setSheet([...sheets][0]);
      setView("map");
      setMain(false);
    }
  }, [sig, query, filter, visible]);

  const lot = lots.find((item) => item.id === selected) ?? null;
  const empty = lots.filter((item) => item.status === "Empty").length;
  const notes = lots.filter((item) => item.issues).length;
  const mapLabel = main ? "Main" : SHEET_COPY[sheet].title;
  const filterLabel = (
    [
      ["all", "All"],
      ["empty", "Empty"],
      ["occupied", "Occupied"],
      ["issues", "Issues"],
      ["renters", "Renters"],
      ["owners", "Owners"],
      ["no-owe", "NO-OWE"],
      ["due", "Due"],
      ["past-due", "Past due"],
      ["roof", "Needs roof"],
      ["pets", "Pets"],
      ["wiring", "Wiring"],
      ["lease-ending", "Lease ending"],
    ] as const
  ).find(([id]) => id === filter)?.[1] ?? "All";
  const narrowed = query.trim() !== "" || filter !== "all";

  useEffect(() => {
    if (!mapsOpen && !filtersOpen && !dataOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(".map-slot")) return;
      setMapsOpen(false);
      setFiltersOpen(false);
      setDataOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMapsOpen(false);
        setFiltersOpen(false);
        setDataOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [mapsOpen, filtersOpen, dataOpen]);

  return (
    <main className="app">
      <header className="top">
        <div>
          <p className="kicker">Site plan</p>
          <h1>Magnolia Central of Florida Estates</h1>
          <p className="stats">
            {lots.length} records · {empty} empty · {notes} with a note · names from the lot register
          </p>
        </div>
        <input
          className="search"
          value={query}
          placeholder="Lot, name, or address"
          aria-label="Search lots"
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      <div className="toolbar">
        <div className="tabs" role="tablist" aria-label="Sections">
          <div className="map-slot">
            <button
              className="tab"
              type="button"
              role="tab"
              aria-expanded={mapsOpen}
              aria-pressed={view === "map"}
              onClick={() => {
                if (view === "map") setMapsOpen((open) => !open);
                else {
                  setView("map");
                  setMapsOpen(true);
                }
                setFiltersOpen(false);
              }}
            >
              Maps · {mapLabel} ▾
            </button>
            {mapsOpen ? (
              <div className="map-drop" role="menu">
                {(
                  [
                    ["main", "Main"],
                    ["1", "Jaleen/Denise"],
                    ["2", "Denise/Leon"],
                    ["3", "Michelle/Kirkwood"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={id === "main" ? main : !main && String(sheet) === id}
                    onClick={() => {
                      setView("map");
                      if (id === "main") setMain(true);
                      else {
                        setMain(false);
                        setSheet(Number(id) as SheetId);
                      }
                      setMapsOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="map-slot">
            <button
              className="tab"
              type="button"
              role="tab"
              aria-expanded={filtersOpen}
              aria-pressed={filtersOpen || filter !== "all"}
              onClick={() => {
                setMapsOpen(false);
                if (view !== "map") {
                  setView("map");
                  setFiltersOpen(true);
                } else setFiltersOpen((open) => !open);
              }}
            >
              {filter === "all" ? "Filters ▾" : `Filters · ${filterLabel} ▾`}
            </button>
            {filtersOpen ? (
              <div className="map-drop" role="menu">
                {(
                  [
                    ["all", "All"],
                    ["empty", "Empty"],
                    ["occupied", "Occupied"],
                    ["issues", "Issues"],
                    ["renters", "Renters"],
                    ["owners", "Owners"],
                    ["no-owe", "NO-OWE"],
                    ["due", "Due"],
                    ["past-due", "Past due"],
                    ["roof", "Needs roof"],
                    ["pets", "Pets"],
                    ["wiring", "Wiring"],
                    ["lease-ending", "Lease ending"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={filter === id}
                    onClick={() => {
                      setFilter(id);
                      setView("map");
                      setFiltersOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          {(
            [
              ["register", "Register"],
              ["todo", "To-Do"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} className="tab" type="button" role="tab" aria-pressed={view === id} onClick={() => { setMapsOpen(false); setFiltersOpen(false); setDataOpen(false); setView(id); }}>
              {label}
            </button>
          ))}
        </div>
        {narrowed ? (
          <div className="active-strip">
            <span>
              Showing {visible.length} of {lots.length}
              {filter !== "all" ? ` · ${filterLabel}` : ""}
              {query.trim() ? ` · “${query.trim()}”` : ""}
            </span>
            <button
              className="strip-clear"
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Clear
            </button>
          </div>
        ) : null}
        {view === "map" ? (
          <div className="legend">
              <span>
                <i className="swatch" /> Occupied
              </span>
              <span>
                <i className="swatch empty" /> Empty
              </span>
              <span>
                <i className="swatch open" /> Office
              </span>
              <span>
                <i className="swatch notes" /> Issues
              </span>
              <span>
                <i className="swatch mow-flag" aria-hidden="true" /> Mow
              </span>
              <span>
                <i className="swatch late" /> Late rent
              </span>
              <span>
                <i className="swatch leak" /> Leak
              </span>
              <span>
                <i className="swatch roof" /> Needs roof
              </span>
              <span>
                <i className="swatch maint" /> Maintenance
              </span>
              <span>
                <i className="swatch eviction" /> Eviction
              </span>
            </div>
        ) : null}
        {view === "register" ? (
          <div className="data-actions">
            <div className="seg">
              <button className="filter" type="button" aria-pressed={!homes} onClick={() => setHomes(false)}>
                Lots
              </button>
              <button className="filter" type="button" aria-pressed={homes} onClick={() => setHomes(true)}>
                Homes
              </button>
            </div>
            <div className="map-slot">
              <button className="filter" type="button" aria-expanded={dataOpen} onClick={() => setDataOpen((open) => !open)}>
                Data ▾
              </button>
              {dataOpen ? (
                <div className="map-drop data-drop">
                  <button type="button" onClick={() => { downloadRegister(lots); setDataOpen(false); }}>Download register</button>
                  <button type="button" onClick={() => { uploadRef.current?.click(); setDataOpen(false); }}>Upload register</button>
                  <button type="button" onClick={() => { downloadEverything(lots); setDataOpen(false); }}>Download everything</button>
                  <button type="button" onClick={() => { backupRef.current?.click(); setDataOpen(false); }}>Upload everything</button>
                  <button type="button" onClick={() => { quickBooksRef.current?.click(); setDataOpen(false); }}>Import from QuickBooks</button>
                </div>
              ) : null}
            </div>
            {qbNote ? <p className="qb-note">{qbNote}</p> : null}
          </div>
        ) : null}
        <input
          ref={backupRef}
          hidden
          type="file"
          accept=".json,application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const text = await file.text();
            setLots((prev) => importEverything(text, prev));
          }}
        />
        <input
          ref={uploadRef}
          hidden
          type="file"
          accept=".csv,text/csv"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const text = await file.text();
            setLots((prev) => importRegister(text, prev));
          }}
        />
        <input
          ref={quickBooksRef}
          hidden
          type="file"
          accept=".iif,.csv,.txt,text/plain,text/csv"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            const result = importFromQuickBooks(await file.text(), lots);
            setLots(result.lots);
            setQbNote(
              result.updated
                ? `QuickBooks updated ${result.updated} lot${result.updated === 1 ? "" : "s"}${result.missed ? `. ${result.missed} names did not match a lot` : ""}.`
                : result.missed
                  ? "No lots matched. In QuickBooks 2020 use File, Utilities, Export, Lists to IIF Files, and put the lot number in the customer name."
                  : "That file did not have any customer rows.",
            );
          }}
        />
      </div>
      <div className="stage">
        <section className="map-frame">
          {view === "register" && homes ? (
            <table className="register">
              <thead>
                <tr>
                  {HOME_COLUMNS.map((col) => (
                    <th key={col.label}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((item) => {
                  const hit = visible.includes(item);
                  return (
                    <tr key={item.id} data-hit={hit} aria-selected={selected === item.id} onClick={() => setSelected(item.id)}>
                      {HOME_COLUMNS.map((col) => (
                        <RegisterCell key={col.label} item={item} col={col} onSave={saveLot} />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : view === "todo" ? (
            <TodoBoard
              lots={lots}
              onOpen={(id) => {
                setSelected(id);
                setView("map");
                setHomes(false);
                setMain(true);
              }}
            />
          ) : view === "register" ? (
            <table className="register">
              <thead>
                <tr>
                  {REGISTER_COLUMNS.map((col) => (
                    <th key={col.label}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((item) => {
                  const hit = visible.includes(item);
                  return (
                    <tr
                      key={item.id}
                      data-hit={hit}
                      aria-selected={selected === item.id}
                      onClick={() => setSelected(item.id)}
                    >
                      {REGISTER_COLUMNS.map((col) => (
                        <RegisterCell key={col.label} item={item} col={col} onSave={saveLot} />
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : main ? (
            <div className="map-stack">
              <div className="main-print">
                <button className="print-map" type="button" onClick={printMain}>
                  Print map
                </button>
              </div>
              {([1, 2, 3] as const).map((id) => (
                <section key={id} id={`map-${id}`} className="map-block">
                  <h2>{SHEET_COPY[id].title}</h2>
                  <PlatMap sheet={id} query={query} filter={filter} selected={selected} lots={lots} onSelect={setSelected} />
                </section>
              ))}
            </div>
          ) : (
            <>
              <p className="sheet-note">{SHEET_COPY[sheet].note}</p>
              <button className="print-map corner" type="button" onClick={() => printMap(sheet)}>
                Print map
              </button>
              <div className="map-stage">
                <div className="map-scaler">
                  <PlatMap sheet={sheet} query={query} filter={filter} selected={selected} lots={lots} onSelect={setSelected} />
                </div>
              </div>
              <button
                className="map-nav prev"
                type="button"
                aria-label="Previous map"
                onClick={() => setSheet(sheet === 1 ? 3 : ((sheet - 1) as SheetId))}
              >
                ‹
              </button>
              <button
                className="map-nav next"
                type="button"
                aria-label="Next map"
                onClick={() => setSheet(sheet === 3 ? 1 : ((sheet + 1) as SheetId))}
              >
                ›
              </button>
            </>
          )}
        </section>
        <LotPanel
          lot={lot}
          onSave={(next) => setLots((prev) => prev.map((item) => (item.id === next.id ? next : item)))}
        />
      </div>
    </main>
  );
}

type RegisterCol =
  | { label: string; kind: "field"; field: keyof Lot }
  | { label: string; kind: "check"; field: "fridge" | "stove" | "washer" | "dryer" | "microwave" }
  | { label: string; kind: "homeIns" }
  | { label: string; kind: "homeInsDate" }
  | { label: string; kind: "emptyCheck"; field: "readyPower" | "readyClean" | "readyInspected" }
  | { label: string; kind: "zillow" }
  | { label: string; kind: "zillowUrl" }
  | { label: string; kind: "homeWide" };

const REGISTER_COLUMNS: RegisterCol[] = [
  { label: "Lot", kind: "field", field: "lot" },
  { label: "Address", kind: "field", field: "address" },
  { label: "Street", kind: "field", field: "street" },
  { label: "Name(s)", kind: "field", field: "name" },
  { label: "First name", kind: "first" },
  { label: "Last name", kind: "last" },
  { label: "Issues", kind: "field", field: "issues" },
  { label: "Status", kind: "status" },
  { label: "Maintenance", kind: "field", field: "maintenance" },
  { label: "Renter/Owner", kind: "field", field: "renter" },
  { label: "Rental Amount", kind: "field", field: "rent" },
  { label: "Move-in", kind: "field", field: "moveIn" },
  { label: "Rent due", kind: "field", field: "rentDue" },
  { label: "Deposit", kind: "field", field: "deposit" },
  { label: "Balance", kind: "field", field: "balance" },
  { label: "Notice date", kind: "field", field: "noticeDate" },
  { label: "Notice note", kind: "field", field: "noticeNote" },
  { label: "Lease end", kind: "field", field: "leaseEnd" },
  { label: "Emergency name", kind: "field", field: "emergencyName" },
  { label: "Emergency phone", kind: "field", field: "emergencyPhone" },
  { label: "Court date", kind: "field", field: "courtDate" },
  { label: "Court note", kind: "field", field: "courtNote" },
  { label: "Waiting name", kind: "field", field: "waitName" },
  { label: "Waiting phone", kind: "field", field: "waitPhone" },
  { label: "Key", kind: "field", field: "key" },
  { label: "Phone Number", kind: "field", field: "phone" },
  { label: "Email", kind: "field", field: "email" },
  { label: "MOW", kind: "mow" },
  { label: "Late Rent", kind: "field", field: "lateRent" },
  { label: "Bounced Check", kind: "field", field: "bouncedCheck" },
  { label: "Guest", kind: "field", field: "guest" },
  { label: "Vehicle", kind: "field", field: "vehicle" },
  { label: "A/C Filter", kind: "field", field: "acFilter" },
  { label: "A/C Cleaning", kind: "field", field: "acCleaning" },
  { label: "A/C Service", kind: "field", field: "acService" },
  { label: "Roof age", kind: "field", field: "roofAge" },
  { label: "Roof material", kind: "field", field: "roofMaterial" },
  { label: "Roof installed", kind: "field", field: "roofInstalled" },
  { label: "Roof needs replaced", kind: "roofReplace" },
  { label: "Exterior Pressure Wash", kind: "field", field: "pressureWash" },
  { label: "Violations", kind: "field", field: "violations" },
  { label: "Refrigerator", kind: "check", field: "fridge" },
  { label: "Stove", kind: "check", field: "stove" },
  { label: "Washer", kind: "check", field: "washer" },
  { label: "Dryer", kind: "check", field: "dryer" },
  { label: "Microwave", kind: "check", field: "microwave" },
  { label: "Dogs", kind: "dogs" },
  { label: "Cats", kind: "cats" },
  { label: "Home wiring insurance", kind: "wiring" },
  { label: "Home insurance", kind: "homeIns" },
  { label: "Insurance expires", kind: "homeInsDate" },
  { label: "Power on", kind: "emptyCheck", field: "readyPower" },
  { label: "Cleaned", kind: "emptyCheck", field: "readyClean" },
  { label: "Inspected", kind: "emptyCheck", field: "readyInspected" },
  { label: "Listed on Zillow", kind: "zillow" },
  { label: "Zillow link", kind: "zillowUrl" },
  { label: "Year", kind: "field", field: "homeYear" },
  { label: "Make", kind: "field", field: "homeMake" },
  { label: "Model", kind: "field", field: "homeModel" },
  { label: "Width", kind: "field", field: "homeWidth" },
  { label: "Length", kind: "field", field: "homeLength" },
  { label: "Single or double", kind: "homeWide" },
  { label: "Inspection date", kind: "field", field: "inspectionDate" },
  { label: "Inspection notes", kind: "field", field: "inspectionNotes" },
];

const HOME_COLUMNS: RegisterCol[] = [
  { label: "Lot", kind: "field", field: "lot" },
  { label: "Address", kind: "field", field: "address" },
  { label: "Street", kind: "field", field: "street" },
  { label: "Name(s)", kind: "field", field: "name" },
  { label: "Year", kind: "field", field: "homeYear" },
  { label: "Make", kind: "field", field: "homeMake" },
  { label: "Model", kind: "field", field: "homeModel" },
  { label: "Width", kind: "field", field: "homeWidth" },
  { label: "Length", kind: "field", field: "homeLength" },
  { label: "Single or double", kind: "homeWide" },
];

function RegisterCell({ item, col, onSave }: { item: Lot; col: RegisterCol; onSave: (next: Lot) => void }) {
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();
  if (col.kind === "check") {
    const raw = String(item[col.field] ?? "").trim().toLowerCase();
    const on = raw !== "" && raw !== "no";
    return (
      <td onClick={stop}>
        <input
          type="checkbox"
          checked={on}
          onChange={(e) => onSave({ ...item, [col.field]: e.target.checked ? "Yes" : "" })}
        />
      </td>
    );
  }
  if (col.kind === "status") {
    return (
      <td onClick={stop}>
        <select
          className="cell-edit"
          value={item.status}
          onChange={(e) => {
            const status: LotStatus =
              e.target.value === "Empty" || e.target.value === "Open" || e.target.value === "Eviction"
                ? e.target.value
                : "Occupied";
            onSave({ ...item, status });
          }}
        >
          <option>Occupied</option>
          <option>Empty</option>
          <option>Open</option>
          <option>Eviction</option>
        </select>
      </td>
    );
  }
  if (col.kind === "mow") {
    return (
      <td onClick={stop}>
        <select
          className="cell-edit"
          value={mowChoice(item.noMow)}
          onChange={(e) => onSave({ ...item, noMow: e.target.value })}
        >
          <option>NO-OWE</option>
          <option>Yes</option>
        </select>
      </td>
    );
  }
  if (col.kind === "roofReplace") {
    const value = item.roofReplace === "Yes" || item.roofReplace === "No" ? item.roofReplace : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, roofReplace: e.target.value })}>
          <option value="">—</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </td>
    );
  }
  if (col.kind === "wiring") {
    const value = item.wiring === "Yes" || item.wiring === "No" ? item.wiring : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, wiring: e.target.value })}>
          <option value="">—</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </td>
    );
  }
  if (col.kind === "homeIns" || col.kind === "homeInsDate") {
    if (!isRenterLot(item)) return <td onClick={stop}>—</td>;
    if (col.kind === "homeInsDate") {
      return (
        <td onClick={stop}>
          <input
            className="cell-edit"
            type="date"
            value={item.homeInsDate ?? ""}
            onChange={(e) => onSave({ ...item, homeInsDate: e.target.value })}
          />
        </td>
      );
    }
    const value = item.homeIns === "Yes" || item.homeIns === "No" ? item.homeIns : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, homeIns: e.target.value })}>
          <option value="">—</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </td>
    );
  }
  if (col.kind === "emptyCheck" || col.kind === "zillow" || col.kind === "zillowUrl") {
    if (item.status !== "Empty") return <td onClick={stop}>—</td>;
    if (col.kind === "emptyCheck") {
      const on = item[col.field] === "Yes";
      return (
        <td onClick={stop}>
          <input type="checkbox" checked={on} onChange={(e) => onSave({ ...item, [col.field]: e.target.checked ? "Yes" : "" })} />
        </td>
      );
    }
    if (col.kind === "zillow") {
      const value = item.zillow === "Yes" || item.zillow === "No" ? item.zillow : "";
      return (
        <td onClick={stop}>
          <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, zillow: e.target.value })}>
            <option value="">—</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </td>
      );
    }
    return (
      <td onClick={stop}>
        <input className="cell-edit" value={item.zillowUrl ?? ""} onChange={(e) => onSave({ ...item, zillowUrl: e.target.value })} />
      </td>
    );
  }
  if (col.kind === "dogs" || col.kind === "cats") {
    const value = item[col.kind] === "1" || item[col.kind] === "2" ? item[col.kind] : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, [col.kind]: e.target.value })}>
          <option value="">—</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </td>
    );
  }
  if (col.kind === "first" || col.kind === "last") {
    const parts = nameParts(item.name);
    const value = col.kind === "first" ? parts.first : parts.last;
    return (
      <td onClick={stop}>
        <input
          className="cell-edit"
          value={value}
          onChange={(e) =>
            onSave({
              ...item,
              name: col.kind === "first" ? joinName(parts.last, e.target.value) : joinName(e.target.value, parts.first),
            })
          }
        />
      </td>
    );
  }
  if (col.kind === "homeWide") {
    const value = item.homeWide === "Single Wide" || item.homeWide === "Double Wide" ? item.homeWide : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, homeWide: e.target.value })}>
          <option value="">—</option>
          <option>Single Wide</option>
          <option>Double Wide</option>
        </select>
      </td>
    );
  }
  if (col.kind === "field" && col.field === "renter") {
    const value = ["Renter", "Owner", "Rent-to-Own"].includes(item.renter) ? item.renter : "";
    return (
      <td onClick={stop}>
        <select className="cell-edit" value={value} onChange={(e) => onSave({ ...item, renter: e.target.value })}>
          <option value="">—</option>
          <option>Renter</option>
          <option>Owner</option>
          <option>Rent-to-Own</option>
        </select>
      </td>
    );
  }
  return (
    <td onClick={stop}>
      <input
        className="cell-edit"
        value={String(item[col.field] ?? "")}
        onChange={(e) => onSave({ ...item, [col.field]: e.target.value })}
      />
    </td>
  );
}

function EditableCell({
  item,
  field,
  cell,
  setCell,
  onSave,
  display,
}: {
  item: Lot;
  field: keyof Lot;
  cell: { id: string; field: keyof Lot } | null;
  setCell: (next: { id: string; field: keyof Lot } | null) => void;
  onSave: (next: Lot) => void;
  display?: string;
}) {
  const active = cell?.id === item.id && cell.field === field;
  const raw = item[field];
  if (active && field === "status") {
    return (
      <td>
        <select
          className="cell-edit"
          autoFocus
          defaultValue={raw}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => {
            const status: LotStatus =
              e.target.value === "Empty" || e.target.value === "Open" || e.target.value === "Eviction"
                ? e.target.value
                : "Occupied";
            onSave({ ...item, status });
            setCell(null);
          }}
          onChange={(e) => {
            const status: LotStatus =
              e.target.value === "Empty" || e.target.value === "Open" || e.target.value === "Eviction"
                ? e.target.value
                : "Occupied";
            onSave({ ...item, status });
            setCell(null);
          }}
        >
          <option>Occupied</option>
          <option>Empty</option>
          <option>Open</option>
          <option>Eviction</option>
        </select>
      </td>
    );
  }
  if (active) {
    return (
      <td>
        <input
          className="cell-edit"
          autoFocus
          defaultValue={raw}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => {
            onSave({ ...item, [field]: e.target.value });
            setCell(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setCell(null);
          }}
        />
      </td>
    );
  }
  const text = (display ?? raw).trim();
  return (
    <td
      onClick={(e) => {
        e.stopPropagation();
        setCell({ id: item.id, field });
      }}
    >
      {text || "—"}
    </td>
  );
}

function nameParts(name: string): { first: string; last: string } {
  const raw = name.trim();
  if (!raw) return { first: "", last: "" };
  const comma = raw.indexOf(",");
  if (comma >= 0) return { last: raw.slice(0, comma).trim(), first: raw.slice(comma + 1).trim() };
  return { first: "", last: raw };
}

function joinName(last: string, first: string) {
  const l = last.trim();
  const f = first.trim();
  if (l && f) return `${l}, ${f}`;
  return l || f;
}

function LotPanel({ lot, onSave }: { lot: Lot | null; onSave: (next: Lot) => void }) {
  const [tab, setTab] = useState<"personal" | "home" | "rent" | "notes">("personal");

  useEffect(() => {
    setTab("personal");
  }, [lot?.id]);

  if (!lot) {
    return (
      <aside className="panel">
        <p className="quiet">Select a lot on the map.</p>
      </aside>
    );
  }
  const where = sheetOf(lot.id);
  const save = (next: Partial<Lot>) => onSave({ ...lot, ...next });
  return (
    <aside className="panel">
      <p className="quiet sheet-where">{where ? `Map ${where}` : "Register only"}</p>
      <div className="lot-head">
        <label className="head-name">
          <span>Name</span>
          <textarea rows={2} value={lot.name} onChange={(e) => save({ name: e.target.value })} />
        </label>
        <NameSplit name={lot.name} onChange={(name) => save({ name })} />
        <div className="head-address">
          <label>
            <span>Address</span>
            <input value={lot.address} onChange={(e) => save({ address: e.target.value })} />
          </label>
          <label>
            <span>Street</span>
            <input value={lot.street} onChange={(e) => save({ street: e.target.value })} />
          </label>
        </div>
        <label className="head-lot">
          <span>Lot</span>
          <input value={lot.lot} onChange={(e) => save({ lot: e.target.value })} />
        </label>
        <label className="head-status">
          <span>Status</span>
          <span className={`status-dot status-${lot.status.toLowerCase()}`} aria-hidden="true" />
          <select value={lot.status} onChange={(e) => save({ status: e.target.value as LotStatus })}>
            <option value="Occupied">Occupied</option>
            <option value="Empty">Empty</option>
            <option value="Open">Office</option>
            <option value="Eviction">Eviction</option>
          </select>
        </label>
      </div>
      <div className="detail-tabs" role="tablist">
        {(
          [
            ["personal", "Personal"],
            ["home", "Home"],
            ["rent", "Rent"],
            ["notes", "Notes"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-pressed={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === "personal" ? (
        <>
          <div className="pet-block">
            <p className="pet-title">People</p>
            <div className="pet-row">
              <label>
                <span>Phone</span>
                <input value={lot.phone} onChange={(e) => save({ phone: e.target.value })} />
              </label>
              <label>
                <span>Email</span>
                <input value={lot.email} onChange={(e) => save({ email: e.target.value })} />
              </label>
            </div>
            <div className="pet-row">
              <label>
                <span>Renter / owner</span>
                <select
                  className="mow-select"
                  value={["Renter", "Owner", "Rent-to-Own"].includes(lot.renter) ? lot.renter : ""}
                  onChange={(e) => save({ renter: e.target.value })}
                >
                  <option value="">—</option>
                  <option>Renter</option>
                  <option>Owner</option>
                  <option>Rent-to-Own</option>
                </select>
              </label>
              <label>
                <span>Key</span>
                <input value={lot.key} onChange={(e) => save({ key: e.target.value })} />
              </label>
            </div>
            <div className="pet-row">
              <label>
                <span>Guest</span>
                <input value={lot.guest} onChange={(e) => save({ guest: e.target.value })} />
              </label>
              <label>
                <span>Vehicle</span>
                <input value={lot.vehicle} onChange={(e) => save({ vehicle: e.target.value })} />
              </label>
            </div>
            <p className="pet-title">Pets</p>
            <PetSelects dogs={lot.dogs ?? ""} cats={lot.cats ?? ""} onChange={save} />
          </div>
          <LotExtras values={lot} part="personal" onChange={save} />
        </>
      ) : null}
      {tab === "home" ? (
        <>
          <HomeDetails lot={lot} onChange={save} />
          <LotExtras values={lot} part="home" onChange={save} />
          <div className="pet-block">
            <p className="pet-title">Insurance</p>
            <label className="wiring-field">
              <span>Home wiring insurance</span>
              <select
                className="mow-select"
                value={lot.wiring === "Yes" || lot.wiring === "No" ? lot.wiring : ""}
                onChange={(e) => save({ wiring: e.target.value })}
              >
                <option value="">—</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <HomeInsuranceFields lot={lot} onChange={save} />
            <label className="wiring-field">
              <span>Mow</span>
              <select className="mow-select" value={mowChoice(lot.noMow)} onChange={(e) => save({ noMow: e.target.value })}>
                <option>NO-OWE</option>
                <option>Yes</option>
              </select>
            </label>
          </div>
        </>
      ) : null}
      {tab === "rent" ? (
        <>
          <div className="pet-block">
            <p className="pet-title">Rent</p>
            <div className="pet-row">
              <label>
                <span>Amount</span>
                <input value={lot.rent} onChange={(e) => save({ rent: e.target.value })} />
              </label>
              <label>
                <span>Late rent</span>
                <input value={lot.lateRent} onChange={(e) => save({ lateRent: e.target.value })} />
              </label>
            </div>
            <label className="wiring-field">
              <span>Bounced check</span>
              <input value={lot.bouncedCheck ?? ""} onChange={(e) => save({ bouncedCheck: e.target.value })} />
            </label>
          </div>
          <LotExtras values={lot} part="rent" onChange={save} onMoveOut={() => onSave(moveOutLot(lot))} />
        </>
      ) : null}
      {tab === "notes" ? (
        <>
          <div className="pet-block">
            <p className="pet-title">Issues</p>
            <label className="wiring-field">
              <span>Note</span>
              <textarea rows={4} value={lot.issues} onChange={(e) => save({ issues: e.target.value })} />
            </label>
            <label className="wiring-field">
              <span>Maintenance</span>
              <input value={lot.maintenance ?? ""} placeholder="Leak" onChange={(e) => save({ maintenance: e.target.value })} />
            </label>
            <label className="wiring-field">
              <span>Pressure wash</span>
              <input value={lot.pressureWash} onChange={(e) => save({ pressureWash: e.target.value })} />
            </label>
            <label className="wiring-field">
              <span>Violations</span>
              <textarea rows={3} value={lot.violations} onChange={(e) => save({ violations: e.target.value })} />
            </label>
          </div>
          <EmptyLotChecklist lot={lot} onChange={save} />
          <LotExtras values={lot} part="notes" onChange={save} />
        </>
      ) : null}
    </aside>
  );
}

function HomeDetails({ lot, onChange }: { lot: Lot; onChange: (next: Partial<Lot>) => void }) {
  const wide = lot.homeWide === "Single Wide" || lot.homeWide === "Double Wide" ? lot.homeWide : "";
  return (
    <div className="pet-block">
      <p className="pet-title">Home details</p>
      <div className="pet-row">
        <label>
          <span>Year</span>
          <input value={lot.homeYear ?? ""} onChange={(e) => onChange({ homeYear: e.target.value })} />
        </label>
        <label>
          <span>Make</span>
          <input value={lot.homeMake ?? ""} onChange={(e) => onChange({ homeMake: e.target.value })} />
        </label>
      </div>
      <label className="wiring-field">
        <span>Model</span>
        <input value={lot.homeModel ?? ""} onChange={(e) => onChange({ homeModel: e.target.value })} />
      </label>
      <div className="pet-row">
        <label>
          <span>Width</span>
          <input value={lot.homeWidth ?? ""} onChange={(e) => onChange({ homeWidth: e.target.value })} />
        </label>
        <label>
          <span>Length</span>
          <input value={lot.homeLength ?? ""} onChange={(e) => onChange({ homeLength: e.target.value })} />
        </label>
      </div>
      <label className="wiring-field">
        <span>Type</span>
        <select className="mow-select" value={wide} onChange={(e) => onChange({ homeWide: e.target.value })}>
          <option value="">—</option>
          <option>Single Wide</option>
          <option>Double Wide</option>
        </select>
      </label>
    </div>
  );
}

function listingHref(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function EmptyLotChecklist({ lot, onChange }: { lot: Lot; onChange: (next: Partial<Lot>) => void }) {
  if (lot.status !== "Empty") return null;
  const href = listingHref(lot.zillowUrl ?? "");
  const checks = [
    ["readyPower", "Power on"],
    ["readyClean", "Cleaned"],
    ["readyInspected", "Inspected"],
  ] as const;
  return (
    <div className="pet-block">
      <p className="pet-title">Empty lot</p>
      <ul className="inventory">
        {checks.map(([key, label]) => (
          <li key={key}>
            <label>
              <input
                type="checkbox"
                checked={lot[key] === "Yes"}
                onChange={(e) => onChange({ [key]: e.target.checked ? "Yes" : "" })}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
      <label className="wiring-field">
        <span>Listed on Zillow</span>
        <select
          className="mow-select"
          value={lot.zillow === "Yes" || lot.zillow === "No" ? lot.zillow : ""}
          onChange={(e) => onChange({ zillow: e.target.value })}
        >
          <option value="">—</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
      <label className="wiring-field">
        <span>Listing link</span>
        <input value={lot.zillowUrl ?? ""} placeholder="https://www.zillow.com/..." onChange={(e) => onChange({ zillowUrl: e.target.value })} />
      </label>
      <a className={`filter listing-link${href ? "" : " is-off"}`} href={href || undefined} target="_blank" rel="noreferrer">
        Open listing
      </a>
    </div>
  );
}

function HomeInsuranceFields({ lot, onChange }: { lot: Lot; onChange: (next: Partial<Lot>) => void }) {
  if (!isRenterLot(lot)) return null;
  const value = lot.homeIns === "Yes" || lot.homeIns === "No" ? lot.homeIns : "";
  return (
    <>
      <label className="wiring-field">
        <span>Home insurance</span>
        <select className="mow-select" value={value} onChange={(e) => onChange({ homeIns: e.target.value })}>
          <option value="">—</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
      <label className="wiring-field">
        <span>Expires</span>
        <input type="date" value={lot.homeInsDate ?? ""} onChange={(e) => onChange({ homeInsDate: e.target.value })} />
      </label>
    </>
  );
}

function updateJob(jobs: MaintJob[] | undefined, id: string, patch: Partial<MaintJob>) {
  return (jobs ?? []).map((job) => (job.id === id ? { ...job, ...patch } : job));
}

function TodoBoard({ lots, onOpen }: { lots: Lot[]; onOpen: (id: string) => void }) {
  const { today, week } = buildTodo(lots);
  return (
    <div className="todo">
      <section>
        <h2>Today</h2>
        <TodoList items={today} onOpen={onOpen} empty="Nothing due today." />
      </section>
      <section>
        <h2>This week</h2>
        <TodoList items={week} onOpen={onOpen} empty="Nothing else this week." />
      </section>
    </div>
  );
}

function TodoList({
  items,
  onOpen,
  empty,
}: {
  items: { id: string; lot: string; name: string; text: string }[];
  onOpen: (id: string) => void;
  empty: string;
}) {
  if (items.length === 0) return <p className="todo-empty">{empty}</p>;
  return (
    <ul>
      {items.map((item, index) => (
        <li key={`${item.id}-${item.text}-${index}`}>
          <button type="button" onClick={() => onOpen(item.id)}>
            <strong>Lot {item.lot}</strong>
            <span>{item.name}</span>
            <em>{item.text}</em>
          </button>
        </li>
      ))}
    </ul>
  );
}

function FileSlot({
  label,
  file,
  onChange,
}: {
  label: string;
  file?: { name: string; data: string } | null;
  onChange: (next: { name: string; data: string } | null) => void;
}) {
  return (
    <div className="doc-slot">
      <span>{label}</span>
      {file?.data ? (
        <div className="doc-file">
          <a href={file.data} download={file.name}>
            {file.name}
          </a>
          <button className="doc-remove" type="button" onClick={() => onChange(null)}>
            Remove
          </button>
        </div>
      ) : (
        <input
          type="file"
          onChange={async (e) => {
            const picked = e.target.files?.[0];
            e.target.value = "";
            if (!picked) return;
            const data = await fileToData(picked);
            if (!data) return;
            onChange({ name: picked.name, data });
          }}
        />
      )}
    </div>
  );
}

function LotExtras({
  values,
  onChange,
  onMoveOut,
  part,
}: {
  values: Lot;
  onChange: (next: Partial<Lot>) => void;
  onMoveOut?: () => void;
  part: "personal" | "home" | "rent" | "notes";
}) {
  const yn = (value?: string) => (value === "Yes" || value === "No" ? value : "");
  const [noticeOpen, setNoticeOpen] = useState(false);
  return (
    <>
      {part === "home" ? (
      <>
      <div className="pet-block">
        <p className="pet-title">Roof</p>
        <div className="pet-row">
          <label>
            <span>Age</span>
            <input value={values.roofAge ?? ""} onChange={(e) => onChange({ roofAge: e.target.value })} />
          </label>
          <label>
            <span>Material</span>
            <input value={values.roofMaterial ?? ""} onChange={(e) => onChange({ roofMaterial: e.target.value })} />
          </label>
        </div>
        <div className="pet-row">
          <label>
            <span>Date installed</span>
            <input value={values.roofInstalled ?? ""} onChange={(e) => onChange({ roofInstalled: e.target.value })} />
          </label>
          <label>
            <span>Needs replaced</span>
            <select className="mow-select" value={yn(values.roofReplace)} onChange={(e) => onChange({ roofReplace: e.target.value })}>
              <option value="">—</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
        </div>
      </div>
      <div className="pet-block">
        <p className="pet-title">AC</p>
        <div className="pet-row">
          <label>
            <span>Cleaning</span>
            <input value={values.acCleaning ?? ""} onChange={(e) => onChange({ acCleaning: e.target.value })} />
          </label>
          <label>
            <span>Service</span>
            <input value={values.acService ?? ""} onChange={(e) => onChange({ acService: e.target.value })} />
          </label>
        </div>
        <label className="wiring-field">
          <span>Filter</span>
          <input value={values.acFilter ?? ""} onChange={(e) => onChange({ acFilter: e.target.value })} />
        </label>
      </div>
      <div className="pet-block">
        <p className="pet-title">Home inventory</p>
        <ul className="inventory">
          {(
            [
              ["fridge", "Refrigerator"],
              ["stove", "Stove"],
              ["washer", "Washer"],
              ["dryer", "Dryer"],
              ["microwave", "Microwave"],
            ] as const
          ).map(([key, label]) => {
            const raw = String(values[key] ?? "").trim().toLowerCase();
            const on = raw !== "" && raw !== "no";
            return (
              <li key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => onChange({ [key]: e.target.checked ? "Yes" : "" })}
                  />
                  {label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pet-block">
        <p className="pet-title">Home inspection</p>
        <label className="wiring-field">
          <span>Date</span>
          <input type="date" value={values.inspectionDate ?? ""} onChange={(e) => onChange({ inspectionDate: e.target.value })} />
        </label>
        <label className="wiring-field">
          <span>Notes</span>
          <textarea rows={4} value={values.inspectionNotes ?? ""} onChange={(e) => onChange({ inspectionNotes: e.target.value })} />
        </label>
      </div>
      </>
      ) : null}
      {part === "rent" ? (
      <>
      <div className="pet-block">
        <p className="pet-title">Money</p>
        <div className="pet-row">
          <label>
            <span>Move-in</span>
            <input type="date" value={values.moveIn ?? ""} onChange={(e) => onChange({ moveIn: e.target.value })} />
          </label>
          <label>
            <span>Rent due</span>
            <input type="date" value={values.rentDue ?? ""} onChange={(e) => onChange({ rentDue: e.target.value })} />
          </label>
        </div>
        <label className="wiring-field">
          <span>Lease end</span>
          <input type="date" value={values.leaseEnd ?? ""} onChange={(e) => onChange({ leaseEnd: e.target.value })} />
        </label>
        <div className="pet-row">
          <label>
            <span>Deposit</span>
            <input value={values.deposit ?? ""} onChange={(e) => onChange({ deposit: e.target.value })} />
          </label>
          <label>
            <span>Still owed</span>
            <input value={values.balance ?? ""} onChange={(e) => onChange({ balance: e.target.value })} />
          </label>
        </div>
        {onMoveOut ? (
          <button className="filter move-out" type="button" onClick={onMoveOut}>
            Move out
          </button>
        ) : null}
        {(values.history ?? []).length > 0 ? (
          <ul className="history">
            {(values.history ?? []).map((stay, index) => {
              const reminder = depositReminder(stay);
              return (
                <li key={`${stay.moveOut}-${index}`}>
                  <strong>{stay.name || "No name"}</strong>
                  <span>
                    {stay.moveIn || "—"} to {stay.moveOut || "—"}
                    {stay.deposit ? ` · deposit ${stay.deposit}` : ""}
                    {stay.balance ? ` · owed ${stay.balance}` : ""}
                    {stay.phone ? ` · ${stay.phone}` : ""}
                  </span>
                  {reminder ? <span className="deposit-alert">{reminder}</span> : null}
                  {stay.depositChoice ? <span>Deposit {stay.depositChoice === "Return" ? "returned" : "kept"}</span> : null}
                  {stay.depositDue && !stay.depositChoice ? (
                    <div className="deposit-actions">
                      <button
                        className="filter"
                        type="button"
                        onClick={() =>
                          onChange({
                            history: (values.history ?? []).map((item, i) => (i === index ? { ...item, depositChoice: "Return" } : item)),
                          })
                        }
                      >
                        Return deposit
                      </button>
                      <button
                        className="filter"
                        type="button"
                        onClick={() =>
                          onChange({
                            history: (values.history ?? []).map((item, i) => (i === index ? { ...item, depositChoice: "Keep" } : item)),
                          })
                        }
                      >
                        Keep deposit
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className="pet-block">
        <p className="pet-title">Notice</p>
        <label className="wiring-field">
          <span>Date</span>
          <input type="date" value={values.noticeDate ?? ""} onChange={(e) => onChange({ noticeDate: e.target.value })} />
        </label>
        <label className="wiring-field">
          <span>Note</span>
          <textarea rows={3} value={values.noticeNote ?? ""} onChange={(e) => onChange({ noticeNote: e.target.value })} />
        </label>
        <div className="notice-actions">
          <button className="filter" type="button" onClick={() => printNotice(values)}>
            Print notice
          </button>
          <button className="filter" type="button" onClick={() => setNoticeOpen(true)}>
            Upload notice
          </button>
        </div>
        {values.noticeFile?.name ? <p className="qb-note">{values.noticeFile.name}</p> : null}
      </div>
      </>
      ) : null}
      {part === "personal" ? (
      <div className="pet-block">
        <p className="pet-title">Emergency contact</p>
        <div className="pet-row">
          <label>
            <span>Name</span>
            <input value={values.emergencyName ?? ""} onChange={(e) => onChange({ emergencyName: e.target.value })} />
          </label>
          <label>
            <span>Phone</span>
            <input value={values.emergencyPhone ?? ""} onChange={(e) => onChange({ emergencyPhone: e.target.value })} />
          </label>
        </div>
      </div>
      ) : null}
      {part === "rent" ? (
      <div className="pet-block">
        <p className="pet-title">Eviction</p>
        <label className="wiring-field">
          <span>Court date</span>
          <input type="date" value={values.courtDate ?? ""} onChange={(e) => onChange({ courtDate: e.target.value })} />
        </label>
        <label className="wiring-field">
          <span>Note</span>
          <textarea rows={3} value={values.courtNote ?? ""} onChange={(e) => onChange({ courtNote: e.target.value })} />
        </label>
      </div>
      ) : null}
      {part === "personal" ? (
      <div className="pet-block">
        <p className="pet-title">Waiting list</p>
        <div className="pet-row">
          <label>
            <span>Name</span>
            <input value={values.waitName ?? ""} onChange={(e) => onChange({ waitName: e.target.value })} />
          </label>
          <label>
            <span>Phone</span>
            <input value={values.waitPhone ?? ""} onChange={(e) => onChange({ waitPhone: e.target.value })} />
          </label>
        </div>
      </div>
      ) : null}
      {part === "notes" ? (
      <div className="pet-block">
        <p className="pet-title">Maintenance log</p>
        <button
          className="filter"
          type="button"
          onClick={() =>
            onChange({
              maintLog: [{ id: String(Date.now()), date: dayStamp(), note: "", done: "" }, ...(values.maintLog ?? [])],
            })
          }
        >
          Add job
        </button>
        <ul className="maint-log">
          {(values.maintLog ?? []).map((job) => (
            <li key={job.id}>
              <input
                type="date"
                value={parseDay(job.date)}
                onChange={(e) => onChange({ maintLog: updateJob(values.maintLog, job.id, { date: e.target.value }) })}
              />
              <input
                value={job.note}
                placeholder="What was wrong"
                onChange={(e) => onChange({ maintLog: updateJob(values.maintLog, job.id, { note: e.target.value }) })}
              />
              <label>
                <input
                  type="checkbox"
                  checked={job.done === "Yes"}
                  onChange={(e) => onChange({ maintLog: updateJob(values.maintLog, job.id, { done: e.target.checked ? "Yes" : "" }) })}
                />
                Done
              </label>
            </li>
          ))}
        </ul>
      </div>
      ) : null}
      {part === "home" ? (
      <div className="pet-block">
        <p className="pet-title">Photo</p>
        <label className="wiring-field">
          <span>Home</span>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              onChange({ photo: await fileToData(file) });
            }}
          />
        </label>
        {values.photo ? <img className="lot-photo" src={values.photo} alt="" /> : null}
        {values.photo ? (
          <button className="doc-remove" type="button" onClick={() => onChange({ photo: "" })}>
            Remove photo
          </button>
        ) : null}
      </div>
      ) : null}
      {part === "rent" ? (
      <>
      <div className="pet-block">
        <p className="pet-title">Documents</p>
        <FileSlot label="Lease" file={values.lease} onChange={(lease) => onChange({ lease })} />
        <FileSlot label="Rules receipt" file={values.rulesReceipt} onChange={(rulesReceipt) => onChange({ rulesReceipt })} />
        <FileSlot label="Background check" file={values.background} onChange={(background) => onChange({ background })} />
        <div className="doc-slot">
          <span>Any other</span>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              const data = await fileToData(file);
              if (!data) return;
              onChange({ otherDocs: [...(values.otherDocs ?? []), { name: file.name, data }] });
            }}
          />
          <ul className="doc-list">
            {(values.otherDocs ?? []).map((doc, index) => (
              <li key={`${doc.name}-${index}`}>
                <a href={doc.data} download={doc.name}>
                  {doc.name}
                </a>
                <button
                  className="doc-remove"
                  type="button"
                  onClick={() => onChange({ otherDocs: (values.otherDocs ?? []).filter((_, i) => i !== index) })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {noticeOpen ? (
        <div className="notice-pop" role="presentation" onClick={() => setNoticeOpen(false)}>
          <div className="notice-card" role="dialog" aria-label="Upload notice" onClick={(e) => e.stopPropagation()}>
            <p className="pet-title">Upload notice</p>
            <p className="notice-who">
              Lot {values.lot} · {displayName(values)}
            </p>
            <label className="notice-drop">
              <span>{values.noticeFile?.name || "Choose a PDF or photo"}</span>
              <input
                type="file"
                accept="image/*,.pdf,application/pdf"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  const data = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
                    ? file.size > 4_000_000
                      ? ""
                      : await readAsData(file)
                    : await fileToData(file);
                  if (!data) return;
                  onChange({ noticeFile: { name: file.name, data } });
                }}
              />
            </label>
            {values.noticeFile?.data ? (
              <div className="doc-file">
                <a href={values.noticeFile.data} download={values.noticeFile.name}>
                  Open file
                </a>
                <button className="doc-remove" type="button" onClick={() => onChange({ noticeFile: null })}>
                  Remove
                </button>
              </div>
            ) : null}
            <div className="notice-actions">
              <button className="filter" type="button" onClick={() => printNotice(values)}>
                Print notice
              </button>
              <button className="filter" type="button" onClick={() => setNoticeOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
      </>
      ) : null}
    </>
  );
}

function PetSelects({
  dogs,
  cats,
  onChange,
}: {
  dogs: string;
  cats: string;
  onChange: (next: { dogs?: string; cats?: string }) => void;
}) {
  return (
    <div className="pet-row">
      <label>
        <span>Dogs</span>
        <select className="mow-select" value={dogs === "1" || dogs === "2" ? dogs : ""} onChange={(e) => onChange({ dogs: e.target.value })}>
          <option value="">—</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </label>
      <label>
        <span>Cats</span>
        <select className="mow-select" value={cats === "1" || cats === "2" ? cats : ""} onChange={(e) => onChange({ cats: e.target.value })}>
          <option value="">—</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </label>
    </div>
  );
}

function NameSplit({ name, onChange }: { name: string; onChange?: (name: string) => void }) {
  const parts = nameParts(name);
  return (
    <div className="name-split">
      <label>
        <span>First name</span>
        {onChange ? (
          <input
            value={parts.first}
            onChange={(e) => onChange(joinName(parts.last, e.target.value))}
          />
        ) : (
          <div className="name-box">{parts.first || "—"}</div>
        )}
      </label>
      <label>
        <span>Last name</span>
        {onChange ? (
          <input
            value={parts.last}
            onChange={(e) => onChange(joinName(e.target.value, parts.first))}
          />
        ) : (
          <div className="name-box">{parts.last || "—"}</div>
        )}
      </label>
    </div>
  );
}

const RECORD_FIELDS: { key: keyof Lot; label: string; cls: string }[] = [
  { key: "lot", label: "Lot", cls: "v-lot" },
  { key: "address", label: "Address", cls: "v-address" },
  { key: "street", label: "Street", cls: "v-street" },
  { key: "name", label: "Name(s)", cls: "v-name" },
  { key: "issues", label: "Issues", cls: "v-issues" },
  { key: "status", label: "Status", cls: "v-status" },
  { key: "renter", label: "Renter/Owner", cls: "v-renter" },
  { key: "rent", label: "Rental Amount", cls: "v-rent" },
  { key: "key", label: "Key", cls: "v-key" },
  { key: "phone", label: "Phone Number", cls: "v-phone" },
  { key: "email", label: "Email", cls: "v-email" },
  { key: "noMow", label: "MOW", cls: "v-flag" },
  { key: "lateRent", label: "Late Rent", cls: "v-late" },
  { key: "bouncedCheck", label: "Bounced Check", cls: "v-flag" },
  { key: "guest", label: "Guest", cls: "v-guest" },
  { key: "vehicle", label: "Vehicle", cls: "v-vehicle" },
  { key: "pressureWash", label: "Exterior Pressure Wash", cls: "v-wash" },
  { key: "violations", label: "Violations", cls: "v-violations" },
];

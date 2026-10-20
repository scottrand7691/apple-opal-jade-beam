import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDFOcOJC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function lot(lot, address, street, name, status, issues = "", key, renter) {
	return {
		id: lot || `${address}-${street}`,
		lot,
		address,
		street,
		name: name.replace(/,(\S)/g, ", $1"),
		issues,
		status,
		key,
		renter
	};
}
/** Names, numbers, and addresses are the spreadsheet, not the handwritten sheets. */
var LOTS = [
	lot("1", "5600", "Jaleen Ave", "Club House/Office", "Open"),
	lot("2", "5580", "Jaleen Ave", "Andrews", "Occupied"),
	lot("3", "5560", "Jaleen Ave", "Acosta, Espino", "Occupied", "Will they get a rent increase?"),
	lot("4", "5540", "Jaleen Ave", "Marysonet", "Occupied"),
	lot("5", "5520", "Jaleen Ave", "Herrera, E.", "Occupied"),
	lot("6", "5603", "Jaleen Ave", "", "Empty", "", "Yes"),
	lot("7", "5601", "Jaleen Ave", "Mena Sosa", "Occupied", "Owes $20 for Sep and $10 for Oct."),
	lot("8", "5608", "Denise Ave", "Sodansky, Carl", "Occupied", "", "Yes"),
	lot("9", "5610", "Denise Ave", "Phillips", "Occupied", "", "Yes"),
	lot("10", "5585", "Jaleen Ave", "Vazquez", "Occupied"),
	lot("11", "5561", "Jaleen Ave", "Brown", "Occupied"),
	lot("12", "5594", "Denise Ave", "Matejka, Carolina", "Occupied"),
	lot("13", "5498", "Jaleen Ave", "Carter, Lisa", "Occupied"),
	lot("14", "5575", "Jaleen Ave", "Kiefer", "Occupied", "Owes $10 for Aug and Sep."),
	lot("15", "5587", "Jaleen Ave", "Perez, I.", "Occupied"),
	lot("16", "5578", "Denise Ave", "Cruz, Antonio", "Occupied", "", "Yes"),
	lot("17", "5582", "Denise Ave", "", "Empty", "", "Yes"),
	lot("18", "5565", "Jaleen Ave", "Ramsey, Jennifer", "Occupied", "Does she have a dog?"),
	lot("19", "5569", "Jaleen Ave", "Cruz, Antonio", "Occupied"),
	lot("20", "5568", "Denise Ave", "Ramskog", "Occupied", "", "Yes"),
	lot("21", "5564", "Denise Ave", "", "Empty", "", "Yes"),
	lot("22", "5545", "Jaleen Ave", "Solomon, Larry", "Occupied", "10 short in Aug and Sep."),
	lot("23", "5543", "Jaleen Ave", "Russell, John", "Occupied"),
	lot("24", "5538", "Denise Ave", "Gomez", "Occupied", "", "Yes"),
	lot("25", "5542", "Denise Ave", "Hoang", "Occupied"),
	lot("26", "5525", "Jaleen Ave", "Hernandez, John", "Occupied", "Owes $10 for Aug, Sep, Oct."),
	lot("27", "5529", "Jaleen Ave", "Vargas, Norberto", "Occupied"),
	lot("28", "5530", "Denise Ave", "Godshalk", "Occupied", "", "Yes"),
	lot("29", "5528", "Denise Ave", "Clark", "Occupied", "Does or did she get a rent increase?", "Yes"),
	lot("30", "5515", "Jaleen Ave", "Stacy", "Occupied"),
	lot("31", "5513", "Jaleen Ave", "", "Empty", "", "Yes"),
	lot("32", "5510", "Denise Ave", "Bodell, Richard", "Occupied", "", "Yes"),
	lot("33", "5516", "Denise Ave", "Aranda, Benjamin", "Occupied", "Owes $20 x 2.", "Yes"),
	lot("34", "5499", "Jaleen Ave", "Polston, Carolyn", "Occupied", "Owes $10 for Aug, Sep, Oct."),
	lot("35", "5509", "Jaleen Ave", "", "Empty"),
	lot("36", "5502", "Denise Ave", "Tinoco, Maria", "Occupied", "Does she have a dog? $10 short x 2."),
	lot("37", "5500", "Denise Ave", "Holgate", "Occupied", "", "Yes"),
	lot("38", "5495", "Jaleen Ave", "", "Empty"),
	lot("39", "5497", "Jaleen Ave", "Brizuela", "Occupied"),
	lot("40", "5485", "Jaleen Ave", "Battaglia", "Occupied"),
	lot("41", "5400", "Denise Ave", "Weil", "Occupied", "Do they have a pet? Owes $10 for Aug, Sep, Oct and a late fee from February."),
	lot("42", "5609", "Denise Ave", "Spicer", "Occupied", "", "Yes"),
	lot("43", "5583", "Denise Ave", "Roberts", "Occupied", "", "Yes"),
	lot("44", "5561", "Leon Circle", "Shank", "Occupied", "Does she have a dog?"),
	lot("45", "5551", "Leon Circle", "Meininger", "Occupied"),
	lot("46", "5543", "Leon Circle", "Manette", "Occupied"),
	lot("47", "5531", "Leon Circle", "Campbell", "Occupied"),
	lot("48", "5523", "Denise Ave", "Murillo, Nora", "Occupied", "", "Yes"),
	lot("49", "5519", "Denise Ave", "Barr, James + Sharon", "Occupied", "", "Yes"),
	lot("50", "5503", "Denise Ave", "Manos", "Occupied", "", "Yes"),
	lot("51", "5522", "Leon Circle", "Exposito", "Occupied"),
	lot("52", "5524", "Leon Circle", "Walther", "Occupied"),
	lot("53", "5520", "Leon Circle", "Oyster", "Occupied"),
	lot("54", "5518", "Leon Circle", "Hartner", "Occupied"),
	lot("55", "5504", "Leon Circle", "Walton, Richard", "Occupied"),
	lot("56", "5506", "Leon Circle", "", "Empty", "", "Yes"),
	lot("57", "5502", "Leon Circle", "Casarez, Lori", "Occupied"),
	lot("58", "5500", "Leon Circle", "Wrage, Teresa", "Occupied", "Owes $10 for Aug, Sep, Oct. Will she get a rent increase?"),
	lot("59", "5531", "Leon Circle", "Reyes Cobas", "Occupied"),
	lot("60", "5527", "Leon Circle", "Cintron, Angel", "Occupied"),
	lot("61", "5517", "Leon Circle", "", "Empty", "", "Yes"),
	lot("62", "5511", "Leon Circle", "Luzzi, Stephanie", "Occupied"),
	lot("63", "5593", "Leon Circle", "Barrett, Billy", "Occupied", "Owes $10 for Aug, Sep, Oct. Will he get a rent increase?"),
	lot("64", "5481", "Jaleen Ave", "Block", "Occupied"),
	lot("65", "5483", "Jaleen Ave", "Allbritton, Janet", "Occupied"),
	lot("66", "3551", "Kirkwood St", "Montero, Enrique", "Occupied"),
	lot("67", "5519", "Michelle Ave", "Costales Torres, Rafael", "Occupied", "Owes $5 from Jan and $135 from March."),
	lot("68", "5524", "Michelle Ave", "Rojas Gill", "Occupied"),
	lot("69", "5539", "Michelle Ave", "Solis-Chong", "Occupied"),
	lot("70", "5549", "Michelle Ave", "Jimenez, Wilfred", "Occupied"),
	lot("71", "5559", "Michelle Ave", "Marin, Ana", "Occupied"),
	lot("72", "5569", "Michelle Ave", "Lopez, Francisco", "Occupied"),
	lot("73", "5579", "Michelle Ave", "Rodriguez, Juan", "Occupied"),
	lot("74", "5589", "Michelle Ave", "Sawyer, Everett", "Occupied"),
	lot("75", "5599", "Michelle Ave", "Tiburcio, Pena", "Occupied"),
	lot("76", "5558", "Michelle Ave", "Reboyro, Pravia", "Occupied"),
	lot("77", "5588", "Michelle Ave", "Henke, Angela", "Occupied"),
	lot("78", "5578", "Michelle Ave", "Marquez, Jose", "Occupied", "Owes $10 for Aug and Oct."),
	lot("79", "5568", "Michelle Ave", "Sanchez, Ronald", "Occupied"),
	lot("80", "5558", "Michelle Ave", "Selen, Daniel", "Occupied"),
	lot("81", "5548", "Michelle Ave", "Gomez, Samuel", "Occupied"),
	lot("82", "5538", "Michelle Ave", "Gonzales, Jesus", "Occupied", "Needs notice. No rent."),
	lot("83", "5528", "Michelle Ave", "Jimenez, Sol", "Occupied"),
	lot("84", "5518", "Michelle Ave", "Beshere, Christoffel", "Occupied"),
	lot("85", "3561", "Kirkwood St", "", "Empty", "", "No"),
	lot("86", "3571", "Kirkwood St", "Laine, Yvan", "Occupied"),
	lot("87", "3581", "Kirkwood St", "Luger, Ken", "Occupied"),
	lot("88", "5476", "Denise Ave", "Casanova", "Occupied"),
	lot("89", "5472", "Denise Ave", "Charles", "Occupied"),
	lot("90", "5466", "Denise Ave", "Hernandez / Martinez", "Occupied"),
	lot("91", "5456", "Denise Ave", "Davis", "Occupied", "", "Yes"),
	lot("92", "5444", "Denise Ave", "Thomas", "Occupied", "Does he have a dog?"),
	lot("93", "5436", "Denise Ave", "Delgado Romero", "Occupied", "10 short in Aug and Sep."),
	lot("94", "5432", "Denise Ave", "Coyne, Paul", "Occupied"),
	lot("95", "5431", "Denise Ave", "Lu", "Occupied", "", "Yes"),
	lot("96", "5435", "Denise Ave", "Polikoff", "Occupied", "", "Yes"),
	lot("97", "5439", "Denise Ave", "Benitez Monell", "Occupied", "", "Yes"),
	lot("98", "5443", "Denise Ave", "VonKretchmann", "Occupied", "", "Yes"),
	lot("99", "5447", "Denise Ave", "Montes De Oca Leo", "Occupied", "", "Yes"),
	lot("100", "5451", "Denise Ave", "Yanta", "Occupied", "", "Yes"),
	lot("101", "5455", "Denise Ave", "", "Empty", "", "Yes"),
	lot("102", "5459", "Denise Ave", "Mendenhall", "Occupied", "", "Yes"),
	lot("103", "5463", "Denise Ave", "", "Empty", "", "Yes"),
	lot("104", "5467", "Denise Ave", "Miralles", "Occupied", "Do they have a dog? Owe $20 x 2.", "Yes"),
	lot("105", "5471", "Denise Ave", "Sawyer", "Occupied", "", "Yes"),
	lot("106", "5475", "Denise Ave", "Ingram", "Occupied", "", "Yes"),
	lot("107", "5479", "Denise Ave", "Stuckey", "Occupied", "Owes $10 for Aug, Sep, Oct and $20 from June.", "Yes"),
	lot("108", "5481", "Denise Ave", "Soriano", "Occupied", "Owes $10 for Aug.", "Yes"),
	lot("109", "5480", "Leon Circle", "Jimenez, Juan + Betty", "Occupied"),
	lot("110", "5478", "Leon Circle", "Montes De Oca Bea", "Occupied"),
	lot("111", "5474", "Leon Circle", "Benitez", "Occupied"),
	lot("112", "5476", "Leon Circle", "Perez", "Occupied"),
	lot("113", "5466", "Leon Circle", "", "Empty", "", "Yes"),
	lot("114", "5462", "Leon Circle", "Walther", "Occupied"),
	lot("115", "5458", "Leon Circle", "Bass", "Occupied"),
	lot("116", "5454", "Leon Circle", "Morrow, Tamara", "Occupied", "Owes $10 from Sep."),
	lot("117", "5450", "Leon Circle", "Ally", "Occupied"),
	lot("118", "5446", "Leon Circle", "Barone, Samuel", "Occupied"),
	lot("119", "5442", "Leon Circle", "Bornat", "Occupied", "Owes $10 for Aug."),
	lot("120", "5438", "Leon Circle", "Offenhauer", "Occupied"),
	lot("121", "5434", "Leon Circle", "Sembrat, Robert", "Occupied"),
	lot("122", "5430", "Leon Circle", "Cruz, Martin", "Occupied"),
	lot("123", "5429", "Leon Circle", "Rodriguez, Omara", "Occupied"),
	lot("124", "5433", "Leon Circle", "Chavez Romero", "Occupied", "Did they get a $20 rent increase?"),
	lot("125", "5445", "Leon Circle", "Crawford, Linda", "Occupied"),
	lot("126", "5449", "Leon Circle", "Gasparre, Roman", "Occupied"),
	lot("127", "5457", "Leon Circle", "Pena", "Occupied"),
	lot("128", "5465", "Leon Circle", "Winn, Donna", "Occupied"),
	lot("129", "5473", "Leon Circle", "Pena, Daniel", "Occupied"),
	lot("130", "5477", "Leon Circle", "Tanyer, Joanne", "Occupied"),
	lot("130.5", "", "Block House", "Botey", "Occupied", "Tell Botey to make Money Order to ETC fbo Gregory Horne", void 0, "Renter"),
	lot("", "1471", "Lake Drive", "", "Occupied", "", void 0, "Renter"),
	lot("", "4053", "Bonnie Drive", "", "Occupied", "", void 0, "Renter"),
	lot("", "3530", "Magnolia Terrace Ave", "", "Occupied", "", void 0, "Renter")
];
var LOT_BY_ID = new Map(LOTS.map((l) => [l.id, l]));
function displayName(l) {
	if (l.name) return l.name;
	if (l.status === "Empty") return "Empty";
	if (l.status === "Open") return "Open";
	return "—";
}
function sheetOf(id) {
	const n = Number(id);
	if (!Number.isFinite(n)) return null;
	if (n >= 1 && n <= 65) return 1;
	if (n >= 66 && n <= 87) return 3;
	if (n >= 88 && n <= 130) return 2;
	return null;
}
function matches(l, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	if (/^\d+(\.5)?$/.test(q)) return l.lot === q || l.address === q;
	return [
		l.lot,
		l.address,
		l.street,
		l.name,
		l.issues,
		l.status,
		l.renter ?? ""
	].join(" ").toLowerCase().includes(q);
}
function row(ids, y, opts) {
	const gap = opts.gap ?? 4;
	const total = ids.length * opts.w + (ids.length - 1) * gap;
	const start = opts.right != null ? opts.right - total : opts.x ?? 0;
	return ids.map((id, i) => ({
		id,
		x: start + i * (opts.w + gap),
		y,
		w: opts.w,
		h: opts.h,
		kind: "lot"
	}));
}
function mark(id, label, x, y, w, h) {
	return {
		id,
		label,
		x,
		y,
		w,
		h,
		kind: "landmark"
	};
}
/** Map 1 — landscape. North is to the left, same as the sheet (Dr. Love Road). */
function sheet1() {
	const right = 1310;
	const gridX = 168;
	const cw = 124;
	const ch = 70;
	const gap = 4;
	return {
		viewBox: "0 0 1460 830",
		boxes: [
			mark("estate", "Magnolia Central of Florida Estates", 168, 16, 250, 150),
			...row([
				"47",
				"59",
				"60",
				"61",
				"62",
				"63"
			], 16, {
				right,
				w: 138,
				h: 72
			}),
			...row([
				"46",
				"45",
				"52",
				"54",
				"56",
				"58",
				"64"
			], 96, {
				right,
				w: 118,
				h: 68
			}),
			...row([
				"51",
				"53",
				"55",
				"57",
				"65"
			], 172, {
				right,
				w: 140,
				h: 68
			}),
			...row([
				"42",
				"43",
				"44",
				"48",
				"49",
				"50"
			], 268, {
				right,
				w: 148,
				h: 72
			}),
			...row([
				"9",
				"17",
				"21",
				"25",
				"29",
				"33",
				"37",
				"41"
			], 376, {
				x: gridX,
				w: cw,
				h: ch,
				gap
			}),
			...row([
				"8",
				"12",
				"16",
				"20",
				"24",
				"28",
				"32",
				"36"
			], 450, {
				x: gridX,
				w: cw,
				h: ch,
				gap
			}),
			...row(["40"], 450, {
				x: 1192,
				w: cw,
				h: ch
			}),
			...row([
				"7",
				"11",
				"15",
				"19",
				"23",
				"27",
				"31",
				"35"
			], 524, {
				x: gridX,
				w: cw,
				h: ch,
				gap
			}),
			...row(["39"], 524, {
				x: 1192,
				w: cw,
				h: ch
			}),
			...row([
				"6",
				"10",
				"14",
				"18",
				"22",
				"26",
				"30",
				"34"
			], 598, {
				x: gridX,
				w: cw,
				h: ch,
				gap
			}),
			...row(["38"], 598, {
				x: 1192,
				w: cw,
				h: ch
			}),
			...row([
				"1",
				"2",
				"3",
				"4",
				"5",
				"13"
			], 706, {
				x: gridX,
				w: 172,
				h: 96,
				gap: 6
			})
		],
		labels: [
			{
				text: "DR. LOVE ROAD",
				x: 28,
				y: 460,
				rotate: -90,
				size: 13
			},
			{
				text: "LEON CIRCLE",
				x: 760,
				y: 256,
				size: 13
			},
			{
				text: "DENISE AVE",
				x: 740,
				y: 360,
				size: 13
			},
			{
				text: "JALEEN AVE",
				x: 740,
				y: 688,
				size: 13
			}
		],
		north: "left"
	};
}
/** Map 2 — landscape. North is up, same as the sheet. */
function sheet2() {
	const x = 78;
	const gap = 4;
	const w8 = 174;
	const w14 = 1368 / 14;
	return {
		viewBox: "0 0 1540 650",
		boxes: [
			...row([
				"130",
				"129",
				"128",
				"127",
				"126",
				"125",
				"124",
				"123"
			], 28, {
				x,
				w: w8,
				h: 78,
				gap
			}),
			...row([
				"109",
				"110",
				"111",
				"112",
				"113",
				"114",
				"115",
				"116",
				"117",
				"118",
				"119",
				"120",
				"121",
				"122"
			], 136, {
				x,
				w: w14,
				h: 86,
				gap
			}),
			...row([
				"108",
				"107",
				"106",
				"105",
				"104",
				"103",
				"102",
				"101",
				"100",
				"99",
				"98",
				"97",
				"96",
				"95"
			], 226, {
				x,
				w: w14,
				h: 86,
				gap
			}),
			...row(["88", "89"], 348, {
				x,
				w: w8,
				h: 80,
				gap
			}),
			mark("plant", "Treatment Plant", 434, 348, w8, 80),
			...row([
				"90",
				"91",
				"92",
				"93",
				"94"
			], 348, {
				x: 612,
				w: w8,
				h: 80,
				gap
			}),
			mark("retain", "Retention Pond", x, 470, 1388 / 3, 150),
			mark("hold", "Holding Pond", 556.6666666666667, 470, 1388 / 3, 150),
			mark("rv", "R.V. Lot", 1035.3333333333335, 470, 1388 / 3, 150)
		],
		labels: [
			{
				text: "JALEEN AVENUE",
				x: 22,
				y: 360,
				rotate: -90,
				size: 12
			},
			{
				text: "LEON CIRCLE",
				x: 788,
				y: 124,
				size: 13
			},
			{
				text: "DENISE AVE",
				x: 788,
				y: 332,
				size: 13
			}
		],
		north: "up"
	};
}
/** Map 3 — portrait. North is down, same as the sheet. */
function sheet3() {
	const colW = 196;
	const colH = 68;
	const left = 28;
	const rightCol = 260;
	const east = [
		"67",
		"68",
		"69",
		"70",
		"71",
		"72",
		"73",
		"74",
		"75"
	];
	const west = [
		"84",
		"83",
		"82",
		"81",
		"80",
		"79",
		"78",
		"77",
		"76"
	];
	const y0 = 168;
	return {
		viewBox: `0 0 780 896`,
		boxes: [
			...row(["66"], 62, {
				x: left,
				w: colW,
				h: 88
			}),
			...row([
				"85",
				"86",
				"87"
			], 62, {
				x: rightCol,
				w: 150,
				h: 88,
				gap: 6
			}),
			...east.map((id, i) => ({
				id,
				x: left,
				y: y0 + i * 72,
				w: colW,
				h: colH,
				kind: "lot"
			})),
			...west.map((id, i) => ({
				id,
				x: rightCol,
				y: y0 + i * 72,
				w: colW,
				h: colH,
				kind: "lot"
			}))
		],
		labels: [
			{
				text: "KIRKWOOD STREET",
				x: 300,
				y: 42,
				size: 13
			},
			{
				text: "MICHELLE AVENUE",
				x: 242,
				y: 488,
				rotate: -90,
				size: 12
			},
			{
				text: "DR. LOVE ROAD",
				x: 300,
				y: 844,
				size: 13
			},
			{
				text: "MAGNOLIA HOMES ROAD",
				x: 700,
				y: 620,
				rotate: -90,
				size: 12
			}
		],
		north: "down"
	};
}
var SHEETS = {
	1: sheet1(),
	2: sheet2(),
	3: sheet3()
};
function wrap(name, maxChars) {
	if (name.length <= maxChars) return [name];
	const comma = name.split(", ");
	if (comma.length === 2 && comma[0].length <= maxChars + 2 && comma[1].length <= maxChars + 2) return comma;
	const words = name.split(" ");
	const lines = [];
	let cur = "";
	for (const word of words) {
		const next = cur ? `${cur} ${word}` : word;
		if (cur && next.length > maxChars) {
			lines.push(cur);
			cur = word;
		} else cur = next;
	}
	if (cur) lines.push(cur);
	return lines.slice(0, 3);
}
function North({ dir }) {
	if (dir === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: "translate(36 250)",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "0",
				y: "-16",
				textAnchor: "middle",
				fontSize: "14",
				fontWeight: "700",
				children: "N"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "18",
				y1: "0",
				x2: "-2",
				y2: "0",
				stroke: "var(--color-ink)",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "-14,-5 -26,0 -14,5",
				fill: "var(--color-ink)"
			})
		]
	});
	if (dir === "up") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: "translate(46 78)",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "0",
				y: "-6",
				textAnchor: "middle",
				fontSize: "14",
				fontWeight: "700",
				children: "N"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: "8",
				x2: "0",
				y2: "28",
				stroke: "var(--color-ink)",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "-5,10 0,-2 5,10",
				fill: "var(--color-ink)"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: "translate(590 240)",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "0",
				cy: "0",
				r: "26",
				fill: "var(--color-paper)",
				stroke: "var(--color-ink)",
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "0",
				y: "-34",
				textAnchor: "middle",
				fontSize: "12",
				fontWeight: "650",
				children: "S"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "-40",
				y: "4",
				textAnchor: "middle",
				fontSize: "12",
				fontWeight: "650",
				children: "E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "40",
				y: "4",
				textAnchor: "middle",
				fontSize: "12",
				fontWeight: "650",
				children: "W"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "0",
				y: "48",
				textAnchor: "middle",
				fontSize: "14",
				fontWeight: "700",
				children: "N"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "-4,10 0,24 4,10",
				fill: "var(--color-ink)"
			})
		]
	});
}
function PlatMap({ sheet, query, filter, selected, onSelect }) {
	const spec = SHEETS[sheet];
	const filtering = query.trim().length > 0 || filter !== "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: sheet === 3 ? "map-svg portrait" : "map-svg landscape",
		viewBox: spec.viewBox,
		role: "img",
		"aria-label": sheet === 3 ? "Michelle and Kirkwood site plan" : `Site plan sheet ${sheet}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
				id: "emptyHatch",
				width: "7",
				height: "7",
				patternUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "7",
					height: "7",
					fill: "var(--color-empty)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 7 L7 0",
					stroke: "var(--color-hatch)",
					strokeWidth: "1.2"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: "var(--color-paper)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(North, { dir: spec.north }),
			spec.labels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				className: "street-label",
				x: label.x,
				y: label.y,
				textAnchor: label.anchor ?? "middle",
				fontSize: label.size ?? 13,
				transform: label.rotate ? `rotate(${label.rotate} ${label.x} ${label.y})` : void 0,
				children: label.text
			}, label.text + label.x)),
			spec.boxes.map((box) => {
				if (box.kind === "landmark") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "landmark",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: box.x,
						y: box.y,
						width: box.w,
						height: box.h
					}), (box.label ?? "").split(" ").length > 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: box.x + box.w / 2,
						y: box.y + box.h / 2,
						textAnchor: "middle",
						fontSize: "15",
						fontWeight: "650",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
							x: box.x + box.w / 2,
							dy: "-0.6em",
							children: "Magnolia Central"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
							x: box.x + box.w / 2,
							dy: "1.25em",
							children: "of Florida Estates"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: box.x + box.w / 2,
						y: box.y + box.h / 2,
						textAnchor: "middle",
						dominantBaseline: "middle",
						fontSize: box.h > 100 ? 18 : 13,
						fontWeight: "650",
						letterSpacing: "0.08em",
						children: (box.label ?? "").toUpperCase()
					})]
				}, box.id);
				const lot = LOT_BY_ID.get(box.id);
				if (!lot) return null;
				const out = filter === "empty" && lot.status !== "Empty" || filter === "notes" && !lot.issues || query.trim().length > 0 && !matches(lot, query);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotBox, {
					box,
					lot,
					dim: filtering && out,
					selected: selected === lot.id,
					onSelect
				}, box.id);
			})
		]
	});
}
function LotBox({ box, lot, dim, selected, onSelect }) {
	const name = displayName(lot);
	const fsName = box.w < 110 ? 9 : box.w < 140 ? 10.5 : 12;
	const nameLines = wrap(name, Math.max(8, Math.floor(box.w / (fsName * .56))));
	const fsLot = box.w < 110 ? 12 : 14;
	const fsAddr = box.w < 110 ? 9.5 : 11;
	const lines = [
		{
			text: lot.lot,
			size: fsLot,
			weight: 700
		},
		{
			text: lot.address || "—",
			size: fsAddr,
			weight: 500,
			fill: "var(--color-muted)"
		},
		...nameLines.map((text) => ({
			text,
			size: fsName,
			weight: 500
		}))
	];
	const gap = 1;
	const block = lines.reduce((sum, line) => sum + line.size + gap, 0);
	let baseline = box.y + (box.h - block) / 2 + lines[0].size;
	const cx = box.x + box.w / 2;
	const cls = [
		"lot",
		lot.status === "Empty" ? "empty" : "",
		lot.status === "Open" ? "open" : "",
		dim ? "dim" : "",
		selected ? "selected" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: cls,
		role: "button",
		tabIndex: 0,
		"aria-label": `Lot ${lot.lot}, ${lot.address} ${lot.street}, ${name}`,
		"aria-pressed": selected,
		onClick: () => onSelect(lot.id),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onSelect(lot.id);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `Lot ${lot.lot} · ${lot.address} ${lot.street} · ${name}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: box.x,
				y: box.y,
				width: box.w,
				height: box.h
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: `clip-${lot.id}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: box.x + 2,
					y: box.y + 2,
					width: box.w - 4,
					height: box.h - 4
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				clipPath: `url(#clip-${lot.id})`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx,
					y: baseline,
					textAnchor: "middle",
					fontSize: lines[0].size,
					fontWeight: lines[0].weight,
					children: lines[0].text
				}), lines.slice(1).map((line) => {
					baseline += line.size + gap;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: cx,
						y: baseline,
						textAnchor: "middle",
						fontSize: line.size,
						fontWeight: line.weight,
						fill: line.fill,
						children: line.text
					}, `${lot.id}-${line.text}-${baseline}`);
				})]
			}),
			lot.issues ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: box.x + box.w - 8,
				y: box.y + 4,
				width: "4",
				height: "4",
				fill: "var(--color-ink)"
			}) : null,
			lot.key === "Yes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: box.x + 6,
				y: box.y + box.h - 5,
				fontSize: "9",
				fontWeight: "700",
				children: "K"
			}) : null
		]
	});
}
var SHEET_COPY = {
	1: {
		title: "Map 1",
		note: "Landscape. North points left, along Dr. Love Road — same direction as the original sheet."
	},
	2: {
		title: "Map 2",
		note: "Landscape. North points up — same direction as the original sheet."
	},
	3: {
		title: "Map 3",
		note: "Portrait. North points down, toward Dr. Love Road — same direction as the original sheet."
	}
};
function Home() {
	const [sheet, setSheet] = (0, import_react.useState)(1);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)("1");
	const [register, setRegister] = (0, import_react.useState)(false);
	const visible = (0, import_react.useMemo)(() => {
		return LOTS.filter((lot) => {
			if (filter === "empty" && lot.status !== "Empty") return false;
			if (filter === "notes" && !lot.issues) return false;
			return matches(lot, query);
		});
	}, [filter, query]);
	const sig = `${filter}|${query}`;
	const prevSig = (0, import_react.useRef)(sig);
	(0, import_react.useEffect)(() => {
		if (prevSig.current === sig) return;
		prevSig.current = sig;
		if (!query.trim() && filter === "all") return;
		if (visible.length === 1) {
			setSelected(visible[0].id);
			const next = sheetOf(visible[0].id);
			if (next) {
				setSheet(next);
				setRegister(false);
			} else setRegister(true);
			return;
		}
		const sheets = new Set(visible.map((lot) => sheetOf(lot.id)).filter((n) => n != null));
		if (sheets.size === 1 && visible.length > 0 && visible.every((lot) => sheetOf(lot.id))) {
			setSheet([...sheets][0]);
			setRegister(false);
		}
	}, [
		sig,
		query,
		filter,
		visible
	]);
	const lot = LOTS.find((item) => item.id === selected) ?? null;
	const empty = LOTS.filter((item) => item.status === "Empty").length;
	const notes = LOTS.filter((item) => item.issues).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "app",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Site plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Magnolia Central of Florida Estates" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "stats",
						children: [
							LOTS.length,
							" records · ",
							empty,
							" empty · ",
							notes,
							" with a note · names from the lot register"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "search",
					value: query,
					placeholder: "Lot, name, or address",
					"aria-label": "Search lots",
					onChange: (e) => setQuery(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tabs",
						role: "tablist",
						"aria-label": "Sheets",
						children: [[
							1,
							2,
							3
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "tab",
							type: "button",
							role: "tab",
							"aria-pressed": !register && sheet === id,
							onClick: () => {
								setRegister(false);
								setSheet(id);
							},
							children: SHEET_COPY[id].title
						}, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "tab",
							type: "button",
							"aria-pressed": register,
							onClick: () => setRegister(true),
							children: "Register"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "filters",
						children: [
							["all", "All"],
							["empty", "Empty"],
							["notes", "Notes"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "filter",
							type: "button",
							"aria-pressed": filter === id,
							onClick: () => setFilter(id),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "legend",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch" }), " Occupied"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch empty" }), " Empty"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "swatch open" }), " Office"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "K = key on file" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Square = note" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "map-frame",
					children: register ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "register",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Lot" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Address" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Note" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LOTS.map((item) => {
							const hit = visible.includes(item);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-hit": hit,
								"aria-selected": selected === item.id,
								onClick: () => setSelected(item.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.lot || "—" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
										item.address,
										" ",
										item.street
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: displayName(item) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.issues })
								]
							}, item.id);
						}) })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sheet-note",
						children: SHEET_COPY[sheet].note
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatMap, {
						sheet,
						query,
						filter,
						selected,
						onSelect: setSelected
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotPanel, { lot })]
			})
		]
	});
}
function LotPanel({ lot }) {
	if (!lot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Lot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "quiet",
			children: "Select a lot on the map."
		})]
	});
	const where = sheetOf(lot.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: lot.lot ? `Lot ${lot.lot}` : "Off the sheets" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "addr",
				children: [lot.address ? `${lot.address} ` : "", lot.street]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "meta",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: lot.status
					}),
					lot.key === "Yes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: "Key"
					}) : null,
					lot.key === "No" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: "No key"
					}) : null,
					lot.renter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: lot.renter
					}) : null,
					where ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "pill",
						children: ["Map ", where]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: "Register only"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: displayName(lot) }),
			lot.issues ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { marginTop: 12 },
				children: lot.issues
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "quiet",
				style: { marginTop: 12 },
				children: "No note in the register."
			})
		]
	});
}
//#endregion
export { Home as component };

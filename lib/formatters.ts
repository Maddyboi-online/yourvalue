export function formatMonth(ym: string) {
  // Expect YYYY-MM from <input type="month" />
  if (!ym) return "";
  const [y, m] = ym.split("-").map((x) => Number(x));
  if (!y || !m) return ym;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[m - 1] ?? ""} ${y}`;
}

export function formatRange(start: string, end: string) {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : "Present";
  if (!s && !e) return "";
  if (!s) return e;
  return `${s} — ${e}`;
}

export function uniqNonEmpty(arr: string[]) {
  return Array.from(new Set(arr.map((x) => x.trim()).filter(Boolean)));
}


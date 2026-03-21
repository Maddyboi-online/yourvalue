"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (next: string[]) => void;
  suggestions?: string[];
};

function normalizeTag(raw: string) {
  return raw.trim().replace(/\s+/g, " ");
}

export default function TagInput({ label, placeholder, value, onChange, suggestions = [] }: Props) {
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const normalized = useMemo(() => value.map(normalizeTag).filter(Boolean), [value]);
  const filteredSuggestions = useMemo(() => {
    const q = normalizeTag(draft).toLowerCase();
    if (!q) return suggestions.slice(0, 5);
    return suggestions
      .filter((item) => item.toLowerCase().includes(q) && !normalized.includes(item))
      .slice(0, 5);
  }, [draft, normalized, suggestions]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const addTagsFromString = (raw: string) => {
    const parts = raw
      .split(",")
      .map(normalizeTag)
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = Array.from(new Set([...normalized, ...parts]));
    onChange(next);
    setDraft("");
  };

  return (
    <div ref={wrapperRef}>
      <label className="label">{label}</label>
      <div className="rounded-2xl bg-[#111111] p-3 ring-1 ring-white/10">
        <div className="flex flex-wrap gap-2">
          {normalized.length === 0 ? (
            <p className="text-xs font-semibold text-white/50">Add tags that describe your skills.</p>
          ) : (
            normalized.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {t}
                <button
                  type="button"
                  className="ml-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] font-extrabold text-white hover:bg-[#ABF62D] hover:text-black"
                  aria-label={`Remove ${t}`}
                  onClick={() => onChange(normalized.filter((x) => x !== t))}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>

        <div className="relative mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              className="input"
              value={draft}
              placeholder={placeholder ?? "Type and press Enter"}
              onFocus={() => setOpen(true)}
              onChange={(e) => {
                setDraft(e.target.value);
                setOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTagsFromString(draft);
                  setOpen(false);
                }
              }}
            />
            {open && filteredSuggestions.length > 0 && (
              <div className="absolute z-20 mt-1 max-h-[200px] w-full overflow-y-auto rounded-[12px] border border-[#ABF62D40] bg-[#1A1A2E] py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="block w-full border-l-[3px] border-l-transparent px-4 py-[10px] text-left text-[14px] text-white transition-colors hover:border-l-[#ABF62D] hover:bg-[#ABF62D15] hover:text-[#ABF62D]"
                    onClick={() => {
                      onChange(Array.from(new Set([...normalized, item])));
                      setDraft("");
                      setOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn-ghost btn px-3 py-2"
            onClick={() => addTagsFromString(draft)}
            disabled={!draft.trim()}
          >
            Add
          </button>
        </div>
        <p className="mt-2 text-[11px] font-semibold text-white/50">Tip: Separate multiple tags with commas.</p>
      </div>
    </div>
  );
}


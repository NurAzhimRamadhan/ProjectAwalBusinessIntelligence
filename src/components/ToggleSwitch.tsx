import React from 'react';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
};

export function ToggleSwitch({ checked, onChange, label, description }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full text-left rounded-2xl p-4 transition-all duration-300 glass hover:translate-y-[-1px] hover:glow ${
        checked ? 'ring-1 ring-amber-400/40' : 'opacity-90'
      }`}
      aria-pressed={checked}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-wide text-slate-900">{label}</div>
          {description ? (
            <div className="mt-1 text-xs text-slate-600 leading-relaxed">{description}</div>
          ) : null}
        </div>

        <div
          className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
            checked ? 'bg-amber-500' : 'bg-slate-200'
          }`}
        >
          <div
            className={`absolute top-1 h-5 w-5 rounded-full transition-all duration-300 ${
              checked ? 'left-6 bg-[var(--espresso)]' : 'left-1 bg-white/70'
            }`}
          />
        </div>
      </div>
    </button>
  );
}

"use client";

import { IconType } from "react-icons";
import { AVAILABLE_ICONS } from "../constants";

export default function IconPicker({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: IconType;
  onChange: (icon: IconType) => void;
}) {
  const currentIndex = AVAILABLE_ICONS.findIndex((i) => i.icon === value);

  return (
    <div className="relative">
      <select
        id={id}
        value={currentIndex === -1 ? 0 : currentIndex}
        onChange={(e) => onChange(AVAILABLE_ICONS[Number(e.target.value)].icon)}
        className="w-24 font-label text-xs tracking-[0.1em] uppercase rounded-full bg-surface-container-lowest text-on-surface-variant py-2.5 px-4 shadow-sm cursor-pointer appearance-none border border-outline hover:border-tertiary transition-all text-center"
      >
        {AVAILABLE_ICONS.map((icon, i) => (
          <option key={icon.id} value={i}>
            {icon.name}
          </option>
        ))}
      </select>
    </div>
  );
}

"use client";

import SubBoard from "./SubBoard";

export default function SuperBoard() {
  return (
    <div className="grid grid-cols-3 gap-3 p-3 rounded-lg">
      {Array.from({ length: 9 }, (_, i) => (
        <SubBoard key={i} boardIndex={i} />
      ))}
    </div>
  );
}

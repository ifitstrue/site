import { fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { describe, expect, it } from "vitest";
import { DraggableIntroduction, type DraggablePositions } from "./DraggableIntroduction";
import type { DestinationKey } from "./homeContent";

function Harness() {
  const [positions, setPositions] = useState<DraggablePositions>({});
  const tokenRefs = useRef<Partial<Record<DestinationKey, HTMLSpanElement | null>>>({});
  return (
    <DraggableIntroduction
      transformed={false}
      positions={positions}
      onPositionsChange={setPositions}
      tokenRefs={tokenRefs}
    />
  );
}

const transformOf = (id: string) => screen.getByTestId(`token-${id}`).style.transform;

describe("DraggableIntroduction", () => {
  it("moves only the pointer-selected word", () => {
    render(<Harness />);
    const hi = screen.getByTestId("token-heading-0");
    const comma = screen.getByTestId("token-heading-1");

    fireEvent.pointerDown(hi, { pointerId: 1, clientX: 10, clientY: 10 });
    fireEvent.pointerMove(hi, { pointerId: 1, clientX: 35, clientY: 20 });
    fireEvent.pointerUp(hi, { pointerId: 1 });

    expect(transformOf("heading-0")).toBe("translate3d(25px, 10px, 0)");
    expect(comma.style.transform).toBe("translate3d(0px, 0px, 0)");
  });

  it("moves punctuation independently from its word", () => {
    render(<Harness />);
    const hi = screen.getByTestId("token-heading-0");
    const comma = screen.getByTestId("token-heading-1");

    fireEvent.pointerDown(comma, { pointerId: 2, clientX: 5, clientY: 5 });
    fireEvent.pointerMove(comma, { pointerId: 2, clientX: 15, clientY: 25 });
    fireEvent.pointerUp(comma, { pointerId: 2 });

    expect(comma.style.transform).toBe("translate3d(10px, 20px, 0)");
    expect(hi.style.transform).toBe("translate3d(0px, 0px, 0)");
  });

  it("selects tokens with Page Down and moves the selection with arrow keys", () => {
    render(<Harness />);
    const group = screen.getByRole("group", { name: /Move words in the introduction/i });

    fireEvent.keyDown(group, { key: "PageDown" });
    fireEvent.keyDown(group, { key: "ArrowRight" });

    expect(transformOf("heading-1")).toBe("translate3d(5px, 0px, 0)");
    expect(screen.getByRole("status").textContent).toContain(
      ", is 5 pixels horizontally and 0 pixels vertically",
    );
  });

  it("resets the selected token with Home", () => {
    render(<Harness />);
    const group = screen.getByRole("group", { name: /Move words in the introduction/i });

    fireEvent.keyDown(group, { key: "ArrowDown", shiftKey: true });
    expect(transformOf("heading-0")).toBe("translate3d(0px, 20px, 0)");
    fireEvent.keyDown(group, { key: "Home" });

    expect(transformOf("heading-0")).toBe("translate3d(0px, 0px, 0)");
  });

  it("exposes the complete introduction to assistive technology", () => {
    render(<Harness />);
    expect(screen.getByRole("heading", { name: "Hi, I'm Andrew!" })).toBeTruthy();
    expect(screen.getByText("I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.")).toBeTruthy();
  });
});

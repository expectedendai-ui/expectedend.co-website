import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SongGate } from ".";

describe("SongGate", () => {
  it("introduces the track selector with the requested archive note", () => {
    render(<SongGate leaving={false} onPick={vi.fn()} />);

    expect(screen.getByText("2021-2025")).toBeInTheDocument();
    expect(screen.getByText("- I got bored, and my iCloud storage was full.")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SongGate } from ".";

describe("SongGate", () => {
  it("introduces the track selector with the requested archive note", () => {
    render(<SongGate leaving={false} onPick={vi.fn()} />);

    expect(screen.getByText("2021-2025")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Read Me..." })).toBeInTheDocument();
  });

  it("opens the easter egg from Read Me and closes it again", () => {
    render(<SongGate leaving={false} onPick={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Read Me..." }));
    expect(screen.getByRole("dialog", { name: "Read Me" })).toHaveTextContent("You found the Easter egg!");

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

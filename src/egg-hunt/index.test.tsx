import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import manifest from "~/src/artworks/manifest.json";
import { EGG_COUNT, EggHunt, FoundBurst } from ".";
import { claimEgg, resetEggs } from "./store";

const eggUrls = (manifest as { url: string; egg?: boolean }[]).filter((m) => m.egg).map((m) => m.url);

describe("EggHunt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    resetEggs();
  });
  afterEach(() => vi.useRealTimers());

  it("hides five eggs on photos in the manifest", () => {
    expect(EGG_COUNT).toBe(5);
  });

  it("counts each photo's egg once and celebrates when all are found", () => {
    render(<EggHunt />);
    expect(screen.getByText(`0/${EGG_COUNT}`)).toBeInTheDocument();

    act(() => claimEgg(eggUrls[0], 100, 100));
    act(() => claimEgg(eggUrls[0], 100, 100));
    expect(screen.getByText(`1/${EGG_COUNT}`)).toBeInTheDocument();

    for (const url of eggUrls.slice(1)) act(() => claimEgg(url, 100, 100));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("dialog", { name: "All eggs found" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("ee-egg-hunt-found") ?? "[]")).toHaveLength(EGG_COUNT);
  });

  it("shows the found-it moment and then gets out of the way", () => {
    render(<FoundBurst />);
    expect(screen.getByText("You found the hidden art world.")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(4700));
    expect(screen.queryByText("You found the hidden art world.")).not.toBeInTheDocument();
  });
});

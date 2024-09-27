import '@testing-library/jest-dom'
import { CalcStartAndEnd } from "@/utils/calcStartAndEnd";

describe('CalculateStartAndEnd', () => {
  it("Start and end should be 0-20", () => {
    // mock search params string for search page
    const [start, end] = CalcStartAndEnd("0");

    expect(start).toBe(0);
    expect(end).toBe(20);
  })

  it("Start and end should be 20-40", () => {
    const [start, end] = CalcStartAndEnd("20");

    expect(start).toBe(20);
    expect(end).toBe(40);
  })

  it("Start and end should be 40-60 as input should be rounded to nearest multiple of 20", () => {
    const [start, end] = CalcStartAndEnd("45");

    expect(start).toBe(40);
    expect(end).toBe(60);
  })

  it("Start and end should default to 0-20 for invalid text inputs", () => {
    const [start, end] = CalcStartAndEnd("test");

    expect(start).toBe(0);
    expect(end).toBe(20);
  })

  it("Start and end should default to 0-20 for invalid number inputs", () => {
    const [start, end] = CalcStartAndEnd("-50");

    expect(start).toBe(0);
    expect(end).toBe(20);
  })

  it("Start and end should default to 0-20 for range exceeding numbers", () => {
    const [start, end] = CalcStartAndEnd("500_000_000_000_000_000");

    expect(start).toBe(0);
    expect(end).toBe(20);
  })
});

import { describe, it, expect } from "vitest";
import cryptoReducer, { setCoins, setLoading, setError } from "./cryptoSlice";

describe("cryptoSlice", () => {
  it("starts with the correct initial state", () => {
    expect(cryptoReducer(undefined, { type: "init" })).toEqual({
      coins: [],
      isLoading: false,
      error: "",
    });
  });

  it("stores cryptocurrency data", () => {
    const coins = [{ id: "bitcoin", name: "Bitcoin" }];
    const state = cryptoReducer(undefined, setCoins(coins));

    expect(state.coins).toEqual(coins);
  });

  it("updates the loading status", () => {
    const state = cryptoReducer(undefined, setLoading(true));

    expect(state.isLoading).toBe(true);
  });

  it("stores an error message", () => {
    const state = cryptoReducer(undefined, setError("Unable to load data"));

    expect(state.error).toBe("Unable to load data");
  });
});

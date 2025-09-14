// @vitest-environment jsdom
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";
import { describe, it, beforeEach, vi, expect, afterEach } from "vitest";
import { useCart } from "../../Hooks/useCart";

describe("Product component cart actions", () => {
  it("calls addToCart when cart button is clicked and product is not in cart", async () => {
    // Remove cartItem so product is not in cart
    vi.doMock("../../Hooks/useCart", () => ({
      useCart: () => ({
        addToCart: { mutateAsync: vi.fn(), isLoading: false },
        removeFromCart: { mutateAsync: vi.fn(), isLoading: false },
        cart: { data: { items: [] } },
      }),
    }));
    render(
      React.createElement(MemoryRouter, null, React.createElement(Product, null))
    );
    const cartButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(cartButton);
    await waitFor(() => {
      expect(useCart().addToCart.mutateAsync).toHaveBeenCalled();
    });
  });

  it("calls removeFromCart when cart button is clicked and product is in cart", async () => {
    render(
      React.createElement(MemoryRouter, null, React.createElement(Product, null))
    );
    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);
    await waitFor(() => {
      expect(useCart().removeFromCart.mutateAsync).toHaveBeenCalledWith("cartItem1");
    });
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DataTable } from "./DataTable";
import "@testing-library/jest-dom";

const mockData = [
  { id: 1, name: "Apple", category: "Fruit", price: 1.2 },
  { id: 2, name: "Banana", category: "Fruit", price: 0.8 },
  { id: 3, name: "Carrot", category: "Vegetable", price: 0.5 },
];

const mockColumns = [
  { key: "name", label: "Name", type: "string" as const },
  { key: "category", label: "Category", type: "string" as const },
  { key: "price", label: "Price", type: "number" as const },
];

describe("DataTable", () => {
  it("renders correctly with data", () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Carrot")).toBeInTheDocument();
  });

  it("filters data based on search input", async () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const searchInput = screen.getByPlaceholderText("Search data...");
    fireEvent.change(searchInput, { target: { value: "Apple" } });
    
    expect(screen.getByText("Apple")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Banana")).not.toBeInTheDocument();
    });
  });

  it("sorts data when column header is clicked", () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const nameHeader = screen.getByText("Name");
    
    // Initial order: Apple, Banana, Carrot
    const rowsBefore = screen.getAllByRole("row").slice(1); // skip header
    expect(rowsBefore[0]).toHaveTextContent("Apple");
    
    // Sort descending (click twice: once for asc, once for desc)
    fireEvent.click(nameHeader);
    fireEvent.click(nameHeader);
    
    const rowsAfter = screen.getAllByRole("row").slice(1);
    expect(rowsAfter[0]).toHaveTextContent("Carrot");
  });

  it("shows empty state when no results match", () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const searchInput = screen.getByPlaceholderText("Search data...");
    fireEvent.change(searchInput, { target: { value: "Zucchini" } });
    
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});

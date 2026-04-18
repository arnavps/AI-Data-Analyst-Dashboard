import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FileUploader } from "./FileUploader";
import "@testing-library/jest-dom";
import Papa from "papaparse";

// Mock PapaParse
jest.mock("papaparse", () => ({
  parse: jest.fn((file, config) => {
    config.complete({
      data: [{ name: "Test", value: 10 }],
      meta: { fields: ["name", "value"] },
    });
  }),
}));

// Mock Sonner toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("FileUploader", () => {
  it("renders correctly", () => {
    render(<FileUploader />);
    expect(screen.getByText("Drag CSV file here")).toBeInTheDocument();
  });

  it("handles file drop and parsing", async () => {
    const onSuccess = jest.fn();
    const { container } = render(<FileUploader onSuccess={onSuccess} />);
    
    const file = new File(["name,value\nTest,10"], "test.csv", { type: "text/csv" });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    // Check if analyzing state appears
    await waitFor(() => {
      expect(screen.getByText(/Analyzing data/i)).toBeInTheDocument();
    });
  });
});

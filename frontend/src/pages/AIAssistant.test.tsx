import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AIAssistant from "./AIAssistant";

describe("AI Assistant page", () => {
  it("renders the AI recruitment assistant", () => {
    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/AI Recruitment Assistant/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Ask DevHire AI/i),
    ).toBeInTheDocument();
  });

  it("renders suggested recruitment questions", () => {
    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Which jobs require Python/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Find candidates with FastAPI skills/i),
    ).toBeInTheDocument();
  });

  it("renders the AI query input and button", () => {
    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText(/Ask about candidates, jobs, skills/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Ask AI/i }),
    ).toBeInTheDocument();
  });
});
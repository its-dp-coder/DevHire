import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";

import AIAssistant from "./AIAssistant";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("AI Assistant page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the AI recruitment assistant", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: [],
    } as any);

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

    await waitFor(() => {
      expect(
        screen.getByText(/Which jobs require Python/i),
      ).toBeInTheDocument();
    });
  });

  it("renders suggested recruitment questions", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: [],
    } as any);

    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Which jobs require Python/i),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Find candidates with relevant skills/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Which candidates match my jobs/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Help me review the available candidates/i),
    ).toBeInTheDocument();
  });

  it("renders the AI query input and button", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: [],
    } as any);

    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText(
        /Ask about candidates, jobs, skills/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Ask AI/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/Which jobs require Python/i),
      ).toBeInTheDocument();
    });
  });
});
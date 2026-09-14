import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AIAssistant from "./AIAssistant";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe("AI Assistant interactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends a recruitment query and displays the AI response", async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: {
        answer: "Python Backend Developer requires Python and FastAPI.",
        sources: [
          "Job: Python Backend Developer. Required skills: Python, FastAPI.",
        ],
      },
    });

    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(
      /ask about candidates, jobs, skills/i,
    );

    fireEvent.change(input, {
      target: {
        value: "Which jobs require Python?",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /ask ai/i,
      }),
    );

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        "/ai/ask",
        {
          query: "Which jobs require Python?",
        },
      );
    });

    expect(
      await screen.findByText(
        /Python Backend Developer requires Python and FastAPI/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/retrieved sources/i),
    ).toBeInTheDocument();
  });

  it("displays an API error message", async () => {
    mockedApi.post.mockRejectedValueOnce({
      response: {
        data: {
          detail: "Unable to process recruitment query.",
        },
      },
    });

    render(
      <MemoryRouter>
        <AIAssistant />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(
      /ask about candidates, jobs, skills/i,
    );

    fireEvent.change(input, {
      target: {
        value: "Find Python candidates",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /ask ai/i,
      }),
    );

    expect(
      await screen.findByText(
        /Unable to process recruitment query/i,
      ),
    ).toBeInTheDocument();
  });
});
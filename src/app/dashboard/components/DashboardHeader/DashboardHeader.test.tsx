import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardHeader from "./DashboardHeader";

describe("DashboardHeader", () => {
  it("renders the user's name", () => {
    render(<DashboardHeader name="Maria" />);
    expect(screen.getByText(/Olá, Maria! :]/i)).toBeInTheDocument();
  });

  it("renders the welcome message", () => {
    render(<DashboardHeader name="João" />);
    expect(screen.getByText(/Bem vinda de volta!/i)).toBeInTheDocument();
  });
  it("renders the formatted current date in pt-BR", () => {
    render(<DashboardHeader name="Ana" />);
    const currentDate = new Date();
    const weekday = currentDate.toLocaleDateString("pt-BR", {
      weekday: "long",
    });
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${weekday}, ${day}/${month}/${year}`;

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});

// src/app/api/accounts/findByUserIdProxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "O parâmetro userId é obrigatório" },
      { status: 400 }
    );
  }

  const externalApiUrl = `http://localhost:4000/accounts/findByUserId?userId=${encodeURIComponent(
    userId
  )}`;

  try {
    const apiResponse = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      let errorDetail = `Erro na API externa de contas: ${apiResponse.status} ${apiResponse.statusText}`;
      try {
        const errorBody = await apiResponse.json();
        if (errorBody && errorBody.message) {
          errorDetail = String(errorBody.message);
        } else if (typeof errorBody === "string") {
          errorDetail = errorBody;
        }
      } catch (e) {
        console.log("Erro ao analisar a resposta da API externa de contas:", e);
      }
      return NextResponse.json(
        { error: errorDetail },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no proxy da API de contas:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição proxy de contas." },
      { status: 500 }
    );
  }
}

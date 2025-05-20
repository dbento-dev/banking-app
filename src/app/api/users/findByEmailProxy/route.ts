// src/app/api/users/findByEmailProxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
  }

  const externalApiUrl = `http://localhost:4000/users/findByEmail?email=${encodeURIComponent(
    email
  )}`;

  try {
    const apiResponse = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      let errorMessage = `Erro ao buscar dados do usuário na API externa: ${apiResponse.status} ${apiResponse.statusText}`;
      try {
        const errorBody = await apiResponse.json();
        if (errorBody && errorBody.message) {
          errorMessage = errorBody.message;
        } else if (typeof errorBody === "string") {
          errorMessage = errorBody;
        }
      } catch (e) {
        console.log("Erro ao analisar a resposta da API externa:", e);
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no proxy da API:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição proxy." },
      { status: 500 }
    );
  }
}

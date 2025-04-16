import { NextResponse } from "next/server";

export async function middleware(request) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = new URL(request.url);
  const currentPath = url.pathname;

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    const res = await fetch(`${backendUrl}/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const user = await res.json();

    if (!user.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Restrict access to admin area
    if (currentPath.startsWith("/admin") && user.role !== "ADMIN") {
      return unauthorizedResponse(
        "This area is restricted to salon administrators only."
      );
    }

    const response = NextResponse.next();
    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

function unauthorizedResponse(message) {
  return new NextResponse(
    `<html>
      <head>
        <title>Unauthorized Access - Aurora Elegance</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          :root {
            --gold: #D4AF37;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            background: #000000;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: white;
          }
          
          .container {
            max-width: 450px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            padding: 40px 32px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            text-align: center;
          }
          
          h1 {
            color: var(--gold);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 12px;
          }
          
          p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 16px;
            line-height: 1.625;
            margin-bottom: 32px;
          }
          
          .buttons {
            display: flex;
            gap: 12px;
            justify-content: center;
          }
          
          button {
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .back-button {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .back-button:hover {
            background: rgba(255, 255, 255, 0.15);
          }
          
          .login-button {
            background: var(--gold);
            color: black;
            border: none;
          }
          
          .login-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
          }
          
          a {
            text-decoration: none;
            color: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Unauthorized Access</h1>
          <p>${message}</p>
          <div class="buttons">
            <button onclick="history.back()" class="back-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            <button class="login-button">
              <a href="/signin">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </a>
            </button>
          </div>
        </div>
      </body>
    </html>`,
    {
      status: 403,
      headers: { "Content-Type": "text/html" },
    }
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};

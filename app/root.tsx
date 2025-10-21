import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Mensaje } from "./components/common/Mensaje";
import { Header } from "./components/common/Header";
import { useMensaje } from "./hooks/useMensaje";

// Layout maneja el <html> y <body>
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Torneo de Robótica INACAP 2025</title>
        <Meta />
        <Links />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Root solo maneja el contenido de la app
export default function Root() {
  const { mensaje } = useMensaje();

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
      }}
    >
      <div className="container-fluid p-4">
        <Mensaje mensaje={mensaje ? mensaje : null} />
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

import { Button, Input } from "@/components/ui";

export default function DevUiPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-brand-primary">
          Jeny Fit — primitivos UI
        </h1>
        <p className="text-sm text-text-muted">
          Página de prueba interna (M2-08). No es una pantalla de producto.
        </p>
      </header>

      <section
        aria-labelledby="inputs-heading"
        className="flex flex-col gap-4 rounded-lg bg-surface-card p-6 shadow-sm"
      >
        <h2
          id="inputs-heading"
          className="text-sm font-semibold text-text-secondary"
        >
          Input
        </h2>
        <Input label="Correo" type="email" placeholder="jeny@ejemplo.com" />
        <Input label="Nombre" type="text" placeholder="Tu nombre" />
        <Input label="Contraseña" type="password" placeholder="••••••••" />
      </section>

      <section
        aria-labelledby="buttons-heading"
        className="flex flex-col gap-4 rounded-lg bg-surface-card p-6 shadow-sm"
      >
        <h2
          id="buttons-heading"
          className="text-sm font-semibold text-text-secondary"
        >
          Button
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Iniciar sesión</Button>
          <Button variant="secondary">Cancelar</Button>
        </div>
        <Button variant="primary" className="w-full" type="submit">
          Continuar
        </Button>
      </section>
    </main>
  );
}

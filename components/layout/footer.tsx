export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} — Built with Next.js & Sanity
        </p>
        <p className="text-sm text-muted">Social links coming soon</p>
      </div>
    </footer>
  );
}

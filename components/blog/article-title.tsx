import { cn } from "@/lib/utils";

type Props = {
  title: string;
  titleAccent: string | null;
  className?: string;
};

export function ArticleTitle({ title, titleAccent, className }: Props) {
  if (!titleAccent || !title.includes(titleAccent)) {
    return (
      <h1
        className={cn(
          "font-display text-4xl font-bold tracking-tighter text-foreground md:text-7xl lg:text-8xl",
          "animate-fade-up mb-12 leading-[0.9]",
          className,
        )}
      >
        {title}
      </h1>
    );
  }

  const i = title.indexOf(titleAccent);
  const before = title.slice(0, i);
  const after = title.slice(i + titleAccent.length);

  return (
    <h1
      className={cn(
        "font-display text-4xl font-bold tracking-tighter text-foreground md:text-7xl lg:text-8xl",
        "animate-fade-up mb-12 leading-[0.9]",
        className,
      )}
    >
      {before}
      <span className="text-primary italic">{titleAccent}</span>
      {after}
    </h1>
  );
}

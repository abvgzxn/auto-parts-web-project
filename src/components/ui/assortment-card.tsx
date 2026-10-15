import type { Category } from "@/types/category";

type AssortmentCardProps = {
  category: Category;
};

export default function AssortmentCard({
  category
}: AssortmentCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-6">
      <h3 className="text-xl font-semibold text-brand-navy">
        {category.title}
      </h3>

      <p className="mt-3 leading-6 text-muted">
        {category.description}
      </p>
    </article>
  );
}
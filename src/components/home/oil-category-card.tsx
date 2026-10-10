type OilCategoryCardProps = {
  title: string;
  description: string;
};

export default function OilCategoryCard({
  title,
  description,
}: OilCategoryCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 text-brand-navy">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted">
        {description}
      </p>
    </article>
  );
}
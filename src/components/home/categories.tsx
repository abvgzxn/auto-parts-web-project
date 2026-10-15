import AssortmentCard from "@/components/ui/assortment-card";
import type { Category } from "@/types/category";

const categories: Category[] = [
  {
    id: "parts",
    title: "Запчасти для иномарок",
    description: "Фильтры, свечи, ремни, тормозные колодки и детали подвески для распространённых иномарок.",
  },
  {
    id: "oils",
    title: "Автомасла",
    description: "Масла для двигателя, ГУР, КП и АКПП. Большой ассортимент моторных масел в наличии.",
  },
  {
    id: "chemicals",
    title: "Автохимия",
    description: "Большой выбор автохимии для вашего автомобиля.",
  },
  {
    id: "equipment",
    title: "Для мототехники и лодочных моторов",
    description: "Масла и расходники для лодочных моторов, мотоциклов, квадроциклов и зимней техники.",
  },
  {
    id: "garden",
    title: "Для садовой техники",
    description: "Масла и свечи для триммеров и газонокосилок.",
  },
  {
    id: "trailers",
    title: "Для прицепов",
    description: "Запчасти для автомобильных и лодочных прицепов.",
  },
  {
    id: "accessories",
    title: "Инструмент и аксессуары",
    description: "Автоинструмент, автоаксессуары, автосвет, автозвук и автостёкла.",
  },
  {
    id: "to-order",
    title: "Детали, шины и диски под заказ",
    description: "Наличие и срок доставки конкретной позиции уточняйте в магазине.",
  },
];

export default function Categories() {
  return (
    <section
      id="assortment"
      className="assortment-brand-border"
      aria-labelledby="categories-title"
    >
      <h2
        id="categories-title"
        className="text-3xl font-bold text-brand-navy"
      >
        Ассортимент Wellcar
      </h2>

      <p className="mt-4 max-w-2xl text-muted">
        Запчасти, моторные масла и расходные материалы
        для автомобилей и другой техники. Наличие конкретного товара
        уточняйте у продавца.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {categories.map((category) => (
            <AssortmentCard
            key={category.id}
            category={category}
            />
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
        В рекламных материалах указан срок доставки от одного дня.
        Возможность и срок поставки зависят от позиции — уточните их у продавца перед заказом.
      </p>
      <a href="#selection" className="mt-4 inline-flex min-h-12 items-center font-semibold text-brand-navy underline underline-offset-4">
        Связаться с магазином
      </a>
    </section>
  );
}

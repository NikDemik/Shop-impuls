"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import UpsImage from "@/components/UpsImage";
import ProductImage from "@/components/ProductImage";
import { formatPriceShort } from "@/lib/format";
import { IconArrowRight } from "@/components/icons";

export type HeroProduct = {
  slug: string;
  name: string;
  powerKva: number | null;
  image: string | null;
  priceKopecks: number | null;
};

const SLIDE_MS = 7000;

/**
 * Локальные вырезы товаров (прозрачные PNG, белый фон удалён) для
 * композиции слайда 03. Отсутствие записи → фолбэк на фото с площадки.
 */
const HERO_CUTOUTS: Record<string, string> = {
  "slim-500": "/images/hero/slim-500.png",
  "master-600": "/images/hero/master-600.png",
  "yunior-600-0-6-kva": "/images/hero/yunior-600.png",
};

/** Тень+свечение для парящих товаров */
const CUTOUT_SHADOW: CSSProperties = {
  filter:
    "drop-shadow(0 18px 22px rgba(0,0,0,0.5)) drop-shadow(0 0 26px rgba(242,130,50,0.16))",
};

export default function HeroSlider({ products = [] }: { products?: HeroProduct[] }) {
  const slideCount = products.length > 0 ? 3 : 2;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Автосмена; интервал пересоздаётся при ручном переключении, отсчёт каждый раз с нуля
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slideCount), SLIDE_MS);
    return () => clearInterval(id);
  }, [active, paused, slideCount]);

  return (
    <section
      className="hero-grid diag-lines relative overflow-hidden bg-brand-950 text-paper"
      aria-roledescription="карусель"
      aria-label="Баннеры главной"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-glow absolute inset-0" />

      {/* «Призрачное» слово фоном, как в референсе */}
      <div
        aria-hidden="true"
        className="ghost-word pointer-events-none absolute -right-6 top-10 hidden select-none text-[10rem] xl:block"
      >
        Импульс
      </div>

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Слайды лежат в одной ячейке grid: контейнер по самому высокому слайду, без прыжков высоты */}
        <div className="grid">
          {Array.from({ length: slideCount }, (_, i) => (
            <div
              key={i}
              inert={active !== i}
              aria-hidden={active !== i}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out ${
                active === i ? "opacity-100" : "pointer-events-none opacity-0"
              } ${i === 2 ? "self-center" : ""}`}
            >
              {i === 0 ? (
                <SlideBrand active={active === i} />
              ) : i === 1 ? (
                <SlideSolutions active={active === i} />
              ) : (
                <SlideProducts active={active === i} products={products} />
              )}
            </div>
          ))}
        </div>

        {/* Вертикальная нумерация слайдов справа (desktop), как в референсе */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Слайд ${i + 1} из ${slideCount}`}
              aria-current={active === i}
              className={`section-num text-xl transition ${
                active === i
                  ? "text-accent-400"
                  : "text-paper/25 hover:text-paper/60"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        {/* Точки-переключатели (мобильные) */}
        <div className="relative flex justify-center gap-2 pb-6 lg:hidden">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Слайд ${i + 1} из ${slideCount}`}
              aria-current={active === i}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                active === i
                  ? "w-8 bg-accent-400"
                  : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Слайд 1: промо бренда ─── */

function SlideBrand({ active }: { active: boolean }) {
  return (
    <div
      className={`grid gap-12 pb-16 pt-16 transition-all duration-700 ease-out sm:pb-16 sm:pt-16 lg:grid-cols-2 lg:items-center lg:pb-20 lg:pt-20 ${
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div>
        <div className="section-num text-6xl text-accent-400 sm:text-7xl" data-reveal="up">01</div>
        <div className="label-caps mt-4 text-accent-400" data-reveal="up" data-reveal-delay="60">
          Источники бесперебойного питания ИМПУЛЬС
        </div>
        <h1 className="heading-caps mt-5 text-4xl sm:text-6xl lg:text-[4.2rem]" data-reveal="heading" data-reveal-delay="100">
          Бесперебойное питание для дома, бизнеса и промышленности
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65" data-reveal="up" data-reveal-delay="180">
          Полная линейка ИБП ИМПУЛЬС — от 0,45 кВА до 2 МВА: компьютеры и котлы,
          серверные и ЦОД, медицина и производство. Официальный магазин бренда,
          доставка по всей России.
        </p>
        <div className="mt-8 flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="240">
          <Link
            href="/catalog"
            className="flex items-center gap-2 bg-accent-400 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-brand-950 transition hover:bg-accent-300"
          >
            Перейти в каталог <IconArrowRight />
          </Link>
          <Link
            href="/#series"
            className="flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-paper/85 transition hover:border-accent-400 hover:text-accent-400"
          >
            Серии ИБП
          </Link>
        </div>

        <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3" data-reveal="up" data-reveal-delay="300">
          <div>
            <div className="section-num text-4xl text-accent-400">30</div>
            <div className="mt-1 text-xs leading-snug text-paper/55">
              серий ИБП в каталоге
            </div>
          </div>
          <div>
            <div className="section-num text-4xl text-accent-400">500+</div>
            <div className="mt-1 text-xs leading-snug text-paper/55">
              моделей от 0,45 кВА до 2 МВА
            </div>
          </div>
          <div>
            <div className="section-num text-4xl text-accent-400">2 года</div>
            <div className="mt-1 text-xs leading-snug text-paper/55">
              гарантии на оборудование
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end" data-reveal="img" data-reveal-delay="200">
        <div className="absolute right-4 top-6 hidden text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-paper/35 lg:block">
          Защита
          <br />
          электропитания
          <br />
          24/7
        </div>
        <UpsImage
          tone="dark"
          className="mt-10 w-52 sm:w-60 lg:mt-14 lg:w-72"
        />
      </div>
    </div>
  );
}

/* ─── Слайд 2: решения по отраслям ─── */

function SlideSolutions({ active }: { active: boolean }) {
  const items = [
    { href: "/solutions/server", title: "Серверные и ЦОД", desc: "On-line ИБП двойного преобразования для непрерывности IT-инфраструктуры" },
    { href: "/solutions/medicina", title: "Медицина", desc: "Чистое питание медицинского оборудования и лабораторий" },
    { href: "/solutions/kotly", title: "Котлы и насосы", desc: "Резерв питания отопления и водоснабжения частного дома" },
    { href: "/solutions/promyshlennost", title: "Промышленность", desc: "ИБП для станков, производственных линий и телеком-узлов" },
  ];

  return (
    <div
      className={`grid gap-12 pb-16 pt-16 transition-all duration-700 ease-out sm:pb-16 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-20 lg:pt-20 ${
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div>
        <div className="section-num text-6xl text-accent-400 sm:text-7xl">02</div>
        <div className="label-caps mt-4 text-accent-400">Решения по отраслям</div>
        <h2 className="heading-caps mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]">
          Подберём ИБП под вашу задачу
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65">
          От небольшого бесперебойника для ПК до промышленных систем питания
          ЦОД — каталог разделён по областям применения, чтобы выбор занял
          пару минут.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/solutions"
            className="flex items-center gap-2 bg-accent-400 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-brand-950 transition hover:bg-accent-300"
          >
            Все решения <IconArrowRight />
          </Link>
          <Link
            href="/kb"
            className="flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-paper/85 transition hover:border-accent-400 hover:text-accent-400"
          >
            Как выбрать ИБП
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-white/10 bg-brand-900/60 p-5 transition hover:border-accent-400/50 hover:bg-brand-800"
          >
            <div className="text-sm font-bold">{s.title}</div>
            <p className="mt-2 text-xs leading-relaxed text-paper/60">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Слайд 3: популярные модели — плавающие товары с выносками ─── */

function SlideProducts({ active, products }: { active: boolean; products: HeroProduct[] }) {
  const bySlug = (slug: string) => products.find((p) => p.slug === slug);
  const slim = bySlug("slim-500");
  const master = bySlug("master-600");
  const yunior = bySlug("yunior-600-0-6-kva");

  const price = (p: HeroProduct) =>
    p.priceKopecks !== null ? formatPriceShort(p.priceKopecks) : "цена по запросу";

  /** Локальный вырез; если для slug нет PNG — фото с площадки */
  const cutout = (p: HeroProduct) => HERO_CUTOUTS[p.slug];

  return (
    <div
      className={`grid gap-12 pb-16 pt-16 transition-all duration-700 ease-out sm:pb-16 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-20 lg:pt-20 ${
        active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div>
        <div className="section-num text-6xl text-accent-400 sm:text-7xl">03</div>
        <div className="label-caps mt-4 text-accent-400">Хиты продаж</div>
        <h2 className="heading-caps mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]">
          Популярные модели
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65">
          От компактного ЮНИОР для дома и офиса до серверного СЛИМ в стойку 19″.
          Цены — сразу на сайте, отгрузка со склада в Москве.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="flex items-center gap-2 bg-accent-400 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-brand-950 transition hover:bg-accent-300"
          >
            Смотреть все товары <IconArrowRight />
          </Link>
        </div>
      </div>

      {/* Desktop: композиция из парящих товаров с выносками */}
      <div className="relative hidden h-[430px] select-none pr-10 lg:block">
        {/* оранжевое свечение позади товаров */}
        <div aria-hidden="true" className="absolute left-[38%] top-[34%] h-80 w-80 rounded-full bg-accent-400/20 blur-[90px]" />

        {/* тонкие рамки-квадраты в стиле SQUADRO */}
        <div aria-hidden="true" className="absolute left-[28%] top-[20%] aspect-square w-[40%] border border-white/10" />
        <div aria-hidden="true" className="absolute right-[8%] top-[6%] aspect-square w-[24%] border border-white/15" />
        <div aria-hidden="true" className="absolute left-[27%] top-[19%] h-2 w-2 bg-accent-400" />
        <div aria-hidden="true" className="absolute bottom-[18%] right-[10%] h-2 w-2 bg-accent-400" />

        {/* СЛИМ 500 — центральный */}
        {slim && cutout(slim) && (
          <Link
            href={`/product/${slim.slug}`}
            className="absolute left-[26%] top-[44%] w-[46%] transition hover:brightness-110"
            style={CUTOUT_SHADOW}
            title={slim.name}
          >
            <span className="hero-float block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cutout(slim)} alt={slim.name} className="w-full" />
            </span>
          </Link>
        )}
        {/* МАСТЕР 600 — слева ниже */}
        {master && cutout(master) && (
          <Link
            href={`/product/${master.slug}`}
            className="absolute bottom-[12%] left-0 w-[26%] transition hover:brightness-110"
            style={CUTOUT_SHADOW}
            title={master.name}
          >
            <span className="hero-float block [animation-delay:-1.6s]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cutout(master)} alt={master.name} className="w-full" />
            </span>
          </Link>
        )}
        {/* ЮНИОР СМАРТ 600 — справа выше */}
        {yunior && cutout(yunior) && (
          <Link
            href={`/product/${yunior.slug}`}
            className="absolute right-[6%] top-0 w-[23%] transition hover:brightness-110"
            style={CUTOUT_SHADOW}
            title={yunior.name}
          >
            <span className="hero-float block [animation-delay:-0.8s]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cutout(yunior)} alt={yunior.name} className="w-full" />
            </span>
          </Link>
        )}

        {/* выноски-аннотации (текстовые дубли ссылок — только для чтения) */}
        {master && (
          <span aria-hidden="true" className="absolute left-[2%] top-[26%]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent-400" />
              <span className="h-px w-14 bg-gradient-to-r from-accent-400/80 to-accent-400/0" />
            </span>
            <span className="label-caps mt-2 block text-[11px] text-paper/80">
              {master.name}
            </span>
            <span className="section-num mt-0.5 block text-lg text-accent-400">
              {price(master)}
            </span>
          </span>
        )}
        {slim && (
          <span aria-hidden="true" className="absolute left-[48%] top-[64%]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent-400" />
              <span className="h-px w-14 bg-gradient-to-r from-accent-400/80 to-accent-400/0" />
            </span>
            <span className="label-caps mt-2 block text-[11px] text-paper/80">
              {slim.name}
            </span>
            <span className="section-num mt-0.5 block text-lg text-accent-400">
              {price(slim)}
            </span>
          </span>
        )}
        {yunior && (
          <span aria-hidden="true" className="absolute right-[11%] top-[31%]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent-400" />
              <span className="h-px w-14 bg-gradient-to-r from-accent-400/80 to-accent-400/0" />
            </span>
            <span className="label-caps mt-2 block text-[11px] text-paper/80">
              {yunior.name}
            </span>
            <span className="section-num mt-0.5 block text-lg text-accent-400">
              {price(yunior)}
            </span>
          </span>
        )}
      </div>

      {/* Mobile: упрощённый ряд вырезов без выносок */}
      <div className="relative grid grid-cols-3 items-end gap-3 lg:hidden">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/15 blur-[70px]" />
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group flex flex-col items-center text-center"
          >
            <span className="flex w-full items-center justify-center" style={CUTOUT_SHADOW}>
              {cutout(p) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cutout(p)} alt={p.name} className="w-full max-w-[140px]" />
              ) : (
                <ProductImage path={p.image} alt={p.name} className="h-20 w-full" />
              )}
            </span>
            <span className="label-caps mt-3 block text-[10px] text-paper/80">{p.name}</span>
            <span className="section-num mt-0.5 block text-sm text-accent-400">
              {price(p)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

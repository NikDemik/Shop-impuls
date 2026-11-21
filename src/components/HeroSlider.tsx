"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UpsImage from "@/components/UpsImage";
import { IconArrowRight } from "@/components/icons";

const SLIDE_MS = 7000;
const SLIDES = 2;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Автосмена; интервал пересоздаётся при ручном переключении, отсчёт каждый раз с нуля
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES), SLIDE_MS);
    return () => clearInterval(id);
  }, [active, paused]);

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
          {[0, 1].map((i) => (
            <div
              key={i}
              inert={active !== i}
              aria-hidden={active !== i}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out ${
                active === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {i === 0 ? (
                <SlideBrand active={active === i} />
              ) : (
                <SlideSolutions active={active === i} />
              )}
            </div>
          ))}
        </div>

        {/* Вертикальная нумерация слайдов справа (desktop), как в референсе */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
          {Array.from({ length: SLIDES }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Слайд ${i + 1} из ${SLIDES}`}
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
          {Array.from({ length: SLIDES }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Слайд ${i + 1} из ${SLIDES}`}
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
        <div className="section-num text-6xl text-accent-400 sm:text-7xl">01</div>
        <div className="label-caps mt-4 text-accent-400">
          Источники бесперебойного питания ИМПУЛЬС
        </div>
        <h1 className="heading-caps mt-5 text-4xl sm:text-6xl lg:text-[4.2rem]">
          Бесперебойное питание для дома, бизнеса и промышленности
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65">
          Полная линейка ИБП ИМПУЛЬС — от 0,45 кВА до 2 МВА: компьютеры и котлы,
          серверные и ЦОД, медицина и производство. Официальный магазин бренда,
          доставка по всей России.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
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

      <div className="relative flex justify-center lg:justify-end">
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

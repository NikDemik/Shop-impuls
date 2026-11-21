"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage";

/** Галерея товара: главное фото + миниатюры изображений с base.sstmk.ru */
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex h-72 items-center justify-center border border-line bg-white p-6 sm:h-96">
        <ProductImage
          path={images[active] ?? null}
          alt={name}
          eager
          className="h-full w-full"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-16 w-20 overflow-hidden border-2 bg-white p-1 transition ${
                active === i ? "border-accent-400" : "border-line hover:border-accent-400/50"
              }`}
            >
              <ProductImage path={img} alt={`${name} — фото ${i + 1}`} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

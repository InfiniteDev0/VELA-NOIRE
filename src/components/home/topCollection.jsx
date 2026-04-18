"use client";

import Link from "next/link";
import { useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function discountedPrice(base, discount) {
  if (!discount || discount === 0) return null;
  return (base * (1 - discount / 100)).toFixed(2);
}

// ── Product card — real data ──────────────────────────────────────────────────

function ProductCard({ product }) {
  const sale = discountedPrice(product.basePrice, product.discount);
  const [activeImg, setActiveImg] = useState(0);

  // Collect all images across all variants + product-level
  const allImages = [
    ...((product.variants?.find((v) => v.isDefault) ?? product.variants?.[0])
      ?.images ?? []),
    ...(product.images ?? []),
  ].filter(Boolean);

  const images = allImages.length > 0 ? allImages : null;

  const prev = (e) => {
    e.preventDefault();
    setActiveImg((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.preventDefault();
    setActiveImg((i) => (i + 1) % images.length);
  };

  // Deduplicated colour swatches
  const swatches = (product.variants ?? []).filter(
    (v, i, arr) => arr.findIndex((x) => x.colorHex === v.colorHex) === i,
  );

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 z-10 bg-white text-black text-xs px-2 py-1 tracking-wide">
            Best Seller
          </span>
        )}

        {images ? (
          <img
            key={images[activeImg]}
            src={images[activeImg]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-zinc-200" />
        )}

        {/* Carousel arrows — only when multiple images */}
        {images && images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow"
              aria-label="Previous image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow"
              aria-label="Next image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block h-[3px] rounded-full transition-all duration-200 ${i === activeImg ? "w-5 bg-white" : "w-3 bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pb-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black text-white text-sm px-8 py-3 rounded-full tracking-wide">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        <p className="text-sm">{product.name}</p>
        <div className="flex items-center gap-2 text-sm">
          {sale ? (
            <>
              <span className="text-zinc-400 line-through">
                ${Number(product.basePrice).toFixed(2)}
              </span>
              <span>${sale}</span>
            </>
          ) : (
            <span>${Number(product.basePrice).toFixed(2)}</span>
          )}
        </div>
        {swatches.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {swatches.slice(0, 5).map((v) => (
              <span
                key={v.id}
                title={v.colorName}
                className="w-4 h-4 rounded-full border border-zinc-300 inline-block"
                style={{ backgroundColor: v.colorHex ?? "#ccc" }}
              />
            ))}
            {swatches.length > 5 && (
              <span className="text-xs text-zinc-400">
                + {swatches.length - 5} More Colors
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

// ── Skeleton placeholder ──────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div>
      <div className="aspect-[3/4] bg-zinc-100 animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-2/3 bg-zinc-100 animate-pulse rounded" />
        <div className="h-4 w-1/3 bg-zinc-100 animate-pulse rounded" />
        <div className="flex gap-1 mt-1">
          <div className="w-4 h-4 rounded-full bg-zinc-100 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-zinc-100 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-zinc-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const TopCollection = ({ collection, products = [] }) => {
  // Best sellers first, then fill remaining slots with skeletons up to 4
  const sorted = [...products].sort(
    (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0),
  );
  const slots = [...sorted, null, null, null, null].slice(0, 4);

  return (
    <section className="py-16 px-5  flex flex-col gap-10">
      {/* Header */}
      <header className="text-center space-y-3">
        {/* <h2 className="text-7xl font-light tracking-tight">
          {collection?.name ?? "Seasonal Collection"}
        </h2> */}
        {collection?.tagline && (
          <p className="text-7xl font-extralight">
            {collection.tagline}
          </p>
        )}
        {collection?.description && (
          <p className="text-sm max-w-xl mx-auto text-zinc-500 leading-relaxed">
            {collection.description}
          </p>
        )}
      </header>

      {/* Hero image */}
      <div className="h-[80vh] w-full overflow-hidden bg-zinc-100">
        {collection?.heroImage && (
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Product grid — 4 slots */}
      <div className="grid grid-cols-4 gap-1">
        {slots.map((product, i) =>
          product ? (
            <ProductCard key={product.id} product={product} />
          ) : (
            <SkeletonCard key={`sk-${i}`} />
          ),
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-2">
        <Link
          href={`/collections/${collection?.slug ?? "seasonal"}`}
          className="border rounded-full bg-black px-10 py-3 text-sm text-shadow-initial hover:bg-zinc-900 text-white transition-colors"
        >
          Shop All
        </Link>
      </div>
    </section>
  );
};

export default TopCollection;

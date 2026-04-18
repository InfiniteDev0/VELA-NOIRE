import React from "react";
import Link from "next/link";

export default function Models({ models = [] }) {
  // Pad to 3 slots so the grid never collapses
  const slots = [...models, null, null, null].slice(0, 3);

  return (
    <section className="bg-zinc-950 pb-20 text-white">
      {/* Header */}
      <div className="py-10 text-center space-y-1.5">
        <h2 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
          Be Modest <br /> With Vela Noire
        </h2>
        <p className="text-sm text-zinc-400 tracking-wide">
          Crafted for the Queens in Every Heart
        </p>
      </div>

      {/* Model grid */}
      <div className="grid grid-cols-3">
        {slots.map((model, i) =>
          model ? (
            <Link
              key={model.id}
              href={`/models/${model.slug}`}
              className="relative group overflow-hidden block"
            >
              {/* Photo */}
              {model.profileImage || model.images?.[0] ? (
                <img
                    src={model.profileImage ?? model.images[0]}

                  alt={model.name}
                  className="w-full h-[65vh] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[65vh] bg-zinc-800" />
              )}

              {/* Dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Name */}
              <div className="absolute bottom-4 left-5">
                <p className="text-sm font-light tracking-widest uppercase text-white/90">
                  {model.name}
                </p>
              </div>
            </Link>
          ) : (
            /* Empty skeleton slot */
            <div key={`empty-${i}`} className="w-full h-[55vh] bg-zinc-900" />
          ),
        )}
      </div>
    </section>
  );
}

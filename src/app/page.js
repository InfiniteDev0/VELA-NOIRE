import Hero from "@/components/home/Hero";
import Models from "@/components/home/models";
import Services from "@/components/home/services";
import Shortucts from "@/components/home/shortcuts";
import TopCollection from "@/components/home/topCollection";
import Link from "next/link";

// Private — server-side only. Never sent to the browser bundle.
// On Vercel, set API_URL to the Railway internal URL for faster SSR.
const API = process.env.API_URL || "http://localhost:4000";

/**
 * Fetch a single collection from the public store API.
 * - Runs server-side only (RSC) — result is cached by Next.js ISR.
 * - 3 s timeout so a cold-start backend never hangs the page render.
 * - Returns null on any failure so the UI can degrade gracefully.
 */
async function getCollection(slug) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`${API}/api/store/collections/${slug}`, {
      signal: controller.signal,
      next: { revalidate: 300 }, // ISR — re-fetch at most every 5 min
    });
    if (!res.ok) return null;
    const { collection } = await res.json();
    return collection;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function getModels(limit = 3) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`${API}/api/store/models?limit=${limit}`, {
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const { models } = await res.json();
    return models ?? [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function getProducts({ collection, limit = 4, isBestSeller } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (collection) params.set("collection", collection);
    if (isBestSeller) params.set("isBestSeller", "true");
    const res = await fetch(`${API}/api/store/products?${params}`, {
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const { products } = await res.json();
    return products ?? [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export default async function HomePage() {
  // Fetch all page data in parallel — total wait = slowest single request,
  // not the sum of all requests.
  const [heroCollection, seasonalCollection, seasonalProducts, models] =
    await Promise.all([
      getCollection("traditions-reimagined"),
      getCollection("seasonal"),
      getProducts({ collection: "seasonal", limit: 4 }),
      getModels(3),
    ]);

  return (
    <div>
      {/* ── Hero — full viewport video/image from DB ── */}
      <Hero
        collection={heroCollection}
        cta={{
          label: "Discover the Collection",
          href: "/collections/traditions-reimagined",
        }}
      />

      {/* ── Brand shortcuts ── */}
      <Shortucts />

      {/* ── Seasonal collection ── */}
      <TopCollection
        collection={seasonalCollection}
        products={seasonalProducts}
      />

      {/* ── Models ── */}
      <Models models={models} />

      {/* ── Lux Infinity ── */}
      <div className="h-fit px-5 space-y-5">
        <header>
          <h1>Collection Header name</h1>
          <p>Collection Header description</p>
        </header>

        <div className="h-[80vh] w-full bg-zinc-100">
          media of collection either image or video i choose,
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product one
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product two
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product three
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product four
          </div>
        </div>

        <button>Discover Lux collection</button>
      </div>

      {/* ── Best Sellers ── */}
      {/* <div className="h-fit px-5 space-y-5">
        <header>
          <h1>Collection Header name</h1>
          <p>Collection Header description</p>
        </header>

        <div className="h-[80vh] w-full bg-zinc-100">
          media of collection either image or video i choose,
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product one
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product two
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product three
          </div>
          <div className="h-[60vh] w-full bg-zinc-100">
            collection product four
          </div>
        </div>

        <button>Discover Best sellers collection</button>
      </div> */}

      <Services />
    </div>
  );
}

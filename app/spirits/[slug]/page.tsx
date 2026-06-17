import { notFound } from "next/navigation";
import { getSpirit, spirits } from "@/lib/data";
import { SpiritGuide } from "@/components/SpiritGuide";

export function generateStaticParams() {
  return Object.keys(spirits).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSpirit(slug);

  if (!s) {
    notFound();
  }

  return (
    <div className="spirit-dark">
      <SpiritGuide spirit={s} slug={slug} />
    </div>
  );
}

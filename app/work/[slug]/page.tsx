import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES } from "@/data/cases";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseDetail from "@/components/CaseDetail";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = CASES.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title.join(" ")} — Ava Studio®`,
    description: item.description,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = CASES.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();

  const item = CASES[index];
  const next = CASES[(index + 1) % CASES.length];

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header start />
      <main>
        <CaseDetail item={item} next={next} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

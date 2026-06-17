import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OTHER_SERVICE_PAGES, getOtherServicePage } from "@/lib/services";
import OtherServicePage from "@/components/OtherServicePage";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return OTHER_SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getOtherServicePage(slug);
  if (!page) return {};
  return {
    title: `${page.label} | Letting Partners`,
    description: page.heroText,
    keywords: [page.label, "property services London", "Letting Partners"],
  };
}

export default async function OtherServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getOtherServicePage(slug);
  if (!page) notFound();
  return <OtherServicePage page={page} />;
}

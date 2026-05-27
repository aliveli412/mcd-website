import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { NewsCoverImage } from "@/components/site/NewsCoverImage";
import { SectionEyebrow } from "@/components/site/SectionParts";
import {
  getNewsBySlug,
  getPublishedNewsSlugs,
} from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

type HaberDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: HaberDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [article, t] = await Promise.all([
    getNewsBySlug(slug),
    getLocale().then((locale) => getMessages(locale)),
  ]);
  if (!article) return { title: t.newsNotFound };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function HaberDetailPage({ params }: HaberDetailPageProps) {
  const { slug } = await params;
  const [article, t] = await Promise.all([
    getNewsBySlug(slug),
    getLocale().then((locale) => getMessages(locale)),
  ]);
  if (!article) notFound();

  return (
    <article className="py-16 md:py-24">
      <SiteContainer className="max-w-3xl">
        <Link
          href="/haberler"
          className="text-sm font-medium text-muted transition-colors hover:text-leaf-green"
        >
          {t.backToNews}
        </Link>

        <div className="mt-8">
          <SectionEyebrow>{article.tag}</SectionEyebrow>
        </div>
        <p className="mt-2 text-sm text-muted">{article.date}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-forest-dark md:text-5xl">
          {article.title}
        </h1>

        {article.imageUrl ? (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-forest-deep/10">
            <NewsCoverImage
              src={article.imageUrl}
              alt={article.title}
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>
        ) : null}

        <p className="mt-10 text-lg leading-relaxed text-ink/90">{article.excerpt}</p>

        {article.body.length > 0 ? (
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/90">
            {article.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        ) : null}

        {article.sourceUrl ? (
          <p className="mt-10 border-t border-black/6 pt-6 text-sm text-muted">
            {t.source}{" "}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-leaf-green hover:underline"
            >
              {article.sourceName ?? t.originalSource}
            </a>
          </p>
        ) : null}
      </SiteContainer>
    </article>
  );
}

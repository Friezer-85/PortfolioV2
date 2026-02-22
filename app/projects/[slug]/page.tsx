import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/util/content";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

function getRedis() {
	if (
		!process.env.UPSTASH_REDIS_REST_URL ||
		!process.env.UPSTASH_REDIS_REST_TOKEN
	) {
		return null;
	}
	return Redis.fromEnv();
}

export async function generateStaticParams() {
	return getAllProjects()
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	let views = 0;
	const redis = getRedis();
	if (redis) {
		try {
			views =
				(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ??
				0;
		} catch {}
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} views={views} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx source={project.content} />
			</article>
		</div>
	);
}

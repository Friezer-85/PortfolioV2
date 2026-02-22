import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "projects");

export type Project = {
    title: string;
    description: string;
    date?: string;
    url?: string;
    repository?: string;
    published: boolean;
    slug: string;
    path: string;
    content: string;
};

export function getAllProjects(): Project[] {
    const files = fs.readdirSync(contentDirectory).filter((f) => f.endsWith(".mdx"));

    return files.map((file) => {
        const filePath = path.join(contentDirectory, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.mdx$/, "");

        return {
            title: data.title,
            description: data.description,
            date: data.date ? String(data.date) : undefined,
            url: data.url,
            repository: data.repository,
            published: data.published ?? false,
            slug,
            path: `/projects/${slug}`,
            content,
        };
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
    return getAllProjects().find((p) => p.slug === slug);
}

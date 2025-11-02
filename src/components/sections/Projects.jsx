// src/components/layout/Projects.jsx
import { useEffect, useState } from "react";
import { getProjects } from "../../api/getProjects";
import projectsData from "../../api/projects.json";

// Helpers to safely read across wp/v2 and acf/v3 payloads
function getTitle(item) {
    const raw = item?.title?.rendered ?? item?.acf?.title ?? "Untitled";
    return typeof raw === "string" ? raw : "";
}

function getImage(item) {
    const media = item?._embedded?.["wp:featuredmedia"];
    if (Array.isArray(media) && media[0]?.source_url) return media[0].source_url;
    // Fallbacks if you store an image field in ACF
    if (item?.acf?.image?.url) return item.acf.image.url;
    if (item?.acf?.thumbnail?.url) return item.acf.thumbnail.url;
    return null;
}

function getDescription(item) {
    const raw =
        item?.excerpt?.rendered ??
        item?.acf?.description ??
        item?.acf?.summary ??
        "";
    return typeof raw === "string" ? raw : "";
}

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                const data = await getProjects({ signal: ac.signal });
                //const data = projectsData; ** if loading from json
                setProjects(Array.isArray(data) ? data : []);
            } catch (e) {
                setErr(e);
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, []);

    if (loading) return <div>Loading…</div>;
    if (err) return <div>Failed to load projects.</div>;

    return (
        <section aria-labelledby="projects-title">
            <h2 id="projects-title">Projects</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "16px",
                }}
            >
                {projects.map((p) => {
                    const title = getTitle(p);
                    const img = getImage(p);
                    const desc = getDescription(p);
                    return (
                        <article key={p.id ?? p.slug} style={{ border: "1px solid #eee", padding: 12 }}>
                            <h3
                                dangerouslySetInnerHTML={{ __html: title }}
                                style={{ marginTop: 0 }}
                            />
                            {img && (
                                <img
                                    src={img}
                                    alt={title.replace(/<[^>]+>/g, "") || "Project image"}
                                    style={{ width: "100%", height: "auto", display: "block" }}
                                    loading="lazy"
                                />
                            )}
                            {desc && (
                                <p
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                    style={{ marginBottom: 0 }}
                                />
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

// src/components/layout/stack.jsx
import { useEffect, useState } from "react";
import { getStack } from "../../api/getStack.js";

function getTitle(item) {
    return item?.acf?.stack_item_name ?? item?.title?.rendered ?? "Untitled";
}

function getIconValue(item) {
    return item?.acf?.stack_item_icon_value ?? null;
}

function getCategory(item) {
    return item?.acf?.stack_category ?? "";
}

function getUrl(item) {
    return item?.acf?.stack_item_url ?? null;
}

function getColor(item) {
    return item?.acf?.stack_item_color ?? "currentColor";
}

function getOrder(item) {
    return parseInt(item?.acf?.stack_order ?? 999);
}


export default function Stack() {
    const [stack, setStack] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                const data = await getStack({ signal: ac.signal });
                // Sort by stack_order
                const sorted = Array.isArray(data)
                    ? data.sort((a, b) => getOrder(a) - getOrder(b))
                    : [];
                setStack(sorted);
            } catch (e) {
                setErr(e);
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, []);

    if (loading) return <div>Loading…</div>;
    if (err) return <div>Failed to load stack.</div>;

    return (
        <section aria-labelledby="stack-title">
            <h2 id="stack-title">stack</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "16px",
                }}
            >
                {stack.map((item) => {
                    const title = getTitle(item);
                    const iconValue = getIconValue(item);
                    const category = getCategory(item);
                    const url = getUrl(item);
                    const color = getColor(item);

                    return (
                        <article
                            key={item.id ?? item.slug}
                            style={{ border: "1px solid #eee", padding: 12 }}
                            data-category={category}
                        >
                            {/* Icon placeholder - we'll add icon component later */}
                            {iconValue && (
                                <div style={{ color: color }}>
                                    {/* Icon will go here */}
                                    <span>{iconValue}</span>
                                </div>
                            )}

                            <h3 style={{ marginTop: 0 }}>
                                {url ? (
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {title}
                                    </a>
                                ) : (
                                    title
                                )}
                            </h3>

                            <small>{category}</small>
                            {iconValue && (
                                <svg style={{ fill: color, width: 48, height: 48 }}>
                                    <use xlinkHref={`#${iconValue}`}></use>
                                </svg>
                            )}
                        </article>
                    );
                })}
            </div>

        </section>
    );
}
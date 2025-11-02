// src/components/layout/stack.jsx
import './Stack.scss';
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
                const data = await getStack({signal: ac.signal});
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
// Group items by category
    const groupedStack = stack.reduce((acc, item) => {
        console.log('Stack item:', item);
        const cat = getCategory(item);
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

// Category display names and order
    const categories = [
        {key: 'platforms-cms', label: 'Platforms & CMS'},
        {key: 'wordpress-tools', label: 'WordPress Tools'},
        {key: 'dev-tools-systems', label: 'Dev Tools & Systems'},
        {key: 'languages', label: 'Languages'}
    ];

    return (
        <section id="stack" aria-labelledby="stack-title">
            <div className="divider"></div>
            <h2 id="section-title">My <span>Stack</span></h2>

            <div className="stack-category-grid">
                {categories.map(({ key, label }) => (
                    <div key={key} className={`${key} stack-category-card`}>
                        <h3>{label}</h3>
                        <div className="stack-card-grid">
                            {(groupedStack[key] || []).map((item) => {
                                const title = getTitle(item);
                                const iconValue = getIconValue(item);   // may be a URL or a sprite id
                                const url = getUrl(item);
                                const color = getColor(item);

                                const isFileIcon =
                                    typeof iconValue === 'string' &&
                                    (
                                        /^https?:\/\//i.test(iconValue) ||
                                        iconValue.endsWith('.svg') ||
                                        iconValue.endsWith('.png') ||
                                        iconValue.endsWith('.jpg') ||
                                        iconValue.endsWith('.jpeg') ||
                                        iconValue.endsWith('.webp')
                                    );

                                return (
                                    <article className="stack-card" key={item.id ?? item.slug}>
                                        {iconValue && (
                                            isFileIcon ? (
                                                <img
                                                    src={iconValue}
                                                    className="stack-icons"
                                                    alt={title}
                                                    width={45}
                                                    height={45}
                                                />
                                            ) : (
                                                <svg
                                                    style={{ fill: color, width: '45px', height: '45px' }}
                                                    className="stack-icons"
                                                    aria-label={title}
                                                    role="img"
                                                >
                                                    <use xlinkHref={`#${iconValue}`} />
                                                </svg>
                                            )
                                        )}

                                        <span style={{ marginTop: 8, marginBottom: 0 }}>
                {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                ) : (
                    title
                )}
              </span>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
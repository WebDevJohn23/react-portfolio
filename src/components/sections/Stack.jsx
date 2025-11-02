// src/components/layout/stack.jsx
import { useEffect, useState } from "react";
import { getStack} from "../../api/getStack.js";

// Helpers to safely read across wp/v2 and acf/v3 payloads
function getTitle1(item) {
    const raw = item?.title?.rendered ?? item?.acf?.title ?? "Untitled";
    return typeof raw === "string" ? raw : "";
}``




export default function Stack() {
    const [stack, setStack] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                const data = await getStack({ signal: ac.signal });
                setStack(Array.isArray(data) ? data : []);
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
                {stack.map((p) => {
                    const title = getTitle1(p);

                    return (
                        <article key={p.id ?? p.slug} style={{ border: "1px solid #eee", padding: 12 }}>
                            <h3
                                dangerouslySetInnerHTML={{ __html: title }}
                                style={{ marginTop: 0 }}
                            />

                        </article>
                    );
                })}
            </div>
        </section>
    );
}

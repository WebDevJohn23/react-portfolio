export async function getStack() {
    const url = `https://portfolio.johnathanjulig.com/wp-json/wp/v2/stack-item?per_page=100&_embed&acf_format=standard&timestamp=${Date.now()}`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);
    return res.json();
}
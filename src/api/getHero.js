// src/api/getHero.js
export async function getHero() {
  const url = `https://portfolio.johnathanjulig.com/wp-json/wp/v2/pages/94?acf_format=standard&timestamp=${Date.now()}`;

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return res.json();
}

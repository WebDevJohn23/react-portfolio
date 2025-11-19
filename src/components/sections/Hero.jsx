// PAGE: src/components/sections/Hero.js
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { getHomepage } from '../../api/getHomepage.js';
import './Hero.scss';

// should really be a loop... but keeping it simple for now
function getSubHeadlineTop(data) {
  return data?.hero_section?.['sub_headline_-_top'] ?? '';
}

function getMainHeadline(data) {
  return data?.hero_section?.['main_headline_-_line_1'] ?? '';
}

function getSubHeadlineBottom(data) {
  return data?.hero_section?.['sub_headline_-_bottom'] ?? '';
}

function getButton1Text(data) {
  return data?.hero_section?.['button_1_text'] ?? 'View Work';
}

function getButton1Url(data) {
  return data?.hero_section?.['button_1_url'] ?? '/#projects';
}

function getButton2Text(data) {
  return data?.hero_section?.['button_2_text'] ?? 'Contact';
}

function getButton2Url(data) {
  return data?.hero_section?.['button_2_url'] ?? '/#contact';
}

// Fetch hero section fields from WordPress
export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getHomepage({ signal: ac.signal });
        setHeroData(data?.acf);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  if (loading) return null;
  if (err) return <div>Failed to load hero.</div>;
  if (!heroData) return <div>No hero data.</div>;

  const subHeadlineTop = getSubHeadlineTop(heroData);
  const mainHeadline = getMainHeadline(heroData);
  const subHeadlineBottom = getSubHeadlineBottom(heroData);

  const button1Text = getButton1Text(heroData);
  const button1Url = getButton1Url(heroData);

  const button2Text = getButton2Text(heroData);
  const button2Url = getButton2Url(heroData);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(subHeadlineTop),
              }}
            />
          </p>

          <h1 className="hero-headline">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(mainHeadline),
              }}
            />
          </h1>

          <p className="hero-description">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(subHeadlineBottom),
              }}
            />
          </p>

          <div className="hero-buttons">
            <a href={button1Url} className="button button--primary">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(button1Text),
                }}
              />
            </a>

            <a href={button2Url} className="button button--outline hero-button--shake">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(button2Text),
                }}
              />
            </a>
          </div>

          <p className="hero-techline">
            *This site is built with React and pulls its content from a headless WordPress backend,
            with automatic deployment through GitHub Actions.
          </p>
        </div>
      </div>
    </section>
  );
}

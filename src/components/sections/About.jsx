// PAGE: src/components/sections/About.js
import DOMPurify from 'dompurify'; // sanitize HTML
import { useEffect, useState } from 'react';
import { getHomepage } from '../../api/getHomepage.js';
import './About.scss';

// should really be a loop... but keeping it simple for now
function getStatOneNumber(data) {
  return data?.about_me_section?.['about_me_stat_1_-_number'] ?? '';
}

function getStatTwoNumber(data) {
  return data?.about_me_section?.['about_me_stat_2_-_number'] ?? '';
}

function getStatThreeNumber(data) {
  return data?.about_me_section?.['about_me_stat_3_-_number'] ?? '';
}

function getStatFourNumber(data) {
  return data?.about_me_section?.['about_me_stat_4_-_number'] ?? '';
}

function getStatOneText(data) {
  return data?.about_me_section?.['about_me_stat_1_-_text'] ?? '';
}

function getStatTwoText(data) {
  return data?.about_me_section?.['about_me_stat_2_-_text'] ?? '';
}

function getStatThreeText(data) {
  return data?.about_me_section?.['about_me_stat_3_-_text'] ?? '';
}

function getStatFourText(data) {
  return data?.about_me_section?.['about_me_stat_4_-_text'] ?? '';
}

function getAboutMeInfo(data) {
  return data?.about_me_section?.['about_us_info_text'] ?? '';
}

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch About section fields from WordPress
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getHomepage({ signal: ac.signal });
        setAboutData(data?.acf);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (err) return <div>Failed to load about.</div>;
  if (!aboutData) return <div>No about data.</div>;

  const statOneNumber = getStatOneNumber(aboutData);
  const statTwoNumber = getStatTwoNumber(aboutData);
  const statThreeNumber = getStatThreeNumber(aboutData);
  const statFourNumber = getStatFourNumber(aboutData);

  const statOneText = getStatOneText(aboutData);
  const statTwoText = getStatTwoText(aboutData);
  const statThreeText = getStatThreeText(aboutData);
  const statFourText = getStatFourText(aboutData);

  const aboutMeInfo = getAboutMeInfo(aboutData);

  return (
    <section className="about-section" aria-labelledby="about-title">
      <a className="anchor" id="about"></a>
      <div className="divider"></div>

      <h2 id="section-title">
        About <span>Me</span>
      </h2>

      <div className="about-content">
        <div className="about-left">
          <div className="about-description-grid">
            <p className="about-description">
              <span className="about-number">{statOneNumber}</span>
              <span
                className="about-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(statOneText) }}
              />
            </p>

            <p className="about-description">
              <span className="about-number">{statTwoNumber}</span>
              <span
                className="about-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(statTwoText) }}
              />
            </p>

            <p className="about-description">
              <span className="about-number">{statThreeNumber}</span>
              <span
                className="about-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(statThreeText) }}
              />
            </p>

            <p className="about-description">
              <span className="about-number">{statFourNumber}</span>
              <span
                className="about-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(statFourText) }}
              />
            </p>
          </div>
        </div>

        <div className="about-right">
          <p className="about-info">
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutMeInfo) }} />
          </p>
        </div>
      </div>
    </section>
  );
}

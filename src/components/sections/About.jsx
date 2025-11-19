// PAGE: src/components/sections/About.js
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { getHomepage } from '../../api/getHomepage.js';
import './About.scss';

// ---- Getters (ensure string type) ----
function getStatOneNumber(data) {
  const raw = data?.about_me_section?.['about_me_stat_1_-_number'];
  return typeof raw === 'string' ? raw : String(raw ?? '');
}

function getStatTwoNumber(data) {
  const raw = data?.about_me_section?.['about_me_stat_2_-_number'];
  return typeof raw === 'string' ? raw : String(raw ?? '');
}

function getStatThreeNumber(data) {
  const raw = data?.about_me_section?.['about_me_stat_3_-_number'];
  return typeof raw === 'string' ? raw : String(raw ?? '');
}

function getStatFourNumber(data) {
  const raw = data?.about_me_section?.['about_me_stat_4_-_number'];
  return typeof raw === 'string' ? raw : String(raw ?? '');
}

function getStatOneText(data) {
  const raw = data?.about_me_section?.['about_me_stat_1_-_text'];
  return typeof raw === 'string' ? raw : '';
}

function getStatTwoText(data) {
  const raw = data?.about_me_section?.['about_me_stat_2_-_text'];
  return typeof raw === 'string' ? raw : '';
}

function getStatThreeText(data) {
  const raw = data?.about_me_section?.['about_me_stat_3_-_text'];
  return typeof raw === 'string' ? raw : '';
}

function getStatFourText(data) {
  const raw = data?.about_me_section?.['about_me_stat_4_-_text'];
  return typeof raw === 'string' ? raw : '';
}

function getAboutMeInfo(data) {
  const raw = data?.about_me_section?.['about_us_info_text'];
  return typeof raw === 'string' ? raw : '';
}

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return null;
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
        {/* LEFT SECTION */}
        <div className="about-left">
          <div className="about-description-grid">
            <p className="about-description">
              <span
                className="about-number"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statOneNumber),
                }}
              />
              <span
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statOneText),
                }}
              />
            </p>

            <p className="about-description">
              <span
                className="about-number"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statTwoNumber),
                }}
              />
              <span
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statTwoText),
                }}
              />
            </p>

            <p className="about-description">
              <span
                className="about-number"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statThreeNumber),
                }}
              />
              <span
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statThreeText),
                }}
              />
            </p>

            <p className="about-description">
              <span
                className="about-number"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statFourNumber),
                }}
              />
              <span
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statFourText),
                }}
              />
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="about-right">
          <p className="about-info">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(aboutMeInfo),
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

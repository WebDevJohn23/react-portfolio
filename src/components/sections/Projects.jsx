// PAGE: src/components/sections/Projects.jsx
import { useEffect, useState } from 'react';
import { getProjects } from '../../api/getProjects';
import './Projects.scss';

const TECHNOLOGY_MAP = {
  34: 'ACF Pro',
  27: 'Advanced Custom Fields',
  37: 'CPT',
  25: 'CSS',
  13: 'Custom Plugin Development',
  18: 'Custom Theme Development',
  16: 'Divi',
  15: 'DocuSign API',
  33: 'Elementor Pro',
  32: 'Email Automation',
  35: 'FacetWP',
  21: 'Figma',
  4: 'HTML',
  6: 'JavaScript',
  5: 'MySQL',
  9: 'Oxygen Builder',
  20: 'PDF Invoice Integration',
  3: 'PHP',
  10: 'SEO',
  26: 'Theme Migration',
};

const TECHNOLOGY_LABELS_BY_SLUG = {
  'acf-pro': 'ACF Pro',
  'advanced-custom-fields': 'Advanced Custom Fields',
  cpt: 'CPT',
  css: 'CSS',
  'custom-plugin-development': 'Custom Plugin Development',
  'custom-theme-development': 'Custom Theme Development',
  divi: 'Divi',
  'docusign-api': 'DocuSign API',
  'elementor-pro': 'Elementor Pro',
  'email-automation': 'Email Automation',
  facetwp: 'FacetWP',
  figma: 'Figma',
  html: 'HTML',
  javascript: 'JavaScript',
  mysql: 'MySQL',
  'oxygen-builder': 'Oxygen Builder',
  'pdf-invoice-integration': 'PDF Invoice Integration',
  php: 'PHP',
  seo: 'SEO',
  'theme-migration': 'Theme Migration',
};

// Helpers to safely read across wp/v2 and acf/v3 payloads
function getTitle(item) {
  // Prefer your ACF project_title if present
  const raw = item?.acf?.project_title ?? item?.title?.rendered ?? item?.acf?.title ?? 'Untitled';
  return typeof raw === 'string' ? raw : '';
}

function getCompany(item) {
  const raw = item?.acf?.project_company ?? '';
  return typeof raw === 'string' ? raw : '';
}

function getImage(item) {
  const media = item?._embedded?.['wp:featuredmedia'];
  if (Array.isArray(media) && media[0]?.source_url) return media[0].source_url;
  if (item?.acf?.image?.url) return item.acf.image.url;
  if (item?.acf?.thumbnail?.url) return item.acf.thumbnail.url;
  // If you store screenshots only in ACF, prefer the first one
  if (item?.acf?.project_screenshot_image) return item.acf.project_screenshot_image;
  return null;
}

function getDescription(item) {
  // Prefer your ACF project_description if present
  const raw =
    item?.excerpt?.rendered ??
    item?.acf?.project_description ??
    item?.acf?.description ??
    item?.acf?.summary ??
    '';
  return typeof raw === 'string' ? raw : '';
}

function getLinks(item) {
  const a = item?.acf ?? {};
  return {
    url1: a.project_urllink || '',
    url1Title: a.project_url_title || '',
    url2: a.project_urllink_2 || '',
    url2Title: a.project_url_title_2 || '',
  };
}

function getScreenshots(item) {
  const a = item?.acf ?? {};
  const shots = [
    a.project_screenshot_image,
    a.project_screenshot_image_2,
    a.project_screenshot_image_3,
  ].filter(Boolean);
  return shots;
}

function getAchievements(item) {
  const a = item?.acf ?? {};
  const keys = [
    'project_achievements_1',
    'project_achievements_2',
    'project_achievements_3',
    'project_achievements_4',
    'project_achievements_5',
    'project_achievements_6',
    'project_achievements_7',
  ];
  return keys.map((k) => a[k]).filter((v) => typeof v === 'string' && v.trim());
}

function getTechnologies(item) {
  // 1) Prefer class_list slugs like "technology-php"
  const slugs = Array.isArray(item?.class_list)
    ? item.class_list
        .filter((c) => c.startsWith('technology-'))
        .map((c) => c.replace('technology-', ''))
    : [];

  const labelsFromSlugs = slugs.map((s) => TECHNOLOGY_LABELS_BY_SLUG[s] || s).filter(Boolean);

  if (labelsFromSlugs.length) return labelsFromSlugs;

  // 2) Fallback to numeric IDs
  const ids = Array.isArray(item?.technology) ? item.technology : [];
  const labelsFromIds = ids.map((id) => TECHNOLOGY_MAP[id]).filter(Boolean);

  return labelsFromIds;
}

// Fetch projects section fields from WordPress
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const data = await getProjects({ signal: ac.signal });
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
      <a className="anchor" id="projects"></a>
      <div className="divider"></div>
      <h2 id="section-title">
        My <span>Projects</span>
      </h2>

      <div className="project-grid">
        {projects.map((p) => {
          const title = getTitle(p);
          const company = getCompany(p);
          const img = getImage(p);
          const desc = getDescription(p);
          const achievements = getAchievements(p);
          const tech = getTechnologies(p);
          const { url1, url1Title, url2, url2Title } = getLinks(p);
          const screenshots = getScreenshots(p);

          return (
            <article className="project-card" key={p.id ?? p.slug}>
              {/* 1) Screenshot */}
              {img && (
                <img
                  src={img}
                  alt={title.replace(/<[^>]+>/g, '') || 'Project image'}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}

              {/* 2) Title */}
              <div className="project-card-info">
                <h3 className="project-title" style={{ marginTop: 12, marginBottom: 8 }}>
                  {title}
                </h3>

                {/* 3) Technology */}
                {tech.length > 0 && (
                  <div className="project-tech" style={{ marginBottom: 12 }}>
                    {tech.map((t) => (
                      <span className="project-tech-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* 4) Description */}
                {desc && (
                  <p className="project-desc" style={{ marginBottom: 12 }}>
                    {desc}
                  </p>
                )}

                {/* 5) Link */}
                {(url1 || url2) && (
                  <div className="project-links">
                    <a href={url1 || url2} target="_blank" rel="noopener noreferrer">
                      {url1 ? url1Title || 'Live Site →' : url2Title || 'Live Site →'}
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

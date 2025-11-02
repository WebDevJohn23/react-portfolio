import fs from 'fs';

async function fetchProjects() {
    try {
        const response = await fetch('https://portfolio.johnathanjulig.com/wp-json/wp/v2/project?per_page=100&_embed&acf_format=standard');
        const data = await response.json();

        fs.writeFileSync('src/api/projects.json', JSON.stringify(data, null, 2));

        console.log('✅ Projects saved to api/projects.json');
    } catch (error) {
        console.error('❌ Failed to fetch projects:', error);
        process.exit(1);
    }
}

fetchProjects();
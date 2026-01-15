// Fetch projects.json and render into #projects-container
async function loadProjects() {
  try {
    const res = await fetch('projects.json'); // relative path to index.html
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const projects = await res.json();

    const container = document.getElementById('projects-container');
    if (!Array.isArray(projects)) {
      container.textContent = 'projects.json should contain an array of projects.';
      return;
    }

    container.innerHTML = ''; // clear
    projects.forEach(p => {
      const el = document.createElement('article');
      el.className = 'project';
      el.innerHTML = `
        <h2>${escapeHtml(p.title || 'Untitled')}</h2>
        <p>${escapeHtml(p.description || '')}</p>
        ${p.link ? `<p><a href="${escapeAttr(p.link)}" target="_blank" rel="noopener">View</a></p>` : ''}
      `;
      container.appendChild(el);
    });
  } catch (err) {
    document.getElementById('projects-container').textContent = 'Error loading projects: ' + err;
    console.error(err);
  }
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeAttr(s){ return String(s).replace(/"/g, '&quot;'); }

document.addEventListener('DOMContentLoaded', loadProjects);
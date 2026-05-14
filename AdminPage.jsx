import { useEffect, useMemo, useState } from "react";
import { apiRequest, normalizeList } from "./api";
import "./AdminPage.css";

const blankItems = {
  projects: { num: "", tag: "", title: "", desc: "", tech: "", color: "#c9a84c", link: "", order: 0 },
  skills: { category: "", color: "#4c7cc9", skillsText: "React:95, Node.js:90", order: 0 },
  services: { icon: "WD", title: "", desc: "", tags: "", order: 0 },
  timeline: { year: "", role: "", company: "", desc: "", order: 0 },
};

function parseSkills(text) {
  return String(text || "")
    .split(",")
    .map((entry) => {
      const [name, level] = entry.split(":").map((part) => part.trim());
      return { name, level: Number(level || 0) };
    })
    .filter((skill) => skill.name);
}

function toForm(resource, item) {
  if (resource === "skills") {
    return {
      ...item,
      skillsText: (item.skills || []).map((skill) => `${skill.name}:${skill.level}`).join(", "),
    };
  }

  if (resource === "projects") return { ...item, tech: (item.tech || []).join(", ") };
  if (resource === "services") return { ...item, tags: (item.tags || []).join(", ") };
  return item;
}

function toPayload(resource, form) {
  if (resource === "skills") {
    const { skillsText, _id, ...rest } = form;
    return { ...rest, skills: parseSkills(skillsText), order: Number(form.order || 0) };
  }

  if (resource === "projects") {
    const { _id, ...rest } = form;
    return { ...rest, tech: normalizeList(form.tech), order: Number(form.order || 0) };
  }

  if (resource === "services") {
    const { _id, ...rest } = form;
    return { ...rest, tags: normalizeList(form.tags), order: Number(form.order || 0) };
  }

  const { _id, ...rest } = form;
  return { ...rest, order: Number(form.order || 0) };
}

export default function AdminPage({ navigate, portfolio, refreshPortfolio, onAuthChange }) {
  const [resource, setResource] = useState("projects");
  const [items, setItems] = useState([]);
  const [profile, setProfile] = useState(portfolio?.profile || {});
  const [form, setForm] = useState(blankItems.projects);
  const [message, setMessage] = useState("");
  const isAdmin = localStorage.getItem("portfolioUserRole") === "admin";

  const resourceTitle = useMemo(() => resource[0].toUpperCase() + resource.slice(1), [resource]);

  useEffect(() => {
    if (portfolio?.profile) {
      setProfile(portfolio.profile);
    }
  }, [portfolio?.profile]);

  const loadResource = async (nextResource = resource) => {
    const data = await apiRequest(`/admin/${nextResource}`);
    setItems(data);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("login");
      return;
    }
    loadResource(resource).catch((error) => setMessage(error.message));
  }, [resource]);

  const changeResource = (nextResource) => {
    setResource(nextResource);
    setForm(blankItems[nextResource]);
    setMessage("");
  };

  const handleFormChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleProfileChange = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const editItem = (item) => setForm(toForm(resource, item));

  const saveItem = async (event) => {
    event.preventDefault();
    const payload = toPayload(resource, form);
    const path = form._id ? `/admin/${resource}/${form._id}` : `/admin/${resource}`;
    const method = form._id ? "PUT" : "POST";

    await apiRequest(path, { method, body: JSON.stringify(payload) });
    setForm(blankItems[resource]);
    await loadResource(resource);
    await refreshPortfolio();
    setMessage(`${resourceTitle} saved and published.`);
  };

  const deleteItem = async (id) => {
    await apiRequest(`/admin/${resource}/${id}`, { method: "DELETE" });
    await loadResource(resource);
    await refreshPortfolio();
    setMessage(`${resourceTitle} item deleted.`);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const payload = { ...profile, bio: String(profile.bio || "").split("\n").filter(Boolean) };
    const updated = await apiRequest("/admin/profile", { method: "PUT", body: JSON.stringify(payload) });
    setProfile({ ...updated, bio: (updated.bio || []).join("\n") });
    await refreshPortfolio();
    setMessage("Profile saved and published.");
  };

  const logout = () => {
    localStorage.removeItem("portfolioToken");
    localStorage.removeItem("portfolioUserRole");
    localStorage.removeItem("portfolioUserName");
    onAuthChange?.(null);
    navigate("home");
  };

  if (!isAdmin) return null;

  return (
    <div className="admin-page">
      <section className="admin-hero container">
        <div>
          <span className="section-label">Admin Panel</span>
          <span className="gold-line" />
          <h1>Portfolio Control Room</h1>
          <p>Changes save to MongoDB and appear on the public portfolio after refresh.</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>Logout</button>
      </section>

      <section className="admin-layout container">
        <aside className="admin-tabs">
          {["projects", "skills", "services", "timeline"].map((name) => (
            <button key={name} className={resource === name ? "active" : ""} onClick={() => changeResource(name)}>
              {name}
            </button>
          ))}
        </aside>

        <div className="admin-workspace">
          <form className="admin-card" onSubmit={saveProfile}>
            <h2>Profile</h2>
            <div className="admin-grid">
              {["name", "initials", "role", "location", "experience", "speciality", "languages", "email", "timezone", "responseTime", "github", "linkedin", "twitter"].map((field) => (
                <label key={field}>
                  {field}
                  <input name={field} value={profile[field] || ""} onChange={handleProfileChange} />
                </label>
              ))}
            </div>
            <label>
              bio
              <textarea name="bio" rows="4" value={Array.isArray(profile.bio) ? profile.bio.join("\n") : profile.bio || ""} onChange={handleProfileChange} />
            </label>
            <button className="btn btn-primary">Save Profile</button>
          </form>

          <form className="admin-card" onSubmit={saveItem}>
            <h2>{form._id ? `Edit ${resourceTitle}` : `New ${resourceTitle}`}</h2>
            <div className="admin-grid">
              {Object.keys(blankItems[resource]).map((field) => (
                <label key={field}>
                  {field}
                  {field === "desc" || field === "skillsText" ? (
                    <textarea name={field} rows="3" value={form[field] || ""} onChange={handleFormChange} />
                  ) : (
                    <input name={field} value={form[field] || ""} onChange={handleFormChange} />
                  )}
                </label>
              ))}
            </div>
            <div className="admin-actions">
              <button className="btn btn-primary">{form._id ? "Update" : "Create"}</button>
              {form._id && (
                <button type="button" className="btn btn-ghost" onClick={() => setForm(blankItems[resource])}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && <p className="admin-message">{message}</p>}

          <div className="admin-list">
            {items.map((item) => (
              <article className="admin-row" key={item._id}>
                <div>
                  <strong>{item.title || item.category || item.role || item.name}</strong>
                  <span>{item.tag || item.company || item.email || item.desc}</span>
                </div>
                <div className="admin-actions">
                  <button className="btn btn-ghost" onClick={() => editItem(item)}>Edit</button>
                  <button className="btn btn-outline" onClick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

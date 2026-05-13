import { useState } from "react";
import { apiRequest } from "./api";
import "./ContactPage.css";

/* ── Form field component ── */
function FormField({ label, id, type = "text", placeholder, value, onChange, error, required, rows }) {
  const inputProps = { id, name: id, placeholder, value, onChange, required };

  return (
    <div className={`form-field ${error ? "form-field--error" : ""}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && <span className="form-field__req">*</span>}
      </label>
      {rows ? (
        <textarea className="form-input" rows={rows} {...inputProps} />
      ) : (
        <input className="form-input" type={type} {...inputProps} />
      )}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

/* ── Main Component ── */
export default function ContactPage({ portfolio }) {
  const profile = portfolio?.profile || {};
  const [form, setForm] = useState({
    name: "", email: "", subject: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name    = "Name is required";
    if (!form.email.trim())      e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim())    e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    try {
      await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__bg" />
        <div className="container">
          <span className="section-label">Contact</span>
          <span className="gold-line" />
          <h1 className="contact-hero__title">
            Let's Build <br />
            <em>Something Great</em>
          </h1>
          <p className="contact-hero__desc">
            Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form or use the details below to get in touch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">

            {/* Left: Info + Schedule */}
            <div className="contact-info">

              {/* Contact Details */}
              <div className="contact-info__block">
                <h3 className="contact-info__heading">Get in Touch</h3>
                <div className="contact-details">
                  {[
                    { icon: "✉", label: "Email",    value: "hello@yourportfolio.dev", href: "mailto:hello@yourportfolio.dev" },
                    { icon: "◎", label: "Location",  value: "Jammu & Kashmir, India" },
                    { icon: "◷", label: "Timezone",  value: "IST (UTC+5:30)" },
                    { icon: "◈", label: "Response",  value: "Within 24 hours" },
                  ].map((d) => (
                    <div className="contact-detail" key={d.label}>
                      <span className="contact-detail__icon">{d.icon}</span>
                      <div>
                        <div className="contact-detail__label">{d.label}</div>
                        {d.href
                          ? <a href={d.href} className="contact-detail__value contact-detail__link">{d.value}</a>
                          : <div className="contact-detail__value">{d.value}</div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule a Call CTA */}
              <div className="schedule-cta">
                <div className="schedule-cta__header">
                  <span className="schedule-cta__icon">◷</span>
                  <div>
                    <h3 className="schedule-cta__title">Schedule a Call</h3>
                    <p className="schedule-cta__sub">30-min free discovery call</p>
                  </div>
                </div>
                <p className="schedule-cta__desc">
                  Prefer to talk? Book a free 30-minute call to discuss your project, get feedback, or just connect. No commitment required.
                </p>
                <div className="schedule-slots">
                  <p className="schedule-slots__label">Available slots this week:</p>
                  {[
                    "Mon, Jan 20 — 10:00 AM IST",
                    "Wed, Jan 22 — 2:00 PM IST",
                    "Thu, Jan 23 — 4:00 PM IST",
                    "Fri, Jan 24 — 11:00 AM IST",
                  ].map((slot) => (
                    <button key={slot} className="slot-btn">
                      <span className="slot-btn__dot" />
                      {slot}
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary schedule-cta__action">
                  Book a Call →
                </button>
              </div>

              {/* Social Links */}
              <div className="contact-socials">
                <p className="contact-socials__label">Find me online</p>
                <div className="contact-socials__links">
                  {[
                    { label: "GitHub",   href: "https://github.com",   abbr: "GH" },
                    { label: "LinkedIn", href: "https://linkedin.com",  abbr: "LI" },
                    { label: "Twitter",  href: "https://twitter.com",   abbr: "TW" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} className="social-chip" target="_blank" rel="noopener noreferrer">
                      {s.abbr}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="contact-form-wrap">
              <div className="contact-form-card">
                <div className="contact-form-card__header">
                  <h2 className="contact-form-card__title">Send a Message</h2>
                  <p className="contact-form-card__sub">I'll respond within 24 hours.</p>
                </div>

                {status === "success" ? (
                  <div className="form-success">
                    <div className="form-success__icon">✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    <button className="btn btn-outline" onClick={() => setStatus("idle")}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="contact-form">
                    <div className="form-row">
                      <FormField
                        label="Full Name"    id="name"    placeholder="John Doe"
                        value={form.name}   onChange={handleChange} error={errors.name} required
                      />
                      <FormField
                        label="Email Address" id="email" type="email" placeholder="john@example.com"
                        value={form.email}  onChange={handleChange} error={errors.email} required
                      />
                    </div>

                    <div className="form-row">
                      <FormField
                        label="Subject (optional)" id="subject" placeholder="Project inquiry"
                        value={form.subject} onChange={handleChange}
                      />
                      <div className="form-field">
                        <label className="form-field__label" htmlFor="budget">
                          Budget Range
                        </label>
                        <select
                          id="budget" name="budget"
                          className="form-input"
                          value={form.budget}
                          onChange={handleChange}
                        >
                          <option value="">Select a range…</option>
                          <option value="&lt;1k">Under $1,000</option>
                          <option value="1-5k">$1,000 – $5,000</option>
                          <option value="5-15k">$5,000 – $15,000</option>
                          <option value="15k+">$15,000+</option>
                          <option value="discuss">Let's Discuss</option>
                        </select>
                      </div>
                    </div>

                    <FormField
                      label="Message"  id="message"  placeholder="Tell me about your project, goals, and timeline…"
                      value={form.message} onChange={handleChange} error={errors.message}
                      required rows={6}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary contact-form__submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <span className="spinner" /> Sending…
                        </>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <span className="section-label">FAQ</span>
          <span className="gold-line" />
          <h2 className="section-heading">Common Questions</h2>
          <div className="faq-grid">
            {[
              { q: "What is your typical project timeline?",   a: "Most projects take 4–12 weeks depending on scope and complexity. I'll give you a clear estimate after our initial call." },
              { q: "Do you work with international clients?",   a: "Absolutely! I work remotely with clients worldwide. My timezone is IST (UTC+5:30), and I'm flexible with meeting times." },
              { q: "What's your preferred tech stack?",         a: "I primarily use React, Node.js, and PostgreSQL, but I'm adaptable. I'll recommend the best tools for your specific project." },
              { q: "Do you offer post-launch support?",         a: "Yes. I offer maintenance packages and will ensure your product runs smoothly well after launch." },
            ].map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── FAQ Accordion ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen((v) => !v)}>
        {q}
        <span className="faq-item__icon">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-item__a">{a}</p>}
    </div>
  );
}

import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CONTACT = {
  email: 'bassmaaitelcadi2006@gmail.com',
  phoneDisplay: '+212 6 58 71 88 65',
  phoneRaw: '+212658718865',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const infoRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus('Opening your email app...');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <p ref={labelRef} className="section-label">07 / Contact</p>
        <h2 ref={titleRef} className="section-title">Let's Connect</h2>
        <div className="contact-grid">
          <div ref={infoRef} className="contact-info">
            <p className="contact-intro">
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach out!
            </p>
            <div className="contact-cards">
              <a href={`mailto:${CONTACT.email}`} className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-envelope" /></div>
                <div><h4>Email</h4><p>{CONTACT.email}</p></div>
              </a>
              <a href={`tel:${CONTACT.phoneRaw}`} className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-phone" /></div>
                <div><h4>Phone</h4><p>{CONTACT.phoneDisplay}</p></div>
              </a>
              <div className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-map-marker-alt" /></div>
                <div><h4>Location</h4><p>Bouskoura, Casablanca, Morocco</p></div>
              </div>
            </div>
            <div className="contact-socials">
              <a href="https://github.com/AIT-ELCADI" target="_blank" rel="noopener" className="social-link github" aria-label="GitHub"><i className="fab fa-github" /></a>
              <a href="https://www.linkedin.com/in/bassma-ait-elcadi/" target="_blank" rel="noopener" className="social-link linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="https://www.instagram.com/_bassmaah" target="_blank" rel="noopener" className="social-link instagram" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://wa.me/212658718865" target="_blank" rel="noopener" className="social-link whatsapp" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Your message..." value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary btn-submit">
              <span>Send Message</span> <i className="fas fa-paper-plane" />
            </button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
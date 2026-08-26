export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-bracket">&lt;</span>bassma<span className="logo-dot">.</span>dev<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-text">Designed &amp; Built by Bassma Ait El Cadi</p>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

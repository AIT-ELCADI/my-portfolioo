import { useState, useEffect } from 'react';

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hide ? 'hide' : ''}`}>
      <div className="loader-content">
        <span className="loader-bracket">{'{'}</span>
        <div className="loader-line" />
        <span className="loader-bracket">{'}'}</span>
      </div>
      <p className="loader-name">bassma.dev()</p>
    </div>
  );
}

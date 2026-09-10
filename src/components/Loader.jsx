import { useState, useEffect } from 'react';

const WORD = 'hello';

export default function Loader() {
  const [typed, setTyped] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;

    const tick = () => {
      if (i < WORD.length) {
        i += 1;
        setTyped(WORD.slice(0, i));
        timer = setTimeout(tick, 300);
      } else {
        timer = setTimeout(() => setHide(true), 600);
      }
    };

    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hide ? 'hide' : ''}`}>
      <div className="loader-content">
        <span className="loader-bracket">{'{'}</span>
        <span className="loader-word">
          {typed}
          <span className="loader-caret">|</span>
        </span>
        <span className="loader-bracket">{'}'}</span>
      </div>
    </div>
  );
}
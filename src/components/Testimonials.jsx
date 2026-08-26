import useScrollReveal from '../hooks/useScrollReveal';

const testimonials = [
  { stars: '★★★★★', text: '"Bassma delivered a clean, responsive website that exceeded our expectations. Her attention to detail and creative problem-solving made the project a success."', initial: 'S', name: 'S. El Idrissi', role: 'Project Collaborator' },
  { stars: '★★★★★', text: '"Working with Bassma was a great experience. She brings both technical skill and a genuine passion for creating user-friendly digital experiences."', initial: 'A', name: 'A. Benali', role: 'Senior Developer' },
  { stars: '★★★★★', text: '"Bassma\'s combination of accounting knowledge and web development skills makes her a versatile and valuable team member. Highly recommended."', initial: 'M', name: 'M. Tazi', role: 'WingsTech Center Instructor' },
];

export default function Testimonials() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <p ref={labelRef} className="section-label">06 / Testimonials</p>
        <h2 ref={titleRef} className="section-title">What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, delay }) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="testimonial-card anim-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="testimonial-stars">{testimonial.stars}</div>
      <p className="testimonial-text">{testimonial.text}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{testimonial.initial}</div>
        <div>
          <p className="testimonial-name">{testimonial.name}</p>
          <p className="testimonial-role">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

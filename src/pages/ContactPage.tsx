import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="relative py-24 lg:py-40 border-b border-[var(--color-border)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-[var(--color-accent)] tracking-[0.3em] mb-6">
              GET IN TOUCH
            </p>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10">
              LET'S BUILD
              <br />
              <span className="text-[var(--color-accent)] text-glow">
                TOGETHER
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 lg:py-40">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold tracking-wide mb-8">
                REACH OUR STUDIO
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[var(--color-text-secondary)] tracking-[0.15em] mb-1">
                      HEADQUARTERS
                    </p>
                    <p className="text-white">
                      Vertex Tower, Level 42
                      <br />
                      Levent Business District
                      <br />
                      Istanbul, Turkey 34330
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[var(--color-text-secondary)] tracking-[0.15em] mb-1">
                      EMAIL
                    </p>
                    <p className="text-white">studio@vertexkinetic.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[var(--color-text-secondary)] tracking-[0.15em] mb-1">
                      PHONE
                    </p>
                    <p className="text-white">+90 212 555 0199</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t border-[var(--color-border)] pt-8">
                <p className="text-xs font-mono text-[var(--color-text-secondary)] tracking-[0.15em] mb-4">
                  SATELLITE OFFICES
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Tokyo', 'Stockholm', 'Dubai', 'Singapore'].map(
                    (city) => (
                      <div
                        key={city}
                        className="text-sm text-white/60 font-mono tracking-wider flex items-center gap-2"
                      >
                        <div className="w-1 h-1 bg-[var(--color-accent)] opacity-50" />
                        {city}
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[var(--color-accent)] p-12 text-center"
                >
                  <div className="w-16 h-16 border border-[var(--color-accent)] mx-auto mb-6 flex items-center justify-center">
                    <Send size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-wide mb-4 text-[var(--color-accent)]">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Our team will review your inquiry and respond within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-between">
                  <FormField
                    label="FULL NAME"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="EMAIL"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="COMPANY / ORGANIZATION"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.2em] mb-2">
                      PROJECT TYPE
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)] transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[var(--color-bg)]">Select type...</option>
                      <option value="residential" className="bg-[var(--color-bg)]">Residential</option>
                      <option value="commercial" className="bg-[var(--color-bg)]">Commercial</option>
                      <option value="cultural" className="bg-[var(--color-bg)]">Cultural / Public</option>
                      <option value="infrastructure" className="bg-[var(--color-bg)]">Infrastructure</option>
                      <option value="installation" className="bg-[var(--color-bg)]">Art Installation</option>
                      <option value="other" className="bg-[var(--color-bg)]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.2em] mb-2">
                      PROJECT BRIEF
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
                      placeholder="Tell us about your vision..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 border border-[var(--color-accent)] px-8 py-4 text-sm font-bold tracking-[0.2em] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors duration-300"
                  >
                    <Send size={16} />
                    TRANSMIT INQUIRY
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.2em] mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
      />
    </div>
  );
}

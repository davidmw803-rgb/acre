import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface FormState {
  name: string;
  company: string;
  role: string;
  email: string;
  capabilities: string;
  message: string;
}

const INITIAL: FormState = {
  name: '',
  company: '',
  role: '',
  email: '',
  capabilities: '',
  message: '',
};

export function PartnerContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire this form to a real backend (Formspree, Resend, or a serverless function).
    // For now we simulate a successful submit and show the confirmation state.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-8 bg-white">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] text-gray-500 uppercase mb-4">
            Start the Conversation
          </p>
          <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight">
            Let's build together.
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Share a few details and we'll reply within two business days with a
            capability-deck request and an invitation to an intro call.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-900">
              <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl mb-4 text-gray-900 tracking-tight">Thank you.</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              We've received your details and will be in touch within two business days.
              Please watch for a note from <span className="text-gray-900">partners@acre.com</span>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-10 md:p-12 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Chen"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  required
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Precision Manufacturing Co., Ltd."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={update('role')}
                  placeholder="BD Director"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@precision-mfg.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capabilities">Relevant capabilities</Label>
              <Textarea
                id="capabilities"
                rows={3}
                value={form.capabilities}
                onChange={update('capabilities')}
                placeholder="Injection molding, PCBA, battery pack assembly, IP67 sealing, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Anything else you'd like us to know</Label>
              <Textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="Prior consumer electronics / outdoor power equipment experience, comparable programs run, etc."
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 flex-wrap">
              <p className="text-sm text-gray-500">
                We'll review and respond within two business days.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-sm tracking-wide rounded-full hover:bg-gray-800 transition-all"
              >
                Send Inquiry
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

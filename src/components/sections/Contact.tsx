"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Github, Linkedin } from "../ui/BrandIcons";
import { submitContactMessage } from "@/lib/supabase";

// ─── Validation Schema ─────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2, { message: "Name must be at least 2 characters" }),
  email:   z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]     = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    let dbSaved = false;
    let emailSent = false;
    let hasBackend = false;

    // 1. Try Supabase database storage if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      hasBackend = true;
      try {
        const { error } = await submitContactMessage(data);
        if (!error) {
          dbSaved = true;
        } else {
          console.error("Supabase submission error:", error);
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
      }
    }

    // 2. Try Web3Forms email notification if configured
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      hasBackend = true;
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            from_name: "Portfolio Contact Form",
          }),
        });

        if (res.ok) {
          emailSent = true;
        } else {
          const errData = await res.json().catch(() => ({}));
          console.error("Web3Forms error response:", errData);
        }
      } catch (err) {
        console.error("Web3Forms network error:", err);
      }
    }

    // 3. Fallback to EmailJS if Web3Forms is not configured or failed
    if (!emailSent) {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        hasBackend = true;
        try {
          const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id:  serviceId,
              template_id: templateId,
              user_id:     publicKey,
              template_params: {
                from_name:  data.name,
                from_email: data.email,
                subject:    data.subject,
                message:    data.message,
              },
            }),
          });
          if (res.ok) {
            emailSent = true;
          } else {
            console.error("EmailJS failed with status:", res.status);
          }
        } catch (err) {
          console.error("EmailJS network error:", err);
        }
      }
    }

    if (!hasBackend) {
      // Dev mode: simulate success when no backend service is configured
      console.warn("No backend configured — simulating success.");
      await new Promise((r) => setTimeout(r, 800));
      setSubmitSuccess(true);
      reset();
    } else if (dbSaved || emailSent) {
      // If either database save or email sending succeeded, treat as success
      setSubmitSuccess(true);
      reset();
    } else {
      setSubmitError("Failed to send message. Please try again or email directly.");
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-bg-dark overflow-hidden border-t border-border-glass px-6 scroll-mt-28"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-blur-primary opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-purple-400 text-sm font-mono tracking-wider uppercase mb-3"
          >
            <Mail size={16} />
            <span>Connect</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-space text-primary-text"
          >
            Get In Touch
          </motion.h2>
        </div>

        {/* Form & Info Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold font-space text-primary-text">
                Let's discuss a project.
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed max-w-sm">
                Have a job opening, a freelance project, or simply want to say hello? Fill out the
                form, or reach out to me directly on my email or social channels.
              </p>

              <div className="flex flex-col gap-4 mt-6">
                <a
                  href="mailto:mohamedfaisal.dev@gmail.com"
                  className="flex items-center gap-3 text-sm text-secondary-text hover:text-primary-text transition-colors w-fit"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-border-glass text-purple-400">
                    <Mail size={16} />
                  </div>
                  <span>mohamedfaisal.dev@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Social Cards */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-secondary-text">Find me on</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mohamedfaisal-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-glass hover:border-white/10 hover:bg-white/10 text-xs text-secondary-text hover:text-primary-text transition-all duration-300"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/mohamed-faisal-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-glass hover:border-white/10 hover:bg-white/10 text-xs text-secondary-text hover:text-primary-text transition-all duration-300"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7 glassmorphism p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-cyan-500/3 pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10" noValidate>
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-secondary-text">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass focus:border-purple-500/50 text-primary-text text-sm outline-none transition-all"
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 font-mono mt-1">
                      <AlertCircle size={10} />{errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-secondary-text">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass focus:border-purple-500/50 text-primary-text text-sm outline-none transition-all"
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 font-mono mt-1">
                      <AlertCircle size={10} />{errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-secondary-text">Subject</label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  placeholder="Inquiry about project collaborations"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass focus:border-purple-500/50 text-primary-text text-sm outline-none transition-all"
                />
                {errors.subject && (
                  <span className="flex items-center gap-1 text-[11px] text-red-400 font-mono mt-1">
                    <AlertCircle size={10} />{errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-secondary-text">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass focus:border-purple-500/50 text-primary-text text-sm outline-none resize-none transition-all"
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-[11px] text-red-400 font-mono mt-1">
                    <AlertCircle size={10} />{errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit row */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 disabled:brightness-90 text-white text-sm font-semibold transition-all shadow-md shadow-purple-500/15 cursor-pointer w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /><span>Sending...</span></>
                  ) : (
                    <><Send size={15} /><span>Send Message</span></>
                  )}
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2 text-green-400 text-xs font-mono font-semibold"
                    >
                      <CheckCircle size={15} />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2 text-red-400 text-xs font-mono"
                    >
                      <AlertCircle size={15} />
                      <span>{submitError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";


/* ─── MOBILE HELPER ─── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}




/* ─── RESPONSIVE GLOBAL FIXES ─── */
function ResponsiveGlobalStyles() {
  return (
    <style>{`
      html, body, #root {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
      }

      @media (max-width: 900px) {
        * { cursor: auto !important; }
        a, button { cursor: pointer !important; }

        [style*="mix-blend-mode: difference"][style*="position: fixed"],
        [style*="right: 28px"][style*="position: fixed"] {
          display: none !important;
        }

        [style*="padding: 0px 48px"],
        [style*="padding: 0 48px"],
        [style*="padding: 120px 48px"],
        [style*="padding: 130px 48px"],
        [style*="padding: 28px 48px"],
        [style*="padding: 0px 48px 120px"],
        [style*="padding: 0 48px 120px"],
        [style*="padding: 0px 48px 150px"],
        [style*="padding: 0 48px 150px"],
        [style*="padding: 0px 48px 90px"],
        [style*="padding: 0 48px 90px"] {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }

        section[style*="min-height: 100vh"] {
          min-height: auto !important;
          padding-top: 112px !important;
          padding-bottom: 72px !important;
        }

        [style*="max-width: 1200px"] {
          max-width: 100% !important;
        }

        [style*="grid-template-columns: repeat(4, 1fr)"],
        [style*="grid-template-columns: repeat(3, 1fr)"],
        [style*="grid-template-columns: repeat(2, 1fr)"],
        [style*="grid-template-columns: 380px 1fr"],
        [style*="grid-template-columns: 1fr 1fr"],
        [style*="grid-template-columns: 72px 1fr"] {
          grid-template-columns: 1fr !important;
          gap: 18px !important;
        }

        [style*="height: 360px"] {
          height: 225px !important;
        }

        [style*="padding: 52px"] {
          padding: 28px 20px !important;
        }

        [style*="padding: 80px"] {
          padding: 42px 22px !important;
        }

        [style*="padding: 32px 28px"] {
          padding: 24px 20px !important;
        }

        [style*="padding: 28px 40px"] {
          padding: 22px 20px !important;
        }

        [style*="gap: 72px"] {
          gap: 32px !important;
        }

        [style*="display: flex"][style*="justify-content: center"] {
          flex-wrap: wrap !important;
        }

        h1[style] {
          font-size: clamp(42px, 15vw, 72px) !important;
          line-height: 0.95 !important;
        }

        h2[style] {
          font-size: clamp(26px, 9vw, 40px) !important;
          line-height: 1.08 !important;
        }

        p[style] {
          max-width: 100% !important;
        }

        
        /* Mobile portfolio polish */
        header nav {
          display: none !important;
        }

        header [style*="gap: 8px"][style*="align-items: center"] {
          gap: 6px !important;
        }

        [style*="grid-template-columns: 88px 1fr auto"] {
          grid-template-columns: 1fr !important;
          gap: 18px !important;
        }

        [style*="grid-template-columns: 88px 1fr auto"] [style*="align-items: flex-end"] {
          display: none !important;
        }

        [style*="padding: 32px 40px"][style*="border-radius: 18px"] {
          padding: 24px 22px !important;
          border-radius: 22px !important;
          background: rgba(255,255,255,0.026) !important;
        }

        [style*="font-size: 23px"][style*="letter-spacing: -0.035em"] {
          font-size: 22px !important;
          line-height: 1.12 !important;
        }

        [style*="color: rgba(255,255,255,0.35)"][style*="line-height: 1.75"] {
          color: rgba(255,255,255,0.48) !important;
        }

        footer[style] {
          flex-direction: column !important;
          gap: 14px !important;
          text-align: center !important;
        }
      }

      @media (max-width: 520px) {
        [style*="padding: 0px 48px"],
        [style*="padding: 0 48px"],
        [style*="padding: 120px 48px"],
        [style*="padding: 130px 48px"],
        [style*="padding: 28px 48px"],
        [style*="padding: 0px 48px 120px"],
        [style*="padding: 0 48px 120px"],
        [style*="padding: 0px 48px 150px"],
        [style*="padding: 0 48px 150px"],
        [style*="padding: 0px 48px 90px"],
        [style*="padding: 0 48px 90px"] {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        [style*="height: 360px"] {
          height: 190px !important;
        }

        [style*="padding: 16px 36px"],
        [style*="padding: 18px 44px"] {
          width: 100% !important;
          max-width: 320px !important;
          padding: 14px 22px !important;
        }

        [style*="padding: 80px"] {
          padding: 36px 18px !important;
          border-radius: 22px !important;
        }

        [style*="padding: 52px"] {
          padding: 24px 16px !important;
          border-radius: 22px !important;
        }

        [style*="font-size: 36px"] {
          font-size: 28px !important;
        }

        [style*="letter-spacing: 0.24em"] {
          letter-spacing: 0.15em !important;
        }
      }
    `}</style>
  );
}
/* ─── PAGE TRANSITION CURTAIN ─── */
function Curtain({ isVisible, direction = "down" }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* First layer */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, background: "#0a0a0a",
              zIndex: 99998, transformOrigin: direction === "down" ? "top" : "bottom",
              pointerEvents: "none",
            }}
          />
          {/* Second layer — slightly delayed for layered effect */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.07, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(255,255,255,0.04)",
              zIndex: 99997, transformOrigin: direction === "down" ? "top" : "bottom",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── PAGE WRAPPER (fade in on mount) ─── */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}


/* ─── SECTION PROGRESS ─── */
function SectionProgress() {
  const sections = ["about", "about-section", "skills", "projects", "contact"];
  const labels = ["Hero", "About", "Skills", "Projects", "Contact"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = [];
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div style={{
      position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
      zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      {labels.map((label, i) => (
        <a
          key={label}
          href={`#${sections[i]}`}
          title={label}
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", cursor: "none" }}
        >
          {/* dot */}
          <motion.div
            animate={{
              width: active === i ? 18 : 6,
              background: active === i ? "#fff" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 2, borderRadius: 999 }}
          />
        </a>
      ))}
    </div>
  );
}


/* ─── NUMBER COUNTER ─── */
function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    if (num === 0) { setCount(value); return; }
    let start = 0;
    const duration = 1200;
    const step = duration / num;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= num) { setCount(value); clearInterval(timer); }
    }, step);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{started ? count : 0}{!started ? "" : ""}</span>;
}


/* ─── DATA ─── */
const skills = [
  { num: "01", title: "Backend", sub: "Java & Systems Design", text: "Clean object-oriented architecture, JDBC integrations, and production-grade Java systems built with care and precision.", tag: "Java · OOP · JDBC" },
  { num: "02", title: "Databases", sub: "SQL & Data Modeling", text: "Full schema design, triggers, constraints, and analytical queries. Data structured to serve real systems with integrity.", tag: "PostgreSQL · MySQL · PLpgSQL" },
  { num: "03", title: "Frontend", sub: "Web & UI Development", text: "Clean HTML, CSS, and React interfaces with a focus on clarity, usability, and a polished final result.", tag: "React · HTML · CSS · JS" },
];

const projects = [
  { num: "001", title: "Afeka Trails", desc: "AI-powered trail planning app — generates real cycling and trekking routes with interactive maps, weather forecasts, and saved history. Built with Next.js and deployed on Vercel.", tags: ["Next.js", "AI", "Leaflet", "Vercel"], year: "2026", color: "rgba(16,185,129,0.12)", url: "https://afeka-trails-2026-three.vercel.app" },
  { num: "002", title: "Checkers Game", desc: "Full-stack .NET checkers game with a WinForms client, ASP.NET Core server, Razor Pages web interface, REST API, and PostgreSQL database.", tags: [".NET", "WinForms", "ASP.NET", "PostgreSQL"], year: "2026", color: "rgba(99,102,241,0.13)", url: "https://github.com/JolianHabib/DotNet-Game-Project" },
  { num: "003", title: "Shift Management System", desc: "A Java-based shift management system featuring employee scheduling, role-based menus, attendance tracking, and clean object-oriented architecture.", tags: ["Java", "OOP", "Scheduling"], year: "2025", color: "rgba(249,115,22,0.12)", url: "https://github.com/JolianHabib/ShiftManagementSystem" },
  { num: "004", title: "Medical Clinic Database", desc: "A complete PostgreSQL-based medical clinic database with full schema, sample data, triggers, constraints, and analytical SQL queries.", tags: ["PostgreSQL", "PLpgSQL", "Schema Design"], year: "2025", color: "rgba(6,182,212,0.11)", url: "https://github.com/JolianHabib/Medical-Clinic-Database" },
  { num: "005", title: "Exam System", desc: "Java exam management system with OOP, JDBC, and PostgreSQL. Supports teachers, subjects, questions, answers, and full exam creation.", tags: ["Java", "JDBC", "PostgreSQL"], year: "2024", color: "rgba(168,85,247,0.11)", url: "https://github.com/JolianHabib/ExamSystem" },
  { num: "006", title: "Game Factory", desc: "C program for managing a toy and game factory — departments, workers, machines, games, customers, and orders with structs and linked lists.", tags: ["C", "Structs", "Linked Lists", "File I/O"], year: "2023", color: "rgba(225,29,72,0.1)", url: "https://github.com/JolianHabib/GameFactory-C-Project" },
];

const PROJECT_MAP = { "001":"afeka", "002":"checkers", "003":"shift", "004":"clinic", "005":"exam", "006":"factory" };



/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const [big, setBig] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const sx = useSpring(cx, { damping: 26, stiffness: 280, mass: 0.5 });
  const sy = useSpring(cy, { damping: 26, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const mv = (e) => { cx.set(e.clientX - 20); cy.set(e.clientY - 20); dx.set(e.clientX - 4); dy.set(e.clientY - 4); };
    const on = () => setBig(true), off = () => setBig(false);
    window.addEventListener("mousemove", mv);
    const els = document.querySelectorAll("a,button,[data-hover]");
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => {
      window.removeEventListener("mousemove", mv);
      els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div animate={{ scale: big ? 1.9 : 1, opacity: big ? 0.65 : 0.45 }} transition={{ duration: 0.18 }}
        style={{ x: sx, y: sy, position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <motion.div style={{ x: dx, y: dy, position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#fff", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
    </>
  );
}

/* ─── 3D TILT ─── */
function TiltCard({ children, style, intensity = 12 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { damping: 22, stiffness: 200 });
  const sy = useSpring(ry, { damping: 22, stiffness: 200 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * intensity);
    rx.set(-((e.clientY - r.top - r.height / 2) / r.height) * intensity);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ ...style, rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", perspective: 900 }}>
      {children}
    </motion.div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function Magnetic({ children, href, target, style, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { damping: 14, stiffness: 180 });
  const sy = useSpring(y, { damping: 14, stiffness: 180 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.32);
    y.set((e.clientY - r.top - r.height / 2) * 0.32);
  };
  return (
    <motion.a ref={ref} href={href} target={target} onClick={onClick} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, x: sx, y: sy, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "none", textDecoration: "none" }}>
      {children}
    </motion.a>
  );
}

/* ─── SPLIT HEADLINE ─── */
function Split({ text, delay = 0, style = {} }) {
  return (
    <span style={{ display: "block", overflow: "hidden", ...style }}>
      {text.split("").map((ch, i) => (
        <motion.span key={i} style={{ display: "inline-block" }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.016, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── PARTICLES ─── */
function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(30)].map((_, i) => (
        <motion.div key={i}
          style={{ position: "absolute", borderRadius: "50%", width: i % 5 === 0 ? 2.5 : 1.5, height: i % 5 === 0 ? 2.5 : 1.5, background: `rgba(255,255,255,${0.04 + (i % 5) * 0.035})`, left: `${(i * 33 + 11) % 100}%`, top: `${(i * 51 + 7) % 100}%` }}
          animate={{ y: [0, -(10 + i % 20), 0], opacity: [0.2, 0.65, 0.2] }}
          transition={{ duration: 4 + (i % 6), repeat: Infinity, delay: (i * 0.25) % 5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── PHOTO SECTION ─── */
function PhotoShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} style={{ position: "relative", zIndex: 1, padding: "0 48px 150px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 72, alignItems: "center" }}>

          {/* LEFT — Photo, slim portrait */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <TiltCard intensity={5} style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset", aspectRatio: "4/5", position: "relative" }}>
              <motion.div style={{ y: imgY, position: "absolute", inset: "-8%", overflow: "hidden" }}>
                <img
                  src="/me.jpg"
                  alt="Jolian Habib"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "saturate(0.75) contrast(1.04) brightness(0.82)" }}
                />
              </motion.div>
              {/* subtle gradient */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)" }} />
              {/* bottom info */}
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 7 }}>Software Engineer</div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2 }}>Jolian Habib</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 5, letterSpacing: "0.04em" }}>Java · SQL · React · C</div>
              </div>
              {/* profile badge */}
              <div style={{ position: "absolute", top: 18, right: 18, display: "flex", alignItems: "center", gap: 7, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 12px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)" }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "block", boxShadow: "0 0 7px #34d399" }} />
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>Portfolio</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 26 }}>About</div>
            <h2 style={{ fontSize: "clamp(30px, 3.5vw, 50px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.08, color: "#fff", marginBottom: 26 }}>
              Luxury is when every detail feels necessary.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.38)", marginBottom: 16, fontWeight: 300 }}>
              B.Sc. Software Engineering student at Afeka College, specializing in Software & Information Technologies. My work combines backend logic, database design, and clean user interfaces.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.24)", marginBottom: 44, fontWeight: 300 }}>
              I believe software is a craft — built with care, clarity, and intention. Not just making things work, but making them well-designed and meaningful.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 40 }}>
              {[{ val: "6", lab: "Projects" }, { val: "5+", lab: "Technologies" }, { val: "Afeka", lab: "College" }].map((s, i) => (
                <div key={i} style={{ padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.04em", color: "#fff", marginBottom: 5 }}>
                    <Counter value={s.val} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{s.lab}</div>
                </div>
              ))}
            </div>
            <Magnetic href="#projects"
              style={{ gap: 10, background: "#f5f5f7", color: "#000", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", padding: "16px 32px", borderRadius: 999 }}>
              View my work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



/* ─── CURSOR (project pages) ─── */
function ProjectCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 26, stiffness: 280 });
  const sy = useSpring(cy, { damping: 26, stiffness: 280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}

/* ─── ARCH NODE ─── */
function ArchNode({ label, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5, ease: [0.16,1,0.3,1] }}
      style={{ padding: "18px 22px", borderRadius: 16, border: `1px solid ${color}30`, background: `${color}10`, textAlign: "center", minWidth: 120 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color, letterSpacing: "0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{sub}</div>}
    </motion.div>
  );
}

/* ─── ARCH ARROW ─── */
function Arrow({ vertical }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: vertical ? "4px 0" : "0 4px" }}>
      <svg width={vertical ? 20 : 36} height={vertical ? 36 : 20} viewBox={vertical ? "0 0 20 36" : "0 0 36 20"} fill="none">
        {vertical
          ? <><line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/><polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/></>
          : <><line x1="2" y1="10" x2="30" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/><polyline points="25,5 32,10 25,15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/></>
        }
      </svg>
    </div>
  );
}

/* ─── FEATURE CARD ─── */
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.7, ease: [0.16,1,0.3,1] }}
      whileHover={{ background: "rgba(255,255,255,0.042)", borderColor: "rgba(255,255,255,0.13)", y: -4 }}
      style={{ padding: "32px 28px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.016)", borderRadius: 20, transition: "all 0.3s", cursor: "none" }}>
      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{desc}</p>
    </motion.div>
  );
}

/* ─── STAT CARD ─── */
function Stat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
      style={{ textAlign: "center", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.05em", color: "#fff" }}>{val}</div>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 6 }}>{label}</div>
    </motion.div>
  );
}

/* ─── TECH PILL ─── */
function Pill({ label }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 14px", background: "rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}





/* ─── CUSTOM CURSOR ─── */
function AfekaCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 26, stiffness: 280 });
  const sy = useSpring(cy, { damping: 26, stiffness: 280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}

/* ─── ARCH NODE ─── */
function AfekaArchNode({ label, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5, ease: [0.16,1,0.3,1] }}
      style={{ padding: "18px 22px", borderRadius: 16, border: `1px solid ${color}30`, background: `${color}10`, textAlign: "center", minWidth: 120 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color, letterSpacing: "0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{sub}</div>}
    </motion.div>
  );
}

/* ─── ARCH ARROW ─── */
function AfekaArrow({ vertical }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: vertical ? "4px 0" : "0 4px" }}>
      <svg width={vertical ? 20 : 36} height={vertical ? 36 : 20} viewBox={vertical ? "0 0 20 36" : "0 0 36 20"} fill="none">
        {vertical
          ? <><line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/><polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/></>
          : <><line x1="2" y1="10" x2="30" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/><polyline points="25,5 32,10 25,15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/></>
        }
      </svg>
    </div>
  );
}

/* ─── FEATURE CARD ─── */
function AfekaFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.7, ease: [0.16,1,0.3,1] }}
      whileHover={{ background: "rgba(255,255,255,0.042)", borderColor: "rgba(255,255,255,0.13)", y: -4 }}
      style={{ padding: "32px 28px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.016)", borderRadius: 20, transition: "all 0.3s", cursor: "none" }}>
      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{desc}</p>
    </motion.div>
  );
}

/* ─── STAT CARD ─── */
function AfekaStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
      style={{ textAlign: "center", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.05em", color: "#fff" }}>{val}</div>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 6 }}>{label}</div>
    </motion.div>
  );
}

/* ─── TECH PILL ─── */
function AfekaPill({ label }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 14px", background: "rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}

/* ─── MAIN ─── */


/* ─── SHARED PROJECT PREVIEW CARD ─── */
function ProjectPreviewCard({ src, title, desc, delay, color = "rgba(255,255,255,0.24)", objectFit = "cover", imageBg = "transparent" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, borderColor: color, background: "rgba(255,255,255,0.035)" }}
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)", borderRadius: 24, overflow: "hidden", transition: "all 0.35s", boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
      <div style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)" }}>
        <div style={{ height: 360, borderRadius: 16, overflow: "hidden", background: imageBg, border: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={src}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit, display: "block", background: imageBg }}
          />
        </div>
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 650, color: "#fff", letterSpacing: "-0.025em", marginBottom: 7 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.36)", lineHeight: 1.7 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── AFEKA PREVIEW CARD ─── */
function AfekaPreviewCard({ src, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.75, ease: [0.16,1,0.3,1] }}
      whileHover={{ y: -6, borderColor: "rgba(16,185,129,0.22)", background: "rgba(255,255,255,0.035)" }}
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)", borderRadius: 24, overflow: "hidden", transition: "all 0.35s", boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
      <div style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.025)" }}>
        <div style={{ height: 360, borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={src}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 650, color: "#fff", letterSpacing: "-0.025em", marginBottom: 7 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.36)", lineHeight: 1.7 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

function ProjectAfeka({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping: 25, stiffness: 200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon: "🤖", title: "AI Trail Generation", desc: "Claude / GPT generates real multi-day routes based on location, trail type, and duration with realistic waypoints." },
    { icon: "🗺️", title: "Interactive Maps", desc: "Leaflet.js with GraphHopper routing API renders real road and path routes — not straight lines." },
    { icon: "🌤️", title: "Weather Forecast", desc: "OpenWeatherMap integration shows a 3-day weather forecast for the destination before you go." },
    { icon: "🔐", title: "Auth System", desc: "JWT-based authentication with middleware protection, login, register, and session management." },
    { icon: "📋", title: "Trail History", desc: "Save generated trails to a personal history. Review past adventures anytime." },
    { icon: "🚴", title: "Bike & Trek Modes", desc: "Two distinct modes: point-to-point cycling routes or multi-loop trekking from a base camp." },
  ];

  const afekaPreviewImages = [
    { src: "/images/afeka-home.png", title: "Trail Generator", desc: "Clean starting screen where the user selects the destination and trail type." },
    { src: "/images/afeka-map.png", title: "Interactive Route Map", desc: "A real generated route displayed on a Leaflet map with routing details." },
    { src: "/images/afeka-weather.png", title: "Weather & Trail Details", desc: "Forecast, highlights, and saved trail information in one polished view." },
  ];

  return (
    <div style={{ background: "#030303", color: "#f5f5f7", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <AfekaCursor />

      {/* progress */}
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(16,185,129,0.6)", zIndex:200, width:barWidth }} />

      {/* bg glows */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.028, backgroundImage:"linear-gradient(rgba(16,185,129,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack}
            whileHover={{ x: -3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none", transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://afeka-trails-2026-three.vercel.app" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(16,185,129,0.15)", color:"#10b981", padding:"10px 22px", borderRadius:999, gap:0, border:"1px solid rgba(16,185,129,0.25)" }}>
            Live Demo ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y: heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:"1px solid rgba(16,185,129,0.2)", borderRadius:999, padding:"7px 20px", marginBottom:48, background:"rgba(16,185,129,0.06)", backdropFilter:"blur(16px)" }}>
            <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:2, repeat:Infinity }}
              style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 10px #10b981" }} />
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(16,185,129,0.8)" }}>Live on Vercel</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15, duration:0.6 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 001
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(56px,9vw,120px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Afeka
            <span style={{ display:"block", background:"linear-gradient(135deg,#10b981,rgba(16,185,129,0.3))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Trails
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            AI-powered trail planning app. Generate real cycling and trekking routes anywhere in the world — with interactive maps, live weather, and saved history.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["Next.js 14","AI / LLM","Leaflet.js","GraphHopper API","OpenWeatherMap","Vercel"].map(t => <AfekaPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}
            style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Magnetic href="https://afeka-trails-2026-three.vercel.app" target="_blank"
              style={{ gap:9, background:"#10b981", color:"#000", fontSize:14, fontWeight:700, letterSpacing:"0.02em", padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(16,185,129,0.2)" }}>
              Open Live Demo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Magnetic>
            <Magnetic href="https://github.com/JolianHabib/afeka-trails-2026" target="_blank"
              style={{ gap:9, border:"1px solid rgba(255,255,255,0.11)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.65)", fontSize:14, fontWeight:500, padding:"16px 36px", borderRadius:999, backdropFilter:"blur(14px)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* AFEKA PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(16,185,129,0.5)", marginBottom:18 }}>Product Preview</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>See the app in action</h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots make the project feel complete, alive, and ready to use.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {afekaPreviewImages.map((item,i) => <AfekaPreviewCard key={item.title} {...item} delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
            {[
              { val:"3", label:"External APIs" },
              { val:"2", label:"Trail Modes" },
              { val:"100%", label:"Cloud Deployed" },
              { val:"AI", label:"Powered" },
            ].map((s,i) => (
              <div key={i} style={{ borderRight: i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <AfekaStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <AfekaFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's built</h2>
          </motion.div>

          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            {/* Row 1 — User */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:0 }}>
              <AfekaArchNode label="User Browser" sub="Next.js Client" color="#10b981" delay={0.1} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><AfekaArrow vertical /></div>

            {/* Row 2 — Next.js */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:0 }}>
              <AfekaArchNode label="Next.js 14" sub="App Router + API Routes" color="#3b82f6" delay={0.2} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><AfekaArrow vertical /></div>

            {/* Row 3 — Middleware + Auth */}
            <div style={{ display:"flex", justifyContent:"center", gap:24, marginBottom:0 }}>
              <AfekaArchNode label="JWT Middleware" sub="Route protection" color="#8b5cf6" delay={0.25} />
              <AfekaArchNode label="Auth Pages" sub="Login / Register" color="#8b5cf6" delay={0.3} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><AfekaArrow vertical /></div>

            {/* Row 4 — AI Engine */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:0 }}>
              <AfekaArchNode label="AI Trail Engine" sub="LLM prompt → JSON route" color="#f59e0b" delay={0.35} />
            </div>

            {/* Row 5 — 3 external APIs */}
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <AfekaArrow vertical />
                <AfekaArchNode label="GraphHopper" sub="Real road routing" color="#10b981" delay={0.4} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <AfekaArrow vertical />
                <AfekaArchNode label="OpenWeatherMap" sub="Weather forecast" color="#10b981" delay={0.45} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <AfekaArrow vertical />
                <AfekaArchNode label="Unsplash API" sub="Location images" color="#10b981" delay={0.5} />
              </div>
            </div>

            {/* Row 6 — Deploy */}
            <div style={{ display:"flex", justifyContent:"center" }}><AfekaArrow vertical /></div>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <AfekaArchNode label="Vercel" sub="Edge deployment" color="#ec4899" delay={0.55} />
            </div>

            {/* Legend */}
            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#10b981","User / External APIs"],["#3b82f6","Next.js Core"],["#8b5cf6","Auth Layer"],["#f59e0b","AI Engine"],["#ec4899","Infrastructure"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to use it</h2>
          </motion.div>

          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Register or Login", desc:"Create an account with your name and email. JWT token is stored securely for session management." },
              { num:"02", title:"Choose your trail type", desc:"Select Bike (2–3 day cycling) or Trek (1–3 day hiking loops from a base camp)." },
              { num:"03", title:"Enter your destination", desc:"Type any location worldwide. The AI generates a real multi-day route with waypoints, highlights, and distances." },
              { num:"04", title:"Explore the route", desc:"View your trail on an interactive Leaflet map with real road routing, weather forecast, and location photos." },
              { num:"05", title:"Save to history", desc:"Save any trail to your personal history and revisit it anytime from your account." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(16,185,129,0.05)", borderColor:"rgba(16,185,129,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(16,185,129,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(16,185,129,0.12)", borderRadius:32, background:"rgba(16,185,129,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(16,185,129,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(16,185,129,0.5)", marginBottom:22 }}>Try it now</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>
                Plan your next trail.
              </h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>
                Built by Jolian Habib & Buraq Yassin · Afeka College 2026
              </p>
              <Magnetic href="https://afeka-trails-2026-three.vercel.app" target="_blank"
                style={{ gap:10, background:"#10b981", color:"#000", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(16,185,129,0.15)" }}>
                Open Afeka Trails
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2026</span>
        <Magnetic href="https://github.com/JolianHabib/afeka-trails-2026" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


/* ─── CURSOR ─── */
function CheckersCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 26, stiffness: 280 });
  const sy = useSpring(cy, { damping: 26, stiffness: 280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}


/* ─── ARCH NODE ─── */
function CheckersArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:120 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

/* ─── ARROW ─── */
function CheckersArrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

/* ─── FEATURE CARD ─── */
function CheckersFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      whileHover={{ background:"rgba(255,255,255,0.042)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
      style={{ padding:"32px 28px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontSize:16, fontWeight:600, color:"#fff", letterSpacing:"-0.02em", marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}>{desc}</p>
    </motion.div>
  );
}

/* ─── STAT ─── */
function CheckersStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

/* ─── PILL ─── */
function CheckersPill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}

/* ─── MAIN ─── */
function ProjectCheckers({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping:25, stiffness:200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon:"♟️", title:"Full Checkers Logic", desc:"Forward diagonal movement, one backward move per soldier, eating — all three move types fully implemented with validation." },
    { icon:"🖥️", title:"WinForms Client", desc:"Custom Graphics + Bitmap drawing layer for free-hand board annotation. Win animation with green blink effect for ~5 seconds." },
    { icon:"⏱️", title:"Game Timer", desc:"Countdown timer bar with 2, 5, and 15-second combo options. Auto-move when time runs out." },
    { icon:"🔄", title:"Replay System", desc:"Full local SQLite/EF database stores every move. Review any past game move-by-move from your history." },
    { icon:"🌐", title:"REST API Server", desc:"ASP.NET Core Web API handles all game logic server-side — start game, make move, end game endpoints." },
    { icon:"📊", title:"Razor Pages Web UI", desc:"Full web interface for player registration, management, and 8 analytical SQL queries with real-time data." },
  ];

  const checkersPreviewImages = [
    { src: "/images/checkers-game.png", title: "WinForms Game Board", desc: "The desktop checkers board with full movement logic, timer, and game controls." },
    { src: "/images/checkers-web.png", title: "Razor Pages Web UI", desc: "The web interface for player registration, management, and project data views." },
    { src: "/images/checkers-query.png", title: "SQL Queries & Analytics", desc: "A real query results screen showing analytical SQL queries, player statistics, and database insights." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <CheckersCursor />
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(99,102,241,0.6)", zIndex:200, width:barWidth }} />

      {/* BG GLOWS */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.028, backgroundImage:"linear-gradient(rgba(99,102,241,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack} whileHover={{ x:-3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://github.com/JolianHabib/DotNet-Game-Project" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(99,102,241,0.15)", color:"#818cf8", padding:"10px 22px", borderRadius:999, border:"1px solid rgba(99,102,241,0.25)" }}>
            GitHub ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y: heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:"1px solid rgba(99,102,241,0.2)", borderRadius:999, padding:"7px 20px", marginBottom:48, background:"rgba(99,102,241,0.06)", backdropFilter:"blur(16px)" }}>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(99,102,241,0.8)" }}>Full-Stack · .NET</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 002
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(56px,9vw,120px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Checkers
            <span style={{ display:"block", background:"linear-gradient(135deg,#818cf8,rgba(99,102,241,0.3))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Game
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:580, margin:"0 auto 48px", fontWeight:300 }}>
            Full-stack checkers game with a WinForms client, ASP.NET Core server, Razor Pages web UI, REST API, and PostgreSQL database. Built for Afeka College.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {[".NET Framework","WinForms","ASP.NET Core","Entity Framework","PostgreSQL","REST API","Razor Pages"].map(t => <CheckersPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <Magnetic href="https://github.com/JolianHabib/DotNet-Game-Project" target="_blank"
              style={{ gap:9, background:"#818cf8", color:"#000", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(99,102,241,0.25)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* CHECKERS PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(99,102,241,0.65)", marginBottom:18 }}>
              Project Preview
            </div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>
              See the game in action
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots show the desktop client, web interface, and SQL query results clearly.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {checkersPreviewImages.map((item,i) => <ProjectPreviewCard key={item.title} {...item} color="rgba(99,102,241,0.24)" delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"8×4",label:"Board Matrix"},{val:"8",label:"SQL Queries"},{val:"4",label:"Components"},{val:"Full",label:"Replay System"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <CheckersStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <CheckersFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's built</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            <div style={{ display:"flex", justifyContent:"center", gap:32 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <CheckersArchNode label="WinForms Client" sub="C# Desktop App" color="#818cf8" delay={0.1} />
                <CheckersArrow />
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <CheckersArchNode label="Razor Pages" sub="Web Interface" color="#818cf8" delay={0.15} />
                <CheckersArrow />
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <CheckersArchNode label="ASP.NET Core" sub="REST API + Web Server" color="#3b82f6" delay={0.2} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><CheckersArrow /></div>

            <div style={{ display:"flex", justifyContent:"center", gap:24 }}>
              <CheckersArchNode label="Game Logic" sub="Move validation" color="#f59e0b" delay={0.25} />
              <CheckersArchNode label="Player Manager" sub="Register / Stats" color="#f59e0b" delay={0.3} />
              <CheckersArchNode label="Query Engine" sub="8 SQL analytics" color="#f59e0b" delay={0.35} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><CheckersArrow /></div>

            <div style={{ display:"flex", justifyContent:"center", gap:24 }}>
              <CheckersArchNode label="PostgreSQL" sub="Server DB" color="#10b981" delay={0.4} />
              <CheckersArchNode label="SQLite / EF" sub="Local replay DB" color="#10b981" delay={0.45} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#818cf8","Client Layer"],["#3b82f6","API Server"],["#f59e0b","Business Logic"],["#10b981","Data Layer"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to use it</h2>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Register Players", desc:"Open the Razor Pages web UI to register 1–10 players with name, ID, country, and phone. Data is stored in PostgreSQL." },
              { num:"02", title:"Start a Game", desc:"Launch the WinForms client, select players and timer duration (2/5/15 seconds), then start a game against the server." },
              { num:"03", title:"Play Checkers", desc:"Move your soldiers diagonally. Each soldier can move backward once. The server plays automatically within the timer." },
              { num:"04", title:"Draw & Annotate", desc:"Use the free-hand drawing layer to annotate the board while playing — draw on top of the game in real time." },
              { num:"05", title:"Replay Any Game", desc:"After a game ends, open Replay to watch any past game move-by-move from the local SQLite database." },
              { num:"06", title:"View Analytics", desc:"Use the Queries page to run 8 analytical SQL queries — top players, win rates, country stats, and more." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(99,102,241,0.05)", borderColor:"rgba(99,102,241,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(99,102,241,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(99,102,241,0.12)", borderRadius:32, background:"rgba(99,102,241,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(99,102,241,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(99,102,241,0.5)", marginBottom:22 }}>Source Code</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>Full project on GitHub.</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>Built by Jolian Habib · Afeka College 2026</p>
              <Magnetic href="https://github.com/JolianHabib/DotNet-Game-Project" target="_blank"
                style={{ gap:10, background:"#818cf8", color:"#000", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(99,102,241,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2026</span>
        <Magnetic href="https://github.com/JolianHabib/DotNet-Game-Project" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


function GameFactoryCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping:26, stiffness:280 });
  const sy = useSpring(cy, { damping:26, stiffness:280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}


function ShiftArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:130 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

function ShiftArrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

function ShiftFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      whileHover={{ background:"rgba(255,255,255,0.042)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
      style={{ padding:"32px 28px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontSize:16, fontWeight:600, color:"#fff", letterSpacing:"-0.02em", marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}>{desc}</p>
    </motion.div>
  );
}

function ShiftStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

function ShiftPill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}


function ProjectShift({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping:25, stiffness:200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon:"👔", title:"Role-Based Menus", desc:"Each user role — Manager, Shift Supervisor, Employee — gets a tailored menu with only the relevant actions." },
    { icon:"📅", title:"Shift Scheduling", desc:"Managers assign employees to shifts by day and time. Full schedule creation with conflict prevention logic." },
    { icon:"✅", title:"Attendance Tracking", desc:"Mark employee attendance per shift. Real-time status updates with automatic absence recording." },
    { icon:"🧑‍💼", title:"Employee Management", desc:"Add, update, and remove employees. Assign roles, departments, and working conditions." },
    { icon:"🏗️", title:"OOP Architecture", desc:"Clean layered design — UI, logic, and data fully separated. Each class has a single responsibility." },
    { icon:"🔒", title:"Authorization System", desc:"Login per role. Actions are locked behind permissions — only the right role can access each function." },
  ];

  const shiftPreviewImages = [
    { src: "/images/shift-menu.png", title: "Role-Based Console Menu", desc: "The Java console interface showing the administrator menu and the role-based workflow for managing the system." },
    { src: "/images/shift-schedule.png", title: "Shift Scheduling Flow", desc: "A real scheduling screen showing how shifts are created, updated, assigned, or reviewed through the system." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <ShiftCursor />
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(249,115,22,0.6)", zIndex:200, width:barWidth }} />

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:`radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)`, borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:`radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)`, borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.025, backgroundImage:"linear-gradient(rgba(249,115,22,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack} whileHover={{ x:-3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://github.com/JolianHabib/ShiftManagementSystem" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(249,115,22,0.15)", color:"#f97316", padding:"10px 22px", borderRadius:999, border:`1px solid rgba(249,115,22,0.25)` }}>
            GitHub ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y:heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:`1px solid rgba(249,115,22,0.2)`, borderRadius:999, padding:"7px 20px", marginBottom:48, background:`rgba(249,115,22,0.06)`, backdropFilter:"blur(16px)" }}>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:`rgba(249,115,22,0.8)` }}>Java · OOP</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 003
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(46px,8vw,110px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Shift
            <span style={{ display:"block", background:`linear-gradient(135deg,#f97316,rgba(249,115,22,0.3))`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Management
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            A Java-based shift management system with role-based access, employee scheduling, attendance tracking, and clean object-oriented architecture.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["Java","OOP","Role-Based Access","Scheduling","Attendance","Clean Architecture"].map(t => <ShiftPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <Magnetic href="https://github.com/JolianHabib/ShiftManagementSystem" target="_blank"
              style={{ gap:9, background:"#f97316", color:"#000", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:`0 0 60px rgba(249,115,22,0.25)` }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* SHIFT PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(249,115,22,0.65)", marginBottom:18 }}>
              Project Preview
            </div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>
              See the system in action
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots show the role-based menu and the shift scheduling workflow clearly.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
            {shiftPreviewImages.map((item,i) => <ProjectPreviewCard key={item.title} {...item} color="rgba(249,115,22,0.24)" delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"3",label:"User Roles"},{val:"OOP",label:"Architecture"},{val:"Full",label:"Scheduling"},{val:"Java",label:"Language"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <ShiftStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <ShiftFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's built</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            {/* 3 roles */}
            <div style={{ display:"flex", justifyContent:"center", gap:24 }}>
              {[["Manager","Full access"],["Supervisor","Shift ops"],["Employee","View only"]].map(([l,s],i)=>(
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <ShiftArchNode label={l} sub={s} color="#f97316" delay={0.1+i*0.05} />
                  <ShiftArrow />
                </div>
              ))}
            </div>

            {/* Auth */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ShiftArchNode label="Auth & Role Router" sub="Login → redirect by role" color="#3b82f6" delay={0.25} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ShiftArrow /></div>

            {/* Core modules */}
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
              <ShiftArchNode label="Shift Module" sub="Create / assign shifts" color="#f59e0b" delay={0.3} />
              <ShiftArchNode label="Employee Module" sub="Manage staff" color="#f59e0b" delay={0.35} />
              <ShiftArchNode label="Attendance Module" sub="Track presence" color="#f59e0b" delay={0.4} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ShiftArrow /></div>

            {/* Data */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ShiftArchNode label="In-Memory Data Layer" sub="Java collections & OOP models" color="#10b981" delay={0.45} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#f97316","User Roles"],["#3b82f6","Auth Layer"],["#f59e0b","Business Logic"],["#10b981","Data Layer"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to use it</h2>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Login with your role", desc:"Each user logs in as Manager, Supervisor, or Employee. The system redirects to the appropriate menu automatically." },
              { num:"02", title:"Manage employees", desc:"Managers can add, edit, or remove employees. Assign each to a department and set their working conditions." },
              { num:"03", title:"Create shifts", desc:"Build a weekly schedule by assigning employees to specific days and time slots. The system prevents conflicts." },
              { num:"04", title:"Track attendance", desc:"Supervisors mark attendance at the start of each shift. Absences are recorded automatically." },
              { num:"05", title:"View reports", desc:"Managers can view full shift summaries, attendance records, and employee activity logs." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(249,115,22,0.05)", borderColor:"rgba(249,115,22,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(249,115,22,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(249,115,22,0.12)", borderRadius:32, background:"rgba(249,115,22,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(249,115,22,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(249,115,22,0.5)", marginBottom:22 }}>Source Code</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>Full project on GitHub.</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>Built by Jolian Habib · Afeka College 2025</p>
              <Magnetic href="https://github.com/JolianHabib/ShiftManagementSystem" target="_blank"
                style={{ gap:10, background:"#f97316", color:"#000", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(249,115,22,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2025</span>
        <Magnetic href="https://github.com/JolianHabib/ShiftManagementSystem" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


function ShiftCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping:26, stiffness:280 });
  const sy = useSpring(cy, { damping:26, stiffness:280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}


function ClinicArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:120 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

function ClinicArrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

function ClinicFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      whileHover={{ background:"rgba(255,255,255,0.042)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
      style={{ padding:"32px 28px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontSize:16, fontWeight:600, color:"#fff", letterSpacing:"-0.02em", marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}>{desc}</p>
    </motion.div>
  );
}

function ClinicStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

function ClinicPill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}


function ProjectClinic({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping:25, stiffness:200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon:"🏗️", title:"Full Schema Design", desc:"15+ normalized tables — patients, doctors, appointments, prescriptions, billing, departments, and more." },
    { icon:"⚡", title:"Triggers & Constraints", desc:"Automated triggers for billing, appointment limits, and data integrity. CHECK, UNIQUE, and FK constraints throughout." },
    { icon:"📊", title:"Analytical SQL Queries", desc:"Complex queries for patient history, doctor workload, revenue reports, and appointment analytics." },
    { icon:"💊", title:"Prescription System", desc:"Full medication and prescription tracking linked to appointments and patient records." },
    { icon:"🔗", title:"Referential Integrity", desc:"Cascading deletes and updates. No orphan records. Every relationship is enforced at the DB level." },
    { icon:"📋", title:"Sample Data", desc:"Realistic seed data for all tables — ready to query and demonstrate immediately after setup." },
  ];

  const clinicPreviewImages = [
    { src: "/images/clinic-schema.png", title: "ERD Diagram", desc: "An Entity-Relationship Diagram showing the clinic entities, attributes, primary keys, and relationships between patients, doctors, appointments, prescriptions, departments, and medical records.", objectFit: "contain", imageBg: "#fff" },
    { src: "/images/clinic-queries.png", title: "SQL Query Results", desc: "A real PostgreSQL query execution showing the SQL code and the returned data table, demonstrating how the database can filter and analyze clinic appointment information." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <ClinicCursor />
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(6,182,212,0.6)", zIndex:200, width:barWidth }} />

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.025, backgroundImage:"linear-gradient(rgba(6,182,212,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack} whileHover={{ x:-3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://github.com/JolianHabib/Medical-Clinic-Database" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(6,182,212,0.12)", color:"#06b6d4", padding:"10px 22px", borderRadius:999, border:"1px solid rgba(6,182,212,0.25)" }}>
            GitHub ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y:heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:"1px solid rgba(6,182,212,0.2)", borderRadius:999, padding:"7px 20px", marginBottom:48, background:"rgba(6,182,212,0.06)", backdropFilter:"blur(16px)" }}>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(6,182,212,0.8)" }}>PostgreSQL · PLpgSQL</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 004
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(42px,7vw,100px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Medical Clinic
            <span style={{ display:"block", background:`linear-gradient(135deg,#06b6d4,rgba(6,182,212,0.3))`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Database
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            A production-grade PostgreSQL clinic database with full schema, triggers, constraints, sample data, and complex analytical SQL queries.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["PostgreSQL","PLpgSQL","Schema Design","Triggers","Constraints","Normalization","Analytical Queries"].map(t => <ClinicPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <Magnetic href="https://github.com/JolianHabib/Medical-Clinic-Database" target="_blank"
              style={{ gap:9, background:"#06b6d4", color:"#000", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(6,182,212,0.25)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* CLINIC PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(6,182,212,0.65)", marginBottom:18 }}>
              Project Preview
            </div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>
              See the database in action
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots show the ERD structure and PostgreSQL query results clearly.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
            {clinicPreviewImages.map((item,i) => <ProjectPreviewCard key={item.title} {...item} color="rgba(6,182,212,0.24)" delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"15+",label:"Tables"},{val:"3NF",label:"Normalization"},{val:"Triggers",label:"Automated Logic"},{val:"Full",label:"Sample Data"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <ClinicStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <ClinicFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Schema</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's structured</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            {/* Core entities */}
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
              {[["Patients","Demographics & history"],["Doctors","Specializations & schedule"],["Departments","Clinic structure"]].map(([l,s],i)=>(
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <ClinicArchNode label={l} sub={s} color="#06b6d4" delay={0.1+i*0.05} />
                  <ClinicArrow />
                </div>
              ))}
            </div>

            {/* Appointments */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ClinicArchNode label="Appointments" sub="Core junction table" color="#3b82f6" delay={0.25} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ClinicArrow /></div>

            {/* Sub-entities */}
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
              <ClinicArchNode label="Prescriptions" sub="Medications" color="#f59e0b" delay={0.3} />
              <ClinicArchNode label="Billing" sub="Payments & invoices" color="#f59e0b" delay={0.35} />
              <ClinicArchNode label="Medical Records" sub="Diagnoses & notes" color="#f59e0b" delay={0.4} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ClinicArrow /></div>

            {/* DB engine */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ClinicArchNode label="PostgreSQL + PLpgSQL" sub="Triggers · Constraints · Indexes" color="#10b981" delay={0.45} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#06b6d4","Core Entities"],["#3b82f6","Junction Tables"],["#f59e0b","Sub-Entities"],["#10b981","DB Engine"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to run it</h2>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Clone the repository", desc:"Clone from GitHub and open the project folder. All SQL files are organized by type — schema, data, triggers, queries." },
              { num:"02", title:"Create the database", desc:"Run the schema.sql file in PostgreSQL to create all tables, indexes, and relationships." },
              { num:"03", title:"Load sample data", desc:"Run data.sql to insert realistic sample data across all tables — patients, doctors, appointments, and more." },
              { num:"04", title:"Apply triggers", desc:"Run triggers.sql to activate all automated logic — billing triggers, appointment limits, and integrity checks." },
              { num:"05", title:"Run analytical queries", desc:"Open queries.sql to explore the analytical SQL — patient history, doctor workload, revenue reports, and more." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(6,182,212,0.05)", borderColor:"rgba(6,182,212,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(6,182,212,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(6,182,212,0.12)", borderRadius:32, background:"rgba(6,182,212,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(6,182,212,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(6,182,212,0.5)", marginBottom:22 }}>Source Code</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>Full project on GitHub.</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>Built by Jolian Habib · Afeka College 2025</p>
              <Magnetic href="https://github.com/JolianHabib/Medical-Clinic-Database" target="_blank"
                style={{ gap:10, background:"#06b6d4", color:"#000", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(6,182,212,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2025</span>
        <Magnetic href="https://github.com/JolianHabib/Medical-Clinic-Database" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


function ClinicCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping:26, stiffness:280 });
  const sy = useSpring(cy, { damping:26, stiffness:280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}


function ExamArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:120 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

function ExamArrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

function ExamFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      whileHover={{ background:"rgba(255,255,255,0.042)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
      style={{ padding:"32px 28px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontSize:16, fontWeight:600, color:"#fff", letterSpacing:"-0.02em", marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}>{desc}</p>
    </motion.div>
  );
}

function ExamStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

function ExamPill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}


function ProjectExam({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping:25, stiffness:200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon:"👨‍🏫", title:"Teacher Management", desc:"Create and manage teacher accounts. Each teacher owns their subjects, questions, and exams." },
    { icon:"📚", title:"Subject & Question Bank", desc:"Teachers create subjects and build a reusable question bank per subject. MCQ and open questions supported." },
    { icon:"📝", title:"Exam Creation", desc:"Build exams by selecting questions from the bank. Set time limits, scoring rules, and publish to students." },
    { icon:"🗃️", title:"JDBC Integration", desc:"Full database connectivity via JDBC. All CRUD operations — create, read, update, delete — are DB-backed." },
    { icon:"🧩", title:"OOP Design", desc:"Clean separation of concerns — Teacher, Subject, Question, Answer, and Exam are fully modeled as Java classes." },
    { icon:"🐘", title:"PostgreSQL Backend", desc:"All data persisted in PostgreSQL. Relational schema with proper foreign keys and referential integrity." },
  ];

  const examPreviewImages = [
    { src: "/images/exam-menu.png", title: "Main Console Menu", desc: "The Java console interface where the teacher can manage subjects, questions, answers, and exams through a clear menu flow." },
    { src: "/images/exam-create.png", title: "Exam Creation Flow", desc: "A real exam-building screen showing how questions are selected from the database-backed question bank and added to an exam." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <ExamCursor />
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(168,85,247,0.6)", zIndex:200, width:barWidth }} />

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.025, backgroundImage:"linear-gradient(rgba(168,85,247,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack} whileHover={{ x:-3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://github.com/JolianHabib/ExamSystem" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(168,85,247,0.12)", color:"#a855f7", padding:"10px 22px", borderRadius:999, border:"1px solid rgba(168,85,247,0.25)" }}>
            GitHub ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y:heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:"1px solid rgba(168,85,247,0.2)", borderRadius:999, padding:"7px 20px", marginBottom:48, background:"rgba(168,85,247,0.06)", backdropFilter:"blur(16px)" }}>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(168,85,247,0.8)" }}>Java · JDBC · PostgreSQL</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 005
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(56px,9vw,120px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Exam
            <span style={{ display:"block", background:`linear-gradient(135deg,#a855f7,rgba(168,85,247,0.3))`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              System
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            Java exam management system with OOP design, JDBC database integration, and PostgreSQL backend. Supports teachers, subjects, question banks, and full exam creation.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["Java","OOP","JDBC","PostgreSQL","Question Bank","Exam Builder"].map(t => <ExamPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <Magnetic href="https://github.com/JolianHabib/ExamSystem" target="_blank"
              style={{ gap:9, background:"#a855f7", color:"#000", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(168,85,247,0.25)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* EXAM PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(168,85,247,0.65)", marginBottom:18 }}>
              Project Preview
            </div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>
              See the system in action
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots show the Java console workflow and the exam creation process clearly.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
            {examPreviewImages.map((item,i) => <ProjectPreviewCard key={item.title} {...item} color="rgba(168,85,247,0.24)" delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"JDBC",label:"DB Connection"},{val:"OOP",label:"Architecture"},{val:"Full",label:"Question Bank"},{val:"Java",label:"Language"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <ExamStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <ExamFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's built</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <ExamArchNode label="Teacher (User)" sub="Manages all content" color="#a855f7" delay={0.1} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ExamArrow /></div>

            <div style={{ display:"flex", justifyContent:"center", gap:24 }}>
              <ExamArchNode label="Subject Manager" sub="Create subjects" color="#3b82f6" delay={0.2} />
              <ExamArchNode label="Question Bank" sub="Add / manage questions" color="#3b82f6" delay={0.25} />
              <ExamArchNode label="Exam Builder" sub="Build & publish exams" color="#3b82f6" delay={0.3} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ExamArrow /></div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <ExamArchNode label="JDBC Layer" sub="Java ↔ Database bridge" color="#f59e0b" delay={0.35} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><ExamArrow /></div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <ExamArchNode label="PostgreSQL" sub="Persistent storage" color="#10b981" delay={0.4} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#a855f7","User Layer"],["#3b82f6","Business Logic"],["#f59e0b","JDBC Bridge"],["#10b981","Database"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to use it</h2>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Setup the database", desc:"Run the SQL schema file against your PostgreSQL instance. All tables — teachers, subjects, questions, exams — are created." },
              { num:"02", title:"Configure JDBC", desc:"Set your DB credentials in the config file. The JDBC connection layer handles all queries automatically." },
              { num:"03", title:"Create a teacher", desc:"Register a teacher account. The teacher is the owner of all content they create." },
              { num:"04", title:"Build a question bank", desc:"Create subjects and add questions to each. Questions can be reused across multiple exams." },
              { num:"05", title:"Create and publish an exam", desc:"Select questions from the bank, set time limits and scores, then publish the exam." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(168,85,247,0.05)", borderColor:"rgba(168,85,247,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(168,85,247,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(168,85,247,0.12)", borderRadius:32, background:"rgba(168,85,247,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(168,85,247,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(168,85,247,0.5)", marginBottom:22 }}>Source Code</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>Full project on GitHub.</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>Built by Jolian Habib · Afeka College 2024</p>
              <Magnetic href="https://github.com/JolianHabib/ExamSystem" target="_blank"
                style={{ gap:10, background:"#a855f7", color:"#000", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(168,85,247,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2024</span>
        <Magnetic href="https://github.com/JolianHabib/ExamSystem" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


function ExamCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const dx = useMotionValue(-100), dy = useMotionValue(-100);
  const sx = useSpring(cx, { damping:26, stiffness:280 });
  const sy = useSpring(cy, { damping:26, stiffness:280 });
  useEffect(() => {
    const mv = (e) => { cx.set(e.clientX-20); cy.set(e.clientY-20); dx.set(e.clientX-4); dy.set(e.clientY-4); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div style={{ x:sx, y:sy, position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.35)", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
      <motion.div style={{ x:dx, y:dy, position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#fff", pointerEvents:"none", zIndex:9999, mixBlendMode:"difference" }} />
    </>
  );
}


function GameFactoryArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:120 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

function GameFactoryArrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

function GameFactoryFeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      whileHover={{ background:"rgba(255,255,255,0.042)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
      style={{ padding:"32px 28px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
      <div style={{ fontSize:28, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontSize:16, fontWeight:600, color:"#fff", letterSpacing:"-0.02em", marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.75 }}>{desc}</p>
    </motion.div>
  );
}

function GameFactoryStat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

function GameFactoryPill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}


function ProjectGameFactory({ onBack }) {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.92)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping:25, stiffness:200 });
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const features = [
    { icon:"🏭", title:"Factory Management", desc:"Full management of factory structure — departments, production lines, machines, and workers all tracked in one system." },
    { icon:"🎮", title:"Game Catalog", desc:"Add, update, and remove games from the catalog. Each game is linked to its department, machine, and production data." },
    { icon:"👷", title:"Worker Management", desc:"Register workers, assign them to departments and machines, and track their roles in the production process." },
    { icon:"🛒", title:"Orders & Customers", desc:"Create customer profiles and manage orders. Each order links to specific games, quantities, and delivery tracking." },
    { icon:"🗃️", title:"Structs & Linked Lists", desc:"Core data is modeled using C structs and dynamic linked lists — no arrays. Manual memory management throughout." },
    { icon:"💾", title:"File Persistence", desc:"All data is saved and loaded from binary files. The system persists between sessions with full read/write operations." },
  ];

  const factoryPreviewImages = [
    { src: "/images/factory-menu.png", title: "Main Factory Menu", desc: "The C console interface showing the main factory management menu and the available system modules." },
    { src: "/images/factory-output.png", title: "Factory Data Output", desc: "A real output screen showing factory data such as games, workers, departments, customers, and machines loaded from files." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <GameFactoryCursor />
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(225,29,72,0.6)", zIndex:200, width:barWidth }} />

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(225,29,72,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.025, backgroundImage:"linear-gradient(rgba(225,29,72,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(225,29,72,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:navBg }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack} whileHover={{ x:-3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"none" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </motion.button>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
          <Magnetic href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(225,29,72,0.12)", color:"#e11d48", padding:"10px 22px", borderRadius:999, border:"1px solid rgba(225,29,72,0.25)" }}>
            GitHub ↗
          </Magnetic>
        </div>
      </motion.header>

      {/* HERO */}
      <motion.section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"130px 48px 90px", textAlign:"center" }}>
        <motion.div style={{ y:heroY }}>
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.7 }}
            style={{ display:"inline-flex", alignItems:"center", gap:9, border:"1px solid rgba(225,29,72,0.2)", borderRadius:999, padding:"7px 20px", marginBottom:48, background:"rgba(225,29,72,0.06)", backdropFilter:"blur(16px)" }}>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(225,29,72,0.8)" }}>C · Data Structures</span>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
            style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:20 }}>
            Project 006
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ fontSize:"clamp(46px,8vw,110px)", fontWeight:700, lineHeight:0.9, letterSpacing:"-0.055em", color:"#fff", marginBottom:32, maxWidth:1000 }}>
            Game
            <span style={{ display:"block", background:`linear-gradient(135deg,#e11d48,rgba(225,29,72,0.3))`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Factory
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            A C program for managing a toy and game factory — departments, workers, machines, games, customers, and orders. Built with structs, linked lists, and file persistence.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["C","Structs","Linked Lists","File I/O","Dynamic Memory","Data Structures"].map(t => <GameFactoryPill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <Magnetic href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
              style={{ gap:9, background:"#e11d48", color:"#fff", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(225,29,72,0.25)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.3, repeat:Infinity }} style={{ marginTop:64, opacity:0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:2.3, repeat:Infinity }}/>
          </svg>
        </motion.div>
      </motion.section>


      {/* FACTORY PRODUCT PREVIEW */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60, textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(225,29,72,0.65)", marginBottom:18 }}>
              Project Preview
            </div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff", marginBottom:14 }}>
              See the factory system in action
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.32)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
              Real screenshots show the C console menu and the data output produced by the factory management system.
            </p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
            {factoryPreviewImages.map((item,i) => <ProjectPreviewCard key={item.title} {...item} color="rgba(225,29,72,0.24)" delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"6",label:"Modules"},{val:"Linked",label:"Lists"},{val:"File",label:"Persistence"},{val:"C",label:"Language"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
                <GameFactoryStat val={s.val} label={s.label} delay={i*0.08} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position:"relative", zIndex:1, padding:"120px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Features</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>What it does</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {features.map((f,i) => <GameFactoryFeatureCard key={f.title} {...f} delay={i*0.08} />)}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Architecture</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How it's built</h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            style={{ padding:"52px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:28, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(20px)" }}>

            {/* Main menu */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <GameFactoryArchNode label="Main Menu" sub="CLI interface" color="#e11d48" delay={0.1} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><GameFactoryArrow /></div>

            {/* 3 top modules */}
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
              <GameFactoryArchNode label="Factory" sub="Depts & machines" color="#3b82f6" delay={0.2} />
              <GameFactoryArchNode label="Workers" sub="Staff management" color="#3b82f6" delay={0.25} />
              <GameFactoryArchNode label="Games" sub="Product catalog" color="#3b82f6" delay={0.3} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><GameFactoryArrow /></div>

            {/* Orders */}
            <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
              <GameFactoryArchNode label="Customers" sub="Profiles & history" color="#f59e0b" delay={0.35} />
              <GameFactoryArchNode label="Orders" sub="Linked to games" color="#f59e0b" delay={0.4} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><GameFactoryArrow /></div>

            {/* Data layer */}
            <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
              <GameFactoryArchNode label="Linked Lists" sub="Dynamic C structs" color="#10b981" delay={0.45} />
              <GameFactoryArchNode label="Binary Files" sub="Read / write persist" color="#10b981" delay={0.5} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:36, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
              {[["#e11d48","Entry Point"],["#3b82f6","Core Modules"],["#f59e0b","Business Layer"],["#10b981","Data Layer"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:18 }}>Usage</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>How to use it</h2>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[
              { num:"01", title:"Compile the project", desc:"Compile with GCC — gcc main.c -o factory. All source files are in one place, no external dependencies." },
              { num:"02", title:"Set up the factory", desc:"Start by creating departments and assigning machines to each. This is the foundation of the production structure." },
              { num:"03", title:"Add workers and games", desc:"Register workers to departments. Then add games to the catalog, linking each to its department and machine." },
              { num:"04", title:"Manage customers and orders", desc:"Create customer profiles and place orders linked to specific games and quantities." },
              { num:"05", title:"Save and load data", desc:"All data is written to binary files automatically. Restart the program and your data loads back from disk." },
            ].map((step,i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.08, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(225,29,72,0.05)", borderColor:"rgba(225,29,72,0.2)", paddingLeft:52 }}
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"none", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"rgba(225,29,72,0.5)", alignSelf:"center" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:600, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
            style={{ position:"relative", padding:"80px", border:"1px solid rgba(225,29,72,0.12)", borderRadius:32, background:"rgba(225,29,72,0.03)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-200, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(circle,rgba(225,29,72,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, border:"1px solid rgba(225,29,72,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(225,29,72,0.5)", marginBottom:22 }}>Source Code</div>
              <h2 style={{ fontSize:"clamp(32px,4.5vw,60px)", fontWeight:700, letterSpacing:"-0.05em", color:"#fff", marginBottom:18 }}>Full project on GitHub.</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.3)", marginBottom:44, lineHeight:1.7 }}>Built by Jolian Habib · Afeka College 2023</p>
              <Magnetic href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
                style={{ gap:10, background:"#e11d48", color:"#fff", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(225,29,72,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <motion.button onClick={onBack} whileHover={{ x:-3 }}
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"none" }}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Portfolio
        </motion.button>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.15)", letterSpacing:"0.08em" }}>Jolian Habib · 2023</span>
        <Magnetic href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </Magnetic>
      </footer>
    </div>
  );
}


/* ─── CONTACT FORM ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xqejvqve", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, padding: "14px 18px", color: "#f5f5f7", fontSize: 14,
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <input
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          style={inputStyle}
        />
        <input
          placeholder="Your email"
          type="email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          style={inputStyle}
        />
      </div>
      <textarea
        placeholder="Your message..."
        value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        rows={4}
        style={{ ...inputStyle, resize: "vertical", marginBottom: 12, display: "block" }}
      />
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: status === "sending" ? 1 : 1.02, y: status === "sending" ? 0 : -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={status === "sending" || status === "sent"}
        style={{
          width: "100%", padding: "15px", borderRadius: 12, border: "none",
          background: status === "sent" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.08)",
          color: status === "sent" ? "#34d399" : "#f5f5f7",
          fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", cursor: "none",
          border: `1px solid ${status === "sent" ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
          transition: "all 0.3s",
        }}
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message sent!" : status === "error" ? "Failed — try email instead" : "Send Message"}
      </motion.button>
      <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
        or email directly at{" "}
        <a href="mailto:Jolianhabib123@gmail.com" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>
          Jolianhabib123@gmail.com
        </a>
      </p>
    </div>
  );
}


export default function Portfolio() {
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(null);
  const [showCurtain, setShowCurtain] = useState(false);
  const [curtainDir, setCurtainDir] = useState("down");
  const savedScrollY = useRef(0);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 420], [1, 0.93]);
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(4,4,4,0.9)"]);
  const barWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { damping: 25, stiffness: 200 });

  const openProject = (id) => {
    savedScrollY.current = window.scrollY;
    setCurtainDir("down");
    setShowCurtain(true);
    setTimeout(() => {
      setActiveProject(id);
      window.scrollTo({ top: 0, behavior: "auto" });
      setTimeout(() => setShowCurtain(false), 100);
    }, 550);
  };

  const handleBack = () => {
    const y = savedScrollY.current;
    setCurtainDir("up");
    setShowCurtain(true);
    setTimeout(() => {
      setActiveProject(null);
      window.scrollTo({ top: y, behavior: "auto" });
      setTimeout(() => setShowCurtain(false), 100);
    }, 550);
  };

  const projectPages = {
    afeka: <ProjectAfeka onBack={handleBack} />,
    checkers: <ProjectCheckers onBack={handleBack} />,
    shift: <ProjectShift onBack={handleBack} />,
    clinic: <ProjectClinic onBack={handleBack} />,
    exam: <ProjectExam onBack={handleBack} />,
    factory: <ProjectGameFactory onBack={handleBack} />,
  };

  if (activeProject) return (
    <>
      <ResponsiveGlobalStyles />
      <Curtain isVisible={showCurtain} direction={curtainDir} />
      <PageWrapper key={activeProject}>{projectPages[activeProject]}</PageWrapper>
    </>
  );

  return (
    <>
    <ResponsiveGlobalStyles />
    <Curtain isVisible={showCurtain} direction={curtainDir} />
    <div style={{ background: "#030303", color: "#f5f5f7", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        ::selection{background:rgba(255,255,255,0.12)}
        a{text-decoration:none;color:inherit}
      `}</style>

      <CustomCursor />
      <SectionProgress />

      {/* progress bar */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, height: "1px", background: "rgba(255,255,255,0.32)", zIndex: 200, width: barWidth }} />

      {/* bg glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[
          { w: 900, h: 900, left: "50%", top: -350, tx: "-50%", bg: "rgba(255,255,255,0.032)" },
          { w: 550, h: 550, right: -200, top: "28vh", bg: "rgba(120,80,255,0.038)" },
          { w: 480, h: 480, left: -180, top: "62vh", bg: "rgba(20,184,166,0.03)" },
        ].map((g, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", width: g.w, height: g.h, left: g.left, right: g.right, top: g.top, transform: g.tx ? `translateX(${g.tx})` : undefined, background: g.bg, borderRadius: "50%", filter: "blur(90px)" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")" }} />
        {/* Enhanced grain overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='6' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.028, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "80px 80px", maskImage: "linear-gradient(to bottom,black 0%,transparent 60%)" }} />
      </div>

      {/* ── NAV ── */}
      <motion.header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", borderBottom: "1px solid rgba(255,255,255,0.055)", background: navBg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 18px" : "0 48px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <motion.span whileHover={{ letterSpacing: "0.34em" }} transition={{ duration: 0.3 }}
            style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.26em", color: "#fff", textTransform: "uppercase", cursor: "none" }}>
            JH
          </motion.span>
          <nav style={{ display: isMobile ? "none" : "flex", gap: 2 }}>
            {["About", "Skills", "Projects", "Contact"].map(item => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} whileHover={{ color: "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", padding: "9px 18px", borderRadius: 999, cursor: "none", transition: "background 0.2s" }}>
                {item}
              </motion.a>
            ))}
          </nav>
          <div style={{ display:"flex", gap:isMobile ? 6 : 8, alignItems:"center" }}>
            <Magnetic href="/CV_JolianHabib.pdf" target="_blank"
              style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.65)", padding:isMobile ? "10px 13px" : "11px 20px", borderRadius:999, gap:7, backdropFilter:"blur(12px)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CV
            </Magnetic>
            <Magnetic href="#contact"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", background: "#f5f5f7", color: "#000", padding: isMobile ? "10px 16px" : "11px 26px", borderRadius: 999, gap: 0 }}>
              Contact
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <motion.section id="about"
        style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "130px 48px 90px", textAlign: "center", opacity: heroOpacity, scale: heroScale }}>
        <Particles />

        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "7px 20px", marginBottom: 52, background: "rgba(255,255,255,0.035)", backdropFilter: "blur(16px)" }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 10px #34d399" }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.52)" }}>Selected projects · Built with care and clarity</span>
        </motion.div>

        <h1 style={{ fontSize: isMobile ? "clamp(46px, 18vw, 76px)" : "clamp(64px, 10vw, 140px)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.055em", color: "#fff", marginBottom: 36, maxWidth: 1100 }}>
          <Split text="Software" delay={0.2} />
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.56, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", background: "linear-gradient(135deg,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.2) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              as craft.
            </motion.span>
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}
          style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,0.36)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 56px", fontWeight: 300 }}>
          Software Engineering student at Afeka College. I build full-stack systems with Java, .NET, React, and PostgreSQL, focusing on clean backend logic, database-driven applications, and polished user experiences.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Magnetic href="#projects"
            style={{ gap: 10, background: "#f5f5f7", color: "#000", fontSize: 14, fontWeight: 600, letterSpacing: "0.025em", padding: "17px 36px", borderRadius: 999, boxShadow: "0 0 80px rgba(255,255,255,0.07),0 4px 24px rgba(0,0,0,0.4)" }}>
            View Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Magnetic>
          <Magnetic href="#about-section"
            style={{ gap: 0, border: "1px solid rgba(255,255,255,0.11)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.62)", fontSize: 14, fontWeight: 500, padding: "17px 36px", borderRadius: 999, backdropFilter: "blur(14px)" }}>
            About me
          </Magnetic>
          <Magnetic href="/CV_JolianHabib.pdf" target="_blank"
            style={{ gap:8, border:"1px solid rgba(255,255,255,0.09)", background:"rgba(255,255,255,0.025)", color:"rgba(255,255,255,0.45)", fontSize:13, fontWeight:500, padding:"17px 28px", borderRadius:999, backdropFilter:"blur(14px)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.12, duration: 0.7 }}
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 34, maxWidth: 760 }}
        >
          {["Java", ".NET", "React", "PostgreSQL", "SQL", "C", "GitHub", "Vercel"].map((tech) => (
            <span key={tech} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", borderRadius: 999, padding: "7px 14px", backdropFilter: "blur(12px)" }}>
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginTop: 70, opacity: 0.2 }}>
          <svg width="20" height="32" viewBox="0 0 20 36" fill="none">
            <rect x="1" y="1" width="18" height="34" rx="9" stroke="white" strokeWidth="1.2"/>
            <motion.rect x="9" y="7" width="2" height="9" rx="1" fill="white" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}/>
          </svg>
        </motion.div>
      </motion.section>

      {/* ── WHAT I BUILD ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.008)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "42px 48px 46px" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 16 : 24, padding: isMobile ? "22px 20px" : "20px 26px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, background: "rgba(255,255,255,0.025)", backdropFilter: "blur(18px)", marginBottom: 18, flexDirection: isMobile ? "column" : "row" }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 6 }}>What I build</div>
              <div style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 650, letterSpacing: "-0.035em", color: "#fff" }}>Full-stack systems · Backend logic · Database-driven applications</div>
            </div>
            <Magnetic href="#projects"
              style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "#f5f5f7", color: "#000", padding: "13px 24px", borderRadius: 999, width:isMobile ? "100%" : "auto" }}>
              Explore work
            </Magnetic>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
            {[
              { v: "Full-Stack Apps", l: "React interfaces connected to backend logic, APIs, and real data." },
              { v: "Backend Systems", l: "Java, .NET, APIs, authentication, and structured business logic." },
              { v: "Database Projects", l: "PostgreSQL schemas, constraints, triggers, and analytical SQL." },
            ].map((it, i) => (
              <motion.div key={it.v}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ background: "rgba(255,255,255,0.035)", borderColor: "rgba(255,255,255,0.12)", y: -3 }}
                style={{ padding: "30px 30px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.014)", borderRadius: 20, transition: "all 0.3s", cursor: "none" }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.035em", color: "#fff", marginBottom: 9 }}>{it.v}</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.34)", fontWeight: 300 }}>{it.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO + ABOUT ── */}
      <div id="about-section" style={{ paddingTop: 140 }}>
        <PhotoShowcase />
      </div>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ position:"relative", zIndex:1, padding:"0 48px 150px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:18 }}>Skills</div>
            <h2 style={{ fontSize:"clamp(32px,4vw,54px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>Focused strengths</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {skills.map((sk,i)=>(
              <motion.div key={sk.title}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.8, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(255,255,255,0.038)", borderColor:"rgba(255,255,255,0.13)", y:-4 }}
                style={{ padding:"48px 40px", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.016)", cursor:"none", transition:"all 0.35s", borderRadius:24 }}>
                <motion.div whileHover={{ scale:1.08, rotate:4 }} style={{ display:"inline-flex", width:48, height:48, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", alignItems:"center", justifyContent:"center", marginBottom:32 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.45)" }}>{sk.num}</span>
                </motion.div>
                <h3 style={{ fontSize:27, fontWeight:700, letterSpacing:"-0.04em", color:"#fff", marginBottom:7 }}>{sk.title}</h3>
                <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.3)", marginBottom:20 }}>{sk.sub}</div>
                <p style={{ fontSize:14, lineHeight:1.85, color:"rgba(255,255,255,0.37)", marginBottom:32 }}>{sk.text}</p>
                <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"0.1em", color:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:999, padding:"5px 14px" }}>{sk.tag}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ position:"relative", zIndex:1, padding:"0 48px 150px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ marginBottom:isMobile ? 34 : 60, display:"flex", alignItems:isMobile ? "flex-start" : "flex-end", justifyContent:"space-between", flexDirection:isMobile ? "column" : "row", gap:isMobile ? 12 : 0 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:18 }}>Projects</div>
              <h2 style={{ fontSize:"clamp(32px,4vw,54px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>Selected work</h2>
            </div>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.28)", letterSpacing:"0.08em" }}>2023 — 2026</span>
          </motion.div>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {projects.map((pr,i)=>(
              <motion.div key={pr.title}
                initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.8, ease:[0.16,1,0.3,1] }}
                whileHover={isMobile ? {} : { paddingLeft:58, background:pr.color, borderColor:"rgba(255,255,255,0.14)" }}
                onClick={() => { const id = PROJECT_MAP[pr.num]; if (id) openProject(id); else window.open(pr.url, "_blank"); }}
                style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "88px 1fr auto", alignItems:isMobile ? "start" : "center", gap:isMobile ? 18 : 36, padding:isMobile ? "24px 22px" : "32px 40px", border:"1px solid rgba(255,255,255,0.07)", background:isMobile ? "rgba(255,255,255,0.028)" : "rgba(255,255,255,0.018)", borderRadius:isMobile ? 22 : 18, cursor:"pointer", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", position:"relative", overflow:"hidden" }}>
                {/* color accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                  style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:pr.color.replace('0.1','0.8').replace('0.12','0.8').replace('0.11','0.8').replace('0.09','0.8').replace('0.13','0.8'), borderRadius:"18px 0 0 18px", transformOrigin:"left", pointerEvents:"none" }}
                />
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                  <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.18em", color:"rgba(255,255,255,0.28)" }}>{pr.num}</span>
                  {isMobile && <span style={{ fontSize:12, color:"rgba(255,255,255,0.26)", letterSpacing:"0.08em" }}>{pr.year}</span>}
                </div>
                <div>
                  <h3 style={{ fontSize:isMobile ? 22 : 23, fontWeight:700, letterSpacing:"-0.035em", lineHeight:1.12, color:"#fff", marginBottom:11 }}>{pr.title}</h3>
                  <p style={{ fontSize:isMobile ? 13.5 : 14, color:isMobile ? "rgba(255,255,255,0.48)" : "rgba(255,255,255,0.35)", lineHeight:1.75, marginBottom:18 }}>{pr.desc}</p>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {pr.tags.map(tag=>(
                      <span key={tag} style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.09em", color:isMobile ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.27)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:999, padding:isMobile ? "5px 11px" : "4px 13px" }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display:isMobile ? "none" : "flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.2)" }}>{pr.year}</span>
                  <motion.div whileHover={{ scale:1.12, rotate:45 }} style={{ width:42, height:42, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.13)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.4)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CURRENTLY LEARNING ── */}
      <section style={{ position:"relative", zIndex:1, padding:"0 48px 150px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ marginBottom:52 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:18 }}>Now</div>
            <h2 style={{ fontSize:"clamp(32px,4vw,54px)", fontWeight:700, letterSpacing:"-0.045em", color:"#fff" }}>Currently learning</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {[
              { tech:"Spring Boot", desc:"Building REST APIs and microservices with Java's most popular backend framework.", color:"#34d399", status:"Active" },
              { tech:"Docker", desc:"Containerizing applications for consistent deployment across any environment.", color:"#60a5fa", status:"Active" },
              { tech:"TypeScript", desc:"Adding static types to JavaScript for cleaner, more maintainable frontend code.", color:"#a78bfa", status:"Active" },
            ].map((item, i) => (
              <motion.div key={item.tech}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.1, duration:0.7, ease:[0.16,1,0.3,1] }}
                whileHover={{ background:"rgba(255,255,255,0.034)", borderColor:"rgba(255,255,255,0.12)", y:-3 }}
                style={{ padding:"32px 36px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.016)", borderRadius:20, transition:"all 0.3s", cursor:"none" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <span style={{ fontSize:18, fontWeight:700, color:"#fff", letterSpacing:"-0.03em" }}>{item.tech}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:6, border:`1px solid ${item.color}30`, borderRadius:999, padding:"4px 12px", background:`${item.color}10` }}>
                    <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:2, repeat:Infinity }}
                      style={{ width:5, height:5, borderRadius:"50%", background:item.color, boxShadow:`0 0 6px ${item.color}` }} />
                    <span style={{ fontSize:9, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:item.color }}>{item.status}</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", lineHeight:1.75 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position:"relative", zIndex:1, padding:"0 48px 90px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:48 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1, ease:[0.16,1,0.3,1] }}
            style={{ position:"relative", padding:"90px 80px", border:"1px solid rgba(255,255,255,0.08)", borderRadius:36, background:"rgba(255,255,255,0.018)", backdropFilter:"blur(24px)", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-260, left:"50%", transform:"translateX(-50%)", width:700, height:500, background:"radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:360 }} transition={{ duration:65, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, border:"1px solid rgba(255,255,255,0.025)", borderRadius:"50%", pointerEvents:"none" }} />
            <motion.div animate={{ rotate:-360 }} transition={{ duration:42, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, border:"1px solid rgba(255,255,255,0.02)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:26 }}>Contact</div>
              <h2 style={{ fontSize:"clamp(38px,5.5vw,72px)", fontWeight:700, letterSpacing:"-0.055em", lineHeight:1.03, color:"#fff", marginBottom:22 }}>
                Let's build something<br />
                <span style={{ color:"rgba(255,255,255,0.26)" }}>worth remembering.</span>
              </h2>
              <p style={{ fontSize:16, color:"rgba(255,255,255,0.3)", marginBottom:36, lineHeight:1.7 }}>A space to ask about my work, projects, or technical ideas.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.045)", padding:"32px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
        <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.26em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>JH</span>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.16)", letterSpacing:"0.08em" }}>© 2026 · Jolian Habib</span>
        <div style={{ display:"flex", gap:26 }}>
          {[
            { name: "GitHub", url: "https://github.com/JolianHabib" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/jolian-habib-se/" }
          ].map(s=>(
            <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" whileHover={{ color:"#fff" }} style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", cursor:"none" }}>{s.name}</motion.a>
          ))}
        </div>
      </footer>
    </div>
    </>
  );
}
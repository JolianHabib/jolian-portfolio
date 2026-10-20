"use client";

import { motion } from "framer-motion";

/* ─── SAFE BUTTON (NO CUSTOM HOOKS) ─── */
function Magnetic({ children, href, target, style, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        ...style,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
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
      style={{ padding: "32px 28px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.016)", borderRadius: 20, transition: "all 0.3s", cursor: "default" }}>
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


/* ─── PREVIEW CARD ─── */
function PreviewCard({ src, title, desc, delay }) {
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

/* ─── MAIN ─── */
export default function ProjectAfeka({ onBack = () => {} }) {
  const features = [
    { icon: "🤖", title: "AI Trail Generation", desc: "Claude / GPT generates real multi-day routes based on location, trail type, and duration with realistic waypoints." },
    { icon: "🗺️", title: "Interactive Maps", desc: "Leaflet.js with GraphHopper routing API renders real road and path routes — not straight lines." },
    { icon: "🌤️", title: "Weather Forecast", desc: "OpenWeatherMap integration shows a 3-day weather forecast for the destination before you go." },
    { icon: "🔐", title: "Auth System", desc: "JWT-based authentication with middleware protection, login, register, and session management." },
    { icon: "📋", title: "Trail History", desc: "Save generated trails to a personal history. Review past adventures anytime." },
    { icon: "🚴", title: "Bike & Trek Modes", desc: "Two distinct modes: point-to-point cycling routes or multi-loop trekking from a base camp." },
  ];

  const previewImages = [
    { src: "/images/afeka-home.png", title: "Trail Generator", desc: "Clean starting screen where the user selects the destination and trail type." },
    { src: "/images/afeka-map.png", title: "Interactive Route Map", desc: "A real generated route displayed on a Leaflet map with routing details." },
    { src: "/images/afeka-weather.png", title: "Weather & Trail Details", desc: "Forecast, highlights, and saved trail information in one polished view." },
  ];

  return (
    <div style={{ background: "#030303", color: "#f5f5f7", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: "100vh", overflowX: "hidden", cursor: "default" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      {/* progress */}
      <motion.div style={{ position:"fixed", top:0, left:0, height:"1px", background:"rgba(16,185,129,0.6)", zIndex:200, width:"100%" }} />

      {/* bg glows */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", width:700, height:700, left:"50%", top:-300, transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }}
          style={{ position:"absolute", width:500, height:500, right:-150, top:"40vh", background:"radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.028, backgroundImage:"linear-gradient(rgba(16,185,129,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px", maskImage:"linear-gradient(to bottom,black 0%,transparent 55%)" }} />
      </div>

      {/* NAV */}
      <motion.header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)", borderBottom:"1px solid rgba(255,255,255,0.055)", background:"rgba(4,4,4,0.92)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.button onClick={onBack}
            whileHover={{ x: -3 }}
            style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", background:"none", border:"none", cursor:"default", transition:"color 0.2s" }}
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
        <motion.div>
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
            {["Next.js 14","AI / LLM","Leaflet.js","GraphHopper API","OpenWeatherMap","Vercel"].map(t => <Pill key={t} label={t} />)}
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


      {/* PRODUCT PREVIEW */}
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
            {previewImages.map((item,i) => <PreviewCard key={item.title} {...item} delay={i*0.1} />)}
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
                <Stat val={s.val} label={s.label} delay={i*0.08} />
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
            {features.map((f,i) => <FeatureCard key={f.title} {...f} delay={i*0.08} />)}
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
              <ArchNode label="User Browser" sub="Next.js Client" color="#10b981" delay={0.1} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow vertical /></div>

            {/* Row 2 — Next.js */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:0 }}>
              <ArchNode label="Next.js 14" sub="App Router + API Routes" color="#3b82f6" delay={0.2} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow vertical /></div>

            {/* Row 3 — Middleware + Auth */}
            <div style={{ display:"flex", justifyContent:"center", gap:24, marginBottom:0 }}>
              <ArchNode label="JWT Middleware" sub="Route protection" color="#8b5cf6" delay={0.25} />
              <ArchNode label="Auth Pages" sub="Login / Register" color="#8b5cf6" delay={0.3} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow vertical /></div>

            {/* Row 4 — AI Engine */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:0 }}>
              <ArchNode label="AI Trail Engine" sub="LLM prompt → JSON route" color="#f59e0b" delay={0.35} />
            </div>

            {/* Row 5 — 3 external APIs */}
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Arrow vertical />
                <ArchNode label="GraphHopper" sub="Real road routing" color="#10b981" delay={0.4} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Arrow vertical />
                <ArchNode label="OpenWeatherMap" sub="Weather forecast" color="#10b981" delay={0.45} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Arrow vertical />
                <ArchNode label="Unsplash API" sub="Location images" color="#10b981" delay={0.5} />
              </div>
            </div>

            {/* Row 6 — Deploy */}
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow vertical /></div>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ArchNode label="Vercel" sub="Edge deployment" color="#ec4899" delay={0.55} />
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
                style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:32, padding:"28px 40px", border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.018)", borderRadius:16, cursor:"default", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
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
          style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", background:"none", border:"none", cursor:"default" }}
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

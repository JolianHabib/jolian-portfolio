import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

function Cursor() {
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

function MagneticLink({ children, href, target, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { damping:14, stiffness:180 });
  const sy = useSpring(y, { damping:14, stiffness:180 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width/2) * 0.3);
    y.set((e.clientY - r.top - r.height/2) * 0.3);
  };
  return (
    <motion.a ref={ref} href={href} target={target} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, x:sx, y:sy, display:"inline-flex", alignItems:"center", justifyContent:"center", textDecoration:"none", cursor:"none" }}>
      {children}
    </motion.a>
  );
}

function ArchNode({ label, sub, color, delay }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ padding:"18px 22px", borderRadius:16, border:`1px solid ${color}30`, background:`${color}10`, textAlign:"center", minWidth:120 }}>
      <div style={{ fontSize:13, fontWeight:700, color, letterSpacing:"0.02em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{sub}</div>}
    </motion.div>
  );
}

function Arrow() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 0" }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="2" x2="10" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <polyline points="5,25 10,32 15,25" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
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

function Stat({ val, label, delay }) {
  return (
    <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay, duration:0.6 }}
      style={{ textAlign:"center", padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.05em", color:"#fff" }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:6 }}>{label}</div>
    </motion.div>
  );
}

function Pill({ label }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"5px 14px", background:"rgba(255,255,255,0.04)" }}>
      {label}
    </span>
  );
}


/* ─── PREVIEW CARD ─── */
function PreviewCard({ src, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay, duration:0.75, ease:[0.16,1,0.3,1] }}
      whileHover={{ y:-6, borderColor:"rgba(225,29,72,0.24)", background:"rgba(255,255,255,0.035)" }}
      style={{ border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.018)", borderRadius:24, overflow:"hidden", transition:"all 0.35s", boxShadow:"0 24px 80px rgba(0,0,0,0.35)" }}>
      <div style={{ padding:10, borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.025)" }}>
        <div style={{ height:360, borderRadius:16, overflow:"hidden", background:"rgba(255,255,255,0.035)", border:"1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={src}
            alt={title}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
        </div>
      </div>
      <div style={{ padding:"22px 24px 26px" }}>
        <h3 style={{ fontSize:16, fontWeight:650, color:"#fff", letterSpacing:"-0.025em", marginBottom:7 }}>{title}</h3>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.36)", lineHeight:1.7 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

const COLOR = "#e11d48";

export default function ProjectGameFactory({ onBack }) {
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

  const previewImages = [
    { src:"/images/factory-menu.png", title:"Main Factory Menu", desc:"The C console interface showing the main factory management menu and the available system modules." },
    { src:"/images/factory-output.png", title:"Factory Data Output", desc:"A real output screen showing factory data such as games, workers, departments, customers, or saved records loaded from files." },
  ];

  return (
    <div style={{ background:"#030303", color:"#f5f5f7", fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", overflowX:"hidden", cursor:"none" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}a{text-decoration:none;color:inherit}`}</style>

      <Cursor />
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
          <MagneticLink href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
            style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", background:"rgba(225,29,72,0.12)", color:COLOR, padding:"10px 22px", borderRadius:999, border:"1px solid rgba(225,29,72,0.25)" }}>
            GitHub ↗
          </MagneticLink>
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
            <span style={{ display:"block", background:`linear-gradient(135deg,${COLOR},rgba(225,29,72,0.3))`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Factory
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
            style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(255,255,255,0.36)", lineHeight:1.8, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            A C program for managing a toy and game factory — departments, workers, machines, games, customers, and orders. Built with structs, linked lists, and file persistence.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            {["C","Structs","Linked Lists","File I/O","Dynamic Memory","Data Structures"].map(t => <Pill key={t} label={t} />)}
          </motion.div>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.7 }}>
            <MagneticLink href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
              style={{ gap:9, background:COLOR, color:"#fff", fontSize:14, fontWeight:700, padding:"16px 36px", borderRadius:999, boxShadow:"0 0 60px rgba(225,29,72,0.25)" }}>
              View on GitHub
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </MagneticLink>
          </motion.div>
        </motion.div>

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
            {previewImages.map((item,i) => <PreviewCard key={item.title} {...item} delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 48px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
            {[{val:"6",label:"Modules"},{val:"Linked",label:"Lists"},{val:"File",label:"Persistence"},{val:"C",label:"Language"}].map((s,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
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

            {/* Main menu */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ArchNode label="Main Menu" sub="CLI interface" color="#e11d48" delay={0.1} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow /></div>

            {/* 3 top modules */}
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
              <ArchNode label="Factory" sub="Depts & machines" color="#3b82f6" delay={0.2} />
              <ArchNode label="Workers" sub="Staff management" color="#3b82f6" delay={0.25} />
              <ArchNode label="Games" sub="Product catalog" color="#3b82f6" delay={0.3} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow /></div>

            {/* Orders */}
            <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
              <ArchNode label="Customers" sub="Profiles & history" color="#f59e0b" delay={0.35} />
              <ArchNode label="Orders" sub="Linked to games" color="#f59e0b" delay={0.4} />
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}><Arrow /></div>

            {/* Data layer */}
            <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
              <ArchNode label="Linked Lists" sub="Dynamic C structs" color="#10b981" delay={0.45} />
              <ArchNode label="Binary Files" sub="Read / write persist" color="#10b981" delay={0.5} />
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
              <MagneticLink href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
                style={{ gap:10, background:COLOR, color:"#fff", fontSize:15, fontWeight:700, padding:"18px 44px", borderRadius:999, boxShadow:"0 0 80px rgba(225,29,72,0.15)" }}>
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </MagneticLink>
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
        <MagneticLink href="https://github.com/JolianHabib/GameFactory-C-Project" target="_blank"
          style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", gap:6 }}>
          GitHub ↗
        </MagneticLink>
      </footer>
    </div>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, TrendingUp, CloudSun, Bug, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI Disease Detection',
    description: 'Upload crop images and receive disease diagnosis, severity, and recovery guidance.',
    icon: Sparkles,
  },
  {
    title: 'Weather Intelligence',
    description: 'Track rainfall, temperature, wind, UV, and drought risk with actionable recommendations.',
    icon: CloudSun,
  },
  {
    title: 'Yield Forecasting',
    description: 'Estimate production, income, expenses, and risk with interactive forecasting charts.',
    icon: TrendingUp,
  },
  {
    title: 'Pest & Irrigation Insights',
    description: 'Get early pest alerts and intelligent irrigation scheduling to save water and reduce losses.',
    icon: Bug,
  },
];

const stats = [
  { label: 'Farmers Supported', value: '25k+' },
  { label: 'Prediction Accuracy', value: '92%' },
  { label: 'Water Saved', value: '38%' },
  { label: 'Yield Gain', value: '+18%' },
];

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.2),_transparent_30%),linear-gradient(135deg,_#07110b_0%,_#0f172a_45%,_#082f1c_100%)] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur">
            <Leaf className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-semibold">AgriPredict AI</p>
            <p className="text-sm text-slate-400">Predict before problems begin</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#impact" className="transition hover:text-white">Impact</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Trusted by modern farming cooperatives
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
              AI intelligence for healthier farms and smarter decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              AgriPredict AI brings together weather intelligence, disease detection, pest forecasting, irrigation planning, and market insight into one premium operating system for agriculture.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="#contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-400">
                Explore Platform <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur transition hover:bg-white/20">
                View Modules
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-xl">
            <div className="rounded-3xl border border-emerald-400/20 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Farm Health Overview</p>
                  <p className="mt-2 text-3xl font-semibold">92% Healthy</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                  <Droplets className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  ['Rain Prediction', '74% chance'],
                  ['Disease Risk', 'Low'],
                  ['Irrigation Window', 'Tomorrow 6:00 AM'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Platform Modules</p>
              <h2 className="mt-2 text-3xl font-semibold">A complete AI operating system for agriculture</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
              <motion.article whileHover={{ y: -6, scale: 1.01 }} key={title} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="mb-4 inline-flex rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="impact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Real impact</p>
                <h2 className="mt-3 text-3xl font-semibold">From reactive farming to proactive intelligence</h2>
                <p className="mt-4 text-slate-300">The platform supports farmers, FPOs, government agencies, banks, insurers, researchers, and agribusinesses with role-specific dashboards, actionable recommendations, and secure collaboration workflows.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/10 px-6 py-6 text-center text-sm text-slate-300 backdrop-blur md:flex-row md:text-left">
          <p>Built for hackathons, pilots, and scalable SaaS growth.</p>
          <a href="mailto:hello@agripredict.ai" className="font-medium text-emerald-300">hello@agripredict.ai</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

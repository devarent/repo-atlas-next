"use client";

import * as React from "react";
import {
  ArrowUpDown, BookOpen, Check, ChevronRight, Cloud, Command, Copy,
  Database, ExternalLink, GitBranch, Github, Globe2, LayoutGrid, List,
  Menu, Moon, Network, Rocket, Search, Server, ShieldCheck, Sun,
  Terminal, Waypoints, X, Layers3,
} from "lucide-react";
import {
  Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
  Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Input, Separator,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { repos, tracks, trackByKey, type AtlasRepo } from "@/lib/data/repos";
import { databases, dbCategories, type DatabaseTech } from "@/lib/data/databases";
import { references, roadmap, roles, runbooks, stack } from "@/lib/data/cloud";

const kinds = Array.from(new Set(repos.map((r) => r.y)));
const navItems = [
  { value: "atlas", label: "Atlas Repo", icon: Layers3, hint: `${repos.length} repo` },
  { value: "data", label: "26 Database", icon: Database, hint: "data stack" },
  { value: "cloud", label: "Cloud & Runbook", icon: Cloud, hint: "AWS / K8s" },
  { value: "roadmap", label: "Roadmap & Role", icon: Waypoints, hint: "9 fase" },
  { value: "refs", label: "Referensi", icon: BookOpen, hint: `${references.length} link` },
];

type SortKey = "c" | "r" | "t" | "y" | "l";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface rounded-xl border px-4 py-3">
      <div className="text-xl font-extrabold tracking-tight">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-muted">{label}</div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="rounded-lg border border-primary/30 bg-primary/10 p-2 text-[color:var(--primary)]"><Icon className="h-5 w-5" /></div>
      <div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function RepoCard({ repo, onOpen }: { repo: AtlasRepo; onOpen: (r: AtlasRepo) => void }) {
  const t = trackByKey[repo.t];
  return (
    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1" style={{ "--tc": t.color } as React.CSSProperties}>
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${t.color}, transparent 85%)` }} />
      <CardHeader className="gap-2">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none">{t.flag}</span>
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">{repo.c}</CardTitle>
            <button onClick={() => onOpen(repo)} className="font-mono text-[11px] text-muted hover:text-[color:var(--tc)]">{repo.r}</button>
          </div>
          <Badge variant="outline" className="shrink-0" style={{ borderColor: t.color, color: t.color }}>{repo.y}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-sm leading-relaxed text-muted">{repo.d}</p>
        <div className="flex flex-wrap gap-1.5">{repo.k.map((k) => <Badge key={k} variant="outline" className="text-[10px]">#{k}</Badge>)}</div>
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="flex items-center gap-2 text-[11px] text-muted"><span className="h-2 w-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />{repo.l}</span>
          <Button size="sm" variant="ghost" onClick={() => onOpen(repo)}>Detail <ChevronRight className="h-3.5 w-3.5" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DbCard({ db }: { db: DatabaseTech }) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1" style={{ "--tc": db.color } as React.CSSProperties}>
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${db.color}, transparent 85%)` }} />
      <CardHeader className="gap-2">
        <div className="flex items-center gap-3"><span className="text-2xl">{db.glyph}</span><CardTitle>{db.name}</CardTitle></div>
        <Badge variant="outline" className="w-fit text-[10px]">{db.category}</Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="font-medium">{db.tagline}</p>
        <p className="text-muted">{db.use}</p>
        <div className="code-bg rounded-lg border px-3 py-2 font-mono text-[11px] text-muted">docker: {db.image}</div>
        <div className="flex flex-wrap gap-2">
          <a href={db.url} target="_blank" rel="noopener"><Button size="sm" variant="outline"><BookOpen className="h-3.5 w-3.5" />Dokumentasi</Button></a>
          {db.lab && <a href={`https://github.com/devarent/${db.lab}`} target="_blank" rel="noopener"><Button size="sm" variant="subtle"><GitBranch className="h-3.5 w-3.5" />Lab</Button></a>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [tab, setTab] = React.useState("atlas");
  const [query, setQuery] = React.useState("");
  const [track, setTrack] = React.useState<string | null>(null);
  const [kind, setKind] = React.useState("Semua");
  const [view, setView] = React.useState<"grid" | "table">("grid");
  const [sort, setSort] = React.useState<SortKey>("c");
  const [dbQuery, setDbQuery] = React.useState("");
  const [dbCategory, setDbCategory] = React.useState("Semua");
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState<AtlasRepo | null>(null);
  const [mobileNav, setMobileNav] = React.useState(false);
  const [dark, setDark] = React.useState(true);
  const [toast, setToast] = React.useState<string | null>(null);
  const [ip, setIp] = React.useState("");
  const [region, setRegion] = React.useState("us-east-1");
  const [user, setUser] = React.useState("ubuntu");

  const notify = React.useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const copy = React.useCallback(async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); notify(`${label} disalin`); }
    catch { notify("Clipboard tidak tersedia"); }
  }, [notify]);

  React.useEffect(() => {
    const saved = localStorage.getItem("atlas-ec2");
    if (saved) {
      try { const v = JSON.parse(saved); setIp(v.ip || ""); setRegion(v.region || "us-east-1"); setUser(v.user || "ubuntu"); } catch { /* abaikan */ }
    }
    const savedDark = localStorage.getItem("atlas-theme");
    if (savedDark === "light") setDark(false);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => { localStorage.setItem("atlas-ec2", JSON.stringify({ ip, region, user })); }, [ip, region, user]);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("atlas-theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredRepos = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = repos.filter((r) => {
      if (track && r.t !== track) return false;
      if (kind !== "Semua" && r.y !== kind) return false;
      if (!q) return true;
      const t = trackByKey[r.t];
      return [r.r, r.c, r.l, r.d, r.y, t.word, t.country, ...r.k].join(" ").toLowerCase().includes(q);
    });
    return [...list].sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
  }, [query, track, kind, sort]);

  const filteredDbs = React.useMemo(() => {
    const q = dbQuery.trim().toLowerCase();
    return databases.filter((d) =>
      (dbCategory === "Semua" || d.category === dbCategory) &&
      (!q || [d.name, d.tagline, d.use, d.category, d.image].join(" ").toLowerCase().includes(q)),
    );
  }, [dbQuery, dbCategory]);

  const commandResults = React.useMemo(() => [
    ...repos.map((r) => ({ label: r.c, meta: `repo · ${r.r}`, url: `https://github.com/devarent/${r.r}` })),
    ...databases.map((d) => ({ label: d.name, meta: `database · ${d.category}`, url: d.url })),
    ...references.map((r) => ({ label: r.title, meta: `referensi · ${r.group}`, url: r.url })),
  ].filter((r) => r.label.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);

  const sshCommand = `ssh -i ~/.ssh/id_rsa ${user}@${ip || "<PUBLIC_IP>"}`;
  const localUrl = "http://localhost:3100";
  const publicUrl = ip ? `http://${ip}` : "http://<PUBLIC_IP>";

  const Sidebar = (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r surface lg:flex">
      <div className="flex items-center gap-3 border-b px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand-logo.svg" alt="Logo AF" className="h-10 w-10 rounded-lg" />
        <div>
          <div className="text-sm font-extrabold tracking-tight">Repo Atlas</div>
          <div className="text-[10px] uppercase tracking-widest text-muted">Control Center</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((n) => (
          <button key={n.value} onClick={() => setTab(n.value)}
            className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              tab === n.value ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted hover:bg-primary/10 hover:text-foreground")}>
            <n.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{n.label}</span>
            <span className={cn("text-[10px]", tab === n.value ? "text-white/70" : "text-muted")}>{n.hint}</span>
          </button>
        ))}
      </nav>
      <div className="space-y-2 border-t p-4 text-[11px] text-muted">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Sesi aktif · 2026</div>
        <a href="https://github.com/devarent" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-foreground"><Github className="h-3.5 w-3.5" /> github.com/devarent</a>
      </div>
    </aside>
  );

  return (
    <TooltipProvider>
      {Sidebar}
      <div className="lg:pl-64">
        {/* TOPBAR */}
        <div className="surface sticky top-0 z-40 flex items-center gap-3 border-b px-4 py-3 backdrop-blur sm:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">Cloud & Data Control Center · 2026</div>
            <div className="truncate text-xs text-muted">Built in public by Arya Fatthurahman</div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="outline" size="sm"><Command className="h-4 w-4" /><span className="hidden sm:inline">Cari cepat</span><kbd className="rounded border px-1 text-[10px]">⌘K</kbd></Button></DialogTrigger>
            <DialogContent>
              <DialogTitle>Pencarian global</DialogTitle>
              <DialogDescription>Repo, teknologi database, atau referensi.</DialogDescription>
              <Input autoFocus className="my-4" placeholder="Ketik nama…" value={query} onChange={(e) => setQuery(e.target.value)} />
              <div className="scrollbar-thin max-h-80 space-y-1 overflow-y-auto">
                {commandResults.map((r) => (
                  <a key={r.url + r.label} href={r.url} target="_blank" rel="noopener" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 hover:bg-primary/10">
                    <span className="text-sm font-medium">{r.label}</span>
                    <span className="text-[11px] text-muted">{r.meta}</span>
                  </a>
                ))}
                {!commandResults.length && <p className="py-6 text-center text-sm text-muted">Tidak ada hasil.</p>}
              </div>
            </DialogContent>
          </Dialog>
          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button></TooltipTrigger><TooltipContent>Ganti tema</TooltipContent></Tooltip>
          <a href="https://github.com/devarent" target="_blank" rel="noopener"><Button variant="ghost" size="icon"><Github className="h-4 w-4" /></Button></a>
        </div>

        {mobileNav && (
          <nav className="grid grid-cols-2 gap-2 border-b surface p-3 lg:hidden">
            {navItems.map((n) => <button key={n.value} onClick={() => { setTab(n.value); setMobileNav(false); }} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><n.icon className="h-4 w-4" />{n.label}</button>)}
          </nav>
        )}

        <main className="mx-auto max-w-[1500px] px-4 pb-24 pt-8 sm:px-8">
          <header className="mb-8">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Repo <span className="bg-gradient-to-r from-[#a78bfa] via-[#22d3ee] to-[#34d399] bg-clip-text text-transparent">Atlas</span></h1>
            <p className="mt-4 max-w-3xl text-muted sm:text-lg">52 repository @devarent dalam 9 konstelasi negara, terhubung ke 26 teknologi data, Terraform, AWS EC2, Docker, Kubernetes, dan CI/CD.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <Stat value="52" label="Repository" /><Stat value="9" label="Konstelasi" /><Stat value="26" label="Teknologi data" />
              <Stat value="10" label="Stack cloud" /><Stat value="6" label="Runbook" /><Stat value="19" label="Referensi" />
            </div>
          </header>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="lg:hidden">
              {navItems.map((n) => <TabsTrigger key={n.value} value={n.value}>{n.label}</TabsTrigger>)}
            </TabsList>

            {/* ATLAS */}
            <TabsContent value="atlas">
              <SectionTitle icon={Layers3} title="Peta 52 repository" subtitle="Julukan unik per negara · grid atau tabel sortable · klik baris untuk detail." />
              <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                <button onClick={() => setTrack(null)} className={cn("rounded-xl border p-3 text-left text-sm transition", !track ? "border-primary bg-primary/10" : "hover:bg-primary/5")}>
                  <span className="font-bold">Semua trek</span><span className="mt-1 block text-xs text-muted">{repos.length} repo</span>
                </button>
                {tracks.map((t) => (
                  <Tooltip key={t.key}>
                    <TooltipTrigger asChild>
                      <button onClick={() => setTrack(t.key === track ? null : t.key)} className={cn("rounded-xl border p-3 text-left text-sm transition", track === t.key && "bg-primary/10")} style={track === t.key ? { borderColor: t.color } : undefined}>
                        <span className="font-bold">{t.flag} {t.word}</span>
                        <span className="mt-1 block text-xs text-muted">{t.country} · {repos.filter((r) => r.t === t.key).length}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{t.note}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input className="pl-9" placeholder="Cari repo, julukan, topik, bahasa…" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="flex rounded-lg border p-0.5">
                  <Button size="sm" variant={view === "grid" ? "default" : "ghost"} onClick={() => setView("grid")}><LayoutGrid className="h-4 w-4" /></Button>
                  <Button size="sm" variant={view === "table" ? "default" : "ghost"} onClick={() => setView("table")}><List className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {["Semua", ...kinds].map((k) => <Button key={k} size="sm" variant={k === kind ? "default" : "outline"} onClick={() => setKind(k)}>{k}</Button>)}
                <span className="ml-auto text-xs text-muted">Menampilkan <b className="text-foreground">{filteredRepos.length}</b> / {repos.length}</span>
              </div>

              {view === "grid" ? (
                <div className="animate-atlas-fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredRepos.map((r) => <RepoCard key={r.r} repo={r} onOpen={setDetail} />)}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <div className="scrollbar-thin overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="code-bg text-xs uppercase tracking-wider text-muted">
                        <tr>
                          {([["c", "Julukan"], ["r", "Repository"], ["t", "Trek"], ["y", "Jenis"], ["l", "Bahasa"]] as [SortKey, string][]).map(([key, label]) => (
                            <th key={key} className="whitespace-nowrap px-4 py-3 font-semibold">
                              <button className="flex items-center gap-1 hover:text-foreground" onClick={() => setSort(key)}>{label}<ArrowUpDown className="h-3 w-3" /></button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRepos.map((r) => {
                          const t = trackByKey[r.t];
                          return (
                            <tr key={r.r} onClick={() => setDetail(r)} className="cursor-pointer border-t transition hover:bg-primary/5">
                              <td className="whitespace-nowrap px-4 py-3 font-semibold">{t.flag} {r.c}</td>
                              <td className="px-4 py-3 font-mono text-xs text-muted">devarent/{r.r}</td>
                              <td className="px-4 py-3"><Badge variant="outline" style={{ color: t.color, borderColor: t.color }}>{t.word}</Badge></td>
                              <td className="px-4 py-3 text-muted">{r.y}</td>
                              <td className="px-4 py-3 text-muted">{r.l}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* DATA */}
            <TabsContent value="data">
              <SectionTitle icon={Database} title="26 teknologi data" subtitle="Keseluruhan daftar: SQL & distributed, cloud analytics, NoSQL, vector/graph, streaming." />
              <div className="mb-6 flex flex-wrap gap-2">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input className="pl-9" placeholder="Cari teknologi, use case, docker image…" value={dbQuery} onChange={(e) => setDbQuery(e.target.value)} />
                </div>
                {["Semua", ...dbCategories].map((c) => <Button key={c} size="sm" variant={c === dbCategory ? "default" : "outline"} onClick={() => setDbCategory(c)}>{c}</Button>)}
              </div>
              {dbCategories.map((cat) => {
                const list = filteredDbs.filter((d) => d.category === cat);
                if (!list.length) return null;
                return (
                  <section key={cat} className="mb-9">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[color:var(--primary)]">{cat}</h3>
                      <Separator className="flex-1" /><Badge variant="outline">{list.length}</Badge>
                    </div>
                    <div className="animate-atlas-fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((d) => <DbCard key={d.name} db={d} />)}</div>
                  </section>
                );
              })}
              {!filteredDbs.length && <p className="py-12 text-center text-muted">Tidak ada teknologi yang cocok.</p>}
            </TabsContent>

            {/* CLOUD */}
            <TabsContent value="cloud">
              <SectionTitle icon={Cloud} title="Akses localhost & IP publik" subtitle="Aplikasi bisa diakses dari laptop (localhost) atau dari EC2 setelah Terraform membuat Elastic IP." />
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Server className="h-4 w-4" />Lokal / localhost</CardTitle><CardDescription>Aktif di laptop lewat Laragon atau next dev.</CardDescription></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="code-bg flex items-center gap-2 rounded-lg border p-3"><code className="flex-1 font-mono text-xs">{localUrl}</code><Button size="sm" variant="outline" onClick={() => copy(localUrl, "URL lokal")}><Copy className="h-3.5 w-3.5" /></Button></div>
                    <code className="text-[11px] text-muted">npm run dev -- --webpack</code>
                  </CardContent>
                </Card>
                <Card className="border-primary/40">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe2 className="h-4 w-4" />Publik / Elastic IP</CardTitle><CardDescription>Isi IP asli dari terraform output public_ip.</CardDescription></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="code-bg flex items-center gap-2 rounded-lg border p-3"><code className="flex-1 font-mono text-xs">{publicUrl}</code><Button size="sm" variant="outline" onClick={() => copy(publicUrl, "URL publik")}><Copy className="h-3.5 w-3.5" /></Button></div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Public IP" className="text-xs" />
                      <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="region" className="text-xs" />
                      <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="user" className="text-xs" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8 flex flex-wrap gap-2 rounded-xl border p-3">
                <Badge variant="outline"><Network className="mr-1 h-3 w-3" />SSH</Badge>
                <code className="code-bg flex-1 rounded px-2 py-1 font-mono text-[11px]">{sshCommand}</code>
                <Button size="sm" variant="subtle" onClick={() => copy(sshCommand, "Perintah SSH")}><Copy className="mr-1 h-3.5 w-3.5" />Salin SSH</Button>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stack.map((s) => (
                  <Card key={s.name} className="h-full">
                    <CardHeader><div className="flex items-center gap-3"><span className="text-2xl">{s.glyph}</span><CardTitle className="text-sm">{s.name}</CardTitle></div><Badge variant="outline" className="w-fit text-[10px]" style={{ color: s.color, borderColor: s.color }}>{s.role}</Badge></CardHeader>
                    <CardContent className="text-xs leading-relaxed text-muted">{s.detail}</CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {runbooks.map((rb) => (
                  <Card key={rb.id} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between gap-3">
                      <div><CardTitle className="text-sm">{rb.title}</CardTitle><CardDescription className="mt-1">{rb.summary}</CardDescription></div>
                      <Badge variant="default" className="shrink-0">{rb.env}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="code-bg rounded-lg border p-4">
                        <pre className="scrollbar-thin overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed">{rb.code}</pre>
                        <div className="mt-3 flex justify-end"><Button size="sm" variant="outline" onClick={() => copy(rb.code, `Runbook ${rb.id}`)}><Copy className="mr-1 h-3.5 w-3.5" />Salin</Button></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 border-amber-500/40">
                <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-amber-400" />Kredensial & biaya</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted">Gunakan <code>aws login</code> atau IAM Access Key asli. Jangan commit kredensial. Jalankan <code>terraform destroy</code> setelah selesai agar EC2/EIP tidak ditagih. Saat ini kredensial AWS di environment masih invalid, sehingga IP publik belum dibuat otomatis.</CardContent>
              </Card>
            </TabsContent>

            {/* ROADMAP */}
            <TabsContent value="roadmap">
              <SectionTitle icon={Waypoints} title="Roadmap & role fit" subtitle="Urutan belajar dan bukti repository untuk setiap peran." />
              <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roadmap.map((p) => (
                  <Card key={p.phase} className="relative overflow-hidden">
                    <div className="absolute right-4 top-3 text-4xl font-black text-white/5">{p.phase}</div>
                    <CardHeader><Badge variant="default" className="w-fit">{p.badge}</Badge><CardTitle>{p.name}</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted">{p.topics}</CardContent>
                  </Card>
                ))}
              </div>
              <h3 className="mb-4 text-lg font-bold">Peran → bukti repo</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {roles.map((r) => (
                  <Card key={r.title}>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Rocket className="h-4 w-4 text-[color:var(--primary)]" />{r.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-3"><p className="text-sm text-muted">{r.fit}</p><a href={`https://github.com/devarent/${r.repo}`} target="_blank" rel="noopener"><Button size="sm" variant="outline"><ExternalLink className="mr-1 h-3.5 w-3.5" />{r.repo}</Button></a></CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* REFERENCES */}
            <TabsContent value="refs">
              <SectionTitle icon={BookOpen} title="Pustaka referensi" subtitle="Tautan resmi yang dipakai menyusun UI, pipeline, dan lab data." />
              {Array.from(new Set(references.map((r) => r.group))).map((group) => (
                <section key={group} className="mb-8">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[color:var(--primary)]">{group}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {references.filter((r) => r.group === group).map((r) => (
                      <a key={r.url} href={r.url} target="_blank" rel="noopener" className="group">
                        <Card className="h-full transition group-hover:border-primary/60">
                          <CardHeader><CardTitle className="flex items-start justify-between gap-2 text-sm">{r.title}<ExternalLink className="h-4 w-4 shrink-0 text-muted group-hover:text-[color:var(--primary)]" /></CardTitle><CardDescription>{r.note}</CardDescription></CardHeader>
                        </Card>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </TabsContent>
          </Tabs>

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs text-muted">
            <span>Repo Atlas · 52 repo @devarent · nama lama: aryafatthurahman4-collab</span>
            <a href="https://github.com/devarent" target="_blank" rel="noopener" className="hover:text-foreground">github.com/devarent ↗</a>
          </footer>
        </main>
      </div>

      {toast && <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-lg border bg-[var(--card)] px-4 py-3 text-sm shadow-2xl"><Check className="h-4 w-4 text-emerald-500" />{toast}</div>}

      <Dialog open={!!detail} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent>
          {detail && (
            <>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-3xl">{trackByKey[detail.t].flag}</span>
                <div><DialogTitle>{detail.c}</DialogTitle><DialogDescription>{trackByKey[detail.t].country} · {trackByKey[detail.t].theme}</DialogDescription></div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm leading-relaxed">{detail.d}</p>
              <p className="code-bg mt-3 rounded-lg border p-3 text-xs text-muted">{detail.k.map((k) => `#${k}`).join("  ")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`https://github.com/devarent/${detail.r}`} target="_blank" rel="noopener"><Button><ExternalLink className="mr-1 h-4 w-4" />Buka repository</Button></a>
                <Button variant="outline" onClick={() => copy(`git clone https://github.com/devarent/${detail.r}.git`, "Perintah clone")}><Terminal className="mr-1 h-4 w-4" />Salin clone</Button>
                {detail.p && <Badge variant="outline"><GitBranch className="mr-1 h-3 w-3" />{detail.p}</Badge>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

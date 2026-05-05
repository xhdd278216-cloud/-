import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const initMonths = Array.from({ length: 12 }, (_, i) => ({
  status: i < 6 ? (i === 2 ? "red" : "green") : "empty",
  reason: ""
}));

const projectsData = [
  { name: "安全", owner: "夏旭勇", months: initMonths },
  { name: "业务拓展", owner: "工厂总", months: initMonths },
  { name: "AI+", owner: "鲁珍玖", months: initMonths }
];

const statusDot = {
  green: "bg-emerald-500/90 ring-2 ring-emerald-100",
  red: "bg-rose-500/90 ring-2 ring-rose-100",
  empty: "bg-white border border-slate-300"
};

const sideItems = [
  { group: "总览", items: ["专案看板", "里程碑", "风险追踪"] },
  { group: "管理", items: ["团队成员", "客户清单", "报表中心"] }
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState(projectsData);
  const [activeProject, setActiveProject] = useState(null);

  const updateStatus = (monthIndex, status) => {
    const newData = [...projects];
    newData[activeProject].months[monthIndex].status = status;
    setProjects(newData);
  };

  const updateReason = (monthIndex, value) => {
    const newData = [...projects];
    newData[activeProject].months[monthIndex].reason = value;
    setProjects(newData);
  };

  const Sidebar = () => (
    <aside
      className={`${collapsed ? "w-20" : "w-64"} rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 transition-all duration-300`}
    >
      <div className="mb-6 flex items-center justify-between">
        {!collapsed && (
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">weihu</p>
            <h1 className="text-lg font-semibold text-slate-800">Project Hub</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          {collapsed ? "☰" : "←"}
        </button>
      </div>

      <div className="space-y-6">
        {sideItems.map((section) => (
          <div key={section.group}>
            {!collapsed && <p className="mb-2 text-xs font-medium text-slate-400">{section.group}</p>}
            <div className="space-y-1">
              {section.items.map((item, idx) => (
                <button
                  key={item}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    idx === 0 && section.group === "总览"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {collapsed ? "•" : item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!collapsed && (
        <div className="mt-8 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
          当前季度目标完成率
          <p className="mt-1 text-base font-semibold text-slate-800">73%</p>
        </div>
      )}
    </aside>
  );

  if (activeProject === null) {
    return (
      <div className="min-h-screen bg-[#f2f1f6] p-6">
        <div className="mx-auto flex max-w-[1320px] gap-6 rounded-3xl bg-[#fbfbfd] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Sidebar />

          <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs text-slate-400">Welcome</p>
                <h2 className="text-xl font-semibold text-slate-800">专案进度中心</h2>
              </div>
              <div className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400">
                🔍 搜索专案 / 负责人
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {projects.map((p, i) => {
                const achieved = p.months.filter((m) => m.status === "green").length;
                const delayed = p.months.filter((m) => m.status === "red").length;
                return (
                  <Card
                    key={p.name}
                    onClick={() => setActiveProject(i)}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                          <p className="text-sm text-slate-500">负责人：{p.owner}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">详情 ›</span>
                      </div>

                      <div className="mb-3 flex items-center gap-2">
                        {p.months.map((m, idx) => (
                          <div key={idx} className={`h-3 w-3 rounded-full ${statusDot[m.status]}`} title={monthNames[idx]} />
                        ))}
                      </div>

                      <div className="flex gap-2 text-xs">
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">达成 {achieved}</span>
                        <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">未达成 {delayed}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

  const project = projects[activeProject];
  const notAchieved = project.months.filter((m) => m.status === "red");

  return (
    <div className="min-h-screen bg-[#f2f1f6] p-6">
      <div className="mx-auto flex max-w-[1320px] gap-6 rounded-3xl bg-[#fbfbfd] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <Sidebar />

        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">
          <button onClick={() => setActiveProject(null)} className="mb-4 text-sm text-slate-500 hover:text-slate-700">← 返回专案列表</button>
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">{project.name} · 月度详情</h2>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {project.months.map((m, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{monthNames[i]}</span>
                  <button
                    onClick={() => updateStatus(i, m.status === "green" ? "red" : "green")}
                    className={`rounded-lg px-2 py-1 text-xs ${m.status === "green" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}
                  >
                    {m.status === "green" ? "改为未达成" : "改为达成"}
                  </button>
                </div>
                {m.status === "red" && (
                  <textarea
                    value={m.reason}
                    onChange={(e) => updateReason(i, e.target.value)}
                    placeholder="填写未达成原因..."
                    className="h-20 w-full rounded-lg border border-rose-200 bg-white p-2 text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          {notAchieved.length > 0 && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              当前有 {notAchieved.length} 个月未达成，请优先补充原因并制定纠偏动作。
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

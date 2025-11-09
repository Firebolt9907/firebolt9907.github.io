import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Interfaces for WakaTime data
interface GrandTotal {
  total_seconds: number;
}

interface DailyData {
  grand_total: GrandTotal;
  range: {
    date: string;
  };
}

interface LangData {
  name: string;
  percent: number;
  color: string;
}

const simplifyTime = (total_seconds: number) => {
  if (isNaN(total_seconds) || total_seconds === 0) return "0m";
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor((total_seconds % 3600) / 60);
  let time = "";
  if (hours >= 1) {
    time = hours + "h ";
  }
  time = time + minutes + "m";
  return time;
};

const GraphsSection: React.FC = () => {
  const [dailyStats, setDailyStats] = useState<DailyData[]>([]);
  const [langStats, setLangStats] = useState<LangData[]>([]);
  const [editorStats, setEditorStats] = useState<LangData[]>([]);
  const [osStats, setOsStats] = useState<LangData[]>([]);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, langRes, editorRes, osRes] = await Promise.all([
          fetch(
            "https://wakatime.com/share/@firebolt9907/6c2bf50d-513e-4529-84a5-36c8fdf7cb3d.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/933b30fe-3770-4aae-8eea-78e2f011955c.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/2ccbe765-7e3c-42c1-8a41-82f02a9835ed.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/45cdaf8f-c702-470c-9c29-1a10013bc33d.json"
          ),
        ]);

        const dailyData = await dailyRes.json();
        setDailyStats(dailyData.data);
        const total = dailyData.data.reduce(
          (acc: number, curr: DailyData) =>
            acc + curr.grand_total.total_seconds,
          0
        );
        setTotalTime(total);

        const langData = await langRes.json();
        setLangStats(langData.data);

        const editorData = await editorRes.json();
        setEditorStats(editorData.data);

        const osData = await osRes.json();
        setOsStats(osData.data);
      } catch (error) {
        console.error("Failed to fetch WakaTime data:", error);
      }
    };

    fetchData();
  }, []);

  const mostTime = Math.max(
    ...dailyStats.map((d) => d.grand_total.total_seconds),
    1
  );

  const renderStackedBar = (data: LangData[], type: string) => (
    <div className="bg-gray-700 h-8 rounded-full flex overflow-hidden">
      {data.map((item) => {
        let color = item.color;
        if (type === "lang" && item.name === "Dart") {
          color = "#5DC8F8";
        }
        if (type === "lang" && item.name === "Java") color = "#F29111";
        if (type === "lang" && item.name === "Python") color = "#FFC42D";
        if (type === "lang" && item.name === "TypeScript") color = "#3178C6";

        if (type === "editor" && item.name === "IntelliJ IDEA")
          color = "#DD1265";
        if (type === "editor" && item.name === "VS Code") color = "#007ACC";
        return (
          <div
            key={item.name}
            className="h-full group relative"
            style={{
              width: `${item.percent}%`,
              backgroundColor: color || "#888",
            }}
          >
            <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.name}: {item.percent.toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
  const renderLegend = (data: LangData[], type: string) => (
    <div className="mt-4 space-y-2">
      {data.slice(0, 5).map((item) => {
        let name = item.name;
        let color = item.color;
        if (type === "lang" && item.name === "Dart") {
          name = "Flutter/Dart";
          color = "#5DC8F8";
        }
        if (type === "lang" && item.name === "Java") {
          color = "#F29111";
          name = "Java (CS 18000)";
        }
        if (type === "lang" && item.name === "Python") color = "#FFC42D";
        if (type === "lang" && item.name === "TypeScript") color = "#3178C6";
        if (type === "lang" && item.name === "R") {
          name = "R (Data Mine 101)";
        }

        if (type === "os")
          name =
            item.name === "Linux"
              ? "Purdue Server (SSH)"
              : item.name === "Mac"
              ? "Personal MacBook"
              : "Personal Windows Server (RDP)";
        if (type === "editor" && item.name === "Neovim") {
          name = "Vim";
        }
        if (type === "editor" && item.name === "IntelliJ IDEA")
          color = "#DD1265";
        if (type === "editor" && item.name === "VS Code") color = "#007ACC";

        return (
          <div key={item.name} className="flex items-center text-sm">
            <div
              className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: color || "#888" }}
            />
            <span className="truncate">{name}</span>
            <span className="ml-auto text-gray-400">
              {type === "lang"
                ? simplifyTime((item.percent / 100) * totalTime)
                : `${item.percent.toFixed(1)}%`}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="dev-time" className="snap-start py-16">
      <div></div>
      <h2 className="text-4xl font-semibold mb-8 text-center">
        Stats From Last Week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Time Spent Coding</h3>
          <h4 className="text-lg mb-4">Total: {simplifyTime(totalTime)}</h4>
          <div className="flex space-x-2 h-48 items-end justify-center">
            {dailyStats.map((day, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const dayOfWeek =
                6 - i === 1
                  ? "Yesterday"
                  : date.toLocaleDateString("en-US", { weekday: "short" });
              if (6 - i === 0) {
                return;
              }
              return (
                <div
                  key={day.range.date}
                  className="group relative flex-1 h-full flex items-end"
                >
                  <motion.div
                    className="bg-gray-200 w-full rounded-md"
                    initial={{ height: "0%" }}
                    animate={{
                      height: `${
                        (day.grand_total.total_seconds / mostTime) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  />
                  <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {dayOfWeek}: {simplifyTime(day.grand_total.total_seconds)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Languages Used</h3>
          {renderStackedBar(langStats, "lang")}
          {renderLegend(langStats, "lang")}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Code Editors Used</h3>
          {renderStackedBar(editorStats, "editor")}
          {renderLegend(editorStats, "editor")}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Systems Used</h3>
          {renderStackedBar(osStats, "os")}
          {renderLegend(osStats, "os")}
        </div>
      </div>
    </section>
  );
};

export default GraphsSection;

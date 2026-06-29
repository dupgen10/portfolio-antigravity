"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footprints from "./Tabs/Footprints";
import Scribble from "./Tabs/Scribble";
import TicTacToe from "./Tabs/TicTacToe";

const TABS = [
  { id: "footprints", label: "FOOTPRINTS" },
  { id: "scribble", label: "SCRIBBLE" },
  { id: "tictactoe", label: "TIC-TAC-TOE" },
];

export default function BaseCampWidget() {
  const [activeTab, setActiveTab] = useState("footprints");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="base-camp-widget mt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="spotify-label text-[10px]" style={{ color: "var(--muted)" }}>BASE CAMP</span>
      </div>

      {/* Tab Switcher */}
      <div 
        role="tablist" 
        aria-label="Interactive widgets"
        className="flex items-center gap-4 mb-5 overflow-x-auto pb-1 scrollbar-hide"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="relative text-[10px] font-bold tracking-[0.1em] transition-colors whitespace-nowrap cursor-none"
              style={{ color: isActive ? "var(--lime)" : "var(--muted)" }}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-[6px] left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "var(--lime)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {activeTab === "footprints" && <Footprints />}
            {activeTab === "scribble" && <Scribble />}
            {activeTab === "tictactoe" && <TicTacToe />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

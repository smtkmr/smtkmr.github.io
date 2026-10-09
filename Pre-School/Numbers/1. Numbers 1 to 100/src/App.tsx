/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EconovaHeader } from './components/EconovaHeader';
import { NumberSelectorBar } from './components/NumberSelectorBar';
import { HeroSection } from './components/HeroSection';
import { ExactObjectsLab } from './components/ExactObjectsLab';
import { StudioSection } from './components/StudioSection';
import { CheckAllBar } from './components/CheckAllBar';
import { EconovaFooter } from './components/EconovaFooter';
import { SELECTABLE_OBJECTS, SelectableObject } from './utils/numberEngine';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [selectedObject, setSelectedObject] = useState<SelectableObject>(SELECTABLE_OBJECTS[0]);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  const handleSelectNumber = (n: number) => {
    setCurrentNumber(n);
    setCompletedTasks({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckAll = () => {
    const next: Record<number, boolean> = { 1: true, 2: true };
    setCompletedTasks(next);
  };

  const handleResetAll = () => {
    setCompletedTasks({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdf4] text-[#1f2937]">
      {/* Sticky Econova Header */}
      <EconovaHeader />

      {/* Number 1 to 100 Selector & Curriculum Bar */}
      <NumberSelectorBar
        currentNumber={currentNumber}
        onSelectNumber={handleSelectNumber}
      />

      {/* Main Lesson Content */}
      <main id="main" className="flex-1 w-full max-w-[1200px] mx-auto px-3.5 sm:px-6 md:px-7">
        {/* Hero Section with 3D Number & Complete Full Spelling */}
        <HeroSection
          currentNumber={currentNumber}
          selectedObject={selectedObject}
        />

        {/* Exact Quantity Counting Lab (Shows EXACTLY N Objects of Chosen Type) */}
        <ExactObjectsLab
          currentNumber={currentNumber}
          selectedObject={selectedObject}
          onSelectObject={setSelectedObject}
        />

        {/* Full Spelling Overwriting Boards (No Truncation, Complete Words) */}
        <StudioSection
          currentNumber={currentNumber}
        />

        {/* Progress & Verification Bar */}
        <CheckAllBar
          currentNumber={currentNumber}
          completedTasks={completedTasks}
          onCheckAll={handleCheckAll}
          onResetAll={handleResetAll}
        />
      </main>

      {/* Econova Footer */}
      <EconovaFooter />
    </div>
  );
}

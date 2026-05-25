"use client";

import React from "react";
import { useResumeStore, Award } from "../../store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const AwardsForm = () => {
  const { resumeData, updateAwards } = useResumeStore();

  const handleAddAward = () => {
    updateAwards([
      ...resumeData.awards,
      {
        id: Date.now().toString(),
        description: "",
      },
    ]);
  };

  const handleRemoveAward = (index: number) => {
    const newAwards = [...resumeData.awards];
    newAwards.splice(index, 1);
    updateAwards(newAwards);
  };

  const handleChange = (index: number, value: string) => {
    const newAwards = [...resumeData.awards];
    newAwards[index].description = value;
    updateAwards(newAwards);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3">
        {resumeData.awards.map((award, index) => (
          <div key={award.id} className="flex gap-2">
            <textarea
              value={award.description}
              onChange={(e) => handleChange(index, e.target.value)}
              rows={2}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
              placeholder="e.g. Secured 1st place in National Coding Hackathon"
            />
            <button
              onClick={() => handleRemoveAward(index)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 self-start"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleAddAward}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Award / Achievement
      </button>
    </div>
  );
};

export default AwardsForm;

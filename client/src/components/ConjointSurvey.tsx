import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ConjointSurveyProps {
  conjointData: Record<string, Record<string, any[]>>;
  attributeNames: Record<string, string>;
  attributeColumns: Record<string, string>;
  respondentId: string;
  onComplete: (responses: Record<string, number>) => void;
}

export function ConjointSurvey({
  conjointData,
  attributeNames,
  attributeColumns,
  respondentId,
  onComplete,
}: ConjointSurveyProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  
  // Get the choice tasks for this respondent
  const choiceTasks = Object.keys(conjointData[respondentId] || {});
  const currentTask = choiceTasks[currentTaskIndex];
  const profiles = conjointData[respondentId]?.[currentTask] || [];
  
  // Calculate progress
  const progress = ((currentTaskIndex + 1) / choiceTasks.length) * 100;
  
  const handleProfileSelection = (profileId: string) => {
    setResponses(prev => ({
      ...prev,
      [currentTask]: parseInt(profileId)
    }));
    
    // Auto-advance to next task
    if (currentTaskIndex < choiceTasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(prev => prev + 1);
      }, 300);
    } else {
      // All tasks completed
      onComplete(responses);
    }
  };
  
  const handleNext = () => {
    if (currentTaskIndex < choiceTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      // All tasks completed
      onComplete(responses);
    }
  };
  
  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Choice Task {currentTaskIndex + 1} of {choiceTasks.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 8px rgba(var(--primary), 0.5)'
            }}
          />
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">
            Please select your preferred option
          </h3>
          <p className="text-gray-600">
            Compare the options below and choose the one you prefer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.profileId}
              className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                responses[currentTask] === parseInt(profile.profileId)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleProfileSelection(profile.profileId)}
            >
              <div className="space-y-4">
                {Object.entries(attributeColumns).map(([key, column]) => (
                  <div key={key} className="space-y-1">
                    <h4 className="font-medium text-gray-700">
                      {attributeNames[key]}
                    </h4>
                    <p className="text-lg">
                      {profile[column]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-8 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentTaskIndex === 0}
            className="w-32 h-12 text-lg"
          >
            Previous
          </Button>
          
          {currentTaskIndex < choiceTasks.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!responses[currentTask]}
              className="w-32 h-12 text-lg"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => onComplete(responses)}
              disabled={!responses[currentTask]}
              className="w-32 h-12 text-lg"
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 
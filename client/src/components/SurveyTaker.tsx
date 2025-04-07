import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConjointSurvey } from "./ConjointSurvey";

interface SurveyTakerProps {
  surveyData: {
    title: string;
    description: string;
    questions: any[];
  };
  respondentId: string;
  onComplete: (responses: Record<number, any>) => void;
}

export function SurveyTaker({
  surveyData,
  respondentId,
  onComplete,
}: SurveyTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [conjointResponses, setConjointResponses] = useState<Record<number, Record<string, number>>>({});
  
  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / surveyData.questions.length) * 100;
  
  const handleResponse = (questionIndex: number, response: any) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: response
    }));
    
    // Auto-advance for certain question types
    const question = surveyData.questions[questionIndex];
    if (
      questionIndex < surveyData.questions.length - 1 &&
      ['multiple_choice', 'rating'].includes(question.type)
    ) {
      // Add a small delay for better UX
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };
  
  const handleConjointResponse = (questionIndex: number, conjointResponses: Record<string, number>) => {
    setConjointResponses(prev => ({
      ...prev,
      [questionIndex]: conjointResponses
    }));
    
    // Auto-advance to next question
    if (currentQuestionIndex < surveyData.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < surveyData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Survey completed
      const finalResponses = {
        ...responses,
        ...conjointResponses
      };
      onComplete(finalResponses);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const renderQuestion = (question: any, index: number) => {
    const response = responses[index];
    
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option: any) => (
              <div
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  response === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => handleResponse(index, option.id)}
              >
                <input
                  type="radio"
                  id={option.id}
                  name={`q_${index}`}
                  checked={response === option.id}
                  onChange={() => handleResponse(index, option.id)}
                  className="hidden"
                />
                <label
                  htmlFor={option.id}
                  className="flex-1 text-lg cursor-pointer"
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-4">
            {question.options?.map((option: any) => (
              <div
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  response?.includes(option.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => {
                  const currentSelection = response || [];
                  const newSelection = currentSelection.includes(option.id)
                    ? currentSelection.filter((id: string) => id !== option.id)
                    : [...currentSelection, option.id];
                  handleResponse(index, newSelection);
                }}
              >
                <input
                  type="checkbox"
                  id={option.id}
                  checked={response?.includes(option.id)}
                  onChange={() => {
                    const currentSelection = response || [];
                    const newSelection = currentSelection.includes(option.id)
                      ? currentSelection.filter((id: string) => id !== option.id)
                      : [...currentSelection, option.id];
                    handleResponse(index, newSelection);
                  }}
                  className="hidden"
                />
                <label
                  htmlFor={option.id}
                  className="flex-1 text-lg cursor-pointer"
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="flex space-x-8 justify-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="text-center">
                  <input
                    type="radio"
                    id={`rating_${num}`}
                    name={`rating_${index}`}
                    checked={response === num}
                    onChange={() => handleResponse(index, num)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`rating_${num}`}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                      response === num ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={response === num ? "currentColor" : "none"}
                      className={`h-12 w-12 ${response === num ? 'fill-primary' : ''}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="mt-2 text-lg font-medium">{num}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full max-w-md text-sm text-gray-500">
              <span>Not satisfied</span>
              <span>Very satisfied</span>
            </div>
          </div>
        );
      case 'short_text':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={response || ''}
              onChange={(e) => handleResponse(index, e.target.value)}
              placeholder="Enter your answer"
              className="w-full max-w-xl text-lg p-6 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        );
      case 'long_text':
        return (
          <div className="space-y-2">
            <textarea
              value={response || ''}
              onChange={(e) => handleResponse(index, e.target.value)}
              placeholder="Enter your answer"
              className="w-full max-w-xl h-32 p-6 text-lg border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
        );
      case 'conjoint':
        return (
          <ConjointSurvey
            conjointData={question.conjointData}
            attributeNames={question.attributeNames}
            attributeColumns={question.attributeColumns}
            respondentId={respondentId}
            onComplete={(responses) => handleConjointResponse(index, responses)}
          />
        );
      default:
        return (
          <div className="p-6 text-center text-gray-500 border rounded-lg">
            Question type not supported
          </div>
        );
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      {currentQuestionIndex === 0 && (
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold">{surveyData.title}</h1>
          {surveyData.description && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {surveyData.description}
            </p>
          )}
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Question {currentQuestionIndex + 1} of {surveyData.questions.length}</span>
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

      {surveyData.questions[currentQuestionIndex] && (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {surveyData.questions[currentQuestionIndex].title}
              {surveyData.questions[currentQuestionIndex].required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h2>
            {surveyData.questions[currentQuestionIndex].description && (
              <p className="text-gray-600 text-lg">
                {surveyData.questions[currentQuestionIndex].description}
              </p>
            )}
          </div>
          
          <div className="py-8">
            {renderQuestion(surveyData.questions[currentQuestionIndex], currentQuestionIndex)}
          </div>

          <div className="flex justify-between pt-8 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="w-32 h-12 text-lg"
            >
              Previous
            </Button>
            
            {currentQuestionIndex < surveyData.questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={
                  surveyData.questions[currentQuestionIndex].required &&
                  !responses[currentQuestionIndex] &&
                  !conjointResponses[currentQuestionIndex]
                }
                className="w-32 h-12 text-lg"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const finalResponses = {
                    ...responses,
                    ...conjointResponses
                  };
                  onComplete(finalResponses);
                }}
                disabled={
                  surveyData.questions[currentQuestionIndex].required &&
                  !responses[currentQuestionIndex] &&
                  !conjointResponses[currentQuestionIndex]
                }
                className="w-32 h-12 text-lg"
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ListChecks,
  CheckSquare,
  Type,
  AlignLeft,
  Star,
  ChevronDown,
  Grid,
  SlidersHorizontal,
  Calendar,
  Upload,
  Plus,
  Edit,
  Settings,
  Trash2,
  Copy
} from "lucide-react"

interface SurveyBuilderProps {
  surveyId: string;
}

interface SurveyData {
  title: string;
  description: string;
  status: 'draft' | 'testing' | 'live' | 'closed';
  questions: any[];
}

const questionTypes = [
  { id: 'multiple_choice', label: 'Multiple Choice', icon: ListChecks, description: 'Let respondents select one option' },
  { id: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Let respondents select multiple options' },
  { id: 'short_text', label: 'Short Text', icon: Type, description: 'Let respondents enter short text' },
  { id: 'long_text', label: 'Long Text', icon: AlignLeft, description: 'Let respondents enter long text' },
  { id: 'rating', label: 'Rating Scale', icon: Star, description: 'Let respondents rate on a scale' },
  { id: 'dropdown', label: 'Dropdown', icon: ChevronDown, description: 'Let respondents select from a dropdown' },
  { id: 'matrix', label: 'Matrix', icon: Grid, description: 'Create a matrix of questions' },
  { id: 'slider', label: 'Slider', icon: SlidersHorizontal, description: 'Let respondents select a value' },
  { id: 'date', label: 'Date', icon: Calendar, description: 'Let respondents select a date' },
  { id: 'file_upload', label: 'File Upload', icon: Upload, description: 'Let respondents upload files' }
];

export function SurveyBuilder({ surveyId }: SurveyBuilderProps) {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    title: '',
    description: '',
    status: 'draft',
    questions: []
  });
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("build");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentPreviewQuestion, setCurrentPreviewQuestion] = useState(0);
  const [previewResponses, setPreviewResponses] = useState<Record<number, any>>({});

  useEffect(() => {
    // Load survey data when surveyId changes
    const loadSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/surveys/${surveyId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to load survey');
        }
        const data = await response.json();

        // Normalize question types to match backend schema
        const normalizedQuestions = (data.questions || []).map((q: any) => ({
          ...q,
          type: normalizeQuestionType(q.type)
        }));

        setSurveyData({
          title: data.title || '',
          description: data.description || '',
          status: (data.status as SurveyData['status']) || 'draft',
          questions: normalizedQuestions
        });
      } catch (error) {
        console.error('Error loading survey:', error);
      }
    };

    loadSurvey();
  }, [surveyId]);

  // Function to normalize question types
  const normalizeQuestionType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'multipleChoice': 'multiple_choice',
      'openEnded': 'long_text',
      'shortAnswer': 'short_text',
      'fileUpload': 'file_upload'
    };
    return typeMap[type] || type;
  };

  const handleAddQuestion = (type: string) => {
    const newQuestion = {
      type: normalizeQuestionType(type),
      title: 'New Question',
      description: '',
      required: false,
      options: ['multiple_choice', 'checkbox', 'dropdown'].includes(type) ? [
        { id: 'o1', text: 'Option 1' },
        { id: 'o2', text: 'Option 2' },
        { id: 'o3', text: 'Option 3' }
      ] : undefined
    };

    const updatedQuestions = [...surveyData.questions, newQuestion];
    setSurveyData({ ...surveyData, questions: updatedQuestions });
    setSelectedQuestionIndex(updatedQuestions.length - 1);
    saveSurvey({ ...surveyData, questions: updatedQuestions });
  };

  const handleUpdateQuestion = (index: number, updates: any) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updates };
    setSurveyData({ ...surveyData, questions: updatedQuestions });
    saveSurvey({ ...surveyData, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = surveyData.questions.filter((_, i) => i !== index);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
    setSelectedQuestionIndex(null);
    saveSurvey({ ...surveyData, questions: updatedQuestions });
  };

  const saveSurvey = async (data: SurveyData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/surveys/${surveyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save survey');
      }
    } catch (error) {
      console.error('Error saving survey:', error);
    }
  };

  const handleSaveAsDraft = async () => {
    const updatedData: SurveyData = {
      ...surveyData,
      status: 'draft' as const
    };
    setSurveyData(updatedData);
    await saveSurvey(updatedData);
  };

  const handlePreviewResponse = (questionIndex: number, response: any) => {
    setPreviewResponses(prev => ({
      ...prev,
      [questionIndex]: response
    }));
    
    // Auto-advance for multiple choice and rating questions only
    if (
      questionIndex < surveyData.questions.length - 1 &&
      ['multiple_choice', 'rating'].includes(surveyData.questions[questionIndex].type)
    ) {
      // Add a small delay for better UX
      setTimeout(() => {
        setCurrentPreviewQuestion(questionIndex + 1);
      }, 300);
    }
  };

  const renderQuestionPreview = (question: any, index: number) => {
    const response = previewResponses[index];

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option: any) => (
              <div
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  response === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  id={option.id}
                  name={`q_${index}`}
                  checked={response === option.id}
                  onChange={() => handlePreviewResponse(index, option.id)}
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
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  response?.includes(option.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  id={option.id}
                  checked={response?.includes(option.id)}
                  onChange={(e) => {
                    const currentSelection = response || [];
                    const newSelection = e.target.checked
                      ? [...currentSelection, option.id]
                      : currentSelection.filter((id: string) => id !== option.id);
                    handlePreviewResponse(index, newSelection);
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
                    onChange={() => handlePreviewResponse(index, num)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`rating_${num}`}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                      response === num ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Star className={`h-12 w-12 ${response === num ? 'fill-primary' : ''}`} />
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
            <Input
              type="text"
              value={response || ''}
              onChange={(e) => handlePreviewResponse(index, e.target.value)}
              placeholder="Enter your answer"
              className="w-full max-w-xl text-lg p-6"
            />
            <p className="text-sm text-gray-500">Short answer text</p>
          </div>
        );
      case 'long_text':
        return (
          <div className="space-y-2">
            <textarea
              value={response || ''}
              onChange={(e) => handlePreviewResponse(index, e.target.value)}
              placeholder="Enter your answer"
              className="w-full max-w-xl h-32 p-6 text-lg border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500">Long answer text</p>
          </div>
        );
      default:
        return (
          <div className="p-6 text-center text-gray-500 border rounded-lg">
            Preview not available for this question type
          </div>
        );
    }
  };

  const handleNextQuestion = () => {
    if (currentPreviewQuestion < surveyData.questions.length - 1) {
      setCurrentPreviewQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentPreviewQuestion > 0) {
      setCurrentPreviewQuestion(prev => prev - 1);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
    setCurrentPreviewQuestion(0);
    setPreviewResponses({});
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Survey Title"
            value={surveyData.title}
            onChange={(e) => setSurveyData({ ...surveyData, title: e.target.value })}
            className="w-64"
          />
          <Input
            placeholder="Description"
            value={surveyData.description}
            onChange={(e) => setSurveyData({ ...surveyData, description: e.target.value })}
            className="w-96"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveAsDraft}
          >
            Save as Draft
          </Button>
          <Button
            variant="default"
            onClick={() => saveSurvey(surveyData)}
          >
            Save
          </Button>
        </div>
      </div>

      {isPreviewMode ? (
        <div className="flex-1 p-4 sm:p-8 bg-gray-50 overflow-auto">
          <div 
            className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            {currentPreviewQuestion === 0 && (
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
                <span>Question {currentPreviewQuestion + 1} of {surveyData.questions.length}</span>
                <span>{Math.round(((currentPreviewQuestion + 1) / surveyData.questions.length) * 100)}% Complete</span>
              </div>
              
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${((currentPreviewQuestion + 1) / surveyData.questions.length) * 100}%`,
                    boxShadow: '0 0 8px rgba(var(--primary), 0.5)'
                  }}
                />
              </div>
            </div>

            {surveyData.questions[currentPreviewQuestion] && (
              <div 
                className="space-y-8"
                style={{
                  opacity: 0,
                  animation: 'slideUp 0.5s ease-out forwards',
                }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    {surveyData.questions[currentPreviewQuestion].title}
                    {surveyData.questions[currentPreviewQuestion].required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h2>
                  {surveyData.questions[currentPreviewQuestion].description && (
                    <p className="text-gray-600 text-lg">
                      {surveyData.questions[currentPreviewQuestion].description}
                    </p>
                  )}
                </div>
                
                <div className="py-8">
                  {renderQuestionPreview(surveyData.questions[currentPreviewQuestion], currentPreviewQuestion)}
                </div>

                <div className="flex justify-between pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentPreviewQuestion === 0}
                    className="w-32 h-12 text-lg"
                  >
                    Previous
                  </Button>
                  
                  {currentPreviewQuestion < surveyData.questions.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={
                        surveyData.questions[currentPreviewQuestion].required &&
                        !previewResponses[currentPreviewQuestion]
                      }
                      className="w-32 h-12 text-lg"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={togglePreviewMode}
                      disabled={
                        surveyData.questions[currentPreviewQuestion].required &&
                        !previewResponses[currentPreviewQuestion]
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

          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      ) : (
        <Tabs defaultValue="build" className="flex-1" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList>
              <TabsTrigger value="build">Build</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="logic">Logic</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="build" className="flex-1">
            <div className="grid h-full grid-cols-[240px_1fr_300px]">
              {/* Left Panel - Question Types */}
              <div className="border-r">
                <div className="p-4">
                  <h3 className="mb-4 text-sm font-medium">Question Types</h3>
                  <div className="space-y-2">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleAddQuestion(type.id)}
                      >
                        <type.icon className="mr-2 h-4 w-4" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <h3 className="mb-4 text-sm font-medium">Advanced Modules</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      MaxDiff Analysis
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Conjoint Analysis
                    </Button>
                  </div>
                </div>
              </div>

              {/* Center Panel - Survey Canvas */}
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div className="mx-auto max-w-3xl space-y-4">
                    {surveyData.questions.map((question, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border bg-card p-4 ${
                          selectedQuestionIndex === index ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedQuestionIndex(index)}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            {question.title}
                            {question.required && <span className="ml-1 text-red-500">*</span>}
                          </h3>
                          <div className="flex space-x-2">
                            <Button size="icon" variant="ghost">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteQuestion(index);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {renderQuestionPreview(question, index)}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full py-8 border-2 border-dashed"
                      onClick={() => handleAddQuestion('multiple_choice')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                </div>
              </ScrollArea>

              {/* Right Panel - Properties */}
              <div className="border-l">
                <div className="p-4">
                  <h3 className="mb-4 text-sm font-medium">Question Properties</h3>
                  {selectedQuestionIndex !== null && (
                    <div className="space-y-4">
                      <div>
                        <Label>Question Text</Label>
                        <Input
                          value={surveyData.questions[selectedQuestionIndex].title}
                          onChange={(e) =>
                            handleUpdateQuestion(selectedQuestionIndex, { title: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Required</Label>
                        <Switch
                          checked={surveyData.questions[selectedQuestionIndex].required}
                          onCheckedChange={(checked) =>
                            handleUpdateQuestion(selectedQuestionIndex, { required: checked })
                          }
                        />
                      </div>
                      {(surveyData.questions[selectedQuestionIndex].type === 'multiple_choice' ||
                        surveyData.questions[selectedQuestionIndex].type === 'checkbox') && (
                        <div>
                          <Label className="mb-2">Options</Label>
                          <div className="space-y-2">
                            {surveyData.questions[selectedQuestionIndex].options?.map((option: any, optionIndex: number) => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Input
                                  value={option.text}
                                  onChange={(e) => {
                                    const updatedOptions = [...surveyData.questions[selectedQuestionIndex].options];
                                    updatedOptions[optionIndex] = {
                                      ...option,
                                      text: e.target.value,
                                    };
                                    handleUpdateQuestion(selectedQuestionIndex, {
                                      options: updatedOptions,
                                    });
                                  }}
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => {
                                    const updatedOptions = surveyData.questions[
                                      selectedQuestionIndex
                                    ].options.filter((_: any, i: number) => i !== optionIndex);
                                    handleUpdateQuestion(selectedQuestionIndex, {
                                      options: updatedOptions,
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                const updatedOptions = [
                                  ...(surveyData.questions[selectedQuestionIndex].options || []),
                                  {
                                    id: `o${Date.now()}`,
                                    text: `Option ${
                                      (surveyData.questions[selectedQuestionIndex].options?.length || 0) + 1
                                    }`,
                                  },
                                ];
                                handleUpdateQuestion(selectedQuestionIndex, {
                                  options: updatedOptions,
                                });
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theme">Theme settings coming soon...</TabsContent>
          <TabsContent value="logic">Logic settings coming soon...</TabsContent>
          <TabsContent value="options">Options settings coming soon...</TabsContent>
        </Tabs>
      )}
    </div>
  );
}


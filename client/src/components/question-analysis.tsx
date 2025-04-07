"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface QuestionAnalysisProps {
  questionId: string;
  questionType: string;
  options?: string[];
}

interface QuestionOption {
  id: string;
  text: string;
  count: number;
  percentage: number;
}

export function QuestionAnalysis({ questionId, questionType, options = [] }: QuestionAnalysisProps) {
  const [activeTab, setActiveTab] = useState("responses")
  const [questionData, setQuestionData] = useState<QuestionOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:5000/api/questions/${questionId}/responses`)
        if (!response.ok) {
          throw new Error('Failed to fetch question data')
        }
        const data = await response.json()
        setQuestionData(data)
      } catch (error) {
        console.error('Error fetching question data:', error)
        // Fallback to sample data if API fails
        setQuestionData(
          options.map((option, index) => ({
            id: `o${index + 1}`,
            text: option,
            count: Math.floor(Math.random() * 100),
            percentage: Math.floor(Math.random() * 100)
          }))
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestionData()
  }, [questionId, options])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Analysis</CardTitle>
        <CardDescription>Response breakdown for this question</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="responses" className="text-xs">
              Responses
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="responses">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {questionData.map((option) => (
                  <div key={option.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="font-medium">
                        {option.count} ({option.percentage}%)
                      </span>
                    </div>
                    <Progress value={option.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            <div className="text-center py-8 text-muted-foreground">
              Trends visualization coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { SurveyTaker } from "@/components/SurveyTaker"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Survey {
  _id: string;
  title: string;
  description: string;
  questions: Array<{
    _id: string;
    type: string;
    text: string;
    options?: string[];
    required?: boolean;
  }>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function SurveyPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const surveyId = params.id as string
  const respondentId = searchParams.get('respondentId') || 'default'
  
  const [surveyData, setSurveyData] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`/api/surveys/${surveyId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch survey')
        }
        
        const data = await response.json()
        setSurveyData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchSurvey()
  }, [surveyId])
  
  const handleSurveyComplete = async (answers: any[]) => {
    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyId,
          respondentId,
          answers,
          isAnonymous: true
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit survey response')
      }
      
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response')
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }
  
  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-green-500 mb-4">Thank you for completing the survey!</div>
        <Button onClick={() => window.close()}>Close</Button>
      </div>
    )
  }
  
  if (!surveyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Survey not found</div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SurveyTaker
        surveyData={surveyData}
        onComplete={handleSurveyComplete}
        respondentId={respondentId}
      />
    </div>
  )
} 
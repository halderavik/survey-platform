'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard-header';
import { SurveyResponseChart } from '@/components/survey-response-chart';
import { SurveyCompletionChart } from '@/components/survey-completion-chart';
import { QuestionAnalysis } from '@/components/question-analysis';
import { Button } from '@/components/ui/button';
import { Share2, Edit2, Trash2 } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  status: string;
  responses: number;
  created: string;
  lastUpdated: string;
  questions: Array<{
    id: string;
    type: string;
    text: string;
    required: boolean;
    options?: string[];
  }>;
}

export default function SurveyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/surveys/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch survey');
        }

        const data = await response.json();
        setSurvey(data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurvey();
  }, [params.id]);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!survey) {
    return (
      <DashboardShell>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Survey not found</h3>
          <p className="mt-2 text-sm text-gray-500">
            The survey you're looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        <DashboardHeader
          heading={survey.title}
          text={survey.description}
        >
          <div className="flex space-x-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push(`/dashboard/surveys/${survey.id}/edit`)}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </DashboardHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Response Overview</h2>
              <SurveyResponseChart surveyId={survey.id} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Completion Rate</h2>
              <SurveyCompletionChart surveyId={survey.id} />
            </div>
          </div>
          <div className="space-y-6">
            {survey.questions.map((question) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">{question.text}</h3>
                <QuestionAnalysis
                  questionId={question.id}
                  questionType={question.type}
                  options={question.options}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
} 
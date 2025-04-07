'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard-header';
import { SurveyBuilder } from '@/components/survey-builder';
import { SurveyQuestion } from '@/components/survey-question';
import { SurveyQuestionProperties } from '@/components/survey-question-properties';
import { QuestionAnalysis } from '@/components/question-analysis';

export default function SurveyBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const surveyId = searchParams.get('id');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && !surveyId) {
      router.push('/dashboard');
    }
  }, [loading, surveyId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        <DashboardHeader
          heading="Survey Builder"
          text="Create and customize your survey"
        />
        <div className="h-[calc(100vh-12rem)]">
          {surveyId && <SurveyBuilder surveyId={surveyId} />}
        </div>
      </div>
    </DashboardShell>
  );
} 
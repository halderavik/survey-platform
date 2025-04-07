'use client';

import { useParams } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard-header';
import { SurveyBuilder } from '@/components/survey-builder';

export default function SurveyEditPage() {
  const params = useParams();
  const surveyId = params.id as string;

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Edit Survey"
        text="Make changes to your survey"
      />
      <div className="mt-8">
        <SurveyBuilder surveyId={surveyId} />
      </div>
    </DashboardShell>
  );
} 
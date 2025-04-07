'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard-header';
import { SurveyBuilder } from '@/components/survey-builder';

export default function SurveyBuilderPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Get the ID and ensure it's a string
  const surveyId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (!loading && !surveyId) {
      router.push('/dashboard');
      return;
    }

    // Validate survey ID format (24 character hex string)
    if (surveyId && !/^[0-9a-fA-F]{24}$/.test(surveyId)) {
      setError('Invalid survey ID');
      router.push('/dashboard');
    }
  }, [loading, user, surveyId, router]);

  if (loading || !surveyId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
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
          <SurveyBuilder surveyId={surveyId} />
        </div>
      </div>
    </DashboardShell>
  );
} 
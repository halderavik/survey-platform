'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { DashboardShell } from '../../components/dashboard-shell';
import { DashboardHeader } from '../../components/dashboard-header';
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { RecentSurveys } from '../../components/dashboard/RecentSurveys';
import { SurveyActivity } from '../../components/dashboard/SurveyActivity';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { CreateSurveyDialog } from '../../components/create-survey-dialog';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    totalResponses: 0,
    responseRate: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/surveys/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

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
          heading="Dashboard"
          text="Create and manage your surveys"
        >
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-black text-white hover:bg-gray-900"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Survey
          </Button>
        </DashboardHeader>

        <div className="space-y-6">
          <DashboardStats stats={stats} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentSurveys />
            <SurveyActivity />
          </div>
        </div>

        <CreateSurveyDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSurveyCreated={(surveyId) => {
            router.push(`/survey-builder?id=${surveyId}`);
          }}
        />
      </div>
    </DashboardShell>
  );
} 
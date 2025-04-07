"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
}

export const RecentSurveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const fetchRecentSurveys = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/surveys?limit=5', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch surveys');
        }

        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSurveys();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Surveys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredSurveys = surveys.filter(survey => {
    switch (activeTab) {
      case 'active':
        return survey.status === 'active';
      case 'drafts':
        return survey.status === 'draft';
      case 'completed':
        return survey.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Surveys</CardTitle>
        <Link
          href="/dashboard/surveys"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredSurveys.length === 0 ? (
              <p className="text-sm text-gray-500">No surveys yet. Create your first survey to get started.</p>
            ) : (
              <div className="space-y-4">
                {filteredSurveys.map((survey) => (
                  <Link key={survey.id} href={`/dashboard/surveys/${survey.id}`}>
                    <div className="group rounded-lg border p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{survey.title}</h3>
                          <p className="text-sm text-gray-500">{survey.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {survey.status === 'active' && (
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                          )}
                          <BarChart2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{survey.responseCount} responses</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>Created {new Date(survey.createdAt).toLocaleDateString()}</span>
                        <span>Updated {new Date(survey.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 
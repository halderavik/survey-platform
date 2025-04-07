import React from 'react';
import { FileText, Clock, CheckCircle, BarChart } from 'lucide-react';

interface StatsProps {
  stats: {
    totalSurveys: number;
    activeSurveys: number;
    totalResponses: number;
    responseRate: number;
  };
}

export const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <FileText className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Total Surveys</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{stats.totalSurveys}</p>
              <span className="text-xs text-gray-500">+2 from last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Clock className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Active Surveys</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{stats.activeSurveys}</p>
              <span className="text-xs text-gray-500">+1 from last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <CheckCircle className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Total Responses</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{stats.totalResponses}</p>
              <span className="text-xs text-gray-500">+520 from last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <BarChart className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-500">Response Rate</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{stats.responseRate}%</p>
              <span className="text-xs text-gray-500">+2.1% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
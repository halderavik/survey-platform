import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw } from 'lucide-react';

interface SurveyResponse {
  _id: string;
  survey: string;
  respondent: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  respondentId: string;
  answers: Array<{
    questionId: string;
    value: any;
    text?: string;
  }>;
  status: string;
  metadata: {
    ipAddress: string;
    userAgent: string;
    deviceType: string;
    browser: string;
    os: string;
  };
  startedAt: string;
  completedAt: string;
  timeSpent: number;
}

export default function SurveyAnalytics() {
  const params = useParams();
  const surveyId = params.id as string;
  
  const [surveyData, setSurveyData] = useState<any>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch survey data
        const surveyResponse = await fetch(`http://localhost:5000/api/surveys/${surveyId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!surveyResponse.ok) {
          throw new Error('Failed to fetch survey data');
        }
        
        const surveyData = await surveyResponse.json();
        setSurveyData(surveyData);

        // Fetch responses
        const responsesResponse = await fetch(`http://localhost:5000/api/surveys/${surveyId}/responses`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!responsesResponse.ok) {
          throw new Error('Failed to fetch survey responses');
        }
        
        const responsesData = await responsesResponse.json();
        setResponses(responsesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);

  const handleDownloadData = async () => {
    try {
      setDownloadProgress(0);
      
      // Prepare data for download
      const csvData = responses.map(response => {
        const row: Record<string, any> = {
          'Response ID': response._id,
          'Respondent ID': response.respondentId,
          'Status': response.status,
          'Started At': new Date(response.startedAt).toLocaleString(),
          'Completed At': new Date(response.completedAt).toLocaleString(),
          'Time Spent (seconds)': response.timeSpent,
          'IP Address': response.metadata.ipAddress,
          'Device Type': response.metadata.deviceType,
          'Browser': response.metadata.browser,
          'OS': response.metadata.os
        };

        // Add answers
        response.answers.forEach((answer, index) => {
          const question = surveyData.questions.find((q: any) => q._id === answer.questionId);
          if (question) {
            row[`Q${index + 1}: ${question.text}`] = answer.value;
            if (answer.text) {
              row[`Q${index + 1}: ${question.text} (Text)`] = answer.text;
            }
          }
        });

        return row;
      });

      // Convert to CSV
      const headers = Object.keys(csvData[0]);
      const csvRows = [
        headers.join(','),
        ...csvData.map(row => 
          headers.map(header => 
            JSON.stringify(row[header] || '')
          ).join(',')
        )
      ];
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `survey_responses_${surveyId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadProgress(100);
    } catch (err) {
      console.error('Error downloading data:', err);
      alert('Failed to download data. Please try again.');
    }
  };

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/surveys/${surveyId}/responses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch survey responses');
      }
      
      const data = await response.json();
      setResponses(data);
    } catch (err) {
      console.error('Error refreshing data:', err);
      alert('Failed to refresh data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{surveyData?.title}</h1>
          <p className="text-gray-600">{surveyData?.description}</p>
        </div>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={handleRefreshData}
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button
            onClick={handleDownloadData}
            disabled={loading || responses.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Responses
          </Button>
        </div>
      </div>

      {downloadProgress > 0 && downloadProgress < 100 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Downloading data...</span>
            <span>{downloadProgress}%</span>
          </div>
          <Progress value={downloadProgress} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Response Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Total Responses</div>
              <div className="text-2xl font-bold">{responses.length}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-2xl font-bold">
                {responses.filter(r => r.status === 'completed').length}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">In Progress</div>
              <div className="text-2xl font-bold">
                {responses.filter(r => r.status === 'in_progress').length}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respondent ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Started
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Spent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {responses.map((response) => (
                  <tr key={response._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {response.respondentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        response.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : response.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {response.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(response.startedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {response.completedAt
                        ? new Date(response.completedAt).toLocaleString()
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {response.timeSpent
                        ? `${Math.floor(response.timeSpent / 60)}m ${response.timeSpent % 60}s`
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 
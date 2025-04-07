import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConjointAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    question: string;
    designFile: File;
    attributeNames: Record<string, string>;
  }) => void;
}

export function ConjointAnalysisModal({
  isOpen,
  onClose,
  onSubmit,
}: ConjointAnalysisModalProps) {
  const [question, setQuestion] = useState("");
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<{
    headers: string[];
    attributeColumns: string[];
    sampleData: any[];
  } | null>(null);
  const [attributeNames, setAttributeNames] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'upload' | 'configure'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        setError("Please upload a CSV file");
        return;
      }
      
      try {
        const fileContent = await file.text();
        const rows = fileContent.split('\n').map(row => row.split(','));
        const headers = rows[0].map(header => header.trim());
        
        // Identify attribute columns (columns that aren't RespondentID, ChoiceTask, or ProfileID)
        const attributeColumns = headers.filter(header => 
          !['RespondentID', 'ChoiceTask', 'ProfileID'].includes(header)
        );
        
        // Get sample data (first 3 rows)
        const sampleData = rows.slice(1, 4).map(row => {
          const rowData: Record<string, string> = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index]?.trim() || '';
          });
          return rowData;
        });
        
        // Initialize attribute names with column names
        const initialAttributeNames: Record<string, string> = {};
        attributeColumns.forEach(attr => {
          initialAttributeNames[attr] = attr;
        });
        
        setAttributeNames(initialAttributeNames);
        setFilePreview({
          headers,
          attributeColumns,
          sampleData
        });
        setDesignFile(file);
        setError(null);
        setStep('configure');
      } catch (error) {
        console.error('Error processing file:', error);
        setError('Error processing the file. Please check the format.');
      }
    }
  };

  const handleAttributeNameChange = (column: string, newName: string) => {
    setAttributeNames(prev => ({
      ...prev,
      [column]: newName
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designFile) {
      setError("Please upload a conjoint design file");
      return;
    }
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }
    onSubmit({
      question,
      designFile,
      attributeNames
    });
  };

  const resetForm = () => {
    setQuestion("");
    setDesignFile(null);
    setError(null);
    setFilePreview(null);
    setAttributeNames({});
    setStep('upload');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Conjoint Analysis</DialogTitle>
          <DialogDescription>
            Upload your conjoint design file and configure the question that will be shown to respondents.
          </DialogDescription>
        </DialogHeader>
        
        {step === 'upload' ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep('configure'); }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="designFile">Conjoint Design File (CSV)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="designFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("designFile")?.click()}
                  className="w-full h-24 border-dashed"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-6 w-6" />
                    <span>
                      {designFile ? designFile.name : "Click to upload design file"}
                    </span>
                  </div>
                </Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={!designFile}>
                Next
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Question Text</Label>
              <Textarea
                id="question"
                placeholder="Which option would you prefer?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-24"
              />
            </div>

            {filePreview && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Attribute Names</h3>
                <p className="text-sm text-gray-500">
                  Customize how attributes will be displayed to respondents:
                </p>
                
                <div className="space-y-3">
                  {filePreview.attributeColumns.map(attr => (
                    <div key={attr} className="flex items-center space-x-2">
                      <Label htmlFor={`attr-${attr}`} className="w-1/3">{attr}:</Label>
                      <Input
                        id={`attr-${attr}`}
                        value={attributeNames[attr] || attr}
                        onChange={(e) => handleAttributeNameChange(attr, e.target.value)}
                        className="w-2/3"
                      />
                    </div>
                  ))}
                </div>
                
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">File Structure:</p>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>RespondentID: Identifies different respondents</li>
                      <li>ChoiceTask: Screen number (1-9 in this example)</li>
                      <li>ProfileID: Product concept number on each screen</li>
                      <li>Other columns: Attribute levels for each product concept</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setStep('upload')}>
                Back
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Add Conjoint Analysis</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 
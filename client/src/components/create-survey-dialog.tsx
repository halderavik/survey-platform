"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { SurveyTemplateCard } from "@/components/survey-template-card"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface CreateSurveyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSurveyCreated?: (surveyId: string) => void
}

const templateQuestions = {
  "customer-satisfaction": [
    {
      type: "multipleChoice",
      text: "How satisfied are you with our product?",
      title: "How satisfied are you with our product?",
      required: true,
      options: [
        { id: "o1", text: "Very satisfied" },
        { id: "o2", text: "Satisfied" },
        { id: "o3", text: "Neutral" },
        { id: "o4", text: "Dissatisfied" },
        { id: "o5", text: "Very dissatisfied" },
      ],
    },
    {
      type: "rating",
      text: "How likely are you to recommend our product to others?",
      title: "How likely are you to recommend our product to others?",
      required: true,
      scalePoints: 10,
    },
    {
      type: "openEnded",
      text: "What could we do to improve your experience?",
      title: "What could we do to improve your experience?",
      required: false,
    },
  ],
  "product-feedback": [
    {
      type: "multipleChoice",
      text: "Which features do you use most frequently?",
      title: "Which features do you use most frequently?",
      required: true,
      options: [
        { id: "o1", text: "Feature A" },
        { id: "o2", text: "Feature B" },
        { id: "o3", text: "Feature C" },
      ],
    },
    {
      type: "checkbox",
      text: "What improvements would you like to see?",
      title: "What improvements would you like to see?",
      required: false,
      options: [
        { id: "o1", text: "Better performance" },
        { id: "o2", text: "More features" },
        { id: "o3", text: "Improved UI" },
        { id: "o4", text: "Better documentation" },
      ],
    },
    {
      type: "slider",
      text: "How would you rate the ease of use?",
      title: "How would you rate the ease of use?",
      required: true,
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
    },
  ],
  "event-feedback": [
    {
      type: "rating",
      text: "How would you rate the overall event?",
      title: "How would you rate the overall event?",
      required: true,
      scalePoints: 5,
    },
    {
      type: "multipleChoice",
      text: "Would you attend this event again?",
      title: "Would you attend this event again?",
      required: true,
      options: [
        { id: "o1", text: "Definitely" },
        { id: "o2", text: "Maybe" },
        { id: "o3", text: "No" },
      ],
    },
    {
      type: "date",
      text: "When would you prefer the next event to be held?",
      title: "When would you prefer the next event to be held?",
      required: false,
    },
  ],
  "market-research": [
    {
      type: "multipleChoice",
      text: "Which age group do you belong to?",
      title: "Which age group do you belong to?",
      required: true,
      options: [
        { id: "o1", text: "18-24" },
        { id: "o2", text: "25-34" },
        { id: "o3", text: "35-44" },
        { id: "o4", text: "45-54" },
        { id: "o5", text: "55+" },
      ],
    },
    {
      type: "checkbox",
      text: "What factors influence your purchase decisions?",
      title: "What factors influence your purchase decisions?",
      required: true,
      options: [
        { id: "o1", text: "Price" },
        { id: "o2", text: "Quality" },
        { id: "o3", text: "Brand reputation" },
        { id: "o4", text: "Reviews" },
      ],
    },
    {
      type: "matrix",
      text: "Rate the importance of the following features",
      title: "Rate the importance of the following features",
      required: true,
      rows: ["Price", "Quality", "Support", "Features"],
      columns: ["Not Important", "Somewhat Important", "Very Important", "Critical"],
    },
  ],
  "employee-satisfaction": [
    {
      type: "rating",
      text: "How satisfied are you with your current role?",
      title: "How satisfied are you with your current role?",
      required: true,
      scalePoints: 5,
    },
    {
      type: "multipleChoice",
      text: "How long have you been with the company?",
      title: "How long have you been with the company?",
      required: true,
      options: [
        { id: "o1", text: "Less than 1 year" },
        { id: "o2", text: "1-2 years" },
        { id: "o3", text: "3-5 years" },
        { id: "o4", text: "More than 5 years" },
      ],
    },
    {
      type: "dropdown",
      text: "Which department do you work in?",
      title: "Which department do you work in?",
      required: true,
      options: [
        { id: "o1", text: "Engineering" },
        { id: "o2", text: "Sales" },
        { id: "o3", text: "Marketing" },
        { id: "o4", text: "HR" },
        { id: "o5", text: "Operations" },
      ],
    },
  ],
  "website-feedback": [
    {
      type: "rating",
      text: "How easy is it to navigate our website?",
      title: "How easy is it to navigate our website?",
      required: true,
      scalePoints: 5,
    },
    {
      type: "multipleChoice",
      text: "Did you find what you were looking for?",
      title: "Did you find what you were looking for?",
      required: true,
      options: [
        { id: "o1", text: "Yes, easily" },
        { id: "o2", text: "Yes, but it took time" },
        { id: "o3", text: "No" },
      ],
    },
    {
      type: "file-upload",
      text: "Upload a screenshot of any issues you encountered",
      title: "Upload a screenshot of any issues you encountered",
      required: false,
      acceptedFileTypes: ["image/*"],
    },
  ],
}

export function CreateSurveyDialog({ open, onOpenChange, onSurveyCreated }: CreateSurveyDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("blank")
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const router = useRouter()

  const handleCreate = async () => {
    try {
      setIsLoading(true)
      
      // Get initial questions based on template or create empty array for blank survey
      const initialQuestions = selectedTemplateId ? templateQuestions[selectedTemplateId as keyof typeof templateQuestions] : []

      const now = new Date().toISOString()

      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          questions: [
            {
              type: "long_text",
              title: "What are your thoughts?",
              description: "Please share your feedback in detail",
              required: true
            }
          ],
          created: now,
          lastUpdated: now,
          status: 'draft',
          responses: 0
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create survey');
      }

      const data = await response.json();
      onOpenChange(false);
      
      // Redirect to the survey builder page with the correct route format
      router.push(`/survey-builder/${data.id}`);
    } catch (error) {
      console.error('Error creating survey:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  }

  const templates = [
    {
      id: "customer-satisfaction",
      title: "Customer Satisfaction",
      description: "Measure customer satisfaction with your product or service",
      icon: "🌟",
    },
    {
      id: "product-feedback",
      title: "Product Feedback",
      description: "Collect feedback on your product features and usability",
      icon: "💬",
    },
    {
      id: "event-feedback",
      title: "Event Feedback",
      description: "Gather feedback from attendees after an event",
      icon: "🎪",
    },
    {
      id: "market-research",
      title: "Market Research",
      description: "Conduct market research to understand your target audience",
      icon: "📊",
    },
    {
      id: "employee-satisfaction",
      title: "Employee Satisfaction",
      description: "Measure employee satisfaction and engagement",
      icon: "👥",
    },
    {
      id: "website-feedback",
      title: "Website Feedback",
      description: "Collect feedback on your website design and usability",
      icon: "🌐",
    },
  ]

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplateId(template.id)
    setTitle(template.title)
    setDescription(template.description)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a new survey</DialogTitle>
          <DialogDescription>Start from scratch or use a template to get started quickly.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="blank" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blank">Blank Survey</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="blank" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                placeholder="Enter survey title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter survey description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="template" className="py-4">
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 hover:bg-accent",
                    selectedTemplateId === template.id && "border-primary bg-accent"
                  )}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="mb-2 text-2xl">{template.icon}</div>
                  <h3 className="mb-1 font-medium">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleCreate} 
            disabled={!title.trim() || isLoading || (activeTab === "template" && !selectedTemplateId)} 
            className="w-full sm:w-auto bg-black text-white hover:bg-gray-900"
          >
            {isLoading ? "Creating..." : "Create Survey"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


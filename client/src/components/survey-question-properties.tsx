"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface SurveyQuestionPropertiesProps {
  question: any
  onChange: (updates: any) => void
}

export function SurveyQuestionProperties({ question, onChange }: SurveyQuestionPropertiesProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ title: e.target.value })
  }

  const handleRequiredChange = (checked: boolean) => {
    onChange({ required: checked })
  }

  const handleOptionChange = (optionId: string, text: string) => {
    onChange({
      options: question.options.map((option: any) => (option.id === optionId ? { ...option, text } : option)),
    })
  }

  const addOption = () => {
    onChange({
      options: [...question.options, { id: `o${Date.now()}`, text: "New Option" }],
    })
  }

  const removeOption = (optionId: string) => {
    onChange({
      options: question.options.filter((option: any) => option.id !== optionId),
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Question Title</Label>
        <Input
          id="title"
          value={question.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter question title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={question.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Enter question description"
        />
      </div>
      {(question.type === "multiple-choice" || question.type === "checkbox") && (
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            {question.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index] = e.target.value;
                    onChange({ options: newOptions });
                  }}
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newOptions = question.options.filter((_: any, i: number) => i !== index);
                    onChange({ options: newOptions });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newOptions = [...question.options, `Option ${question.options.length + 1}`];
                onChange({ options: newOptions });
              }}
            >
              Add Option
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          checked={question.required}
          onCheckedChange={(checked) => onChange({ required: checked })}
        />
        <Label htmlFor="required">Required</Label>
      </div>

      <Separator />

      {question.type === "text" && (
        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder Text</Label>
          <Input
            id="placeholder"
            value={question.placeholder || ""}
            onChange={(e) => onChange({ placeholder: e.target.value })}
          />
        </div>
      )}

      {question.type === "open-ended" && (
        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder Text</Label>
          <Textarea
            id="placeholder"
            value={question.placeholder || ""}
            onChange={(e) => onChange({ placeholder: e.target.value })}
          />
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label>Advanced Settings</Label>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            // Show logic & branching modal or expand section
            alert("Logic & Branching settings will open here")
            // In a real implementation, you would open a modal or expand a section
          }}
        >
          Logic & Branching
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            // Show randomization modal or expand section
            alert("Randomization settings will open here")
            // In a real implementation, you would open a modal or expand a section
          }}
        >
          Randomization
        </Button>
      </div>
    </div>
  )
}


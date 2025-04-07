"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar,
  CheckSquare,
  ChevronDown,
  FileText,
  Grid,
  List,
  MessageSquare,
  SlidersHorizontal,
  Star,
  Upload,
} from "lucide-react"

interface QuestionTypeSelectorProps {
  onSelect: (type: string) => void;
  onCancel: () => void;
}

export function QuestionTypeSelector({ onSelect, onCancel }: QuestionTypeSelectorProps) {
  const questionTypes = [
    {
      type: "multiple_choice",
      label: "Multiple Choice",
      description: "Let respondents select one option from a list",
      icon: "radio_button_checked"
    },
    {
      type: "checkbox",
      label: "Checkbox",
      description: "Let respondents select multiple options",
      icon: "check_box"
    },
    {
      type: "short_text",
      label: "Short Text",
      description: "Let respondents enter a short text response",
      icon: "short_text"
    },
    {
      type: "long_text",
      label: "Long Text",
      description: "Let respondents enter a long text response",
      icon: "notes"
    },
    {
      type: "rating",
      label: "Rating",
      description: "Let respondents rate on a numeric scale",
      icon: "star"
    },
    {
      type: "dropdown",
      label: "Dropdown",
      description: "Let respondents select from a dropdown menu",
      icon: "arrow_drop_down"
    },
    {
      type: "matrix",
      label: "Matrix",
      description: "Create a matrix of questions",
      icon: "grid_on"
    },
    {
      type: "slider",
      label: "Slider",
      description: "Let respondents select a value using a slider",
      icon: "tune"
    },
    {
      type: "date",
      label: "Date",
      description: "Let respondents select a date",
      icon: "calendar_today"
    },
    {
      type: "file_upload",
      label: "File Upload",
      description: "Let respondents upload files",
      icon: "upload_file"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Question Type</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {questionTypes.map((type) => (
          <Button
            key={type.type}
            variant="outline"
            className="flex items-start gap-4 h-auto p-4 justify-start"
            onClick={() => onSelect(type.type)}
          >
            <span className="material-icons text-2xl">{type.icon}</span>
            <div className="text-left">
              <div className="font-medium">{type.label}</div>
              <div className="text-sm text-muted-foreground">{type.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}


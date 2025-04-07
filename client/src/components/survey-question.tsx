"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Edit, GripVertical, Pencil, Settings, Trash, Calendar, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface SurveyQuestionProps {
  question: any
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
  onUpdate: (updates: any) => void
}

export function SurveyQuestion({ question, isSelected, onClick, onDelete, onUpdate }: SurveyQuestionProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ title: e.target.value })
  }

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup value="o1" className="space-y-2">
            {question.options.map((option: any) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {question.options.map((option: any) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </div>
        )
      case "text":
        return <Input disabled placeholder="Short text answer" />
      case "open-ended":
        return <Textarea disabled placeholder="Long text answer" />
      case "rating":
        // Default to 5 points if scalePoints is not set
        const scalePoints = question.scalePoints || 5
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: scalePoints }, (_, i) => i + 1).map((value) => (
                <Button key={value} variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                  {value}
                </Button>
              ))}
            </div>
            {isSelected && (
              <div className="mt-2 flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Scale points:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      const newPoints = Math.max(2, (question.scalePoints || 5) - 1)
                      onUpdate({ scalePoints: newPoints })
                    }}
                    disabled={(question.scalePoints || 5) <= 2}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="mx-2 min-w-[20px] text-center">{scalePoints}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      const newPoints = Math.min(10, (question.scalePoints || 5) + 1)
                      onUpdate({ scalePoints: newPoints })
                    }}
                    disabled={(question.scalePoints || 5) >= 10}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      case "dropdown":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option: any) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "matrix":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-2"></div>
              {["Poor", "Fair", "Good", "Excellent"].map((header) => (
                <div key={header} className="text-center text-sm">
                  {header}
                </div>
              ))}
            </div>
            {["Feature 1", "Feature 2"].map((row) => (
              <div key={row} className="grid grid-cols-6 gap-2 items-center">
                <div className="col-span-2 text-sm">{row}</div>
                <RadioGroup value={`${row}-1`} className="contents">
                  {[1, 2, 3, 4].map((col) => (
                    <div key={col} className="flex justify-center">
                      <RadioGroupItem value={`${row}-${col}`} disabled />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        )
      case "slider":
        return (
          <div className="space-y-2">
            <Slider disabled defaultValue={[50]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        )
      case "date":
        return (
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <Calendar className="h-4 w-4" />
            </Button>
            <Input disabled placeholder="Select a date" />
          </div>
        )
      case "file-upload":
        return (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Upload a file</Label>
            <Input id="file" type="file" disabled />
          </div>
        )
      default:
        return <div>Unsupported question type</div>
    }
  }

  return (
    <Card
      className={cn("relative cursor-pointer transition-all", isSelected && "ring-2 ring-primary")}
      onClick={onClick}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-50 hover:opacity-100">
        <GripVertical className="h-5 w-5" />
      </div>
      <CardHeader className="pb-2 pl-10">
        {isEditing ? (
          <Input
            value={question.title}
            onChange={handleTitleChange}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
          />
        ) : (
          <div className="text-base font-medium" onClick={() => setIsEditing(true)}>
            {question.title}
            {question.required && <span className="ml-1 text-destructive">*</span>}
          </div>
        )}
      </CardHeader>
      <CardContent className="pl-10">
        {renderQuestionContent()}

        {isSelected && question.type !== "rating" && (
          <>
            <div className="absolute right-2 top-2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  // Clone question logic would go here
                }}
                title="Duplicate"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)
                }}
                title="Edit Question"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                title="Delete"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditing(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Question
                </Button>

                {(question.type === "multiple-choice" || question.type === "checkbox") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add option logic
                      const newOptions = [...question.options, { id: `o${Date.now()}`, text: "New Option" }]
                      onUpdate({ options: newOptions })
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Open settings dialog or panel
                    alert("Question settings will open here")
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </>
        )}

        {isSelected && question.type === "rating" && (
          <div className="absolute right-2 top-2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                // Clone question logic would go here
              }}
              title="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              title="Edit Question"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              title="Delete"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


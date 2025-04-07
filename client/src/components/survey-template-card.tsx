"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SurveyTemplateCardProps {
  template: {
    id: string
    title: string
    description: string
    icon: string
  }
  onClick: () => void
}

export function SurveyTemplateCard({ template, onClick }: SurveyTemplateCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{template.icon}</div>
          <CardTitle className="text-base">{template.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{template.description}</CardDescription>
      </CardContent>
    </Card>
  )
}


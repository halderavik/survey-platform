import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Copy, Edit, Link, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"

interface SurveyCardProps {
  survey: {
    id: string
    title: string
    description: string
    status: string
    responses: number
    created: string
    lastUpdated: string
  }
}

const formatDate = (dateString: string) => {
  try {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    // Check if the date is valid
    if (isNaN(date.getTime())) return 'Invalid date'
    return `${formatDistanceToNow(date)} ago`
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}

export function SurveyCard({ survey }: SurveyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{survey.title}</CardTitle>
            <CardDescription className="mt-1">{survey.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="mr-2 h-4 w-4" />
                <span>Share Link</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            <div className={`h-2 w-2 rounded-full ${getStatusColor(survey.status)}`} />
            <span className="capitalize">{survey.status}</span>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <BarChart3 className="mr-1 h-4 w-4" />
            {survey.responses} responses
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <div>Created {formatDate(survey.created)}</div>
        <div>Updated {formatDate(survey.lastUpdated)}</div>
      </CardFooter>
    </Card>
  )
}


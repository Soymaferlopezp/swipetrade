"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Smartphone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-st-dark flex items-center justify-center p-6">
      <Card className="bg-st-dark-lighter border-st-dark-lighter max-w-md w-full text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-2xl font-bold text-st-light">Page Not Found</CardTitle>
          <p className="text-st-light/70 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-st-mint text-st-dark hover:bg-st-mint/90">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
            >
              <Link href="/swipe">
                <Smartphone className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-st-dark-lighter text-st-light hover:bg-st-dark-lighter bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

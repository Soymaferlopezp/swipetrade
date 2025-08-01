"use client"

export default function Loading() {
  return (
    <div className="min-h-screen bg-st-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-st-mint/30 border-t-st-mint rounded-full animate-spin"></div>
        <p className="text-st-light/70">Loading SwipeTrade...</p>
      </div>
    </div>
  )
}

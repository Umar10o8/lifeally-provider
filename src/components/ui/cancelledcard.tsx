import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CancelledCard() {
  return (
    <Card className="w-72 rounded-2xl shadow-md">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar>
          <AvatarImage src="/avatars/elston.jpg" alt="Elston Gullan" />
          <AvatarFallback>EG</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-base">Elston Gullan</h3>
          <p className="text-sm text-muted-foreground">ElstonG12@gmail.com</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Date</span>
          <span>Jun 21, 2019</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Time</span>
          <span>6:00 - 7:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Call Type</span>
          <span>One Time</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span className="text-red-500 font-medium">Cancelled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

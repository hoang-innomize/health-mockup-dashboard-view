import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { mockChatMessages } from "@/data/mockData";
import { Phone, Video, Send, MessageSquare } from "lucide-react";

interface ChatDrawerProps {
  patientName: string;
}

export default function ChatDrawer({ patientName }: ChatDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Chat & Notes
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <span>Patient Chat & Notes - {patientName}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Chat Messages */}
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 border rounded-lg p-4 bg-muted/10 overflow-y-auto">
                <div className="space-y-4">
                  {mockChatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'nurse' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.type === 'nurse' 
                          ? 'bg-medical-blue text-white' 
                          : message.type === 'system'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-white border'
                      }`}>
                        <div className="text-sm">{message.message}</div>
                        <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Input */}
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Patient Notes */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patient Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Add notes about the patient..." 
                    className="min-h-[100px]"
                  />
                  <Button size="sm" className="w-full">Save Note</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Schedule Follow-up
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Send Reminder
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Update Medication
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
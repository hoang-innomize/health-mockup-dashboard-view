import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockChatMessages, mockPatients } from "@/data/mockData";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

export default function PatientChat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages] = useState(mockChatMessages);
  const currentPatient = mockPatients[0];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would add the message to the chat
      setNewMessage("");
    }
  };

  const getMessageSenderColor = (type: string) => {
    switch (type) {
      case 'patient': return 'bg-primary text-primary-foreground';
      case 'nurse': return 'bg-medical-green text-white';
      case 'system': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Patient List Sidebar */}
      <div className="w-80 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Patients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPatients.map((patient) => (
              <div 
                key={patient.id} 
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  patient.id === currentPatient.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">{patient.condition}</div>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      patient.riskLevel === 'High' ? 'bg-destructive text-destructive-foreground' :
                      patient.riskLevel === 'Medium' ? 'bg-warning text-warning-foreground' :
                      'bg-success text-success-foreground'
                    }`}
                  >
                    {patient.riskLevel}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last active: {patient.lastReading}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">{currentPatient.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentPatient.condition} • Age {currentPatient.age}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    className={getMessageSenderColor(message.type)}
                    variant="secondary"
                  >
                    {message.sender}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <div className={`p-3 rounded-lg max-w-md ${
                  message.type === 'patient' ? 'bg-primary/10 border-l-4 border-primary' :
                  message.type === 'nurse' ? 'bg-medical-green/10 border-l-4 border-medical-green' :
                  'bg-muted border-l-4 border-muted-foreground'
                }`}>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
          
          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Patient Notes Sidebar */}
      <div className="w-80 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Patient Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Morning Check-in</div>
              <div className="text-muted-foreground">Patient reported dizziness. BP elevated at 160/95. Recommended medication review.</div>
              <div className="text-xs text-muted-foreground mt-2">Dr. Sarah Wilson - 8:30 AM</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Medication Adherence</div>
              <div className="text-muted-foreground">Patient has been compliant with morning doses. Needs reminder for evening medications.</div>
              <div className="text-xs text-muted-foreground mt-2">Nurse Mike - Yesterday 6:00 PM</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Family Consultation</div>
              <div className="text-muted-foreground">Discussed care plan with daughter. Family will assist with medication management.</div>
              <div className="text-xs text-muted-foreground mt-2">Dr. Sarah Wilson - 2 days ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
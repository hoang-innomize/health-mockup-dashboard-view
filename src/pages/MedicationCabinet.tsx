import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockMedications } from "@/data/mockData";
import { 
  Pill, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  Plus
} from "lucide-react";

export default function MedicationCabinet() {
  const getMedicationStatusColor = (taken: boolean, scheduled: boolean) => {
    if (taken) return "bg-success text-success-foreground";
    if (scheduled) return "bg-warning text-warning-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getMedicationIcon = (taken: boolean, scheduled: boolean) => {
    if (taken) return <CheckCircle className="h-4 w-4" />;
    if (scheduled) return <Clock className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const adherenceRate = 87; // Mock adherence rate

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medication Cabinet</h1>
          <p className="text-muted-foreground">Track and manage patient medication schedules</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Medication
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
            <Pill className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMedications.length}</div>
            <p className="text-xs text-muted-foreground">Active prescriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taken Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMedications.filter(med => med.taken).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {mockMedications.length} doses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Doses</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMedications.filter(med => med.scheduled && !med.taken).length}
            </div>
            <p className="text-xs text-muted-foreground">Due today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
            <Calendar className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adherenceRate}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Adherence Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Adherence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Adherence</span>
              <span className="text-sm text-muted-foreground">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {mockMedications.filter(med => med.taken).length}
              </div>
              <div className="text-sm text-muted-foreground">Taken</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {mockMedications.filter(med => med.scheduled && !med.taken).length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-2xl font-bold text-destructive">0</div>
              <div className="text-sm text-muted-foreground">Missed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockMedications.map((medication) => (
            <div 
              key={medication.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{medication.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {medication.dosage} • {medication.frequency}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Next dose: {medication.nextDose}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge 
                  className={getMedicationStatusColor(medication.taken, medication.scheduled)}
                >
                  <div className="flex items-center gap-1">
                    {getMedicationIcon(medication.taken, medication.scheduled)}
                    {medication.taken ? 'Taken' : medication.scheduled ? 'Scheduled' : 'Missed'}
                  </div>
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={medication.taken}
                >
                  {medication.taken ? 'Completed' : 'Mark Taken'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medication Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-success/10 border-l-4 border-success rounded-r-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="flex-1">
                <div className="font-medium">8:00 AM - Lisinopril 10mg</div>
                <div className="text-sm text-muted-foreground">Taken at 8:05 AM</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-warning/10 border-l-4 border-warning rounded-r-lg">
              <Clock className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <div className="font-medium">6:00 PM - Metformin 500mg</div>
                <div className="text-sm text-muted-foreground">Due in 2 hours</div>
              </div>
              <Button size="sm">Mark Taken</Button>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-muted/50 border-l-4 border-muted rounded-r-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">9:00 PM - Atorvastatin 20mg</div>
                <div className="text-sm text-muted-foreground">Scheduled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
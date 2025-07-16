import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPatients, mockHealthMetrics, mockMedications } from "@/data/mockData";
import ChatDrawer from "@/components/ChatDrawer";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Droplet,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Printer,
  Phone,
  Video,
  Send,
  Clock,
  Pill,
  Target,
  CalendarClock
} from "lucide-react";

export default function PatientMonitor() {
  const currentPatient = mockPatients[0]; // John Smith for demo

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-destructive" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-success" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'High': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitor (Patient Detail)</h1>
          <p className="text-muted-foreground">Specific, actionable insights and data for the monitoring team</p>
        </div>
        <div className="flex gap-2">
          <ChatDrawer patientName={currentPatient.name} />
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{currentPatient.name}</CardTitle>
              <div className="flex gap-6 mt-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Age: </span>
                  <span className="font-medium">{currentPatient.age}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Condition: </span>
                  <span className="font-medium">{currentPatient.condition}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Reading: </span>
                  <span className="font-medium">{currentPatient.lastReading}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getRiskColor(currentPatient.riskLevel)}>
                {currentPatient.riskLevel} Risk
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Health Summary (30d)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">BP: 6/6 points</div>
              <div className="text-sm text-muted-foreground">BP readings over 30 days</div>
              <Badge variant="secondary" className="mt-1">Normal</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">Blood Glucose</div>
              <div className="text-sm text-muted-foreground">3 readings in 'V. High range'</div>
              <Badge className="bg-warning text-warning-foreground mt-1">Elevated</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">Symptoms (30days)</div>
              <div className="text-sm text-muted-foreground">55, 54, 53 severity readings</div>
              <Badge variant="secondary" className="mt-1">Stable</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Compliance</div>
              <div className="text-sm text-muted-foreground">87% average</div>
              <Badge className="bg-success text-success-foreground mt-1">Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="compliance" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="compliance">Rx Compliance</TabsTrigger>
            <TabsTrigger value="health-metrics">Health Metrics</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select defaultValue="30">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Rx Compliance - Line Chart (30 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/10">
                <div className="text-center text-muted-foreground">
                  <div className="text-lg font-medium">Compliance Trend Chart</div>
                  <div className="text-sm">Shows average compliance for medications as Life-Saving and Critical</div>
                </div>
              </div>
              
              {/* Compliance Legend */}
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">60%+</div>
                  <div className="text-sm text-muted-foreground">High Compliance</div>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">30-59%</div>
                  <div className="text-sm text-muted-foreground">Medium Compliance</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">&lt;30%</div>
                  <div className="text-sm text-muted-foreground">Low Compliance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Details */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Medicine name, Taking for, Importance, Scheduled Days, Days Taken, Sort by days [descending]
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Medicine</span>
                  <span>Taking For</span>
                  <span>Importance</span>
                  <span>Scheduled</span>
                  <span>Taken</span>
                </div>
                {mockMedications.map((med) => (
                  <div key={med.id} className="grid grid-cols-5 gap-4 text-sm py-2">
                    <span className="font-medium">{med.name}</span>
                    <span>Hypertension</span>
                    <Badge variant="secondary" className="text-xs">Life-Saving</Badge>
                    <span>30 days</span>
                    <span>26 days</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medication Cabinet Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Medication Cabinet Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                The current snapshot of patients' cabinet
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Medicine Name</span>
                  <span>Taking For</span>
                  <span>Importance</span>
                  <span>Schedule Type</span>
                  <span>Current Stock</span>
                </div>
                {mockMedications.map((med) => (
                  <div key={med.id} className="grid grid-cols-5 gap-4 text-sm py-2">
                    <span className="font-medium">{med.name}</span>
                    <span>Hypertension</span>
                    <Badge variant="secondary" className="text-xs">Life-Saving</Badge>
                    <span>Daily</span>
                    <span>15 pills</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-metrics" className="space-y-6">
          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockHealthMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  {getStatusIcon(metric.status)}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {metric.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vital Signs Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Current Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Heart className="h-6 w-6 text-medical-red" />
                  <div className="flex-1">
                    <div className="font-medium">Blood Pressure</div>
                    <div className="text-2xl font-bold">{currentPatient.vitals.bloodPressure}</div>
                    <div className="text-sm text-muted-foreground">Live chart for BP: Set background color for Blood Glucose zones</div>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">Elevated</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Droplet className="h-6 w-6 text-medical-blue" />
                  <div className="flex-1">
                    <div className="font-medium">Blood Glucose</div>
                    <div className="text-2xl font-bold">145 mg/dL</div>
                    <div className="text-sm text-muted-foreground">Live chart for Blood Glucose: Set background color for Blood Glucose zones</div>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Symptoms Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Plot Severity of symptoms as bubbles/bars and severity as Color combinations.
                  <br />
                  Best Screen for showing the rigth chart for it.
                </div>
                
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/10">
                  <div className="text-center text-muted-foreground">
                    <div className="text-lg font-medium">Symptoms Severity Chart</div>
                    <div className="text-sm">Visual representation of symptom patterns and severity levels</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Symptom Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Pain Level</div>
                        <div className="text-sm text-muted-foreground">Lower back pain intensity</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">7/10</div>
                        <Badge className="bg-destructive text-destructive-foreground">High</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Fatigue</div>
                        <div className="text-sm text-muted-foreground">General tiredness level</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">5/10</div>
                        <Badge className="bg-warning text-warning-foreground">Moderate</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Sleep Quality</div>
                        <div className="text-sm text-muted-foreground">Hours slept and quality rating</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">6.5 hrs</div>
                        <Badge variant="secondary">Fair</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
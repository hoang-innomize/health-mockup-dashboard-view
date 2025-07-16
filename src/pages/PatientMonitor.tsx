import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockPatients, mockHealthMetrics } from "@/data/mockData";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Droplet,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Monitor</h1>
          <p className="text-muted-foreground">Real-time patient health monitoring and insights</p>
        </div>
        <Button variant="outline">Print Report</Button>
      </div>

      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{currentPatient.name}</CardTitle>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <span>Age: {currentPatient.age}</span>
                <span>Condition: {currentPatient.condition}</span>
                <span>Last Reading: {currentPatient.lastReading}</span>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getRiskColor(currentPatient.riskLevel)}>
                {currentPatient.riskLevel} Risk
              </Badge>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">Compliance: </span>
                <span className="font-semibold">{currentPatient.compliance}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Health Metrics */}
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

      {/* Charts and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Compliance</span>
                <span className="text-sm text-muted-foreground">{currentPatient.compliance}%</span>
              </div>
              <Progress value={currentPatient.compliance} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">72%</div>
                <div className="text-sm text-muted-foreground">High</div>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">24%</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">4%</div>
                <div className="text-sm text-muted-foreground">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vital Signs Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <Heart className="h-6 w-6 text-medical-red" />
                <div className="flex-1">
                  <div className="font-medium">Blood Pressure</div>
                  <div className="text-2xl font-bold">{currentPatient.vitals.bloodPressure}</div>
                </div>
                <Badge className="bg-warning text-warning-foreground">High</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <Activity className="h-6 w-6 text-medical-blue" />
                <div className="flex-1">
                  <div className="font-medium">Heart Rate</div>
                  <div className="text-2xl font-bold">{currentPatient.vitals.heartRate} bpm</div>
                </div>
                <Badge variant="secondary">Normal</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <Thermometer className="h-6 w-6 text-medical-amber" />
                <div className="flex-1">
                  <div className="font-medium">Temperature</div>
                  <div className="text-2xl font-bold">{currentPatient.vitals.temperature}°F</div>
                </div>
                <Badge variant="secondary">Normal</Badge>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <Droplet className="h-6 w-6 text-medical-green" />
                <div className="flex-1">
                  <div className="font-medium">Oxygen Saturation</div>
                  <div className="text-2xl font-bold">{currentPatient.vitals.oxygenSat}%</div>
                </div>
                <Badge variant="secondary">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
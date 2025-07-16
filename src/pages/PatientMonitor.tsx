import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter, Cell } from 'recharts';
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
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Edit
} from "lucide-react";

import { useState } from "react";

export default function PatientMonitor() {
  const currentPatient = mockPatients[0]; // John Smith for demo
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [symptomFilter, setSymptomFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // Generate symptoms chart data for scatter plot
  const generateSymptomsChartData = () => {
    const symptoms = ['Pain', 'Fatigue', 'Nausea', 'Anxiety', 'Sleep Issues', 'Appetite Loss'];
    return Array.from({ length: 30 }, (_, day) => {
      const dataPoint: any = { day: day + 1 };
      symptoms.forEach((symptom, index) => {
        const baseLevel = 2 + Math.sin((day + index) * 0.3) * 1.5 + Math.random() * 1;
        dataPoint[symptom] = Math.max(0, Math.min(5, Math.round(baseLevel)));
      });
      return dataPoint;
    });
  };

  // Sample symptom records for the list
  const symptomRecords = [
    {
      id: 1,
      category: "Pain",
      symptom: "Lower back pain",
      painLevel: 4,
      userNote: "Sharp pain after sitting for long periods",
      recordDate: "2025-07-15"
    },
    {
      id: 2,
      category: "Fatigue",
      symptom: "General tiredness",
      painLevel: 3,
      userNote: "Feeling exhausted even after rest",
      recordDate: "2025-07-15"
    },
    {
      id: 3,
      category: "Pain",
      symptom: "Headache",
      painLevel: 2,
      userNote: "Mild tension headache",
      recordDate: "2025-07-14"
    },
    {
      id: 4,
      category: "Sleep",
      symptom: "Insomnia",
      painLevel: 3,
      userNote: "Difficulty falling asleep",
      recordDate: "2025-07-14"
    },
    {
      id: 5,
      category: "Anxiety",
      symptom: "General anxiety",
      painLevel: 2,
      userNote: "Feeling worried about health",
      recordDate: "2025-07-13"
    },
    {
      id: 6,
      category: "Pain",
      symptom: "Joint pain",
      painLevel: 3,
      userNote: "Stiffness in knees and fingers",
      recordDate: "2025-07-13"
    }
  ];

  const symptomsChartData = generateSymptomsChartData();

  // Filter symptom records
  const filteredRecords = symptomRecords.filter(record => {
    const matchesSymptom = symptomFilter === "" || 
      record.category.toLowerCase().includes(symptomFilter.toLowerCase()) ||
      record.symptom.toLowerCase().includes(symptomFilter.toLowerCase());
    const matchesLevel = levelFilter === "" || levelFilter === "all" || record.painLevel.toString() === levelFilter;
    return matchesSymptom && matchesLevel;
  });

  const getSeverityColor = (level: number) => {
    if (level <= 1) return '#3b82f6'; // blue
    if (level <= 2) return '#22c55e'; // green  
    if (level <= 3) return '#eab308'; // yellow
    if (level <= 4) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  // Generate compliance data based on selected period
  const generateComplianceData = (period: string) => {
    const periodNum = parseInt(period);
    
    if (periodNum <= 30) {
      // Daily data for 30 days or less
      return Array.from({ length: periodNum }, (_, index) => {
        const day = index + 1;
        const baseCompliance = 75 + Math.sin(index * 0.2) * 15 + Math.random() * 10;
        const lifeSavingCompliance = baseCompliance + 5 + Math.random() * 10;
        
        return {
          period: `Day ${day}`,
          shortPeriod: day.toString(),
          averageAll: Math.max(0, Math.min(100, Math.round(baseCompliance))),
          lifeSavingCritical: Math.max(0, Math.min(100, Math.round(lifeSavingCompliance)))
        };
      });
    } else if (periodNum === 60) {
      // Weekly data for 60 days (8-9 weeks)
      return Array.from({ length: 9 }, (_, index) => {
        const week = index + 1;
        const baseCompliance = 75 + Math.sin(index * 0.3) * 15 + Math.random() * 10;
        const lifeSavingCompliance = baseCompliance + 5 + Math.random() * 10;
        
        return {
          period: `Week ${week}`,
          shortPeriod: `W${week}`,
          averageAll: Math.max(0, Math.min(100, Math.round(baseCompliance))),
          lifeSavingCritical: Math.max(0, Math.min(100, Math.round(lifeSavingCompliance)))
        };
      });
    } else {
      // Monthly data for 90+ days (3-4 months)
      const months = periodNum > 90 ? 4 : 3;
      return Array.from({ length: months }, (_, index) => {
        const month = index + 1;
        const baseCompliance = 75 + Math.sin(index * 0.5) * 15 + Math.random() * 10;
        const lifeSavingCompliance = baseCompliance + 5 + Math.random() * 10;
        
        return {
          period: `Month ${month}`,
          shortPeriod: `M${month}`,
          averageAll: Math.max(0, Math.min(100, Math.round(baseCompliance))),
          lifeSavingCritical: Math.max(0, Math.min(100, Math.round(lifeSavingCompliance)))
        };
      });
    }
  };

  const complianceData = generateComplianceData(selectedPeriod);
  
  const getGranularity = (period: string) => {
    const periodNum = parseInt(period);
    if (periodNum <= 30) return "daily";
    if (periodNum === 60) return "weekly";
    return "monthly";
  };

  const getTooltipLabel = (value: string, period: string) => {
    const granularity = getGranularity(period);
    if (granularity === "daily") return `Day ${value}`;
    if (granularity === "weekly") return `Week ${value.replace('W', '')}`;
    return `Month ${value.replace('M', '')}`;
  };

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
      {/* Breadcrumb Navigation */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Patient Monitor</h1>
        <div className="text-sm text-muted-foreground">
          <span className="text-primary hover:underline cursor-pointer">Patients</span>
          <span className="mx-2">/</span>
          <span>{currentPatient.name}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground">Specific, actionable insights and data for the monitoring team</p>
        </div>
        <div className="flex gap-2">
          <ChatDrawer patientName={currentPatient.name} />
        </div>
      </div>

      {/* Patient Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-xl font-bold">
              {currentPatient.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {/* Patient Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">{currentPatient.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <div className="text-muted-foreground">Gender</div>
                  <div className="font-medium">Male</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Birthday</div>
                  <div className="font-medium">{currentPatient.age} years old</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Contact information</div>
                  <div className="font-medium">+1 (555) 123-4567</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Guardian/Family</div>
                  <div className="font-medium">Emergency Contact</div>
                </div>
              </div>
            </div>
            
            {/* Risk Badge */}
            <div className="text-right">
              <Badge className={getRiskColor(currentPatient.riskLevel)}>
                {currentPatient.riskLevel} Risk
              </Badge>
            </div>
          </div>
          
          {/* Patient Notes */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold">Patient notes</h3>
              <Button size="sm" variant="outline" className="h-6 w-6 p-0 rounded-full">
                <span className="text-sm">+</span>
              </Button>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Hoang Le 2025-07-10 02:43</div>
              <div>Doctor note</div>
            </div>
          </div>
          
          {/* Conditions */}
          <div className="mt-4">
            <h3 className="font-semibold mb-3">Conditions</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Supplements</Badge>
              <Badge variant="secondary">Diabetes</Badge>
              <Badge variant="secondary">Kidney</Badge>
              <Badge variant="secondary">Heart & blood vessels</Badge>
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
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={complianceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="shortPeriod" 
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ value: 'Compliance (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      labelFormatter={(value) => getTooltipLabel(value, selectedPeriod)}
                      formatter={(value: number, name: string) => [
                        `${value}%`, 
                        name === 'averageAll' ? 'Average Compliance (All)' : 'Average Compliance (Life-saving, Critical)'
                      ]}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Legend 
                      formatter={(value: string) => 
                        value === 'averageAll' ? 'Average Compliance (All)' : 'Average Compliance (Life-saving, Critical)'
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="averageAll" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lifeSavingCritical" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--destructive))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
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
          {/* Symptoms Severity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Symptoms Severity Chart - Last 30 Days</CardTitle>
              <p className="text-sm text-muted-foreground">
                Plot severity of symptoms as bubbles and severity as color combinations
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={symptomsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="day" 
                      domain={[1, 30]}
                      type="number"
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ value: 'Day', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      domain={[0, 5]}
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ value: 'Severity Level', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`Level ${value}`, name]}
                      labelFormatter={(value) => `Day ${value}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Legend />
                    
                    {/* Pain */}
                    <Scatter name="Pain" dataKey="Pain" fill="#ef4444">
                      {symptomsChartData.map((entry, index) => (
                        <Cell key={`pain-${index}`} fill={getSeverityColor(entry.Pain)} />
                      ))}
                    </Scatter>
                    
                    {/* Fatigue */}
                    <Scatter name="Fatigue" dataKey="Fatigue" fill="#f97316">
                      {symptomsChartData.map((entry, index) => (
                        <Cell key={`fatigue-${index}`} fill={getSeverityColor(entry.Fatigue)} />
                      ))}
                    </Scatter>
                    
                    {/* Anxiety */}
                    <Scatter name="Anxiety" dataKey="Anxiety" fill="#eab308">
                      {symptomsChartData.map((entry, index) => (
                        <Cell key={`anxiety-${index}`} fill={getSeverityColor(entry.Anxiety)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              {/* Severity Legend */}
              <div className="grid grid-cols-6 gap-2 mt-4 text-center text-xs">
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(0) }}>
                  <div className="font-bold text-white">0</div>
                  <div className="text-white">None</div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(1) }}>
                  <div className="font-bold text-white">1</div>
                  <div className="text-white">Mild</div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(2) }}>
                  <div className="font-bold text-white">2</div>
                  <div className="text-white">Moderate</div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(3) }}>
                  <div className="font-bold text-white">3</div>
                  <div className="text-white">Severe</div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(4) }}>
                  <div className="font-bold text-white">4</div>
                  <div className="text-white">Very Severe</div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: getSeverityColor(5) }}>
                  <div className="font-bold text-white">5</div>
                  <div className="text-white">Worst</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Details List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Symptom Details</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Filter by symptom..."
                    value={symptomFilter}
                    onChange={(e) => setSymptomFilter(e.target.value)}
                    className="w-48"
                  />
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="0">Level 0</SelectItem>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                      <SelectItem value="4">Level 4</SelectItem>
                      <SelectItem value="5">Level 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Category → Symptom</span>
                  <span>Pain Level</span>
                  <span>User's Note</span>
                  <span>Record Date</span>
                  <span>Severity</span>
                </div>
                {filteredRecords.map((record) => (
                  <div key={record.id} className="grid grid-cols-5 gap-4 text-sm py-3 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{record.category}</div>
                      <div className="text-muted-foreground text-xs">→ {record.symptom}</div>
                    </div>
                    <div className="font-bold text-lg">
                      {record.painLevel}/5
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record.userNote}
                    </div>
                    <div className="text-sm">
                      {record.recordDate}
                    </div>
                    <div>
                      <div 
                        className="inline-block px-2 py-1 rounded text-white text-xs font-bold"
                        style={{ backgroundColor: getSeverityColor(record.painLevel) }}
                      >
                        Level {record.painLevel}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRecords.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No symptoms found matching your filters
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
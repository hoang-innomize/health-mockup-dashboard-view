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
  const [activeTab, setActiveTab] = useState("compliance");
  const [symptomFilter, setSymptomFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [medicationFilter, setMedicationFilter] = useState("all"); // "all" or "missed"

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

  const getSeverityLabel = (level: number) => {
    switch (level) {
      case 0: return 'None';
      case 1: return 'Mild';
      case 2: return 'Moderate';
      case 3: return 'Severe';
      case 4: return 'Very Severe';
      case 5: return 'Worst Possible';
      default: return 'Unknown';
    }
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
  
  // Sample medication records for compliance details
  const medicationRecords = [
    {
      id: 1,
      medicine: "Metformin 500mg",
      scheduledTime: "2025-07-16 8:00 AM",
      takingFor: "Diabetes",
      importance: "Life-Saving",
      scheduledDose: 1,
      takenDose: 1,
      timestamp: new Date("2025-07-16T08:00:00").getTime()
    },
    {
      id: 2,
      medicine: "Lisinopril 10mg",
      scheduledTime: "2025-07-15 9:00 AM",
      takingFor: "Hypertension",
      importance: "Life-Saving",
      scheduledDose: 1,
      takenDose: 0,
      timestamp: new Date("2025-07-15T09:00:00").getTime()
    },
    {
      id: 3,
      medicine: "Atorvastatin 20mg",
      scheduledTime: "2025-07-15 7:00 PM",
      takingFor: "High Cholesterol",
      importance: "Important",
      scheduledDose: 1,
      takenDose: 1,
      timestamp: new Date("2025-07-15T19:00:00").getTime()
    },
    {
      id: 4,
      medicine: "Metformin 500mg",
      scheduledTime: "2025-07-15 8:00 AM",
      takingFor: "Diabetes",
      importance: "Life-Saving",
      scheduledDose: 1,
      takenDose: 1,
      timestamp: new Date("2025-07-15T08:00:00").getTime()
    },
    {
      id: 5,
      medicine: "Aspirin 81mg",
      scheduledTime: "2025-07-14 8:00 AM",
      takingFor: "Heart Protection",
      importance: "Important",
      scheduledDose: 1,
      takenDose: 0,
      timestamp: new Date("2025-07-14T08:00:00").getTime()
    },
    {
      id: 6,
      medicine: "Vitamin D3 1000IU",
      scheduledTime: "2025-07-14 9:00 AM",
      takingFor: "Bone Health",
      importance: "Supplemental",
      scheduledDose: 1,
      takenDose: 1,
      timestamp: new Date("2025-07-14T09:00:00").getTime()
    },
    {
      id: 7,
      medicine: "Lisinopril 10mg",
      scheduledTime: "2025-07-14 9:00 AM",
      takingFor: "Hypertension",
      importance: "Life-Saving",
      scheduledDose: 1,
      takenDose: 0,
      timestamp: new Date("2025-07-14T09:00:00").getTime()
    }
  ];

  // Filter medication records based on filter
  const filteredMedicationRecords = medicationRecords.filter(record => {
    if (medicationFilter === "missed") {
      return record.takenDose === 0;
    }
    return true; // "all" shows all records
  });

  // Sort by scheduled time descending
  const sortedMedicationRecords = [...filteredMedicationRecords].sort((a, b) => b.timestamp - a.timestamp);
  
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
          <p className="text-muted-foreground">Today: 16-July-2025</p>
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
          
          {/* Currently taking Meds */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold mb-3">Currently taking Meds for:</h3>
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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="h-5 w-5" />
          Health Summary (30d):
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Compliance Card */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Compliance (Avg):</div>
              <div className="text-lg font-medium">
                Low: 60% <span className="text-success text-sm">+5%</span>
              </div>
            </CardContent>
          </Card>

          {/* Health Stats Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-muted-foreground">Health Stats:</div>
                <Button 
                  variant="link" 
                  className="text-primary p-0 h-auto text-sm"
                  onClick={() => setActiveTab("health-metrics")}
                >
                  More
                </Button>
              </div>
              <div className="text-sm space-y-1">
                <div>BP: 20 patients {'>'}= HBP Stage 1</div>
                <div>Blood Glucose: 50 patients above 9 mmol/L</div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Card */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Symptoms:</div>
              <div className="text-sm space-y-1">
                <div>5.5 = 10 readings</div>
                <div>5.3 = 4 readings</div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Card */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Risk:</div>
              <Badge className="bg-muted text-muted-foreground">
                Medium
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <div className="flex justify-between items-center">
                <CardTitle>Compliance Details</CardTitle>
                <div className="flex gap-2">
                  <Select value={medicationFilter} onValueChange={setMedicationFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Show All Meds</SelectItem>
                      <SelectItem value="missed">Missed Meds Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Medicine</span>
                  <span>Scheduled Time</span>
                  <span>Taking For</span>
                  <span>Importance</span>
                  <span>Scheduled Dose</span>
                  <span>Taken Dose</span>
                </div>
                {sortedMedicationRecords.map((record) => (
                  <div key={record.id} className="grid grid-cols-6 gap-4 text-sm py-2">
                    <span className="font-medium">{record.medicine}</span>
                    <span>{record.scheduledTime}</span>
                    <span>{record.takingFor}</span>
                    <Badge variant="secondary" className="text-xs">{record.importance}</Badge>
                    <span>{record.scheduledDose}</span>
                    <span className={record.takenDose === 0 ? 'text-destructive font-semibold' : 'text-success'}>{record.takenDose}</span>
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
                  {metric.name === "Heart Rate" ? (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    getStatusIcon(metric.status)
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {metric.name === "Heart Rate" ? (
                        <span className="text-muted-foreground">No Data</span>
                      ) : (
                        <>
                          {metric.value}
                          <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                        </>
                      )}
                    </div>
                    {metric.name !== "Heart Rate" && getTrendIcon(metric.trend)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.name === "Heart Rate" ? "No recent readings" : `Updated ${metric.lastUpdated}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
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
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="1">Mild</SelectItem>
                      <SelectItem value="2">Moderate</SelectItem>
                      <SelectItem value="3">Severe</SelectItem>
                      <SelectItem value="4">Very Severe</SelectItem>
                      <SelectItem value="5">Worst Possible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Symptom</span>
                  <span>User's Note</span>
                  <span>Record Date</span>
                  <span>Severity</span>
                </div>
                {filteredRecords.map((record) => (
                  <div key={record.id} className="grid grid-cols-4 gap-4 text-sm py-3 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{record.category}</div>
                      <div className="text-muted-foreground text-xs">→ {record.symptom}</div>
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
                        {getSeverityLabel(record.painLevel)}
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  const [expandedSymptoms, setExpandedSymptoms] = useState<Record<string, boolean>>({});

  // Pain scale levels
  const painLevels = [
    { 
      level: 0, 
      label: "NO PAIN", 
      description: "Can be ignored", 
      color: "bg-sky-200 text-sky-800", 
      face: "😊" 
    },
    { 
      level: 1, 
      label: "MILD PAIN", 
      description: "Can be ignored", 
      color: "bg-blue-200 text-blue-800", 
      face: "🙂" 
    },
    { 
      level: 2, 
      label: "MODERATE PAIN", 
      description: "Interferes with tasks", 
      color: "bg-green-200 text-green-800", 
      face: "😐" 
    },
    { 
      level: 3, 
      label: "SEVERE PAIN", 
      description: "Interferes with concentration", 
      color: "bg-yellow-200 text-yellow-800", 
      face: "🙁" 
    },
    { 
      level: 4, 
      label: "VERY SEVERE PAIN", 
      description: "Interferes with basic needs", 
      color: "bg-orange-200 text-orange-800", 
      face: "😰" 
    },
    { 
      level: 5, 
      label: "WORST PAIN POSSIBLE", 
      description: "Cannot function", 
      color: "bg-red-200 text-red-800", 
      face: "😭" 
    }
  ];

  // Symptoms data
  const symptomsData = [
    {
      id: "alzheimers",
      name: "Alzheimer's disease",
      subconditions: [
        { name: "Confusion", severity: 3, description: "Severe (interferes with concentration)" },
        { name: "Memory loss", severity: 4, description: "Very Severe" }
      ]
    },
    {
      id: "chest-pain",
      name: "Angina (chest pain)",
      subconditions: []
    },
    {
      id: "pregnancy",
      name: "Pregnancy",
      subconditions: []
    },
    {
      id: "kidney",
      name: "Chronic Kidney Disease",
      subconditions: []
    },
    {
      id: "crohns",
      name: "Crohn's disease",
      subconditions: []
    }
  ];

  const toggleSymptom = (symptomId: string) => {
    setExpandedSymptoms(prev => ({
      ...prev,
      [symptomId]: !prev[symptomId]
    }));
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
          {/* Pain Scale Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-xl font-bold text-red-600">PAIN</span>
                <span className="text-xl font-bold ml-2">SCALE CHART</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {painLevels.map((level) => (
                  <div key={level.level} className={`flex items-center p-4 rounded-lg ${level.color} transition-all hover:scale-[1.02]`}>
                    <div className="text-3xl mr-4">{level.face}</div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{level.label}</div>
                      <div className="text-sm opacity-80">{level.description}</div>
                    </div>
                    <div className="text-4xl font-bold mr-4">{level.level}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Details - Mobile App Style */}
          <Card>
            <CardHeader>
              <CardTitle>Symptom Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {symptomsData.map((symptom) => (
                  <div key={symptom.id} className="border rounded-lg overflow-hidden">
                    {/* Main symptom header */}
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleSymptom(symptom.id)}
                    >
                      <span className="font-medium">{symptom.name}</span>
                      {expandedSymptoms[symptom.id] ? 
                        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>

                    {/* Expanded content */}
                    {expandedSymptoms[symptom.id] && (
                      <div className="border-t bg-background">
                        {symptom.subconditions.length > 0 ? (
                          symptom.subconditions.map((subcondition, index) => (
                            <div key={index} className="p-4 border-b last:border-b-0">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{subcondition.name}</div>
                                  <div className="text-xs text-muted-foreground">Select severity</div>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </div>
                              
                              <div className="text-sm text-muted-foreground mb-3">
                                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                {subcondition.description}
                              </div>
                              
                              {/* Severity selector */}
                              <div className="flex items-center gap-2">
                                {[0, 1, 2, 3, 4, 5].map((level) => (
                                  <button
                                    key={level}
                                    className={`w-8 h-8 rounded-full border-2 text-sm font-bold transition-all ${
                                      level === subcondition.severity
                                        ? 'bg-red-500 text-white border-red-500'
                                        : 'border-muted-foreground/30 hover:border-red-300'
                                    }`}
                                  >
                                    {level}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-sm text-muted-foreground text-center">
                            No subconditions to display
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
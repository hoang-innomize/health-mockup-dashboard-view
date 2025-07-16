import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Activity, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  // Overview metrics data
  const overviewMetrics = {
    monitoring: 2,
    teams: 5,
    complianceMedian: 0,
    complianceAverage: 0,
    lowCompliancePatients: 0,
    engagedPatients: "No data available"
  };

  // Medication Compliance data for trends
  const medicationComplianceData = [
    { day: 'Mon', meanAll: 52, avgAll: 53, meanCritical: 72, avgCritical: 74 },
    { day: 'Tue', meanAll: 58, avgAll: 60, meanCritical: 78, avgCritical: 80 },
    { day: 'Wed', meanAll: 65, avgAll: 67, meanCritical: 85, avgCritical: 87 },
    { day: 'Thu', meanAll: 70, avgAll: 72, meanCritical: 88, avgCritical: 90 },
    { day: 'Fri', meanAll: 75, avgAll: 77, meanCritical: 92, avgCritical: 94 },
    { day: 'Sat', meanAll: 45, avgAll: 47, meanCritical: 65, avgCritical: 67 },
    { day: 'Sun', meanAll: 85, avgAll: 87, meanCritical: 95, avgCritical: 97 }
  ];

  // Blood Pressure data
  const bloodPressureData = [
    { month: 'Jan', elevated: 45, stage1: 35, stage2: 15, crisis: 5 },
    { month: 'Feb', elevated: 48, stage1: 32, stage2: 16, crisis: 4 },
    { month: 'Mar', elevated: 52, stage1: 30, stage2: 14, crisis: 4 },
    { month: 'Apr', elevated: 46, stage1: 34, stage2: 16, crisis: 4 },
    { month: 'May', elevated: 44, stage1: 36, stage2: 16, crisis: 4 },
    { month: 'Jun', elevated: 47, stage1: 33, stage2: 16, crisis: 4 }
  ];

  // Blood Glucose data
  const bloodGlucoseData = [
    { month: 'Jan', veryLow: 2, low: 8, normal: 15, high: 25, veryHigh: 35 },
    { month: 'Feb', veryLow: 2, low: 9, normal: 16, high: 26, veryHigh: 36 },
    { month: 'Mar', veryLow: 2, low: 10, normal: 17, high: 27, veryHigh: 37 },
    { month: 'Apr', veryLow: 2, low: 11, normal: 18, high: 28, veryHigh: 38 },
    { month: 'May', veryLow: 2, low: 12, normal: 19, high: 29, veryHigh: 39 },
    { month: 'Jun', veryLow: 2, low: 13, normal: 20, high: 30, veryHigh: 40 }
  ];

  // Symptoms data
  const symptomsData = [
    { symptom: 'Confusion', total: 12, s5: 1, s4: 9, s3: 2 },
    { symptom: 'Memory loss', total: 6, s5: 0, s4: 1, s3: 5 },
    { symptom: 'Chest tightness', total: 4, s5: 0, s4: 3, s3: 1 },
    { symptom: 'Pain', total: 3, s5: 0, s4: 2, s3: 1 },
    { symptom: 'Shortness of breath', total: 2, s5: 0, s4: 0, s3: 2 },
    { symptom: 'Painful bowel movements', total: 2, s5: 0, s4: 1, s3: 1 },
    { symptom: 'Joint pain', total: 1, s5: 0, s4: 0, s3: 1 },
    { symptom: 'Fatigue', total: 1, s5: 0, s4: 1, s3: 0 },
    { symptom: 'Uncategorized symptom', total: 1, s5: 0, s4: 0, s3: 1 },
    { symptom: 'Pain 2', total: 1, s5: 0, s4: 1, s3: 0 }
  ];

  // Demographic data
  const genderData = [
    { name: 'Male', value: 50, color: '#3b82f6' },
    { name: 'Female', value: 40, color: '#f97316' },
    { name: 'Undeclared/Others', value: 10, color: '#10b981' }
  ];

  const ageData = [
    { ageGroup: '0-10', male: 3, female: 2 },
    { ageGroup: '10-20', male: 8, female: 4 },
    { ageGroup: '20-30', male: 12, female: 6 },
    { ageGroup: '30-40', male: 16, female: 8 },
    { ageGroup: '40-50', male: 20, female: 10 },
    { ageGroup: '50-60', male: 16, female: 8 },
    { ageGroup: '60-70', male: 12, female: 6 },
    { ageGroup: '70-80', male: 8, female: 4 },
    { ageGroup: '80+', male: 4, female: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Today: 16-July-2025</div>
      </div>

      {/* Overview Section */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          <Card className="bg-blue-50 border-blue-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Monitoring:</div>
              <div className="text-3xl font-bold text-blue-600">{overviewMetrics.monitoring}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">My Teams:</div>
              <div className="text-3xl font-bold text-gray-600">{overviewMetrics.teams}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Rx Compliance (30d):</div>
              <div className="text-lg font-bold text-green-600">
                Median: <span className="text-black">{overviewMetrics.complianceMedian}%</span>
                <span className="text-blue-500 ml-2">{overviewMetrics.complianceAverage}%</span>
              </div>
              <div className="text-sm text-muted-foreground">Average: <span className="text-black">{overviewMetrics.complianceAverage}%</span> <span className="text-blue-500">{overviewMetrics.complianceAverage}%</span></div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Patients w. Low compliance (30d):</div>
              <div className="text-3xl font-bold text-yellow-600">{overviewMetrics.lowCompliancePatients}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Patients engaged (30d):</div>
              <div className="text-sm font-medium text-purple-600">{overviewMetrics.engagedPatients}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trends Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Trends</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="custom">custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Rx Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={medicationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <defs>
                    <linearGradient id="colorMeanAll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorAvgAll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorMeanCritical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorAvgCritical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="meanAll" stroke="#3b82f6" fill="url(#colorMeanAll)" name="Mean Compliance (All)" />
                  <Area type="monotone" dataKey="avgAll" stroke="#10b981" fill="url(#colorAvgAll)" name="Average Compliance (All)" />
                  <Area type="monotone" dataKey="meanCritical" stroke="#f97316" fill="url(#colorMeanCritical)" name="Mean Compliance (Life-saving, Critical)" />
                  <Area type="monotone" dataKey="avgCritical" stroke="#ef4444" fill="url(#colorAvgCritical)" name="Average Compliance (Life-saving, Critical)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Stats Section */}
      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Blood Pressure */}
          <Card className="w-full">
          <CardHeader>
            <CardTitle>Health Stats (BP)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <defs>
                    <linearGradient id="colorElevated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorStage1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorStage2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorCrisis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#991b1b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#991b1b" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="elevated" stackId="1" stroke="#fbbf24" fill="url(#colorElevated)" name="Elevated" />
                  <Area type="monotone" dataKey="stage1" stackId="1" stroke="#f97316" fill="url(#colorStage1)" name="HBP Stage 1" />
                  <Area type="monotone" dataKey="stage2" stackId="1" stroke="#dc2626" fill="url(#colorStage2)" name="HBP Stage 2" />
                  <Area type="monotone" dataKey="crisis" stackId="1" stroke="#991b1b" fill="url(#colorCrisis)" name="HBP Crisis" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold">Blood Pressure</h3>
            </div>
          </CardContent>
        </Card>

        {/* Blood Glucose */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Health Stats (Blood Glucose)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bloodGlucoseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Legend />
                  <defs>
                    <linearGradient id="colorVeryLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorVeryHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="veryLow" stackId="1" stroke="#ef4444" fill="url(#colorVeryLow)" name="V.Low" />
                  <Area type="monotone" dataKey="low" stackId="1" stroke="#f97316" fill="url(#colorLow)" name="Low" />
                  <Area type="monotone" dataKey="normal" stackId="1" stroke="#10b981" fill="url(#colorNormal)" name="Normal" />
                  <Area type="monotone" dataKey="high" stackId="1" stroke="#f59e0b" fill="url(#colorHigh)" name="High" />
                  <Area type="monotone" dataKey="veryHigh" stackId="1" stroke="#dc2626" fill="url(#colorVeryHigh)" name="Very High" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold">Blood Glucose Patients</h3>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Symptoms and Demographics Section */}
      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Symptoms */}
          <Card className="w-full">
          <CardHeader>
            <CardTitle>Symptoms (top-10)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Symptom</span>
                <span>Total Patients Effected</span>
                <span>S5 Patients</span>
                <span>S4 Patients</span>
                <span>S3 Patients</span>
              </div>
              {symptomsData.map((symptom, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 text-sm py-2">
                  <span className="font-medium">{symptom.symptom}</span>
                  <span>{symptom.total}</span>
                  <span>{symptom.s5}</span>
                  <span>{symptom.s4}</span>
                  <span>{symptom.s3}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Demographic Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender Pie Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2 px-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span className="text-xs font-medium">Male</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
                    <span className="text-xs font-medium">Female</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="text-xs font-medium">Undeclared/Others</span>
                  </div>
                </div>
              </div>

              {/* Age Bar Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" stackId="a" fill="#3b82f6" name="male" />
                    <Bar dataKey="female" stackId="a" fill="#f97316" name="female" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium">Age (years)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Activity, Users, TrendingUp, AlertTriangle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockTeams } from "@/data/mockData";

export default function TeamDashboard() {
  const { teamId } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  // Find the specific team
  const team = mockTeams.find(t => t.id.toString() === teamId);
  
  if (!team) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/teams">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Team Not Found</h1>
        </div>
      </div>
    );
  }

  // Team-specific metrics (filtered for this team only)
  const teamMetrics = {
    monitoring: Math.floor(team.patients * 0.8), // 80% of team patients being monitored
    patients: team.patients,
    complianceMedian: team.compliance,
    complianceAverage: team.compliance,
    lowCompliancePatients: team.symptomsHigh + team.symptomsModerate,
    engagedPatients: Math.floor(team.patients * 0.7) // 70% engagement rate
  };

  // Team-specific medication compliance data
  const medicationComplianceData = [
    { day: 'Mon', meanAll: team.compliance - 10, avgAll: team.compliance - 8, meanCritical: team.compliance + 5, avgCritical: team.compliance + 7 },
    { day: 'Tue', meanAll: team.compliance - 5, avgAll: team.compliance - 3, meanCritical: team.compliance + 8, avgCritical: team.compliance + 10 },
    { day: 'Wed', meanAll: team.compliance, avgAll: team.compliance + 2, meanCritical: team.compliance + 12, avgCritical: team.compliance + 14 },
    { day: 'Thu', meanAll: team.compliance + 3, avgAll: team.compliance + 5, meanCritical: team.compliance + 15, avgCritical: team.compliance + 17 },
    { day: 'Fri', meanAll: team.compliance + 8, avgAll: team.compliance + 10, meanCritical: Math.min(95, team.compliance + 20), avgCritical: Math.min(97, team.compliance + 22) },
    { day: 'Sat', meanAll: team.compliance - 15, avgAll: team.compliance - 13, meanCritical: team.compliance - 5, avgCritical: team.compliance - 3 },
    { day: 'Sun', meanAll: team.compliance + 12, avgAll: team.compliance + 14, meanCritical: Math.min(95, team.compliance + 25), avgCritical: Math.min(97, team.compliance + 27) }
  ];

  // Team-specific health stats (proportional to team size)
  const bloodPressureData = [
    { month: 'Jan', elevated: Math.floor(team.patients * 0.45), stage1: Math.floor(team.patients * 0.35), stage2: Math.floor(team.patients * 0.15), crisis: Math.floor(team.patients * 0.05) },
    { month: 'Feb', elevated: Math.floor(team.patients * 0.48), stage1: Math.floor(team.patients * 0.32), stage2: Math.floor(team.patients * 0.16), crisis: Math.floor(team.patients * 0.04) },
    { month: 'Mar', elevated: Math.floor(team.patients * 0.52), stage1: Math.floor(team.patients * 0.30), stage2: Math.floor(team.patients * 0.14), crisis: Math.floor(team.patients * 0.04) },
    { month: 'Apr', elevated: Math.floor(team.patients * 0.46), stage1: Math.floor(team.patients * 0.34), stage2: Math.floor(team.patients * 0.16), crisis: Math.floor(team.patients * 0.04) },
    { month: 'May', elevated: Math.floor(team.patients * 0.44), stage1: Math.floor(team.patients * 0.36), stage2: Math.floor(team.patients * 0.16), crisis: Math.floor(team.patients * 0.04) },
    { month: 'Jun', elevated: Math.floor(team.patients * 0.47), stage1: Math.floor(team.patients * 0.33), stage2: Math.floor(team.patients * 0.16), crisis: Math.floor(team.patients * 0.04) }
  ];

  const bloodGlucoseData = [
    { month: 'Jan', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.08), normal: Math.floor(team.patients * 0.15), high: Math.floor(team.patients * 0.25), veryHigh: Math.floor(team.patients * 0.35) },
    { month: 'Feb', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.09), normal: Math.floor(team.patients * 0.16), high: Math.floor(team.patients * 0.26), veryHigh: Math.floor(team.patients * 0.36) },
    { month: 'Mar', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.10), normal: Math.floor(team.patients * 0.17), high: Math.floor(team.patients * 0.27), veryHigh: Math.floor(team.patients * 0.37) },
    { month: 'Apr', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.11), normal: Math.floor(team.patients * 0.18), high: Math.floor(team.patients * 0.28), veryHigh: Math.floor(team.patients * 0.38) },
    { month: 'May', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.12), normal: Math.floor(team.patients * 0.19), high: Math.floor(team.patients * 0.29), veryHigh: Math.floor(team.patients * 0.39) },
    { month: 'Jun', veryLow: Math.floor(team.patients * 0.02), low: Math.floor(team.patients * 0.13), normal: Math.floor(team.patients * 0.20), high: Math.floor(team.patients * 0.30), veryHigh: Math.floor(team.patients * 0.40) }
  ];

  // Team-specific symptoms data
  const symptomsData = [
    { symptom: 'Confusion', total: team.symptomsHigh + 2, s5: Math.floor(team.symptomsHigh * 0.1), s4: Math.floor(team.symptomsHigh * 0.7), s3: Math.floor(team.symptomsHigh * 0.2) },
    { symptom: 'Memory loss', total: team.symptomsModerate, s5: 0, s4: Math.floor(team.symptomsModerate * 0.2), s3: Math.floor(team.symptomsModerate * 0.8) },
    { symptom: 'Chest tightness', total: team.symptomsLow + 1, s5: 0, s4: Math.floor(team.symptomsLow * 0.3), s3: Math.floor(team.symptomsLow * 0.7) },
    { symptom: 'Pain', total: Math.floor(team.patients * 0.1), s5: 0, s4: Math.floor(team.patients * 0.06), s3: Math.floor(team.patients * 0.04) },
    { symptom: 'Shortness of breath', total: Math.floor(team.patients * 0.08), s5: 0, s4: 0, s3: Math.floor(team.patients * 0.08) }
  ];

  // Team-specific demographic data
  const genderData = [
    { name: 'Male', value: 52, color: '#3b82f6' },
    { name: 'Female', value: 38, color: '#f97316' },
    { name: 'Undeclared/Others', value: 10, color: '#10b981' }
  ];

  const ageData = [
    { ageGroup: '0-10', male: Math.floor(team.patients * 0.03), female: Math.floor(team.patients * 0.02) },
    { ageGroup: '10-20', male: Math.floor(team.patients * 0.08), female: Math.floor(team.patients * 0.04) },
    { ageGroup: '20-30', male: Math.floor(team.patients * 0.12), female: Math.floor(team.patients * 0.06) },
    { ageGroup: '30-40', male: Math.floor(team.patients * 0.16), female: Math.floor(team.patients * 0.08) },
    { ageGroup: '40-50', male: Math.floor(team.patients * 0.20), female: Math.floor(team.patients * 0.10) },
    { ageGroup: '50-60', male: Math.floor(team.patients * 0.16), female: Math.floor(team.patients * 0.08) },
    { ageGroup: '60-70', male: Math.floor(team.patients * 0.12), female: Math.floor(team.patients * 0.06) },
    { ageGroup: '70-80', male: Math.floor(team.patients * 0.08), female: Math.floor(team.patients * 0.04) },
    { ageGroup: '80+', male: Math.floor(team.patients * 0.04), female: Math.floor(team.patients * 0.02) }
  ];

  // Mock team members data
  const teamMembers = [
    { id: 1, fullName: "Dr. Sarah Johnson", dateAdded: "2024-01-15", email: "sarah.johnson@hospital.com" },
    { id: 2, fullName: "Nurse Michael Chen", dateAdded: "2024-02-20", email: "michael.chen@hospital.com" },
    { id: 3, fullName: "Dr. Emily Rodriguez", dateAdded: "2024-03-10", email: "emily.rodriguez@hospital.com" },
    { id: 4, fullName: "Nurse David Kim", dateAdded: "2024-04-05", email: "david.kim@hospital.com" },
    { id: 5, fullName: "Therapist Lisa Wang", dateAdded: "2024-05-12", email: "lisa.wang@hospital.com" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Link to="/teams">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">Today: 16-July-2025</div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{team.name} Dashboard</h1>
          <p className="text-muted-foreground">{team.description}</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Team Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          <Card className="bg-blue-50 border-blue-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Monitoring:</div>
              <div className="text-3xl font-bold text-blue-600">{teamMetrics.monitoring}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Patients:</div>
              <div className="text-3xl font-bold text-gray-600">{teamMetrics.patients}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Rx Compliance (30d):</div>
              <div className="text-lg font-bold text-green-600">
                Median: <span className="text-black">{teamMetrics.complianceMedian}%</span>
              </div>
              <div className="text-sm text-muted-foreground">Average: <span className="text-black">{teamMetrics.complianceAverage}%</span></div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Patients w. Symptoms:</div>
              <div className="text-3xl font-bold text-yellow-600">{teamMetrics.lowCompliancePatients}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200 w-full">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Patients engaged (30d):</div>
              <div className="text-3xl font-bold text-purple-600">{teamMetrics.engagedPatients}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      
      {/* Team Members Section */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <Card className="w-full">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Email Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.fullName}</TableCell>
                    <TableCell>{member.dateAdded}</TableCell>
                    <TableCell>{member.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
                  <YAxis />
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
              <h3 className="font-semibold">Blood Pressure Patients</h3>
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
                  <YAxis />
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
            <CardTitle>Team Symptoms (top-5)</CardTitle>
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
          <CardHeader className="pb-4">
            <CardTitle>Team Demographic Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gender Pie Chart */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-48 w-full">
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
                </div>
                <div className="flex flex-wrap justify-center gap-3 px-2">
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
                <h3 className="text-center font-semibold text-sm">Gender</h3>
              </div>

              {/* Age Bar Chart */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="ageGroup" 
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="male" fill="#3b82f6" name="Male" />
                      <Bar dataKey="female" fill="#f97316" name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="text-center font-semibold text-sm">Age Distribution</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}

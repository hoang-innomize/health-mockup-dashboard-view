import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTeams } from "@/data/mockData";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyTeams() {
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "bg-success text-success-foreground";
    if (compliance >= 80) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Teams</h1>
          <p className="text-muted-foreground">
            Manage and monitor your healthcare teams and their performance
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Team
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search teams..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-blue">313</div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-green">85%</div>
              <p className="text-sm text-muted-foreground">Avg Compliance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-amber">28</div>
              <p className="text-sm text-muted-foreground">High Symptoms</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teams Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Symptoms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/teams/${team.id}/dashboard`}
                      className="text-primary hover:underline"
                    >
                      {team.name}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{team.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{team.patients}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getComplianceColor(team.compliance)}>
                      {team.compliance}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Badge variant="destructive" className="text-xs">
                        H: {team.symptomsHigh}
                      </Badge>
                      <Badge className="bg-warning text-warning-foreground text-xs">
                        M: {team.symptomsModerate}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        L: {team.symptomsLow}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, Users, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const MigrationSyncConfig = () => {
  // Mock firm data
  const firms = [
    {
      id: "firm-001",
      name: "Anderson & Associates",
      location: "New York, NY",
      totalCases: 1247,
      activeMigrations: 3,
      lastSync: "2024-01-10",
      status: "Active"
    },
    {
      id: "firm-002", 
      name: "Smith Legal Group",
      location: "Los Angeles, CA",
      totalCases: 892,
      activeMigrations: 1,
      lastSync: "2024-01-09",
      status: "Active"
    },
    {
      id: "firm-003",
      name: "Johnson Law Firm",
      location: "Chicago, IL", 
      totalCases: 634,
      activeMigrations: 0,
      lastSync: "2024-01-08",
      status: "Inactive"
    },
    {
      id: "firm-004",
      name: "Brown & Partners",
      location: "Houston, TX",
      totalCases: 1156,
      activeMigrations: 2,
      lastSync: "2024-01-10",
      status: "Active"
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? "bg-green-900/50 text-green-400 border-green-600"
      : "bg-gray-900/50 text-gray-400 border-gray-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Migration Sync Configuration</h1>
          <p className="text-gray-400 mt-1">Manage migration settings and configurations for law firms</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Firms</CardTitle>
            <Building className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{firms.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Firms</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              {firms.filter(f => f.status === "Active").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              {firms.reduce((sum, firm) => sum + firm.totalCases, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Migrations</CardTitle>
            <Calendar className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              {firms.reduce((sum, firm) => sum + firm.activeMigrations, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Firms Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Law Firms</CardTitle>
          <CardDescription className="text-gray-400">
            Click on a firm name to access migration configuration and data management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Firm Name</TableHead>
                <TableHead className="text-gray-300">Location</TableHead>
                <TableHead className="text-gray-300">Total Cases</TableHead>
                <TableHead className="text-gray-300">Active Migrations</TableHead>
                <TableHead className="text-gray-300">Last Sync</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {firms.map((firm) => (
                <TableRow key={firm.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell>
                    <Link 
                      to={`/firm/${firm.id}`}
                      className="text-purple-400 hover:text-purple-300 font-medium underline"
                    >
                      {firm.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-300">{firm.location}</TableCell>
                  <TableCell className="text-gray-300">{firm.totalCases.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">{firm.activeMigrations}</TableCell>
                  <TableCell className="text-gray-300">{firm.lastSync}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(firm.status)}>
                      {firm.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationSyncConfig;

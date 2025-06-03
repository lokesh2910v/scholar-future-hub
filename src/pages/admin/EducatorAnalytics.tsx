
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Search, Filter, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EducatorAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock educator data
  const educators = [
    {
      id: 'edu1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      courses: 3,
      students: 892,
      rating: 4.8,
      joinedAt: '2023-06-15',
      status: 'active'
    },
    {
      id: 'edu2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      courses: 2,
      students: 567,
      rating: 4.9,
      joinedAt: '2023-08-20',
      status: 'active'
    },
    {
      id: 'edu3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      courses: 1,
      students: 234,
      rating: 4.7,
      joinedAt: '2023-11-10',
      status: 'pending'
    }
  ];

  const filteredEducators = educators.filter(educator =>
    educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    educator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Educator Analytics</h1>
          <p className="text-gray-600">Manage and view educator performance and courses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Educators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{educators.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Educators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {educators.filter(e => e.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently teaching</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {educators.reduce((acc, educator) => acc + educator.courses, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Published courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Platform average</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search educators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Educators Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Educators</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Educator Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEducators.map((educator) => (
                  <TableRow key={educator.id}>
                    <TableCell className="font-medium">{educator.name}</TableCell>
                    <TableCell>{educator.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {educator.courses}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {educator.students}
                      </div>
                    </TableCell>
                    <TableCell>⭐ {educator.rating}</TableCell>
                    <TableCell>{new Date(educator.joinedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={educator.status === 'active' ? 'default' : 'secondary'}>
                        {educator.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/educators/${educator.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducatorAnalytics;

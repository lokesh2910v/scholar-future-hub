
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, TrendingUp, Eye } from 'lucide-react';
import { mockCourses, mockStudents } from '@/data/mockData';

const AdminDashboard = () => {
  const stats = {
    totalStudents: mockStudents.length,
    totalEducators: 15, // Mock data
    totalCourses: mockCourses.length,
    activeEducators: 12 // Mock data
  };

  const recentActivity = [
    { id: 1, action: 'New student enrolled', description: 'John Doe joined React Development course', time: '2 hours ago' },
    { id: 2, action: 'New course published', description: 'UI/UX Design Fundamentals is now live', time: '4 hours ago' },
    { id: 3, action: 'New educator registered', description: 'Sarah Wilson created an account', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of platform activity and management tools
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Educators</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEducators}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeEducators} active educators
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Published courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18%</div>
              <p className="text-xs text-muted-foreground">
                Monthly user growth
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between" variant="outline" asChild>
                  <Link to="/admin/students">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Students
                    </span>
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
                <Button className="w-full justify-between" variant="outline" asChild>
                  <Link to="/admin/educators">
                    <span className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Manage Educators
                    </span>
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
                <Button className="w-full justify-between" variant="outline" asChild>
                  <Link to="/admin/courses">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Courses
                    </span>
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {activity.action}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {activity.description}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

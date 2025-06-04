
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, BookOpen, Users, Star, Calendar, TrendingUp, UserMinus, UserX } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const EducatorDetail = () => {
  const { educatorId } = useParams();
  const { toast } = useToast();
  
  // Mock educator data
  const educator = {
    id: educatorId,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    bio: 'Expert React developer with 8+ years of experience in building scalable web applications.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9f87919?w=150&h=150&fit=crop&crop=face',
    joinedAt: '2023-06-15',
    totalStudents: 892,
    totalCourses: 3,
    rating: 4.8,
    status: 'active'
  };

  // Get educator's courses
  const educatorCourses = mockCourses.filter(course => course.instructorId === educatorId);

  const handleMakeInactive = () => {
    toast({
      title: "Educator deactivated",
      description: `${educator.name} has been made inactive successfully.`,
    });
  };

  const handleRemoveEducator = () => {
    toast({
      title: "Educator removed",
      description: `${educator.name} has been permanently removed from the platform.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/admin/educators">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Educators
            </Link>
          </Button>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={educator.avatar} />
                    <AvatarFallback className="text-xl">{educator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{educator.name}</h1>
                    <p className="text-gray-600 mb-4">{educator.email}</p>
                    <p className="text-gray-700 mb-4">{educator.bio}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(educator.joinedAt).toLocaleDateString()}
                      </div>
                      <Badge variant="default">{educator.status}</Badge>
                    </div>
                  </div>
                </div>

                {/* Management Actions */}
                <div className="flex gap-2">
                  {educator.status === 'active' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Make Inactive
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Make Educator Inactive</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to make {educator.name} inactive? This will prevent them from accessing educator features but won't delete their account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={handleMakeInactive}
                          >
                            Make Inactive
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Remove Educator
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Educator</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently remove {educator.name} from the platform? This action cannot be undone and will delete all their data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={handleRemoveEducator}
                        >
                          Remove Permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{educator.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Published courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{educator.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{educator.rating}</div>
                <p className="text-xs text-muted-foreground">⭐⭐⭐⭐⭐</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Published Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {educatorCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-24 h-20 object-cover rounded"
                        />
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-600">{course.description}</p>
                            </div>
                            <Badge variant="default">Published</Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-gray-500">Students:</span>
                              <div className="font-medium">{course.students}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Rating:</span>
                              <div className="font-medium">⭐ {course.rating}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Price:</span>
                              <div className="font-medium">${course.price}</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-500">
                              Duration: {course.duration}
                            </span>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/admin/courses/${course.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {educatorCourses.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No courses published yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDetail;

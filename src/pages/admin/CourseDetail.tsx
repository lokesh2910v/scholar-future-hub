
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, Star, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { mockCourses, mockEnrollments, mockStudents } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  
  const course = mockCourses.find(c => c.id === courseId);
  const [courseStatus, setCourseStatus] = useState(course?.approved ? 'approved' : 'pending');
  
  if (!course) {
    return <div>Course not found</div>;
  }

  // Get enrolled students for this course
  const courseEnrollments = mockEnrollments.filter(enrollment => enrollment.courseId === courseId);
  const enrolledStudents = courseEnrollments.map(enrollment => {
    const student = mockStudents.find(s => s.id === enrollment.studentId);
    return { ...student, ...enrollment };
  });

  const handleApprove = () => {
    setCourseStatus('approved');
    toast({
      title: "Course approved!",
      description: "The course is now available for enrollment.",
    });
  };

  const handleReject = () => {
    setCourseStatus('rejected');
    toast({
      title: "Course rejected",
      description: "The course has been rejected and is not available for enrollment.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/admin/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-64 h-40 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <p className="text-lg text-gray-700">by {course.instructor}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Badge variant={courseStatus === 'approved' ? "default" : courseStatus === 'rejected' ? "destructive" : "secondary"}>
                        {courseStatus}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <Users className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                      <div className="text-2xl font-bold">{course.students}</div>
                      <div className="text-sm text-gray-500">Students</div>
                    </div>
                    <div className="text-center">
                      <Star className="w-5 h-5 mx-auto text-yellow-500 mb-1" />
                      <div className="text-2xl font-bold">{course.rating}</div>
                      <div className="text-sm text-gray-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-5 h-5 mx-auto text-gray-600 mb-1" />
                      <div className="text-2xl font-bold">{course.duration}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-5 h-5 mx-auto text-green-600 mb-1" />
                      <div className="text-2xl font-bold">${course.price}</div>
                      <div className="text-sm text-gray-500">Price</div>
                    </div>
                  </div>

                  {courseStatus === 'pending' && (
                    <div className="flex space-x-3">
                      <Button onClick={handleApprove} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Course
                      </Button>
                      <Button variant="destructive" onClick={handleReject} className="flex items-center">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Course
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Course Modules ({course.modules.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Module {index + 1}: {module.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{module.description}</p>
                    <div className="text-sm text-gray-500">
                      {module.videos.length} videos
                    </div>
                  </div>
                ))}

                {course.modules.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No modules added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enrolled Students */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students ({enrolledStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledStudents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Enrolled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrolledStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(student.enrolledAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No students enrolled yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockCourses } from '@/data/mockData';

const AddModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [moduleData, setModuleData] = useState({
    title: '',
    description: ''
  });

  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <Button onClick={() => navigate('/educator/courses')}>Back to My Courses</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!moduleData.title.trim()) {
      toast({
        title: "Error",
        description: "Module title is required.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically submit to backend
    console.log('Creating module:', moduleData);
    
    toast({
      title: "Module created!",
      description: "Your module has been added to the course.",
    });
    
    navigate(`/educator/courses/${courseId}`);
  };

  const handleChange = (field: string, value: string) => {
    setModuleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Module</h1>
          <p className="text-gray-600">Add a new module to "{course.title}"</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Module Title *</Label>
                <Input
                  id="title"
                  value={moduleData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter module title"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Module Description *</Label>
                <Textarea
                  id="description"
                  value={moduleData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe what students will learn in this module"
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(`/educator/courses/${courseId}`)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Module
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddModule;

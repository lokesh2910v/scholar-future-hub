
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Star, Users, Clock, ShoppingBag, Eye } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    mockCourses[0],
    mockCourses[2]
  ]);

  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
    toast({
      title: "Removed from cart",
      description: "Course has been removed from your cart.",
    });
  };

  const viewCourseDetails = (courseId: string) => {
    navigate(`/course-details/${courseId}`);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    // Enroll in all courses in the cart
    toast({
      title: "Checkout successful!",
      description: `You have enrolled in ${cartItems.length} courses.`,
    });
    
    // Redirect to My Learning page after checkout
    setTimeout(() => {
      navigate('/my-learning');
    }, 1500);
    
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8">Browse our courses and add them to your cart to get started.</p>
            <Button size="lg" onClick={() => navigate('/courses')}>Browse Courses</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((course) => (
                <Card key={course.id}>
                  <div className="flex">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-48 h-32 object-cover rounded-l-lg"
                    />
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-2">by {course.instructor}</p>
                          <p className="text-gray-700 text-sm line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => viewCourseDetails(course.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(course.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {course.rating}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${course.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>

                    <div className="text-center">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        30-day money-back guarantee
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

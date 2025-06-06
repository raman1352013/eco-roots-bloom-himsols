
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

interface Tree {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  category: string;
  growthTime: string;
  height: string;
}

const TreeCatalog = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<Tree[]>([]);

  const trees: Tree[] = [
    {
      id: 1,
      name: 'Neem Tree',
      scientificName: 'Azadirachta indica',
      description: 'Natural pesticide and medicinal tree. Excellent for air purification and traditional medicine.',
      price: 150,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&h=300',
      benefits: ['Air Purification', 'Medicinal Uses', 'Natural Pesticide'],
      category: 'Medicinal',
      growthTime: '2-3 years',
      height: '15-20 meters'
    },
    {
      id: 2,
      name: 'Banyan Tree',
      scientificName: 'Ficus benghalensis',
      description: 'Sacred tree providing excellent shade and oxygen. Perfect for community gathering spaces.',
      price: 200,
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&h=300',
      benefits: ['Shade Provider', 'Oxygen Production', 'Cultural Significance'],
      category: 'Shade',
      growthTime: '3-5 years',
      height: '20-25 meters'
    },
    {
      id: 3,
      name: 'Mango Tree',
      scientificName: 'Mangifera indica',
      description: 'Fruit-bearing tree providing delicious mangoes and good shade for rural families.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&h=300',
      benefits: ['Fruit Production', 'Shade', 'Economic Value'],
      category: 'Fruit',
      growthTime: '3-4 years',
      height: '10-15 meters'
    },
    {
      id: 4,
      name: 'Peepal Tree',
      scientificName: 'Ficus religiosa',
      description: 'Sacred tree known for releasing oxygen even at night. Highly revered in Indian culture.',
      price: 160,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&h=300',
      benefits: ['24/7 Oxygen', 'Sacred Tree', 'Air Purification'],
      category: 'Sacred',
      growthTime: '2-3 years',
      height: '20-30 meters'
    },
    {
      id: 5,
      name: 'Teak Tree',
      scientificName: 'Tectona grandis',
      description: 'High-quality timber tree with excellent economic value. Drought resistant and long-lasting.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&h=300',
      benefits: ['Timber Value', 'Drought Resistant', 'Long Lifespan'],
      category: 'Timber',
      growthTime: '5-7 years',
      height: '25-40 meters'
    },
    {
      id: 6,
      name: 'Jamun Tree',
      scientificName: 'Syzygium cumini',
      description: 'Medicinal fruit tree, excellent for diabetic patients. Purple fruits with health benefits.',
      price: 170,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&h=300',
      benefits: ['Diabetic Friendly', 'Medicinal Fruit', 'Air Purification'],
      category: 'Medicinal',
      growthTime: '3-4 years',
      height: '10-15 meters'
    }
  ];

  const addToCart = (tree: Tree) => {
    setCart(prev => [...prev, tree]);
    toast({
      title: "Added to Cart",
      description: `${tree.name} has been added to your cart.`,
    });
  };

  const categories = ['All', ...Array.from(new Set(trees.map(tree => tree.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTrees = selectedCategory === 'All' 
    ? trees 
    : trees.filter(tree => tree.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-earth-cream to-white">
        {/* Header Section */}
        <div className="bg-earth-green text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Tree Plantation Catalog</h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Choose from our carefully selected native trees. Each tree comes with planting guidance and care instructions.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Items in cart: {cart.length}</span>
                </div>
                {cart.length > 0 && (
                  <Button variant="secondary" asChild>
                    <a href="/cart">View Cart</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-earth-brown mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-earth-green hover:bg-earth-green/90" : "border-earth-green text-earth-green hover:bg-earth-green hover:text-white"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Tree Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrees.map((tree) => (
              <Card key={tree.id} className="hover:shadow-xl transition-shadow border-2 hover:border-earth-green/30">
                <div className="relative">
                  <img 
                    src={tree.image} 
                    alt={tree.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-earth-green">
                    {tree.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-earth-brown">{tree.name}</CardTitle>
                  <CardDescription className="italic text-sm">
                    {tree.scientificName}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{tree.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Growth Time:</span>
                      <span className="font-medium">{tree.growthTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Height:</span>
                      <span className="font-medium">{tree.height}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {tree.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-earth-green">
                      ₹{tree.price}
                    </div>
                    <Button 
                      onClick={() => addToCart(tree)}
                      className="bg-earth-green hover:bg-earth-green/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTrees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No trees found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TreeCatalog;

"use client"
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Card from '../Cards/Card';
import Loader from '../Loading/Loader';

interface Brand {
  _id: string;
  brandName: string;
}

interface Product {
  _id: string;
  productName: string;
  brands: Brand | null;
  phoneModel: string;
  coverType: string[];
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  productView: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DescProps {
  product: Product;
}

const Description: React.FC<DescProps> = ({ product }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedCover, setSelectedCover] = useState<string []>([]);
  const [quantity, setQuantity] = useState(1);
  const [brandDetails, setBrandDetails] = useState<Brand[]>([]);
  const [similarProduct,setSimilarProduct] = useState<Product[]>([]);
  const [phoneModelDetails, setPhoneModelDetails] = useState<string[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null)
  useEffect(() => {
    const getBrandName = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
          setBrandDetails(data.data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBrandName();
  }, []);

  useEffect(() => {
    const getPhoneModels = async () => {
      if (!selectedBrand) return;
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-brands-phonemodel?brandid=${selectedBrand}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
          setPhoneModelDetails(data.data);
          
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPhoneModels();
  }, [selectedBrand]);

  useEffect(()=>{
    const getSimilarProduct = async() =>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/similar/${product._id}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json();
      if(data.success){
        setSimilarProduct(data.data)
      }else{
        setError("no_product")
        console.log(data.message)
      }
    }
    getSimilarProduct()
  },[product._id])



  const handleCoverTypeChange = (type: string) => {
    setSelectedCover((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };


  return (
    <div className="min-h-screen w-full bg-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="bg-white shadow-sm rounded-full px-6 py-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{product.productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 flex flex-col items-center">
              <img src={product.productImage} alt={product.productName} className="w-4/6 h-full object-cover hover:scale-110 duration-500" />
              <Tabs defaultValue="description">
                <TabsContent value="description" className="mt-4">
                  <h1 className='text-xl'>Description</h1>
                  <Separator className='py-0 bg-black' />
                  <h1 className='text-xl font-semibold py-4'>{product.productName}</h1>
                  <p className="text-gray-600">{product.productDescription}</p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 py-2">{product.productName}</h1>
              <Separator className='w-4/5' />
              <div className="mt-4 text-2xl font-bold text-red-500 py-2">Rs {product.productPrice}</div>
              <Separator className='w-4/5' />

              <div className="mt-4">
                <label className="text-sm font-medium">Select Brand</label>
                <Select onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-4/5">
                    <SelectValue placeholder="Choose a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandDetails.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>{brand.brandName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">Select Model</label>
                <Select onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-4/5">
                    <SelectValue placeholder={selectedBrand ? "Choose a model" : "Select brand first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {phoneModelDetails.length===0?<p>No models</p>: phoneModelDetails.map((model, index) => (
                      <SelectItem key={index} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">Select Cover Type</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {product?.coverType?.length > 0 ? (
                    product.coverType.map((type) => (
                      <label key={type} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${selectedCover.includes(type) ? 'bg-blue-100 border-gray-400' : 'hover:bg-gray-50'}`}>
                        <input 
                          type="checkbox" 
                          checked={selectedCover.includes(type)} 
                          onChange={() => handleCoverTypeChange(type)} 
                          className="rounded border-gray-300" 
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500">No cover types available</p>
                  )}
                </div>
              </div>

                   {/* Quantity Selection */}
                <div className="mt-4 flex items-center space-x-2">                
                <Button variant="outline" size="icon" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>

                  {/* Action Buttons */}
                <div className="pt-8 flex w-4/5 items-center justify-start">
                  <Button  className="w-2/5 text-white font-semibold px-2 mx-2"><span className='px-2 py-2'><ShoppingCart/></span> Add to Cart</Button>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="py-6 mt-10 sm:p-6 md:p-8 flex flex-col items-center">
          {similarProduct.length > 0 && (
            <div className="text-center mb-10 mt-4 flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black sm:mb-2 relative">Similar Products</h1>
            </div>
          )}
          {loading ? (
          <Loader />
          ) : error === "no_products" ? (
            <p className="flex w-full items-center justify-center min-h-96 text-red-500 text-center text-xl">No products found !</p>
          ) : (
            <div className="w-full p-4 sm:p-6 rounded-lg flex justify-center items-center flex-wrap gap-11">
              {similarProduct.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Description;

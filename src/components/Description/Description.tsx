"use client"
import React, { useContext, useEffect, useState } from 'react';
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
import { toast } from 'sonner';
import  { LoginUserContext } from '@/provider/LoginContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  isCart:boolean,
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
  const {isLoggedIn} = useContext(LoginUserContext)!
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null)
  const [cartDetails,setCartDetails] = useState<[]>([])
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const getBrandName = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success) {
          setBrandDetails(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch brands. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getBrandName();
  }, []);
  
  useEffect(() => {
    if (!selectedBrand) return; // Avoid unnecessary calls when no brand is selected
    const controller = new AbortController();
  
    const getPhoneModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-brands-phonemodel?brandid=${selectedBrand}`, 
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          }
        );
        const data = await response.json();
        if (data.success) {
          setPhoneModelDetails(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("Failed to fetch phone models.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    getPhoneModels();
    return () => controller.abort(); // Cleanup function to prevent memory leaks
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

  // to get userId
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedData = JSON.parse(userDetails);
      setUserId(parsedData._id);
    }
  }, []);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to the cart");
      return;
    }
  
    // Validation checks
    if (!selectedBrand) {
      toast.error("Please select a brand");
      return;
    }
    if (!selectedModel) {
      toast.error("Please select a phone model");
      return;
    }
    if (selectedCover.length === 0) {
      toast.error("Please select at least one cover type");
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/add-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          brandName: selectedBrand,
          phoneModel: selectedModel,
          coverType: selectedCover.join(""),
          quantity: quantity,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success("Added to cart successfully!");
        setCartDetails(data.data);
        console.log(cartDetails)
        // setIsCart(true);
        router.push(`/cart/${userId}`)
      } else {
        toast.error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong while adding to the cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async() =>{
    try {
      
    } catch (error) {
      
    }
  }

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
              <Image src={product.productImage} width={400} height={400} alt={product.productName} className="w-4/6 h-full object-cover hover:scale-110 duration-500" />
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
                {/* {isCart?(
                <div className="pt-8 flex w-4/5 items-center justify-start">
                <Button variant='outline' disabled={true} onClick={handleAddToCart} className="cursor-not-allowed w-2/5 text-black font-semibold px-2 mx-2"><span className='px-2 py-2'><ShoppingCart/></span>Already on Cart</Button>
              </div>
                ):( */}
                  <div className="pt-8 flex w-4/5 items-center justify-start">
                  <Button onClick={handleAddToCart} className="w-2/5 text-white font-semibold px-2 mx-2"><span className='px-2 py-2'><ShoppingCart/></span> Add to Cart</Button>
                </div>
                 {/* )}  */}
                 
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

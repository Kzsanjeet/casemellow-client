"use client"
import Description from '@/components/Description/Description'
import Footer from '@/components/Footer/Footer'
import Loader from '@/components/Loading/Loader';
import Nav from '@/components/Nav/Nav'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Brand {
    _id: string;
    brandName: string;
}
  
interface Product {
    _id: string;
    productName: string;
    brands: Brand | null;
    phoneModel: string; // Updated to match Description.tsx
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

const Page = () => {
    const [productDetails, setProductDetails] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const productId = params.productId;
    
    useEffect(() => {
        const getProductDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
        
                const data = await response.json();
                
                if (data.success) {
                    // Ensure productDetails is always an array
                    setProductDetails([data.data]); 
                } else {
                    setError(data.message === "No products found" ? "no_products" : "Failed to fetch");
                    setProductDetails([]);
                }
            } catch (error) {
                console.error(error);
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };
        getProductDetails();
    }, [productId]);

    return (
        <div className='bg-white'>
            <Nav />
            {loading ? (
                <Loader />
            ) : error === "no_products" ? (
                <p className="flex w-full items-center justify-center min-h-96 text-red-500 text-center text-xl">
                    No products found !
                </p>
            ) : (
                <div className="w-full max-w-[100%] p-4 sm:p-6 rounded-lg flex justify-center items-center flex-wrap gap-11">
                    {productDetails.map((product) => (
                        <Description key={product._id} product={product} /> // Fixed prop name
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Page;

"use client";
import Card from "@/components/Cards/Card";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loading/Loader";
import Nav from "@/components/Nav/Nav";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useDebounce } from "@/Hooks/use-debounce";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const Page = () => {
  const params = useParams();
  const category = params.category;
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 1000)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 30;

  // const fetchProduct = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-by-category/${category}?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.success) {
  //       setProductDetails(data.data || []);
  //       setTotalPages(data.totalPages || 1);
  //       setTotalProducts(data.totalProducts || 0);
  //       setCurrentPage(data.currentPage || 1);
  //     } else {
  //       setError(data.message === "No products found" ? "no_products" : "Failed to fetch");
  //       setProductDetails([]);
  //     }
  //   } catch (error) {
  //     setError("Failed to load products");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (category) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-by-category/${category}?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = await response.json();
    
          if (data.success) {
            setProductDetails(data.data || []);
            setTotalPages(data.totalPages || 1);
            setTotalProducts(data.totalProducts || 0);
            setCurrentPage(data.currentPage || 1);
          } else {
            setError(data.message === "No products found" ? "no_products" : "Failed to fetch");
            setProductDetails([]);
          }
        } catch (error) {
          setError("Failed to load products");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [category,debouncedSearch, currentPage]); 

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  console.log(totalProducts)

  return (
    <div className="bg-white">
    <Nav/>
    <div className="py-12 mt-20 sm:p-6 md:p-8 flex flex-col items-center">
      {productDetails.length > 0 && (
        <div className="text-center mb-10 mt-4 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
            {category}
            <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
          </h1>
          <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">Shop from your best theme</p>
        </div>
      )}
      {/* Search Section */}
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto pb-6">
        <div className="relative group">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 group-focus-within:text-primary" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 w-full text-sm sm:text-base rounded-full border border-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error === "no_products" ? (
        <p className="flex w-full items-center justify-center min-h-96 text-red-500 text-center text-xl">No products found !</p>
      ) : (
        <div className="w-full max-w-[80%] p-4 sm:p-6 rounded-lg flex justify-center items-center flex-wrap gap-11">
          {productDetails.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationLink key={index} isActive={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </PaginationLink>
              ))}
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
    <Footer/>
    </div>

  );
};

export default Page;

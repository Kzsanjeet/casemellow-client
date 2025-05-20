import React, { useEffect, useState } from "react";
import Card from "../Card";
import Loader from "@/components/Loading/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


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
  discount: number;
  productImage: string;
  productCategory: string;
  productView: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Popular = () => {
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-popular?page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              },
          }
        )
  
        const data = await response.json()
  
        if (data.success) {
          setProductDetails(data.data || [])
          setTotalPages(data.totalPages || 1)
          setTotalProducts(data.totalProducts || 0)
          setCurrentPage(data.currentPage || 1)
        } else {
          setError(data.message === "No products found" ? "no_products" : "Failed to fetch")
          setProductDetails([])
        }
      } catch (error) {
        setError("Failed to load products")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchProduct()
  }, [currentPage]) //Fixed: Added currentPage dependency

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
}

console.log(totalProducts)

  return (
    <div className="py-12 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="text-center mb-10 mt-4 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
          Popular Products
          <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
        </h1>
        <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">
          Shop from popular phone cases
        </p>
      </div>

      {loading ? (
        <div>
          <Loader/>
        </div>
      ) : error === "no_products" ? (
        <p className="text-gray-500 text-center">No products found.</p>
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
              <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  // disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationLink
                      key={index}
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                  >
                      {index + 1}
                  </PaginationLink>
              ))}
              <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  // disabled={currentPage === totalPages}
              />
          </PaginationContent>
      </Pagination>
      </div>
    )}                   
    </div>
  );
};

export default Popular;

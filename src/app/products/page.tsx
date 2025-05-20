"use client"

import { useEffect, useState, useRef } from "react"
import { Search, Filter, X, ArrowUpDown } from "lucide-react"
import { useDebounce } from "@/Hooks/use-debounce"
import Card from "@/components/Cards/Card"
import Footer from "@/components/Footer/Footer"
import Loader from "@/components/Loading/Loader"
import Nav from "@/components/Nav/Nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Brand {
  _id: string
  brandName: string
}

interface Product {
  _id: string
  productName: string
  brands: Brand | null
  phoneModel: string
  coverType: string[]
  productDescription: string
  productPrice: number
  discount:number;
  productImage: string
  productCategory: string
  productView: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const ProductPage = () => {
  const [productDetails, setProductDetails] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const [brand, setBrand] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [phoneModel, setPhoneModel] = useState<string>("")
  const [phoneModels, setPhoneModels] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [sort, setSort] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined)
  const itemsPerPage = 12
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const productSectionRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  //  useEffect to detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Extract unique categories from products
  useEffect(() => {
    if (productDetails.length > 0) {
      const uniqueCategories = Array.from(new Set(productDetails.map((product) => product.productCategory)))
      setCategories(uniqueCategories)
    }
  }, [productDetails])

  // Fetch brands for dropdown
  useEffect(() => {
    const getBrandNames = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await response.json()
        if (data.success) {
          setBrands(data.data)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getBrandNames()
  }, [])

  // Fetch phone models when brand is selected
  useEffect(() => {
    const getPhoneModels = async () => {
      if (!selectedBrand) return
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get-brands-phonemodel?brandid=${selectedBrand}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        )
        const data = await response.json()
        if (data.success) {
          setPhoneModels(data.data)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getPhoneModels()
  }, [selectedBrand])


  // Fetch products when filters change or page changes
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
  
      try {
        let url = `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get/?page=${currentPage}&limit=${itemsPerPage}`
  
        if (debouncedSearch) url += `&search=${debouncedSearch}`
        if (brand) url += `&brand=${brand}`
        if (category) url += `&category=${category}`
        if (phoneModel) url += `&phoneModel=${phoneModel}`
        if (sort) url += `&sort=${sort}`
        if (isActive !== undefined) url += `&isActive=${isActive}`
  
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
  
        const data = await response.json()
  
        if (data.success) {
          setProductDetails(data.data || [])
          setTotalPages(data.pagination.totalPages || 1)
          setCurrentPage(data.pagination.currentPage || 1)
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
  }, [debouncedSearch, brand, category, phoneModel, sort, isActive, currentPage]);
  
  // Handle brand selection
  const handleBrandChange = (value: string) => {
    setBrand(value)
    const selectedBrandObj = brands.find((b) => b.brandName === value)
    setSelectedBrand(selectedBrandObj?._id || "")
    setPhoneModel("")
  }

  // Clear all filters
  const clearFilters = () => {
    setSearch("")
    setBrand("")
    setCategory("")
    setPhoneModel("")
    setSelectedBrand("")
    setSort("")
    setIsActive(undefined)
  }

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to the top of the product section
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <div className="flex-1 pt-20 container w-full sm:w-[80%] sm:mx-auto">
        {/* Page Header - Centered */}
        <div className="text-center mb-8">
          <div className="text-center mb-10 mt-4 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
              Products
              <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
            </h1>
            <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">Shop from variety of products</p>
          </div>
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto pb-4 flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative group flex-grow">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 w-full text-sm sm:text-base rounded-full border border-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
              />
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex sm:flex-row md:flex-row md:items-center justify-center items-center flex-row gap-4">
              {/* Sort Button */}
              <div className="flex items-center gap-2 px-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSort("")}>Default</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSort("priceAsc")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSort("priceDesc")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSort("orders")}>Most Popular</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSort("views")}>Most Viewed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Filter Button (Hidden on larger screens) */}
              <div className="md:hidden flex justify-end">
                <Button onClick={toggleSidebar} className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex">
          {/* Sidebar Filters - Fixed position on scroll */}
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block md:w-1/5 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-120px)] md:overflow-y-auto md:pr-4 
              ${isMobile ? "fixed inset-0 z-50 bg-black/50" : ""}`}
          >
            <div
              className={`bg-white p-4 rounded-lg border shadow-sm ${isMobile ? "h-full w-4/5 max-w-xs overflow-y-auto" : ""}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                    Clear All
                  </Button>
                  {isMobile && (
                  <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                    <X className="h-10 w-10 text-red-400 rounded-full hover:bg-red-400 " />
                  </Button>
                )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Brand Filter */}
                <Accordion type="single" defaultValue="brands">
                  <AccordionItem value="brands">
                    <AccordionTrigger className="text-sm font-medium">Brands</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-brands" checked={brand === ""} onCheckedChange={() => setBrand("")} />
                          <Label htmlFor="all-brands" className="text-sm">
                            All Brands
                          </Label>
                        </div>
                        {brands.map((b) => (
                          <div key={b._id} className="flex items-center space-x-2">
                            <Checkbox
                              id={b._id}
                              checked={brand === b.brandName}
                              onCheckedChange={() => handleBrandChange(b.brandName)}
                            />
                            <Label htmlFor={b._id} className="text-sm">
                              {b.brandName}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Phone Model Filter */}
                {phoneModels.length > 0 && (
                  <Accordion type="single" defaultValue="models">
                    <AccordionItem value="models">
                      <AccordionTrigger className="text-sm font-medium">Phone Models</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="all-models"
                              checked={phoneModel === ""}
                              onCheckedChange={() => setPhoneModel("")}
                            />
                            <Label htmlFor="all-models" className="text-sm">
                              All Models
                            </Label>
                          </div>
                          {phoneModels.map((model, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                id={`model-${index}`}
                                checked={phoneModel === model}
                                onCheckedChange={() => setPhoneModel(model)}
                              />
                              <Label htmlFor={`model-${index}`} className="text-sm">
                                {model}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Category Filter */}
                {categories.length > 0 && (
                  <Accordion type="single" defaultValue="categories">
                    <AccordionItem value="categories">
                      <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="all-categories"
                              checked={category === ""}
                              onCheckedChange={() => setCategory("")}
                            />
                            <Label htmlFor="all-categories" className="text-sm">
                              All Categories
                            </Label>
                          </div>
                          {categories.map((cat, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${index}`}
                                checked={category === cat}
                                onCheckedChange={() => setCategory(cat)}
                              />
                              <Label htmlFor={`category-${index}`} className="text-sm">
                                {cat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </div>
          </aside>

          {/* Main Products Area */}
          <main className="md:w-4/5 flex-1 pl-6" ref={productSectionRef}>
            <div ref={topRef}></div>
            <div>
              {/* Active Filters */}
              {(brand || category || phoneModel || isActive !== undefined || sort) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Active Filters:</span>
                    {brand && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs flex items-center gap-1"
                        onClick={() => setBrand("")}
                      >
                        Brand: {brand} <X className="h-3 w-3" />
                      </Button>
                    )}
                    {category && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs flex items-center gap-1"
                        onClick={() => setCategory("")}
                      >
                        Category: {category} <X className="h-3 w-3" />
                      </Button>
                    )}
                    {phoneModel && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs flex items-center gap-1"
                        onClick={() => setPhoneModel("")}
                      >
                        Model: {phoneModel} <X className="h-3 w-3" />
                      </Button>
                    )}
                    {isActive !== undefined && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs flex items-center gap-1"
                        onClick={() => setIsActive(undefined)}
                      >
                        {isActive ? "In Stock" : "Out of Stock"} <X className="h-3 w-3" />
                      </Button>
                    )}
                    {sort && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs flex items-center gap-1"
                        onClick={() => setSort("")}
                      >
                        Sort:{" "}
                        {sort === "priceAsc"
                          ? "Price: Low to High"
                          : sort === "priceDesc"
                            ? "Price: High to Low"
                            : sort === "orders"
                              ? "Most Popular"
                              : sort === "views"
                                ? "Most Viewed"
                                : sort}{" "}
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            ) : error === "no_products" ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white p-8 rounded-lg border shadow-sm">
                <p className="text-xl font-medium mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-1 mx-auto">
                {productDetails
                  .filter(product => product.isActive === true)
                  .map(product => (
                    <div key={product._id}>
                      <Card product={product} />
                    </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationLink
                        key={index}
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    ))}
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default ProductPage


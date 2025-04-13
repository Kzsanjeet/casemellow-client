//@ts-nocheck
"use client"
import Cropper from "react-easy-crop"
import { useState, useCallback, useEffect, useRef, FormEvent, useContext } from "react"
import { ShoppingCart, Trash2, Upload } from "lucide-react"
import Nav from "@/components/Nav/Nav"
import { useSearchParams } from "next/navigation"
import Footer from "@/components/Footer/Footer"
import { Button } from "@/components/ui/button"
import { LoginUserContext } from "@/provider/LoginContext"
import { toast } from "sonner"

interface Brand {
  _id: string
  brandName: string
}

interface ICustomize {
  _id: string
  mockUpName: string
  brands: {
    _id: string
    brandName: string
  }
  phoneModel: string
  coverType: string
  coverPrice: number
  mockUpImage?: string
  productDescription: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const Page = () => {
  const searchParams = useSearchParams()
  const brandId = searchParams.get("brandId")
  const mockupRef = useRef(null)

  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [mockupLoaded, setMockupLoaded] = useState(false)
  const [mockupError, setMockupError] = useState(false)

  // State declarations
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [models, setModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedModelData, setSelectedModelData] = useState<ICustomize | null>(null)
  const [selectedCover, setSelectedCover] = useState<string[]>([])
  const {isLoggedIn} = useContext(LoginUserContext)!
  const [userId, setUserId] = useState(null);
  const [cartDetails,setCartDetails] = useState<[]>([])
  // const[deliveryAddress, setDeliveryAddress] = useState<string>("")
  const [oderData, setOrderData] = useState<IOrder[]>([])
  // const [orderTotal, setOrderTotal] = useState(0)
  // const [pickupAddress, setPickupAddress] = useState<string>("")

  
  // Fetch all brands
  useEffect(() => {
    const getAllBrands = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        if (data.success) {
          setBrands(data.data)
          // If brandId is provided in URL, set it as selected
          if (brandId) {
            setSelectedBrand(brandId)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getAllBrands()
  }, [])

  // Fetch models by brand
  const getPhoneModelsByBrand = async (brandId: string) => {
    if (!brandId) return

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/customize/get-models?brandid=${brandId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      if (data.success) {
        // Extract just the phoneModel property from each object in the array
        const modelNames = data.data.map((item) => item.phoneModel)
        setModels(modelNames)
        console.log(modelNames, "phone models")
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Add new function to fetch model details
  const getModelDetails = async (modelName: string) => {
    if (!modelName) return

    setLoading(true)
    try {
      // You need to create this endpoint on your backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/customize/get-models/mockup?phoneModel=${modelName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      const data = await response.json()
      if (data.success) {
        console.log("Model details:", JSON.stringify(data.data, null, 2))
        console.log("MockUp Image URL:", data.data.mockUpImage)
        setSelectedModelData(data.data)
        setMockupLoaded(false)
        setMockupError(false)
      } else {
        console.log(data.error)
        setSelectedModelData(null)
      }
    } catch (error) {
      console.log(error)
      setSelectedModelData(null)
    } finally {
      setLoading(false)
    }
  }
  // Fetch models when a brand is selected
  useEffect(() => {
    if (selectedBrand) {
      getPhoneModelsByBrand(selectedBrand)
      // Reset model selection when brand changes
      setSelectedModel("")
      setSelectedModelData(null)
    }
  }, [selectedBrand])

  // Fetch model details when a model is selected
  useEffect(() => {
    if (selectedModel && selectedBrand) {
      getModelDetails(selectedModel)
    } else {
      setSelectedModelData(null)
    }
    // Reset cover selection when model changes
    setSelectedCover([])
  }, [selectedModel, selectedBrand])

    // to get userId
    useEffect(() => {
      const userDetails = localStorage.getItem("userDetails");
      if (userDetails) {
        const parsedData = JSON.parse(userDetails);
        setUserId(parsedData._id);
      }
    }, []);
  

    // const handleOrderPlacement = async (e?: FormEvent) => {
    //   if (e) e.preventDefault()
    //     if (!isLoggedIn) {
    //       toast.error("Please log in to add items to the order");
    //       return;
    //     }
      
    //     // Validation checks
    //     if (!selectedBrand) {
    //       toast.error("Please select a brand");
    //       return;
    //     }
    //     if (!selectedModel) {
    //       toast.error("Please select a phone model");
    //       return;
    //     }
    //     if (selectedCover.length === 0) {
    //       toast.error("Please select at least one cover type");
    //       return;
    //     }

    //   // if (!number || !deliveryAddress || !pickupAddress) {
    //   //   toast.error("Please fill in required delivery information")
    //   //   return { success: false }
    //   // }
  
    //   // if (selectedItems.length === 0) {
    //   //   toast.error("Please select items to order")
    //   //   return { success: false }
    //   // }
  
    //   setLoading(true)
  
    //   try {
    //     const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         clientId:userId,
    //         customizeId:"67fa41746d883dbc538ccced",
    //         pickUpAddress: "Herald College",
    //         coverType: croppedImage,
    //         deliveryAddress:"Pepsi cola",
    //         totalPrice: "1250",
    //         number: "9843928450",
    //       }),
    //     })
  
    //     const data = await orderResponse.json()
    //     console.log("Order API Response:", data)
  
    //     if (data.success) {
    //       setOrderData(data.data)
    //       // setPickupAddress("")
    //       setNumber("")
    //       // setDeliveryAddress("")
    //       // setSelectedItems([])
    //       // setPromoCode("")
    //       // setTotal(0)
    //       setLoading(false)
    //       toast.success("Order placed successfully")
    //       router.push(`/payment?orderId=${data.data._id}&total=${total}`)
    //       return { success: true }
    //     } else {
    //       toast.error("Failed to place order")
    //       return { success: false }
    //     }
    //   } catch (error) {
    //     console.error("Error in API request:", error)
    //     toast.error("Failed to place order. Please try again.")
    //     return { success: false }
    //   } finally {
    //     setLoading(false)
    //   }
    // }

  const handleCoverTypeChange = (type) => {
    setSelectedCover((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]))
  }

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result)
      }
    }
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = (error) => reject(error)
      img.src = url
    })
  }

  // const getCroppedImg = async () => {
  //   if (!image || !croppedAreaPixels) return null

  //   try {
  //     const sourceImage = await createImage(image)
  //     const canvas = document.createElement("canvas")
  //     const ctx = canvas.getContext("2d")
  //     if (!ctx) throw new Error("Canvas context is null")

  //     canvas.width = croppedAreaPixels.width
  //     canvas.height = croppedAreaPixels.height

  //     ctx.drawImage(
  //       sourceImage,
  //       croppedAreaPixels.x,
  //       croppedAreaPixels.y,
  //       croppedAreaPixels.width,
  //       croppedAreaPixels.height,
  //       0,
  //       0,
  //       croppedAreaPixels.width,
  //       croppedAreaPixels.height,
  //     )

  //     return canvas.toDataURL("image/jpeg")
  //   } catch (e) {
  //     console.error(e)
  //     return null
  //   }
  // }

  const getCroppedImg = async () => {
    if (!image || !croppedAreaPixels) return null
  
    try {
      const sourceImage = await createImage(image)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas context is null")
  
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
  
      ctx.drawImage(
        sourceImage,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      )
  
      // Convert to blob instead of data URL
      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Canvas toBlob returned null"))
          }
        }, "image/jpeg", 0.95) // Adjust quality as needed
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const result = await getCroppedImg()
  //     if (result) {
  //       setCroppedImage(result)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [croppedAreaPixels, image])

  const showCroppedImage = useCallback(async () => {
    try {
      const blobResult = await getCroppedImg()
      if (blobResult) {
        // Store the binary blob
        setCroppedImageBlob(blobResult)
        
        // Also create a data URL for display purposes
        const imageUrl = URL.createObjectURL(blobResult)
        setCroppedImage(imageUrl)
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image])

  // const removeImage = () => {
  //   setImage(null)
  //   setCroppedImage(null)
  // }

  const removeImage = () => {
    setImage(null)
    setCroppedImage(null)
    setCroppedImageBlob(null)
    
    // Clean up any object URLs to prevent memory leaks
    if (croppedImage && croppedImage.startsWith('blob:')) {
      URL.revokeObjectURL(croppedImage)
    }
  }
  
  // Update the handleOrderPlacement function to send binary data
  const handleOrderPlacement = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    
    if (!isLoggedIn) {
      toast.error("Please log in to add items to the order")
      return
    }
    
    // Validation checks
    if (!selectedBrand) {
      toast.error("Please select a brand")
      return
    }
    if (!selectedModel) {
      toast.error("Please select a phone model")
      return
    }
    if (selectedCover.length === 0) {
      toast.error("Please select at least one cover type")
      return
    }
    if (!croppedImageBlob) {
      toast.error("Please upload and crop an image")
      return
    }
  
    setLoading(true)
  
    try {
      // Create FormData object to send binary data
      const formData = new FormData()
      
      // Add all the order details
      formData.append("clientId", userId)
      formData.append("customizeId", "67fa41746d883dbc538ccced")
      formData.append("pickUpAddress", "Herald College")
      formData.append("deliveryAddress", "Pepsi cola")
      formData.append("totalPrice", "1250")
      formData.append("number", "9843928450")
      
      // Add the cover type (assuming it expects a string)
      formData.append("coverType", selectedCover.join(','))
      
      // Add the binary image file
      // Create a File object from the Blob with a filename
      const imageFile = new File([croppedImageBlob], "custom-design.jpg", { type: "image/jpeg" })
      formData.append("croppedImage", imageFile)
  
      // Send FormData with the binary image
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/customize/add-order`, {
        method: "POST",
        // No Content-Type header - browser will set it with boundary for FormData
        body: formData,
      })
  
      const data = await orderResponse.json()
      console.log("Order API Response:", data)
  
      if (data.success) {
        setOrderData(data.data)
        setLoading(false)
        toast.success("Order placed successfully")
        router.push(`/payment?orderId=${data.data._id}&total=${data.data.totalPrice}`)
        return { success: true }
      } else {
        toast.error("Failed to place order")
        return { success: false }
      }
    } catch (error) {
      console.error("Error in API request:", error)
      toast.error("Failed to place order. Please try again.")
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Parse cover types from string (assuming they're comma-separated)
  const getCoverTypes = () => {
    if (!selectedModelData || !selectedModelData.coverType) return []
    return selectedModelData.coverType.split(",").map((type) => type.trim())
  }

  // Get the full mockup image URL
  const getMockupImageUrl = () => {
    if (!selectedModelData || !selectedModelData.mockUpImage) return null

    return selectedModelData.mockUpImage.startsWith("http")
      ? selectedModelData.mockUpImage
      : `${process.env.NEXT_PUBLIC_LOCAL_PORT}${selectedModelData.mockUpImage}`
  }

  // Handle mockup image load
  const handleMockupLoad = () => {
    console.log("Mockup image loaded successfully")
    setMockupLoaded(true)
    setMockupError(false)
  }

  // Handle mockup image error
  const handleMockupError = (e) => {
    console.error("Mockup image failed to load:", selectedModelData?.mockUpImage)
    setMockupError(true)
    setMockupLoaded(false)
    e.currentTarget.src = "/placeholder.svg"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="text-center mb-10 mt-20 pt-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black sm:mb-2 relative">
          Customize
          <span className="block bg-red-500 h-1 w-full absolute left-0 bottom-0"></span>
        </h1>
        <p className="text-lg sm:text-xl sm:mt-1 font-medium text-gray-700">Customize Your Phone Case</p>
      </div>
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Phone Preview & Image Upload */}
            <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center border-r border-gray-200">
              <div className="relative mb-6">
                {/* Phone mockup with improved approach */}
                {selectedModelData && selectedModelData.mockUpImage ? (
                  // this is mock up div
                  <div className="relative w-[200px] h-[390px] rounded-[30px] overflow-hidden">
                    {/* Debug info */}
                    {mockupError && (
                      <div  className="absolute top-0 left-0 right-0 bg-red-100 text-red-600 text-xs p-1 z-50">
                        Mockup image failed to load
                      </div>
                    )}

                    {/* Custom design layer - positioned to fill only the inner part */}
                    {croppedImage && (
                      <div
                        className="absolute"
                        style={{
                          // These values should be adjusted based on your mockup
                          borderRadius: "30px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={croppedImage || "/placeholder.svg"}
                          alt="Custom Design"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Mockup image with transparent inner part */}
                    <img
                      ref={mockupRef}
                      src={getMockupImageUrl() || "/placeholder.svg"}
                      alt={selectedModelData.phoneModel}
                      className="absolute inset-0 w-full h-full object-contain z-50"
                      onLoad={handleMockupLoad}
                      onError={handleMockupError}
                    />
                  </div>
                ) : (
                  // Fallback to the div representation when no mockup image is available
                  <div className="relative w-[200px] h-[400px] bg-gray-200 rounded-[40px] shadow-md border border-gray-300 flex flex-col items-center p-4">
                    {croppedImage && (
                      <div className="absolute inset-0 z-0 overflow-hidden rounded-[36px]">
                        <img
                          src={croppedImage || "/placeholder.svg"}
                          alt="Customized Case"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* //camera */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10 bg-gray-600 px-1 py-1 w-14 rounded-[10px]">
                      <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
                      <div className="w-5 h-5 bg-black rounded-full border-2 border-gray-600"></div>
                    </div>
                    {/* // flash light */}
                    <div className="absolute w-3 h-3 top-[40px] left-[55px] bg-white rounded-full border-2 border-gray-600 z-10"></div>

                    <p className="absolute top-40 left-10 font-bold text-4xl text-blue-600">Your Design Here</p>

                    {/* volume */}
                    <div className="absolute  top-1/2 -translate-y-1/2 right-0 w-2 h-16 bg-red-50 rounded-l-full z-10"></div>
                  </div>
                )}
              </div>

              <div className="w-full space-y-4">
                {!image && (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-blue-500 mb-2" />
                        <p className="mb-2 text-sm text-blue-500 font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                    </label>
                  </div>
                )}

                {image && !croppedImage && (
                  <div className="space-y-4">
                    <div className="relative h-72 w-full rounded-lg overflow-hidden border border-gray-300">
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={9 / 20}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Zoom</span>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={removeImage}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        <Trash2 className="mr-2 w-4 h-4" /> Remove
                      </button>
                      <button
                        onClick={showCroppedImage}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Apply Crop
                      </button>
                    </div>
                  </div>
                )}

                {croppedImage && (
                  <div className="flex justify-center">
                    <button
                      onClick={removeImage}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      <Trash2 className="mr-2 w-4 h-4" /> Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Customization Options */}
            <div className="w-full md:w-1/2 p-6">
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-red-500">
                    {selectedModelData ? `Rs ${selectedModelData.coverPrice}` : "Rs 0"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Brand</label>
                    <select
                      className="w-4/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Choose a brand</option>
                      {brands.map((brand, index) => (
                        <option key={brand._id || `brand-${index}`} value={brand._id}>
                          {brand.brandName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Model</label>
                    <select
                      className="w-4/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedBrand || loading}
                    >
                      <option value="">{selectedBrand ? "Choose a model" : "Select brand first"}</option>
                      {models.map((model, index) => (
                        <option key={`model-${index}`} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedModelData && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Cover Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {getCoverTypes().map((type) => (
                          <label
                            key={type}
                            className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedCover.includes(type) ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCover.includes(type)}
                              onChange={() => handleCoverTypeChange(type)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                 <div className="pt-6 flex w-4/5 items-center justify-start">
                    <Button onClick={handleOrderPlacement} 
                    className="w-2/6 text-white font-semibold px-2 mx-2"
                    disabled={!croppedImage || !selectedBrand || !selectedModel || selectedCover.length === 0 || loading}
                    >
                    <span className='px-2 py-2'><ShoppingCart/></span>Confirm Order</Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Page

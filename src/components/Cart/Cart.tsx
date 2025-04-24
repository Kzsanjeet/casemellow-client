"use client"
import { type FormEvent, useContext, useEffect, useState } from "react"
import { Trash2, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
// import { CartContext } from "@/provider/CartContext"
import Link from "next/link"
import { OrderCountContext } from "@/provider/CartContext"

export interface CartItem {
  _id: string
  clientId: string
  productId: {
    _id: string
    productName: string
    brands: string
    phoneModel: string
    coverType: string[]
    productDescription: string
    productPrice: number
    productImage: string
    productCategory: string
    createdAt: string
    updatedAt: string
  }
  brandName: string
  phoneModel: string
  coverType: string
  quantity: number
  cartDate: string
  createdAt: string
  updatedAt: string
  selected?: boolean // New property to track selection state
}

export interface IOrder {
  _id: string
  clientId: string
  productId: {
    product: string
    quantity: number
  }[]
  cartId: string[]
  number: number
  pickUpAddress: string
  deliveryAddress: string
  totalQuantity: number
  orderDate?: string // ISO date string
  orderStatus: "pending" | "picked up" | "sent for delivery" | "delivered"
  paymentMethod: "Khalti" | "COD"
  paymentStatus: "pending" | "paid" | "failed"
  totalPrice: number
  createdAt?: string // Timestamps
  updatedAt: string
}

// Define the props type for Cart component
interface CartProps {
  clientId: string
}

export default function Cart({ clientId }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [allSelected, setAllSelected] = useState(false)
  const [number, setNumber] = useState("")
  const [total, setTotal] = useState(0)
  // const [pickupAddress, setPickupAddress] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [oderData, setOrderData] = useState<IOrder[]>([])
  const router = useRouter() // Initialize router
  const { setOrderCount } = useContext(OrderCountContext)!

  const handleOrderPlacement = async (e?: FormEvent) => {
    if (e) e.preventDefault()

    if (!number || !deliveryAddress) {
      toast.error("Please fill in required delivery information")
      return { success: false }
    }

    if (selectedItems.length === 0) {
      toast.error("Please select items to order")
      return { success: false }
    }

    setLoading(true)

    try {
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/add-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          // pickUpAddress: pickupAddress,
          deliveryAddress,
          promoCode,
          totalPrice: total,
          cartId: [...selectedItems],
          number: number,
        }),
      })

      const data = await orderResponse.json()
      console.log("Order API Response:", data)

      if (data.success) {
        setOrderData(data.data)
        // setPickupAddress("")
        setNumber("")
        setDeliveryAddress("")
        setSelectedItems([])
        setPromoCode("")
        setTotal(0)
        setLoading(false)
        toast.success("Order placed successfully")
        router.push(`/payment?orderId=${data.data._id}&total=${total}`)
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

  const fetchCartDetails = async () => {
    if (!clientId) {
      console.log("No client ID available")
      return
    }
  
    setLoading(true)
    try {
      console.log(`Fetching cart for client: ${clientId}`)
      const fetchData = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/get/${clientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${clientId}`,
        },
        credentials: "include",
      })
  
      // Graceful handling for 404 (empty cart)
      if (fetchData.status === 404) {
        console.log("No cart found — treating as empty cart")
        setItems([]) // Set empty cart
        return
      }
  
      if (!fetchData.ok) {
        throw new Error(`HTTP error! Status: ${fetchData.status}`)
      }
  
      const data = await fetchData.json()
      console.log("Cart data response:", data)
  
      if (data.success) {
        const itemsWithSelection = data.data.map((item: any) => ({
          ...item,
          selected: false,
        }))
        setItems(itemsWithSelection)
      } else {
        toast.error(data.message || "Failed to fetch cart details")
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      toast.error("Something went wrong while fetching your cart")
    } finally {
      setLoading(false)
    }
  }
  
  const fetchCartDetailsWithRetry = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await fetchCartDetails()
        return // Success, exit the function
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error)
        if (attempt === retries - 1) {
          toast.error("Failed to load cart after multiple attempts")
        } else {
          // Wait before retrying (exponential backoff)
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)))
        }
      }
    }
  }

  useEffect(() => {
    let isMounted = true

    if (clientId) {
      fetchCartDetailsWithRetry().then(() => {
        if (!isMounted) return
      })
    }

    return () => {
      isMounted = false
    }
  }, [clientId])

  const handleDeleteItem = async (itemId: string,productId:string) => {
    if (!clientId) {
      toast.error("Client ID not found!")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/delete-cart/${itemId}?productId=${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${clientId}`,
        },
        credentials: "include",
      })
      const data = await response.json()
      if (data.success) {
        // Update items state
        setItems((prevItems) => {
          const updatedItems = prevItems.filter((item) => item._id !== itemId)
          return updatedItems
        })
        // Update selected items
        setSelectedItems((prev) => prev.filter((id) => id !== itemId))
        toast.success("Item removed successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove item")
    }
  }
  // Handle selecting/deselecting individual item
  const toggleSelectItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === itemId ? { ...item, selected: !item.selected } : item)),
    )

    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId)
      } else {
        return [...prev, itemId]
      }
    })

    const updatedItems = items.map((item) => (item._id === itemId ? { ...item, selected: !item.selected } : item))
    const allItemsSelected = updatedItems.every((item) => item.selected)
    setAllSelected(allItemsSelected)
  }

  // Handle select all / deselect all
  const toggleSelectAll = () => {
    const newSelectAllState = !allSelected
    setAllSelected(newSelectAllState)

    const updatedItems = items.map((item) => ({
      ...item,
      selected: newSelectAllState,
    }))

    setItems(updatedItems)

    if (newSelectAllState) {
      setSelectedItems(items.map((item) => item._id))
    } else {
      setSelectedItems([])
    }
  }

  const getTotalPrice = () => {
    if (selectedItems.length === 0) {
      return 0
    }

    // Create a Set for faster lookups
    const selectedItemsSet = new Set(selectedItems)

    return items
      .filter((item) => selectedItemsSet.has(item._id))
      .reduce((total, item) => {
        const itemPrice = item.productId.productPrice * item.quantity
        return total + itemPrice
      }, 0)
  }

  const getSelectedItemsCount = () => {
    return selectedItems.length
  }

  useEffect(() => {
    setTotal(
      items
        .filter((item) => selectedItems.includes(item._id))
        .reduce((total, item) => total + item.productId.productPrice * item.quantity, 0),
    )
    setOrderCount(selectedItems.length)
  }, [items, selectedItems])

  return (
    <div className="min-h-screen bg-gray-50 py-5 mt-20">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="bg-white shadow-sm rounded-full px-6 py-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            {/* <BreadcrumbItem>
                    <BreadcrumbPage>{product.productName}</BreadcrumbPage>
                  </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="p-4 border-b flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600"
                checked={allSelected && items.length > 0}
                onChange={toggleSelectAll}
              />
              <span className="ml-3 text-sm font-medium">SELECT ALL ({items.length} ITEMS)</span>
            </div>
            {/* Cart Items */}
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading cart items...</div>
            ) : items.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-4 border-b">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-blue-600"
                        checked={item.selected || false}
                        onChange={() => toggleSelectItem(item._id)}
                      />
                      <Link href={`/products/${item.productId.productCategory}/${item.productId._id}`}>
                        <Image
                          width={60}
                          height={60}
                          src={item.productId.productImage || "/placeholder.svg"}
                          alt={item.productId.productName}
                          className="w-16 h-16 object-cover"
                        />
                      </Link>
                      <div>
                        <p className="font-medium">{item.productId.productName}</p>
                        <p className="text-sm text-gray-500">
                          {item.phoneModel} - {item.coverType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>
                        {item.quantity} x Rs. {item.productId.productPrice}
                      </span>
                      <button onClick={() => handleDeleteItem(item._id,item.productId._id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            {/* Customer Information */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h3>
              <form className="space-y-3">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    id="phoneNumber"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Pickup Address
                <div>
                  <label htmlFor="pickupAddress" className="block text-xs text-gray-500 mb-1">
                    Pickup Address
                  </label>
                  <textarea
                    id="pickupAddress"
                    value={pickupAddress}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter pickup address"
                    onChange={(e) => setPickupAddress(e.target.value)}
                    rows={2}
                  />
                </div> */}

                {/* Delivery Address */}
                <div>
                  <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    value={deliveryAddress}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter delivery address"
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </form>
            </div>

            {/* Summary Calculations */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal ({getSelectedItemsCount()} items)</span>
                <span>Rs. {getTotalPrice()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping Fee</span>
                <span>Rs. 0</span>
              </div>

              {/* Voucher Code */}
              {/* <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter Voucher Code"
                  className="border rounded-md px-3 py-2 text-sm flex-1"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                  APPLY
                </button>
              </div> */}

              {/* Total */}
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-medium text-orange-500">Rs. {getTotalPrice()}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="mt-4 w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={getSelectedItemsCount() === 0}
                onClick={handleOrderPlacement}
              >
                PROCEED TO CHECKOUT ({getSelectedItemsCount()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


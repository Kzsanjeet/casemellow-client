"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter} from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ExpandableSearch: React.FC<SearchModalProps> = ({ isOpen, onOpenChange }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    // Focus input when `isOpen` becomes true
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            onOpenChange(false);
            setSearchQuery("");
        }
    };

    const handleClose = () => {
        setSearchQuery("");
        onOpenChange(false);
    };

    return (
        <div
    className={`fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[500px] flex justify-center items-center z-[9998] transition-all duration-700 ease-in-out 
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
>
    <form
        onSubmit={handleSearch}
        className="w-full flex items-center justify-end px-4"
    >
        <div className="relative w-full">
            <Input
                ref={inputRef}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-md px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary"
            />
            <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
            >
                <Search size={24} className="text-primary" />
            </Button>
        </div>
        {isOpen && (
            <Button
                onClick={handleClose}
                className="ml-2 p-2 bg-primary text-white hover:text-white rounded-full transition-colors hover:bg-primary/80"
            >
                <X className="text-xl" />
            </Button>
        )}
    </form>
</div>

    );
};

export default ExpandableSearch;


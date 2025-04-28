import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f9f9ff] to-[#f3f4ff] py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
                
                <span className="px-6 py-2 rounded-full bg-[#fef2f2] text-[#ef4444] text-sm font-semibold tracking-wide shadow-md animate-bounce">
                    No. 1 Job Hunt Platform 🚀
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                    Search, Apply & <br />
                    Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </h1>

                <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
                    Unlock your potential with thousands of job opportunities. Your future starts here!
                </p>

                <div className="flex w-full max-w-2xl mt-6 rounded-full bg-white shadow-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#6A38C2]">
                    <input
                        type="text"
                        placeholder="Find your dream job..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow px-6 py-4 rounded-l-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5531a8] transition-all duration-300 ease-in-out px-8 py-4 flex items-center justify-center"
                    >
                        <Search className="h-6 w-6 text-white" />
                    </Button>
                </div>
            </div>

            {/* Optional decorative circles for fancy background */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#e0d7ff] rounded-full opacity-30 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#f7d6d6] rounded-full opacity-20 blur-3xl"></div>
        </section>
    );
}

export default HeroSection;

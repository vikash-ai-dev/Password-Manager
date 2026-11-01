
import React, { useState } from "react";
import { Lock, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 shadow-md flex items-center justify-around bg-slate-800 h-12 text-white ">


            <div className="logo font-bold text-xl px-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-green-700">&lt;</span>
                Pass
                <span className="text-green-700">OP/&gt;</span>
            </div>

            <div>
                <button className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                <ul className="hidden md:flex md:flex-row   gap-6 px-4 font-semibold text-sm">
                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">Home</a></li>
                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">About</a></li>
                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">Contact Us</a></li>
                </ul>

                <ul className={`absolute right-0 left-0 top-full bg-slate-800 flex-col md:hidden py-3 shadow-lg border-t border-slate-500 z-50 ${isOpen ? "flex" : "hidden"}`}>

                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">Home</a></li>
                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">About</a></li>
                    <li><a className="relative hover:text-green-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-green-400 after:transition-all hover:after:w-full" href="#">Contact Us</a>
                    </li>  

                </ul>

            </div>


        </nav>
    );
}

export default Navbar;
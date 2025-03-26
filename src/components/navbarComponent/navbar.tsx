"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CreateCategory } from "../panel/mangaeusers/createcategory/category";

const titles = [
    { path: "/status", w1: "Work", w2: "Status" },
    { path: "/viewuser", w1: "Team", w2: "Members" },
    { path: "/home", w1: "", w2: "" },
    { path: "/createuser", w1: "Create", w2: "Employee" },
    { path: "/history", w1: "Create", w2: "Manoj" }
];

export function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAddEmployeesOpen, setIsAddEmployeesOpen] = useState(false);
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Element && event.target.closest('[role="dialog"]')) return;
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
                setIsDropdownOpen(false);
                setIsAddEmployeesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavToggle = () => setIsNavOpen(!isNavOpen);
    const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
    const handleAddEmployeesToggle = () => setIsAddEmployeesOpen(!isAddEmployeesOpen);
    const handleNavItemClick = () => {
        setIsNavOpen(false);
        setIsDropdownOpen(false);
        setIsAddEmployeesOpen(false);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <nav ref={navRef} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 relative z-50">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {titles.map(({ path, w1, w2 }) => (
                    isActive(path) && (
                        <div key={path} className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {w1} <span className="text-primary">{w2}</span>
                        </div>
                    )
                ))}

                <button onClick={handleNavToggle} className="md:hidden p-2 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <div className={`w-full md:w-auto ${isNavOpen ? "block" : "hidden"} md:flex ml-auto`}>
                    <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 border rounded-lg md:border-0 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
                        <li>
                            <Link href="/home" onClick={handleNavItemClick} className={`block py-2 px-3 rounded-sm ${isActive('/home') ? 'text-primary' : 'text-gray-900 hover:text-primary dark:text-white'}`}>Home</Link>
                        </li>
                        <li className="relative">
                            <button onClick={handleDropdownToggle} className={`flex items-center py-2 px-3 rounded-sm ${isDropdownOpen ? 'text-primary' : 'text-gray-900 hover:text-primary dark:text-white'}`}>Manage Employees</button>
                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-44 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li><Link href="/status" onClick={handleNavItemClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Work Status</Link></li>
                                        <li className="relative">
                                            <button onClick={handleAddEmployeesToggle} className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Add Employees</button>
                                            {isAddEmployeesOpen && (
                                                <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                        <li><div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"><CreateCategory /></div></li>
                                                        <li><Link href="/createuser" onClick={handleNavItemClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Create Employees</Link></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <Link href="/viewuser" onClick={handleNavItemClick} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">View All Employees</Link>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link href="/message" onClick={handleNavItemClick} className={`block py-2 px-3 rounded-sm ${isActive('/message') ? 'text-primary' : 'text-gray-900 hover:text-primary dark:text-white'}`}>Message</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { CreateCategory } from "../panel/mangaeusers/createcategory/category"

const titles = [
    {
        path: "/status",
        w1: "Work",
        w2: "Status"
    },
    {
        path: "/viewuser",
        w1: "Team",
        w2: "Members"
    },
    {
        path: "/home",
        w1: "",
        w2: ""
    },
    {
        path: "/createuser",
        w1: "Create",
        w2: "Employee"
    },
  
]

export function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isWorkHistoryOpen, setIsWorkHistoryOpen] = useState(false)
    const [isAddEmployeesOpen, setIsAddEmployeesOpen] = useState(false)
    const pathname = usePathname()
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Don't close if clicking inside a dialog
            if (event.target instanceof Element && event.target.closest('[role="dialog"]')) {
                return
            }
            
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false)
                setIsDropdownOpen(false)
                setIsWorkHistoryOpen(false)
                setIsAddEmployeesOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleNavItemClick = () => {
        setIsNavOpen(false)
        setIsDropdownOpen(false)
        setIsWorkHistoryOpen(false)
        setIsAddEmployeesOpen(false)
    }

    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDropdownOpen(!isDropdownOpen)
        if (!isDropdownOpen) {
            setIsWorkHistoryOpen(false)
            setIsAddEmployeesOpen(false)
        }
    }

    const handleWorkHistoryClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsWorkHistoryOpen(!isWorkHistoryOpen)
        setIsAddEmployeesOpen(false)
    }

    const handleAddEmployeesClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsAddEmployeesOpen(!isAddEmployeesOpen)
        setIsWorkHistoryOpen(false)
    }

    const handleSubItemClick = () => {
        setIsNavOpen(false)
        setIsDropdownOpen(false)
        setIsWorkHistoryOpen(false)
        setIsAddEmployeesOpen(false)
    }

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const isActive = (path: string) => pathname === path
    {/* <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        type="button" 
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}

    return (
        <nav ref={navRef} className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {titles.map(({ path, w1, w2 }) => (
      pathname === path && (
        <div key={path} className="text-2xl font-semibold text-gray-900 dark:text-white">
          {w1} <span className="text-primary">{w2}</span>
        </div>
      )
    ))}

    <div className={`w-full md:block md:w-auto ml-auto ${isNavOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link 
                                href="/home" 
                                onClick={handleNavItemClick}
                                className={`block py-2 px-3 rounded-sm md:p-0 ${
                                    isActive('/home') 
                                    ? 'text-primary md:text-primary' 
                                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white md:dark:hover:text-primary'
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="relative">
                            <button 
                                onClick={handleDropdownClick}
                                className={`flex items-center justify-between w-full py-2 px-3 rounded-sm md:p-0 ${
                                    isDropdownOpen || ['/status', '/history', '/viewuser'].some(path => isActive(path))
                                    ? 'text-primary md:text-primary' 
                                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white md:dark:hover:text-primary'
                                }`}
                            >
                                Manage Employees
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <Link 
                                                href="/status" 
                                                onClick={handleSubItemClick}
                                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                                    isActive('/status') ? 'text-primary' : ''
                                                }`}
                                            >
                                                Work Status
                                            </Link>
                                        </li>
                                        {/* <li className="relative">
                                            <button 
                                                onClick={handleWorkHistoryClick}
                                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Work History 
                                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                </svg>
                                            </button>

                                            {isWorkHistoryOpen && (
                                                <div className="absolute left-full top-0 ml-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 z-50">
                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                        <li>
                                                            <Link 
                                                                href="/history/daily" 
                                                                onClick={handleSubItemClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Daily
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link 
                                                                href="/history/weekly" 
                                                                onClick={handleSubItemClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Weekly
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link 
                                                                href="/history/monthly" 
                                                                onClick={handleSubItemClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Monthly
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link 
                                                                href="/history/login-activity" 
                                                                onClick={handleSubItemClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Review Login Activity
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
 */}
                                        <li className="relative">
                                            <button 
                                                onClick={handleAddEmployeesClick}
                                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Add Employees
                                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                </svg>
                                            </button>

                                            {isAddEmployeesOpen && (
                                                <div className="absolute left-full top-0 ml-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 z-50">
                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                        <li>
                                                            <div 
                                                                onClick={handleCategoryClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                onMouseDown={(e) => e.stopPropagation()}
                                                            >
                                                                <CreateCategory />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <Link 
                                                                href="/createuser" 
                                                                onClick={handleSubItemClick}
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                            >
                                                                Create Employees
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <Link 
                                            href="/viewuser" 
                                            onClick={handleSubItemClick}
                                            className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                                isActive('/viewuser') ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
                                            }`}
                                        >
                                            View All Employees
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link 
                                href="/message"
                                onClick={handleNavItemClick}
                                className={`block py-2 px-3 rounded-sm md:p-0 ${
                                    isActive('/message') 
                                    ? 'text-primary md:text-primary' 
                                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary dark:text-white md:dark:hover:text-primary'
                                }`}
                            >
                                Message
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
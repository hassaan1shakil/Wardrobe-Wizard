'use client'

import Image from "next/image"
import { useState, useEffect, useRef } from 'react';
import ProfileModal from "./profile-modal";

export default function ProfileIcon() {

    const [IsDropDownOpen, setDropDown] = useState(false);
    const DropDownRef = useRef(null);

    const showDropDown = () => {
        setDropDown(true);
    }

    const closeDropDown = () => {
        setDropDown(false);
    }

    const handleClickOutside = (event) => {
        if (DropDownRef.current && !DropDownRef.current.contains(event.target)) {
            closeDropDown();
        }
    };

    // Add event listener to detect outside clicks when modal is open
    useEffect(() => {
        if (IsDropDownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } 
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [IsDropDownOpen]);

    return (

        <div className="flex ml-40">
            <div class="w-14 h-14 p-1 bg-darkOrange rounded-full cursor-pointer" ref={DropDownRef}>

                <Image
                    src="/images/wizard6.png"
                    alt="Profile Photo"
                    width={100}
                    height={100}
                    priority
                    className="rounded-full"
                    onClick={showDropDown}
                />

                {IsDropDownOpen && <ProfileModal />}
            </div>
        </div>
    )
}
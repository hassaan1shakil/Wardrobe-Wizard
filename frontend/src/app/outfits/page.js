'use client'

import Header from '@/components/header';
import OutfitsForm from '@/components/outfits-form';
// import OutfitsGallery from '@/components/outfits-gallery';

export default function OutfitsPage() {

    return (
        <div className='flex flex-col bg-darkPurple min-h-screen overflow-hidden'>

            <Header />

            <div className='flex flex-col p-12 gap-16'>

                {/* <OutfitsGallery/> */}

                <OutfitsForm/>

            </div>

        </div>
    );
}

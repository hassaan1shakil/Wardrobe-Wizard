'use client'

import Image from "next/image";

export default function OutfitPreview({ previewImages }) {

    function renderOutfitImage(imgAddress, position) {

        if (imgAddress != '') {
            return (
                <Image
                    src={imgAddress}
                    alt={position}
                    width={160}
                    height={160}
                    priority
                    className="rounded-2xl"
                />
            )
        }

        else {
            return null
        }
    }

    return (

        <>
            <div className="fixed bottom-[16rem] left-[11rem]">

                {renderOutfitImage(previewImages.img_top.articleImage, "Image-Top")}

            </div>

            <div className="fixed bottom-[9rem] left-[26rem]">

                {renderOutfitImage(previewImages.img_bottom.articleImage, "Image-Bottom")}

            </div>

            <div className="fixed bottom-[9rem] right-[26rem]">

                {renderOutfitImage(previewImages.img_footwear.articleImage, "Image-Footwear")}

            </div>
        </>
    );
}
'use client'

// components/Modal.js
export default function OutfitsModal({ selectedOutfit, currentImageIndex, closeModal, prevImage, nextImage }) {
    if (!selectedOutfit) return null; // Return null if no outfit is selected

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative px-4 py-8 bg-PurpleBG rounded-lg max-w-lg">
                <button
                    className="absolute top-2 right-5 text-blue-100 text-3xl"
                    onClick={closeModal}
                >
                    &times;
                </button>
                <div className="flex items-center">
                    <button
                        onClick={prevImage}
                        className="pl-2 pr-3 pb-2 pt-1 text-black text-xl bg-lightOrange rounded-full"
                    >
                        &#9664;
                    </button>
                    <img
                        src={selectedOutfit.images[currentImageIndex]}
                        alt="Enlarged outfit"
                        className="w-96 h-96 object-cover mx-4"
                    />
                    <button
                        onClick={nextImage}
                        className="pl-3 pr-2 pb-2 pt-1 text-black text-xl bg-lightOrange rounded-full"
                    >
                        &#9654;
                    </button>
                </div>
            </div>
        </div>
    );
}

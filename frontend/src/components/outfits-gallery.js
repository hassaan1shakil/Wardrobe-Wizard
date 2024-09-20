'use client'

// components/SavedOutfits.js
export default function OutfitsGallery({ savedObjects, openModal , text}) {
    return (
        <section className="saved-outfits">
            <h2 className="text-white text-3xl mb-4"> {text} </h2>
            <div className="flex space-x-12 overflow-x-scroll bg-PurpleBG p-6 rounded-lg shadow-lg">
                {savedObjects.map((outfit) => (
                    <div
                        key={outfit.id}
                        className="cursor-pointer"
                        onClick={() => openModal(outfit)}
                    >
                        <img
                            src={outfit.images[0]}
                            alt={`Outfit ${outfit.id} Thumbnail`}
                            className="w-32 h-32 object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

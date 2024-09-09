'use client'

// components/FormComponent.js
export default function OutfitsForm({ formData, handleChange, handleSubmit }) {
    return (
        <div className="flex flex-col items-center">

            <h2 className="text-white text-3xl mb-5">Outfit Wizard</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto bg-PurpleBG p-6 rounded-lg shadow-lg font-bold">
                <div className="mb-4">
                    <label htmlFor="type" className="block text-white mb-2">
                        Type:
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Type</option>
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                        <option value="Business Casual">Business Casual</option>
                        <option value="Party">Party</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="theme" className="block text-white mb-2">
                        Theme:
                    </label>
                    <select
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Theme</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="season" className="block text-white mb-2">
                        Season:
                    </label>
                    <select
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-black"
                    >
                        <option value="">Select Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>

                <button type="submit" className="bg-darkOrange hover:bg-lightOrange text-white px-4 py-2 rounded-md text-xl font-bold">
                    Generate Outfit
                </button>
            </form>
        </div>
    );
}


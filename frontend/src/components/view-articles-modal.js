'use client'

export default function ArticlesModal({ selectedArticle, closeArticleModal }) {

    if (!selectedArticle) return null; // Return null if no article is selected

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative px-4 py-8 bg-PurpleBG rounded-lg max-w-lg">
                <button
                    className="absolute top-1 right-3 text-blue-100 text-3xl"
                    onClick={closeArticleModal}
                >
                    &times;
                </button>

                <div className="flex items-center">
                    <img
                        src={selectedArticle.articleImage}
                        alt="Enlarged Article"
                        className="w-96 h-96 object-cover mx-4"
                    />
                </div>
            </div>
        </div>
    );
}

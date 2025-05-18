export default function Home() {
    return (
        <>
            <section className="bg-[#121212]">
                <div className="max-w-6xl mx-auto flex justify-between">
                    <div className="w-1/2 flex flex-col items-center justify-center">
                        <h2 className="text-left text-white">Welcome to Pulse Fit</h2>
                        <h1 className="text-6xl text-center font-bold uppercase text-white">Online Workout Planner</h1>
                        <div className="flex gap-x-4 mt-6">
                            <div className="flex items-center">
                                <img src="fiticon.webp" alt="fiticon" />
                                <p className="mx-2 text-white upper uppercase">Blog</p>
                            </div>
                            <div className="flex items-center">
                                <img src="healicon.webp" alt="healicon" />
                                <p className="mx-2 text-white upper uppercase">Weight Loss</p>
                            </div>
                            <div className="flex items-center">
                                <img src="nutritionicon.webp" alt="nutritionicon" />
                                <p className="mx-2 text-white upper uppercase">Nutrition</p>
                            </div>
                        </div>
                        <p className="text-white my-2">To use Fitness planner for free</p>
                        <a className="bg-green-600 hover:bg-green-400 px-3 py-1 rounded font-semibold text-white text-sm" href="/register">Sign Up Now</a>
                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                        <img src="burn-man.webp" alt="" />
                    </div>
                </div>
            </section>
            <section className="max-w-6xl mx-auto mt-10 text-gray-800">
                <h1 className="text-4xl tect-primary font-bold ">What is Workout Planner?</h1>
                <p className="mt-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam pariatur excepturi illo debitis corrupti deserunt eos, assumenda numquam ipsum animi cumque, dolor quod adipisci soluta a facere eius itaque, facilis tenetur sunt nulla suscipit! Quasi, nulla. Velit aperiam quos optio, dolore obcaecati ipsa nisi? Optio officia nobis accusantium nihil?</p>
            </section>
        </>
    )
}
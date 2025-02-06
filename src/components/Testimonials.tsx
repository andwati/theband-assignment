import { FaStar } from "react-icons/fa";

const Testimonials = () => {
    return (
        <div className="bg-gray-200 p-6 mt-6">
            <h2 className="text-center text-xl font-bold mb-4">What Our Customers Say</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <p className="italic">"Amazing quality and fast delivery!"</p>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                        ))}
                    </div>
                    <p className="text-right">- Jane Doe</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

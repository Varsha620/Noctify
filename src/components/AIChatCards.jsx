function AIChatCard({ message }) {
    return (
        <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex flex-col items-start gap-3 p-3 rounded-lg hover:bg-[#4a4a9a] transition-colors duration-200">
                <div>
                    <h2 className="text-lg text-[#f8edede5] font-medium ml-3 cursor-pointer hover:text-white transition-colors duration-200">{message}</h2>
                </div>
            </div>
        </div>
    );
}
export default AIChatCard;
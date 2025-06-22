function AIChatCard({ message}) {
    return (
    <div>
      <div className="flex flex-col items-start gap-3">
\        <div>
          <h2 className="text-lg text-[#f8edede5] font-500 ml-3">{message}</h2>
        </div>
      </div>
    </div>
    );
}
export default AIChatCard;
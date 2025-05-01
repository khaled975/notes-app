function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <img src={imgSrc} alt="No notes" className="w-75" />
      <p className="w-[80%] md:w-1/2 text-slate-700 font-medium text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
}

export default EmptyCard;

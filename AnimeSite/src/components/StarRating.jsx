export default function StarRating({ rating, size, includeText = true }) {
  const renderStar = (index) => {
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;

    let partialFill = null;
    let remainingFill = null;

    if (index <= integerPart) {
      partialFill = 100;
    } else if (index === integerPart + 1 && fractionalPart > 0) {
      partialFill = 100 * fractionalPart;
      remainingFill = 100 - partialFill;
    }

    return (
      <div key={index} className="flex items-center">
        <svg
          className={`2xs:h-[${size}px] md:h-5 fill-current ${
            partialFill === null ? "text-gray-400" : "text-yellow-400"
          }`}
          viewBox={`0 0 ${
            partialFill !== null ? (partialFill / 100) * 24 : 24
          } 24`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {remainingFill !== null && (
          <svg
            className={`2xs:h-[${size}px] md:h-5 fill-current text-gray-400 scale-x-[-1]`}
            viewBox={`0 0 ${(remainingFill / 100) * 24} 24`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="flex md:justify-start 2xs:justify-center mt-1">
      <div className="flex items-center">
        {[...Array(5).keys()].map((index) => renderStar(index + 1))}
      </div>
      {includeText ? (
        <p
          className={`font-poppins md:text-[14px] 2xs:text-[${
            size - size / 2
          }px] ml-2 text-dimWhite`}
        >
          {rating}
        </p>
      ) : null}
    </div>
  );
}

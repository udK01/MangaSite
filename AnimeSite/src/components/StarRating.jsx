export default function StarRating({ rating }) {
  const renderStar = (index) => {
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;
    let fillPercentage;
    let partialFill = null;

    if (index <= integerPart) {
      fillPercentage = 100;
    } else if (index === integerPart + 1 && fractionalPart > 0) {
      fillPercentage = Math.round(fractionalPart * 100);
      partialFill = 100 * fractionalPart;
    } else {
      fillPercentage = 0;
    }

    const starClass = "text-yellow-400";

    console.log(partialFill);

    return (
      <svg
        key={index}
        className={`h-5 fill-current ${starClass}`}
        viewBox={`0 0 ${
          partialFill !== null ? (partialFill / 100) * 24 : 24
        } 24`}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  };

  return (
    <div className="flex mt-1">
      <div className="flex items-center">
        {[...Array(5).keys()].map((index) => renderStar(index + 1))}
      </div>
      <p className="font-poppins text-[14px] ml-2 text-dimWhite">{rating}</p>
    </div>
  );
}

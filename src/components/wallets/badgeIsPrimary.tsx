import { JSX } from "react";

const BadgeIsPrimary = (): JSX.Element => {
  return (
    <span className="text-sm font-bold text-orange-500 bg-yellow-100 px-2 py-1 rounded">
      Principal
    </span>
  );
};

export default BadgeIsPrimary;

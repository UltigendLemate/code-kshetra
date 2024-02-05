import React from "react";

interface SmallHeadingProps {
  text: string;
}

const SmallHeading: React.FC<SmallHeadingProps> = ({
  text,
}: SmallHeadingProps) => {
  return (
    <h5 className="pb-2 text-center text-base font-semibold capitalize text-primary">
      {text}
    </h5>
  );
};

export default SmallHeading;

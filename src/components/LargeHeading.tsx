import React from "react";

interface LargeHeadingProps {
  text: string;
}

const LargeHeading: React.FC<LargeHeadingProps> = ({
  text,
}: LargeHeadingProps) => {
  return (
    <h5 className="pb-2 text-center text-4xl font-bold capitalize text-secondary-foreground">
      {text}
    </h5>
  );
};

export default LargeHeading;

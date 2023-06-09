import React from "react";
import Marquee from "react-fast-marquee";

const TitleMarquee = ({ title }) => {
  return (
    <div className="max-w-full mx-auto px-2">
      <div className="">
        <Marquee
          className="rounded-md  text-[#121312] text-[15px] font-bold"
          gradientWidth={24}
          gradientColor={[40, 53, 83, 0.05]}
          speed={30}
          gradient={false}
        >
          <h1 className="py-1"> {title} </h1>
        </Marquee>
      </div>
    </div>
  );
};

export default TitleMarquee;

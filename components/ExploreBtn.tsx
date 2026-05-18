"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <button
      type="button"
      id="explore-btn"
      className="hover:cursor-pointer mt-7 mx-auto"
      onClick={() => {
        console.log("you just clicked the button");
        posthog.capture("explore_clicked");
      }}
    >
      <a href="#events">
        Explore
        <Image
          src="/icons/arrow-down.svg"
          alt="Arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;

import React, { useRef, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalLister = ({ list }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollLeft = el.scrollLeft > 0;
    const hasScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    setCanScrollLeft(hasScrollLeft);
    setCanScrollRight(hasScrollRight);
  };

  const scrollByAmount = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleResizeOrScroll = () => requestAnimationFrame(updateScrollButtons);
    requestAnimationFrame(updateScrollButtons);

    el.addEventListener("scroll", handleResizeOrScroll);
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      el.removeEventListener("scroll", handleResizeOrScroll);
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, []);

  return (
    <div className="relative w-full bg-neutral-900 text-white rounded-xl shadow-inner border border-neutral-800">
      {/* Scroll Buttons */}

      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount("left")}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 
      bg-gradient-to-r from-black via-neutral-800 to-transparent 
      text-gold border border-gold px-3 py-2 rounded-full 
      hover:bg-gold hover:text-black transition"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount("right")}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 
      bg-gradient-to-l from-black via-neutral-800 to-transparent 
      text-gold border border-gold px-3 py-2 rounded-full 
      hover:bg-gold hover:text-black transition"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 p-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {list.map((item, index) => (
          <ListItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalLister;

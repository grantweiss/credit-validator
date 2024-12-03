import { useEffect } from "react";

type UseCollapseOnResizeParams = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  breakpoint?: number;
};

const useCollapseOnResize = ({
  isOpen,
  setIsOpen,
  breakpoint = 768,
}: UseCollapseOnResizeParams): void => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen, breakpoint]);
};

export default useCollapseOnResize;

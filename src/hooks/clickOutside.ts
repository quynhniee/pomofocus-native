import { useEffect, useRef } from "react";

const useOnClickOutside = (handler) => {
  const ref = useRef<HTMLElement>();
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);
  return ref;
};

export default useOnClickOutside;
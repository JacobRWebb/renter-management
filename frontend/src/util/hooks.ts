import { RefObject, useEffect } from "react";
import { useAppSelector } from "../store";

// Create a hook that fires when clicked outside of the element
export const useClickOutside = (
  ref: RefObject<any>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
};

export const useUserState = () => {
  const state = useAppSelector((state) => state.userState);
  return state;
};

export const useUser = () => {
  const user = useAppSelector((state) => state.userState.user);
  return user;
};

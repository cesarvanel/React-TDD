import { useEffect, type RefObject } from "react";

type EventType =
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "focusin"
  | "focusout";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown"
) => {
  useEffect(() => {
    const handleClickOutSide = (
      event: MouseEvent | TouchEvent | FocusEvent
    ) => {
      const target = event.target as Node;
      if (!target) return;

      const isOutSide = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => !!r.current && !r.current.contains(target))
        : !!ref.current && !ref.current.contains(target);

      if (isOutSide) {
        handler(event);
      }
    };

    document.addEventListener(eventType, handleClickOutSide);

    return () => document.removeEventListener(eventType, handleClickOutSide);
  }, [ref, handler]);
};

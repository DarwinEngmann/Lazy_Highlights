import { useState, useEffect, useRef } from 'react';

interface DropdownPosition {
  top: number;
  right: number;
}

interface UseDropdownReturn {
  isOpen: boolean;
  position: DropdownPosition;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

export const useDropdown = (): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return {
    isOpen,
    position,
    buttonRef,
    toggleDropdown,
    closeDropdown
  };
};
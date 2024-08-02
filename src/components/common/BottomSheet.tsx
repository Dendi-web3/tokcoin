'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface BottomSheetProps {
  onClose?: () => void;
  zIndex?: number;
  children: React.ReactNode;
}
export interface BottomSheetRefs {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetRefs, BottomSheetProps>(
  ({ children, zIndex = 999, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle: () => {
        setIsOpen(!isOpen);
      },
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    return (
      <div>
        <div
          className={`flex overflow-hidden flex-col fixed text-[#4F4F4F] inset-x-0 bottom-0 transform h-[calc(100vh-142px)] bg-[#F5F3F3] ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } rounded-[32px] transition-transform duration-300 ease-in-out`}
          style={{ zIndex: zIndex + 1 }}
        >
          {children}
        </div>
        {isOpen && (
          <div
            className="fixed inset-0"
            onClick={() => {
              onClose?.();
              setIsOpen(false);
            }}
            style={{ zIndex }}
          />
        )}
      </div>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

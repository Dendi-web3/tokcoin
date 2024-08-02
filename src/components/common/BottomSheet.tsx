'use client';

import React, { useState, forwardRef, useImperativeHandle, PropsWithChildren } from 'react';

interface BottomSheetProps {
  onClose?: () => void;
  zIndex?: number;
  header?: React.ReactNode;
  className?: string
}
export interface BottomSheetRefs {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetRefs, PropsWithChildren<BottomSheetProps>>(
  ({ children, header, zIndex = 999, className, onClose }, ref) => {
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
          className={`fixed text-[#4F4F4F] inset-x-0 bottom-0 transform ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 ease-in-out`}
          style={{ zIndex: zIndex + 1 }}
        >
          {header}
          <div className={`flex flex-col rounded-[32px] bg-[#F5F3F3] h-[calc(100vh-142px)] overflow-hidden ${className}`}>
            {children}
          </div>
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

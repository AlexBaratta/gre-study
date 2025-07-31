"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
export default function ConfirmModal({
  visible,
  message,
  title,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={visible} onClose={onCancel} className="relative z=50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/30 backdrop-blur-xs" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative justify-center text-center">
          <DialogPanel className="overflow-hidden max-w-lg bg-white rounded-lg">
            <div className="flex items-start p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-red-100 shrink-0">
                <ExclamationTriangleIcon className="size-6 text-red-600" />
              </div>
              <div className="ml-4 text-left">
                <DialogTitle as="h3" className="text-lg font-semibold">
                  {title}
                </DialogTitle>
                <div className="mt-2 text-sm text-gray-500">
                  <p>{message}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end bg-gray-50 px-4 py-3 gap-2">
              <button
                className="bg-white border border-gray-300 rounded px-3 py-2 hover:bg-gray-100"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 rounded px-3 py-2 text-white font-semibold hover:bg-red-500"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

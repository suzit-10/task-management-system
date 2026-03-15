import React from "react";
import Modal from "./Modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  itemType?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  itemName,
  itemType = "item",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <div className="p-4 text-center">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 mb-4">
          <i className="material-icons text-red-600">warning</i>
        </div>
        <p className="text-gray-700 font-medium mb-6">
          Are you sure you want to delete the {itemType}
          {itemName && (
            <>
              <br />
              <span className="font-bold text-gray-900 mt-1 block">
                "{itemName}"
              </span>
            </>
          )}
          ?
        </p>
        <div className="flex gap-3 justify-center border-t border-gray-100 pt-5">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
          >
            Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm }) => {    
    return (
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 ${
          isOpen ? "" : "hidden"
        }`}>
        <div className="bg-white p-4 rounded-lg w-[300px]">
          <h2 className="text-xl font-bold mb-4">Radera recept</h2>
          <p>Är du säker på att du vill radera detta recept?</p>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={onCancel}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-recipevaultred shadow-sm hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred border-solid border-2 border-recipevaultred">
                <XMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Avbryt
            </button>
            <button
              onClick={onConfirm}
              className="inline-flex items-center rounded-md bg-recipevaultred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred">
                <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Radera
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default ConfirmDeleteModal;
  
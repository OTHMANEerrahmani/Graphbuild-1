
function PopUpConfirme({ action, setShowConfirmation, isAbsolute }) {
  return (
    <>
      <div
        className={`${
          isAbsolute ? "absolute left-1/2 -translate-x-1/2" : "sticky"
        }  top-1/2  transform -translate-y-1/2 flex items-center justify-center z-50 dark:text-white text-black`}
      >
        <div className="bg-white dark:bg-darkSecondary p-4 rounded-lg text-center shadow-lg">
          <p className="text-lg font-bold mb-4">Confirm Deletion</p>
          <p className="mb-4">Are you sure you want to delete this image?</p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                action();
                setShowConfirmation(false);
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUpConfirme;

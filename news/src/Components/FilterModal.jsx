import { useState } from "react";

const FilterModal = ({ setFilters, filters }) => {
  const resetForm = () => ({
    date: "",
    source: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState(resetForm());

  const toggle = () => setModal((prev) => !prev);

  const close = () => {
    setFormData(resetForm());
    setFilters({});
    setModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveFilter = () => {
    setFilters((prev) => ({ ...prev, ...formData }));
    setModal(false);
  };

  const clearFilters = () => {
    setFilters({});
    setFormData(resetForm());
  };

  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative pt-1">
      <button
        className="px-3.5 py-1.5 rounded-md bg-sky-500 text-white font-medium capitalize"
        onClick={toggle}
      >
        Filter
      </button>

      {hasFilters && !modal && (
        <div
          className="absolute top-0 left-16 bg-slate-300 rounded-full p-0.5 cursor-pointer"
          onClick={clearFilters}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      )}

      {modal && (
        <div className="absolute z-50 px-10 py-5 bg-slate-200 md:right-0 rounded-lg shadow-inner mt-1 space-y-4">
          <div>
            <label className="block pb-2 text-sm font-medium" htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="p-2 rounded-lg disabled:cursor-not-allowed"
              value={formData.date}
              max={todayDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block pb-2 text-sm font-medium" htmlFor="source">
              Source:
            </label>
            <select
              name="source"
              id="source"
              value={formData.source}
              onChange={handleChange}
              className="p-2 border rounded-lg outline-none"
            >
              <option hidden>Select a source</option>
              <option value="newsapi.org">News Api</option>
              <option value="guardianapis">Guardian</option>
              <option value="nytimes">NYT</option>
            </select>
          </div>

          <div className="flex justify-between pt-5">
            <button
              className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm font-medium"
              onClick={close}
            >
              Clear
            </button>

            <button
              onClick={saveFilter}
              disabled={!formData.date && !formData.source}
              className="px-3 py-1 bg-sky-500 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;

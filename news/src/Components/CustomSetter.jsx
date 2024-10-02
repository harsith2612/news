import { useState, useMemo } from "react";

const CustomSetter = ({ setQuery }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ keyword: [], source: [] });

  const categories = useMemo(() => ["Entertainment", "Food", "Sports", "Travel"], []);
  const sources = useMemo(() => [
    { key: 1, value: "NewsAPI" },
    { key: 2, value: "The Guardian" },
    { key: 3, value: "NY Times" },
  ], []);

  const close = () => {
    setForm({ keyword: [], source: [] });
    setModal(false);
  };

  const handleCheckboxChange = (type, value) => {
    setForm(prevState => ({
      ...prevState,
      [type]: prevState[type].includes(value)
        ? prevState[type].filter(item => item !== value)
        : [...prevState[type], value],
    }));
  };

  const isChecked = (type, value) => form[type].includes(value);

  const save = () => {
    setQuery({ ...form });
    setModal(false);
  };

  return (
    <div className="relative">
      <button
        className="capitalize px-3 py-1.5 bg-sky-500 text-white rounded-md"
        onClick={() => setModal(!modal)}
      >
        customise
      </button>

      {modal && (
        <div className="absolute bg-slate-300 px-10 py-4 w-46 z-50 rounded-md">
          <div className="mb-4">
            <p>Select Categories:</p>
            {categories.map(category => (
              <div key={category}>
                <label>
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={isChecked("keyword", category)}
                    onChange={() => handleCheckboxChange("keyword", category)}
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p>Select Sources:</p>
            {sources.map(source => (
              <div key={source.key}>
                <label>
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={isChecked("source", source.key)}
                    onChange={() => handleCheckboxChange("source", source.key)}
                  />
                  {source.value}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              className="capitalize px-3 py-0.5 bg-sky-500 text-white rounded-md"
              onClick={close}
            >
              close
            </button>
            <button
              className="capitalize px-3 py-0.5 bg-green-500 text-white rounded-md disabled:opacity-50"
              onClick={save}
              disabled={!form.source.length}
            >
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSetter;

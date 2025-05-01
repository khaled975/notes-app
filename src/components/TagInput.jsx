import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags((tags) => [...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleAddTagByEnter = (e) => {
    if (e.key === "Enter") handleAddTag();
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="flex gap-2 items-start">
        {tags.map((tag, index) => (
          <div className="flex gap-1 items-baseline text-xs font-semibold bg-slate-100 rounded p-1 text-slate-500">
            <span key={index} className="capitalize">
              #{tag}
            </span>
            <button onClick={() => handleRemoveTag(tag)}>
              <MdClose />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 w-2/3 mt-2">
        <input
          type="text"
          className="input py-1 text-slate-950"
          placeholder="Tags"
          id="tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleAddTagByEnter(e)}
        />
        <div className="border border-blue-700 hover:bg-blue-700 rounded flex items-center justify-center">
          <button
            onClick={handleAddTag}
            className="text-2xl cursor-pointer text-blue-700 hover:text-white p-1"
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </>
  );
}

export default TagInput;

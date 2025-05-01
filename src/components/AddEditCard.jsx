import { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import { customAxios } from "../utils/customAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddEditCard({ onClose, getAllNotes, noteData, type }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //   TODO: ADD NOTE
  const handleAddNote = async (e) => {
    e.preventDefault();

    // TODO: HANDLING FORM ERRORS
    if (!title || !title.trim()) return setError("Title is required!");
    if (!content || !content.trim()) return setError("Content is required!");

    // NO ERROR HAPPENED
    setError("");

    try {
      const data = { title, content, tags };

      const response = await customAxios.post("/add-note", data);

      console.log(response);

      // NOTE ADDED SUCCESSFULLY
      if (response?.status == 201) {
        onClose();
        await getAllNotes();
        toast.success("Note Added Successfully 🥰");
      }

      // USER IS NOT AUTHORIZED
      if (response?.data?.data?.statusCode == 401) {
        setError(response.data.data.message);
        toast.error("Please Login Again 😑");
        navigate("/login");
      }
    } catch (error) {
      // GET ERROR FROM BACKEND
      if (error?.response?.data?.message) {
        return setError(error?.response?.data?.message);
      } else {
        return setError("Unexpected Error Has Occurred, Please Try Again!");
      }
    }
  };

  //   TODO: EDIT NOTE
  const handleEditNote = async (e) => {
    e.preventDefault();

    // TODO: HANDLING FORM ERRORS
    if (!title || !title.trim()) return setError("Title is required!");
    if (!content || !content.trim()) return setError("Content is required!");

    // NO ERROR HAPPENED
    setError("");

    try {
      const data = { title, content, tags };
      const noteId = noteData?._id;
      const response = await customAxios.put(`/edit-note/${noteId}`, data);
      console.log(response);

      // NOTE ADDED SUCCESSFULLY
      if (response?.status == 200) {
        onClose();
        await getAllNotes();
        toast.success("Note Edited Successfully 🥰");
      }

      // USER IS NOT AUTHORIZED
      if (response?.data?.data?.statusCode == 401) {
        setError(response.data.data.message);
        toast.error("Please Login Again 😑");
        navigate("/login");
      }
    } catch (error) {
      // GET ERROR FROM BACKEND
      if (error?.response?.data?.message) {
        return setError(error?.response?.data?.message);
      } else {
        return setError("Unexpected Error Has Occurred, Please Try Again!");
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 hover:bg-slate-100 text-slate-500 w-8 h-8 rounded-full flex items-center justify-center ">
        <button className="cursor-pointer" onClick={onClose}>
          <MdClose />
        </button>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            placeholder="Go To Gym At 5!"
            id="title"
            name="title"
            className="input border-none text-slate-950 text-2xl "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={type === "show"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="input-label">
            content
          </label>
          <textarea
            type="text"
            placeholder="Content..."
            id="content"
            name="content"
            className="input border-none text-slate-950 text-2xl bg-slate-100"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={type === "show"}
          />
        </div>
        <div>
          <label htmlFor="tags" className="input-label">
            tags
          </label>
          <TagInput tags={tags} setTags={setTags} type={type} />
        </div>
        {type !== "show" && (
          <button
            className="btn"
            onClick={type === "edit" ? handleEditNote : handleAddNote}
          >
            {type === "edit" ? "UPDATE" : "ADD"}
          </button>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default AddEditCard;

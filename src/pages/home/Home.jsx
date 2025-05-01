import { MdAdd } from "react-icons/md";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import AddEditCard from "../../components/AddEditCard";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customAxios } from "../../utils/customAxios";
import { redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyCard from "../../components/EmptyCard";

import addNoteImg from "../../assets/note-taking.svg";
import noNoteImg from "../../assets/no-access.svg";

function Home() {
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    data: null,
    type: "add",
  });

  const navigate = useNavigate();

  const [userName, setUserName] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // GET CURRENT USER FROM BACKEND
  async function getCurrentUser() {
    try {
      const { data } = await customAxios.get("/get-current-user");
      if (data?.data && data?.data?.user) {
        setUserName(data.data.user.fullName);
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // GET ALL NOTES
  async function getAllNotes() {
    try {
      const { data } = await customAxios.get("/all-notes");
      if (data?.data && data?.data?.notes) {
        setNotes(data.data.notes);
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // GET MATCHED NOTES WITH SEARCH

  async function handleSearchNotes(query) {
    if (!query) {
      await getAllNotes();
    }
    try {
      const { data } = await customAxios.get("/search-notes", {
        params: { query },
      });
      if (data?.data && data?.data?.notes) {
        console.log(data.data.notes);
        setIsSearch(true);
        setNotes(data.data.notes);
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // HANDLE CLEAR SEARCH BAR
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getCurrentUser();
    getAllNotes();

    return () => {};
  }, []);

  // OPEN MODAL
  const onOpenModal = () => {
    setModalOptions((options) => ({ ...options, isOpen: true, type: "add" }));
  };
  // CLOSE MODAL
  const onCloseModal = () => {
    setModalOptions((options) => ({ ...options, isOpen: false, data: null }));
  };
  // HANDLE LOGOUT & CLEAR LOCALSTORAGE
  const onLogout = () => {
    localStorage.clear();
    toast.success("You Logged out 👋");
    navigate("/login");
  };

  // HANDEL EDIT NOTE
  const handleEditNote = (noteDetails) => {
    setModalOptions({ isOpen: true, data: noteDetails, type: "edit" });
    console.log(modalOptions);
  };

  // HANDEL DELETE NOTE
  const handleDeleteNote = async (noteId) => {
    try {
      const response = await customAxios.delete(`/delete-note/${noteId}`);

      if (response?.status == 200) {
        toast.success("Note Deleted Successfully 👨‍💻", { icon: "🗑️" });
        await getAllNotes();
      }
    } catch (error) {
      // GET ERROR FROM BACKEND
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      } else {
        return toast.error("Unexpected Error Has Occurred, Please Try Again!");
      }
    }
  };
  // HANDEL PINNED NOTE
  const handlePinnedNote = async (note) => {
    const notePinnedStatus = note?.isPinned;
    try {
      const response = await customAxios.patch(
        `/edit-note-Pinned/${note?._id}`,
        { isPinned: !notePinnedStatus }
      );
      console.log(response);

      if (response?.status == 200) {
        await getAllNotes();
        toast.success(`Note ${notePinnedStatus ? "unPinned" : "Pinned"}`, {
          icon: "📌",
        });
      }
    } catch (error) {
      // GET ERROR FROM BACKEND
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      } else {
        return toast.error("Unexpected Error Has Occurred, Please Try Again!");
      }
    }
  };

  if (!userName) {
    redirect("/login");
    return;
  }
  return (
    <div className="relative h-full">
      <Navbar
        userName={userName}
        onLogout={onLogout}
        handleSearch={(query) => handleSearchNotes(query)}
        handleClearSearch={handleClearSearch}
      />
      <div className="transition-all">
        {notes?.length > 0 ? (
          <div className="px-4 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {notes?.map((note) => {
              return (
                <NoteCard
                  key={note?._id}
                  title={note?.title}
                  date={note?.createdAt}
                  tags={note?.tags}
                  content={note?.content}
                  isPinned={note?.isPinned}
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleDeleteNote(note?._id)}
                  onPinned={() => handlePinnedNote(note)}
                />
              );
            })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noNoteImg : addNoteImg}
            message={
              isSearch
                ? `Oops! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your
        thoughts, ideas, and reminders. let's get started!`
            }
          />
        )}
        <button
          onClick={onOpenModal}
          className="w-12 h-12 flex items-center justify-center text-white text-xl  rounded-full bg-primary hover:bg-blue-600 cursor-pointer absolute right-6 bottom-6"
        >
          <MdAdd />
        </button>
      </div>

      <Modal
        isOpen={modalOptions.isOpen}
        onRequestClose={onCloseModal}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        className="w-[80%] md:w-[40%] max-h-[90%] mt-10 bg-white rounded-md mx-auto p-5 overflow-auto"
      >
        <AddEditCard
          onClose={onCloseModal}
          getAllNotes={getAllNotes}
          noteData={modalOptions.data}
          type={modalOptions.type}
        />
      </Modal>
    </div>
  );
}

export default Home;

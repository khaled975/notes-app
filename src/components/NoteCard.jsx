import { MdDelete, MdEdit, MdPentagon, MdPushPin } from "react-icons/md";
import { formatDate } from "../utils/helpers";

function NoteCard({
  title,
  date,
  isPinned,
  content,
  tags,
  onEdit,
  onDelete,
  onPinned,
}) {
  return (
    <div className="flex flex-col gap-4 hover:shadow-md transition-all border border-slate-300 py-2 px-4 cursor-pointer rounded">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
          <p className="text-slate-500 text-xs font-semibold">
            {formatDate(date)}
          </p>
          <p className="line-clamp-1 text-sm text-slate-600 mt-2">{content}</p>
        </div>
        <div>
          <MdPushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-500"
            }`}
            onClick={onPinned}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-xs font-semibold capitalize">
          #{tags.join(" #")}
        </p>
        <div className="flex gap-2 items-center">
          <MdEdit className="icon-btn" onClick={onEdit} />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;

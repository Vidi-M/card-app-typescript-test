import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), due_for: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.filter((entry) => entry.id == id)[0];
    setNewEntry(entry);
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    updateEntry(id as string, newEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-3 bg-gray-300 p-8 rounded-md dark:bg-gray-800">
      <input
        className="p-3 rounded-md dark:bg-gray-700 dark:text-gray-300"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <div className="pt-3">
        <textarea
          className="p-3 w-full rounded-md dark:bg-gray-700 dark:text-gray-300"
          placeholder="Description"
          name="description"
          value={newEntry.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <div className="text-gray-600 dark:text-gray-300">Created:</div>
        <input
          className="p-3 w-full rounded-md dark:bg-gray-700 dark:text-gray-300 dark:[color-scheme:dark]"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      {/* need to add divs and make it clearer */}
      <div>
        <div className="text-gray-600 dark:text-gray-300">Due for:</div>
        <input
          className="p-3 w-full rounded-md dark:bg-gray-700 dark:text-gray-300 dark:[color-scheme:dark]"
          type="date"
          name="due_for"
          value={newEntry.due_for ? new Date(newEntry.due_for).toISOString().split("T")[0] : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="pt-3">
        <button
          onClick={(e) => {
            handleSend(e);
          }}
          className="w-full bg-blue-400 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 font-semibold text-white p-3 rounded-md"
        >
          Update
        </button>
      </div>
    </section>
  );
}

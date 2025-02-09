import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;

  let navigate = useNavigate();
  if (entries.length == 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5 dark:text-gray-300">You don't have any card</h1>
        <p className="text-center font-medium text-md dark:text-gray-300">
          Lets{" "}
          <Link className="text-blue-400 underline underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 dark:bg-gray-900 ">
      {entries.map((entry: Entry, index: number) => {
        const today = new Date().getTime();
        const dueDate = new Date(entry.due_for).getTime();

        // Calculate the daysBetween at the start
        let daysBetween = null;
        if (!isNaN(today) && !isNaN(dueDate) && dueDate !== 0) {
          daysBetween = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        }
        return (
          <div
            id={entry.id}
            key={index}
            className="bg-gray-200 dark:bg-gray-800 dark:text-gray-300 shadow-md shadow-gray-800 m-3 p-4 rounded flex flex-col justify-between"
          >
            <h1 className={`font-bold text-sm md:text-lg ${daysBetween !== null && daysBetween <= 0 ? "text-red-700 dark:text-red-400" : ""}`}>
              {entry.title}
            </h1>
            <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
            <div className="flex justify-between items-center text-lg dark:text-gray-300">
              <span>Created:</span>
              <time className="text-sm md:text-lg">{new Date(entry.created_at.toString()).toLocaleDateString()}</time>
            </div>
            <div className="flex justify-between items-center text-lg dark:text-gray-300">
              <span>Due date:</span>
              <time className="text-sm md:text-lg">
                {entry.due_for ? new Date(entry.due_for.toString()).toLocaleDateString() : "---"}
              </time>
            </div>
            <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
              <div className="flex justify-center md:justify-start">
                {/* Delete Button */}
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500"
                >
                  ✖
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
                >
                  🖊
                </button>
              </div>
              {daysBetween !== null ? (
                <div className="mt-4 md:mt-0 text-lg dark:text-gray-300 text-center md:text-left">
                  {`Days left: ${daysBetween}`}
                </div>
              ) : (
                <div className="mt-4 md:mt-0 text-lg dark:text-gray-300 text-center md:text-left">
                  {`Days left: ---`}
                </div>
              )}
            </section>
          </div>
        );
      })}
    </section>
  );
}

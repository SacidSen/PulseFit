import { useState, useEffect, useRef } from "react";
import WorkoutCard from "../Components/Plan/WorkoutCard";
import Pagination from "../Components/Pagination";
import ExerciseCard from "../Components/Plan/ExerciseCard";
import axios from "axios";

interface Exercise {
  _id: string;
  name: string;
}

interface Workout {
  _id: string;
  name: string;
  startDate: string;
  endTime: string;
  exercises: Exercise[];
  onDelete: (id: string) => void;
}

interface User {
  id: string;
  email: string;
  token: string;
}

export default function ExercisePage() {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [showExercise, setShowExercise] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [workoutName, setWorkoutName] = useState("Your Workout Plan");
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);
  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentExercise = filteredExercises.slice(firstPostIndex, lastPostIndex);

  const handleExerciseChange = (id: string) => {
    setSelectedExercises((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleDeleteWorkout = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/workoutP/${id}`);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Workout deletion failed:", error);
    }
  };

  const handleEditWorkout = (workout: Workout) => {
    setWorkoutName(workout.name);
    setSelectedExercises(workout.exercises.map((ex) => ex._id));
    setEditingWorkoutId(workout._id);
    setIsEditing(true);
    setShowExercise(true);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/exercise/${user?.id}`);
        setExercises(res.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, [user?.id]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

useEffect(() => {
  if (!user) return;

  axios
    .get(`http://localhost:8000/api/workoutP/list?userId=${user.id}`)
    .then((res) => setWorkouts(res.data))
    .catch((err) => console.error("Workout fetch error:", err));
}, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowExercise(false);
        setEditingWorkoutId(null);
        setIsEditing(false);
      }
    }

    if (showExercise) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExercise]);

  async function createWorkout(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    const formData = {
      user: user.id,
      name: workoutName,
      exercises: selectedExercises,
      startTime: "08:00",
      endTime: "09:00",
    };

    try {
      if (editingWorkoutId) {
        await axios.put(`http://localhost:8000/api/workoutP/${editingWorkoutId}`, formData);
        const updated = workouts.map((w) =>
          w._id === editingWorkoutId
            ? {
                ...w,
                name: workoutName,
                startTime: "08:00",
                endTime: "09:00",
                exercises: exercises.filter((ex) => selectedExercises.includes(ex._id)),
              }
            : w
        );
        setWorkouts(updated);
      } else {
        await axios.post(`http://localhost:8000/api/workoutP/${user.id}`, formData);
        const res = await axios.get(`http://localhost:8000/api/workoutP/${user.id}`);
        setWorkouts(res.data);
      }

      // Reset state
      setShowExercise(false);
      setSelectedExercises([]);
      setWorkoutName("Your Workout Plan");
      setEditingWorkoutId(null);
      setIsEditing(false);
    } catch (error: any) {
      console.error("Workout save error:", error?.response?.data || error.message);
    }
  }

  return (
    <main className="h-full grow">
      <form onSubmit={createWorkout}>
        <section className="w-full mt-24 h-42 bg-[#121212]">
          <div className="max-w-6xl mx-auto flex items-center h-full">
            <h1 className="max-w-6xl text-4xl font-semibold text-white uppercase">
              Your Workout Plan
            </h1>
          </div>
        </section>

        <section className="border bg-[#f9f9f9] border-b-[#e3e3e3] h-20 w-full flex justify-center items-center">
          <button
            type="button"
            onClick={() => setShowExercise(!showExercise)}
            className="bg-green-600 mr-2 cursor-pointer flex hover:opacity-75 px-3 py-1 rounded font-semibold text-white text-sm"
          >
            <p className="mr-2">Add Workout Plan</p>
            <svg viewBox="0 0 24 24" width="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </section>

        <section className="mx-auto max-w-6xl mt-12 flex flex-wrap">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workoutName={workout.name}
              startDate={workout.startDate}
              exercises={workout.exercises}
              onDelete={() => handleDeleteWorkout(workout._id)}
              onEdit={() => handleEditWorkout(workout)}
            />
          ))}
        </section>

        {showExercise && (
          <div className="h-full w-full flex justify-center bg-[#121212af] items-center fixed top-0 left-0 z-20">
            <div ref={modalRef} className="w-96 h-fit shadow-2xl rounded-lg bg-[#1c1c1c]">
              <section className="w-full rounded-t-lg h-42 bg-[#0f0f0f] px-4 flex items-center">
                {isEditingTitle ? (
                  <input
                    autoFocus
                    className="bg-transparent border-b border-white focus:outline-none text-white text-2xl font-semibold uppercase"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                  />
                ) : (
                  <h1
                    className="text-2xl font-semibold text-white uppercase cursor-pointer"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {workoutName}
                  </h1>
                )}
              </section>

              <section className="text-white w-full ml-4 mt-4">
                <input
                  className="border border-white rounded py-0.5 px-2 text-white"
                  placeholder="Search..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </section>

              <section className="mt-12 flex flex-wrap mb-5">
                {currentExercise.map((ex) => (
                  <ExerciseCard
                    key={ex._id}
                    id={ex._id}
                    name={ex.name}
                    checked={selectedExercises.includes(ex._id)}
                    onChange={handleExerciseChange}
                  />
                ))}

                <button
                  type="submit"
                  className="bg-blue-600 mt-5 text-white px-2 py-0.5 rounded ml-4 hover:opacity-75 cursor-pointer"
                >
                  Save
                </button>

                <Pagination
                  currentPage={currentPage}
                  totalPosts={filteredExercises.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </section>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
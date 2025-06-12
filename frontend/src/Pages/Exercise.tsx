import { useState, useEffect, useRef } from "react";
import Workout from "../Components/Plan/WorkoutCard";
import Pagination from "../Components/Pagination";
import ExerciseCard from "../Components/Plan/ExerciseCard";

export default function ExercisePage() {
    interface Exercise {
        id: string;
        name: string;
        level: string;
        force: string;
        primaryMuscles: string[];
    }

    const [exercise, setExercise] = useState<Exercise[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [showExercise, setShowExercise] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [workoutName, setWorkoutName] = useState("Your Workout Plan");
    const modalRef = useRef<HTMLDivElement>(null);

    // Yeni zaman ve tarih seçim state'leri
    const [selectedDate, setSelectedDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startPeriod, setStartPeriod] = useState("AM");
    const [endPeriod, setEndPeriod] = useState("AM");

    const filteredExercises = exercise.filter((ex) =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentExercise = filteredExercises.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowExercise(false);
            }
        }

        if (showExercise) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showExercise]);

    useEffect(() => {
        fetch("http://localhost:8000/api/exercise")
            .then((res) => res.json())
            .then((json) => setExercise(json))
            .catch((err) => console.error("Hata:", err));
    }, []);

    // ISO string dönüştürücü
    function convertToISO(date: string, time: string, period: string): string {
        const [hourStr, minuteStr] = time.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        return `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
    }

    function handleSave() {
        if (!selectedDate || !startTime || !endTime) {
            alert("Tarih ve saat bilgilerini doldurun.");
            return;
        }

        const start = convertToISO(selectedDate, startTime, startPeriod);
        const end = convertToISO(selectedDate, endTime, endPeriod);

        console.log("Gönderilecek saat bilgileri:", { start, end });
        // İsteğe göre POST isteği buraya eklenebilir

        setShowExercise(false);
    }

    return (
        <main className="h-full grow">
            <section className="w-full mt-24 h-42 bg-[#121212]">
                <div className="max-w-6xl mx-auto flex items-center h-full">
                    <h1 className="max-w-6xl text-4xl font-semibold text-white uppercase">
                        Workout Plan
                    </h1>
                </div>
            </section>

            <section className="border bg-[#f9f9f9] border-b-[#e3e3e3] h-20 w-full flex justify-center items-center">
                <button
                    onClick={() => setShowExercise(!showExercise)}
                    className="bg-green-600 mr-2 cursor-pointer flex hover:opacity-75 px-3 py-1 rounded font-semibold text-white text-sm"
                >
                    <p className="mr-2">Add Workout Plan</p>
                    <svg viewBox="0 0 24 24" width="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </section>

            <section className="mx-auto max-w-6xl mt-12 flex flex-wrap">
                <Workout />
            </section>

            {showExercise && (
                <div className="h-full w-full flex justify-center bg-[#121212af] items-center fixed top-0 left-0 z-20">
                    <div ref={modalRef} className="max-w-1/4 h-fit shadow-2xl rounded-lg bg-[#1c1c1c]">
                        <section className="w-full rounded-tr-lg rounded-tl-lg h-42 bg-[#0f0f0f]">
                            <div className="px-4 flex items-center h-full">
                                {isEditingTitle ? (
                                    <input
                                        autoFocus
                                        className="bg-transparent border-b border-white focus:outline-none text-white text-2xl font-semibold uppercase"
                                        value={workoutName}
                                        onChange={(e) => setWorkoutName(e.target.value)}
                                        onBlur={() => setIsEditingTitle(false)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") setIsEditingTitle(false);
                                        }}
                                    />
                                ) : (
                                    <h1
                                        className="max-w-6xl text-2xl font-semibold text-white uppercase cursor-pointer"
                                        onClick={() => setIsEditingTitle(true)}
                                    >
                                        {workoutName}
                                    </h1>
                                )}
                            </div>
                        </section>

                        <section className="flex text-white w-full ml-4">
                            <input
                                className="border border-white rounded focus:ring-2 font-semibold mt-4 py-0.5 px-2 text-white"
                                placeholder="Search..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </section>

                        <section className="mt-12 flex flex-wrap mb-5">
                            {currentExercise.map((exerciseItem) => (
                                <ExerciseCard key={exerciseItem.id} name={exerciseItem.name} />
                            ))}

                            <div className="flex flex-col w-full px-4 gap-2 text-white mt-4">
                                <label>Tarih</label>
                                <input type="date" className="border rounded px-2 text-black" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

                                <label>Başlangıç Saati</label>
                                <div className="flex gap-2">
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="text-black border rounded px-2" />
                                    <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} className="text-black border rounded px-2">
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>

                                <label>Bitiş Saati</label>
                                <div className="flex gap-2">
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="text-black border rounded px-2" />
                                    <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} className="text-black border rounded px-2">
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="bg-blue-600 mt-5 text-white px-4 py-1 rounded font-semibold ml-4 hover:opacity-75 cursor-pointer"
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
        </main>
    );
}

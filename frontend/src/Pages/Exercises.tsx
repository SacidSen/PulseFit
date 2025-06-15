import axios from "axios";
import { useEffect, useState } from "react";
import ExerciseOverviewCard from "../Components/Plan/ExerciseOverviewCard";

export interface Exercise {
  _id: string;
  name: string;
  images: string[];
  instructions: string[];
  sets: number;
  reps: number;
  level: string;
}

interface User {
  id: string;
  email: string;
  token: string;
}

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const getExercises = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/exercise/${user.id}`
          );
          setExercises(res.data);
        } catch (error) {
          console.error("Fehler beim Abrufen der Übungen:", error);
        }
      };
      getExercises();
    }
  }, [user]);

  return (
    <main className="grow mt-24">
      <section className="mx-auto max-w-6xl mt-12 flex flex-wrap">
        {exercises.length > 0 &&
          exercises.map((item) => {
            const { _id, name, images, instructions, level, sets, reps } = item;
            return (
              <div
                key={_id}
                className="w-[300px] bg-white shadow-lg m-4 p-4 rounded-lg"
              >
                <h2 className="text-xl font-bold mb-2">{name}</h2>

                {images && images.length > 0 && (
                  <img
                    src={`http://localhost:8000/uploads/${images[0]}`}
                    alt={name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}

                <div className="mt-4">
                  <p><strong>Level:</strong> {level}</p>
                  <p><strong>Sets:</strong> {sets}</p>
                  <p><strong>Reps:</strong> {reps}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Anweisungen:</h3>
                  <ul className="list-disc ml-4">
                    {instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import ExerciseOverviewCard from "../Components/Plan/ExerciseOverviewCard";

export interface Exercise {
    _id: string;
    name: string;
    images: string[];
    instructions : string[];
    level : string
}
interface User {
    id: string;
    email: string;
    token: string;
}

export default function Execsises() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [user, setUser] = useState<User | null>(null);
    console.log(exercises[0]);

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])

    useEffect(() => {
        if (user) {
            const getExercises = async () => {
                try {
                    const res = await axios.get(`http://localhost:8000/api/exercise/${user?.id}`);
                    setExercises(res.data);
                } catch (error) {
                    console.error("Error fetching exercises:", error);
                }
            };
            getExercises();
        }
    }, [user]);

    return (
        <main className="grow mt-24">
            <section className="mx-auto max-w-6xl mt-12 flex flex-wrap">
                {/* exercise card */}
                {exercises.length > 0 &&
                    exercises.map((item, index ) => {
                        const { name, images, instructions, level } = item;
                        return (
                            <ExerciseOverviewCard key={index}
                                name={name}
                                images={images}
                                instructions={instructions}
                                level={level}
                            />
                        )
                    })
                }
            </section>
        </main>
    )
}
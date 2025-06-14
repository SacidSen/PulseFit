import { useState } from 'react';
import axios from 'axios';

interface WorkoutCardProps {
    _id: string;
    name: string;
    images: string[];
    instructions: string[];
    sets: number;
    reps: number;
    level: string;
}

export default function ExerciseOverviewCard({
    _id,
    name,
    images,
    instructions = [],
    level,
    sets: initialSets,
    reps: initialReps
}: WorkoutCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [sets, setSets] = useState(initialSets);
    const [reps, setReps] = useState(initialReps);
    const [tempSets, setTempSets] = useState((initialSets ?? 0).toString());
    const [tempReps, setTempReps] = useState((initialReps ?? 0).toString());

    const handleSave = async () => {
        setIsEditing(false);
        const newSets = parseInt(tempSets, 10);
        const newReps = parseInt(tempReps, 10);

        // Only send request if changed
        if (newSets !== initialSets || newReps !== initialReps) {
            try {
                await axios.put(`http://localhost:8000/api/exercise/${_id}`, {
                    sets: newSets,
                    reps: newReps
                });
                setSets(newSets);
                setReps(newReps);
            } catch (error) {
                console.error('Failed to update exercise:', error);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="min-w-1/3 w-1/3 px-2 mb-10">
            <div className="border rounded-md border-gray-400 h-full p-2 flex flex-col">
                {images?.length > 0 ?
                    <img src="logo.png" /> :
                    <img src="logo.png" />
                }

                <div className="flex justify-between mt-2">
                    <h1 className="text-red-600 font-semibold text-lg">{name}</h1>
                    <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                        {isEditing ? (
                            <>
                                <p>
                                    <span className="font-semibold">Sets:</span>{' '}
                                    <input
                                        type="number"
                                        value={tempSets}
                                        onChange={(e) => setTempSets(e.target.value)}
                                        onBlur={handleSave}
                                        onKeyDown={handleKeyDown}
                                        className="w-12 border px-1"
                                    />
                                </p>
                                <p>
                                    <span className="font-semibold">Reps:</span>{' '}
                                    <input
                                        type="number"
                                        value={tempReps}
                                        onChange={(e) => setTempReps(e.target.value)}
                                        onBlur={handleSave}
                                        onKeyDown={handleKeyDown}
                                        className="w-12 border px-1"
                                    />
                                </p>
                            </>
                        ) : (
                            <>
                                <p><span className="font-semibold">Sets:</span> {sets}</p>
                                <p><span className="font-semibold">Reps:</span> {reps}</p>
                            </>
                        )}
                    </div>
                </div>

                <p className="mt-4 line-clamp-3">{instructions?.join(' ') ?? ''}</p>
                <p className="mt-4"><span className="font-semibold mr-1">Level:</span>{level}</p>
            </div>
        </div>
    );
}

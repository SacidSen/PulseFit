interface WorkoutCardProps {
    _id: string;
    name: string;
    images: string[];
    instructions : string[];
    level : string
}

export default function ExerciseOverviewCard({ name, images, instructions, level  }: WorkoutCardProps) {
    return (
        <div className="h-fit min-w-1/4 w-1/4 px-4 mb-10 border-2">
            {images?.length > 0 &&
                <img src={images[0]} />
            }
            <div className="flex justify-between">
                <h1>{name}</h1>
                <div>
                    <p>Sets:</p>
                    <p>Reps:</p>
                </div>
            </div>
            <p>{instructions}</p>
            <p>{level}</p>
        </div>
    )
}

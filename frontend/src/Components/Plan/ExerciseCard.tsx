interface ExerciseProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (id: string) => void;
}

export default function ExerciseCard({ id, name, checked, onChange }: ExerciseProps) {
    return (
        <div className="h-16 w-full px-4 mb-5">
            <div className="border rounded-md border-gray-400 h-full flex items-center justify-start">
                <div className="flex grow px-2 items-center justify-start">
                    <input
                        className="w-5 h-5 mr-4 rounded outline-none"
                        type="checkbox"
                        checked={checked}
                        onChange={() => onChange(id)}
                    />
                    <h1 className="font-semibold uppercase my-2 text-center text-white">{name}</h1>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import Card from "../Components/Header/Card";
import HeaderCard from "../Components/Header/HeaderCard";
import PersonalCard from "../Components/Header/PersonalCard";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <section className="bg-[#121212] mt-24">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <h2 className="text-left text-white">
              {user ? `Welcome ${user.name} to Pulse Fit` : "Welcome to Pulse Fit"}
            </h2>
            <h1 className="text-6xl text-center font-bold uppercase text-white">Online Workout Planner</h1>
            <div className="flex gap-x-4 mt-6">
              <HeaderCard img="fiticon.webp">Blog</HeaderCard>
              <HeaderCard img="healicon.webp">Weight Loss</HeaderCard>
              <HeaderCard img="nutritionicon.webp">Nutrition</HeaderCard>
            </div>

            {!user && (
              <>
                <p className="text-white my-2 uppercase">To use Fitness planner for free</p>
                <a className="bg-green-600 hover:bg-green-400 px-3 py-1 rounded font-semibold text-white text-sm" href="/register">Sign Up Now</a>
              </>
            )}
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <img src="burn-man.webp" alt="" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">What is Workout Planner?</h1>
        <p className="mt-5">
          Build your own personalized workout, track your progress, and achieve your fitness goals easily with Pulse Fit. Join now and take control of your fitness journey!
        </p>
        <div className="flex mt-10">
          <div className="w-1/2 flex flex-col gap-y-10">
            <Card title='Learn how to do the exercises' img='plates.webp'>
              The exercise library offers resources to guide you on proper form and technique.
            </Card>
            <Card title='Create a free personalized workout' img='mascular.webp'>
              Build a workout plan that fits your goals and preferences completely free.
            </Card>
            <Card title='Create custom workouts for your students' img='dumbell.svg'>
              Design free custom workout plans for your students.
            </Card>
            <Card title='Fitness Calculators' img='calculator.svg'>
              Track calories, calculate rep maxes, and monitor body composition – all within the app.
            </Card>
          </div>
          <img className="w-1/2" src="fitness-model.webp" alt="fitness-model" />
        </div>
      </section>

      {!user && (
        <section className="max-w-6xl mx-auto text-center flex flex-col items-center gap-y-5 after:h-[1px] after:bg-gray-200 my-15 after:w-full">
          <h1 className="text-3xl uppercase font-bold text-gray-800">Create Your Workout And Share It With The World!</h1>
          <p className="max-w-2xl">
            You have full control over your workout plans, reps, rest times, and everything you need to create your perfect fitness routine.
          </p>
          <a className="bg-green-600 hover:bg-green-400 px-3 py-1 rounded font-semibold text-white text-sm" href="/register">Get Started</a>
        </section>
      )}

      <section className="max-w-6xl mb-20 mx-auto">
        <h1 className="text-2xl uppercase font-bold text-gray-800">How to Create a Personalized Workout Plan</h1>
        <p className="mt-4">
          The first thing to consider when creating your workout plan is what you want to achieve.
        </p>
        <div className="flex mt-14">
          <img className="max-w-32 mr-10" src="book.webp" alt="book" />
          <ul className="list-disc">
            <li>Do you want to build muscle?</li>
            <li>Are you looking to lose weight?</li>
            <li>Do you want to become stronger?</li>
            <li>Do you want to focus on endurance?</li>
            <li>Do you want to focus on specific body parts?</li>
          </ul>
        </div>
        <p className="my-10">
          With Pulse Fit you can customize and track your fitness plan based on your personal goals. Start building your plan today!
        </p>
        <div className="flex">
          <PersonalCard overlayDescrition="Detailed guide for bodybuilding enthusiasts" overlayText="Bodybuilding" img="fitnes1-icon.webp" />
          <PersonalCard overlayDescrition="Achieve a healthy and fit body" overlayText="Fitness" img="body-icon.webp" />
          <PersonalCard overlayDescrition="Cardio programs for endurance" overlayText="Cardio" img="cardio-icon.webp" />
          <PersonalCard overlayDescrition="Balance and flexibility training" overlayText="Pilates" img="pilates-icon.webp" />
        </div>
      </section>
    </>
  );
}

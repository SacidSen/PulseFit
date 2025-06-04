export default function Login() {
    return (
        <main className="h-full grow mt-24 flex items-center justify-center bg-green-50">
          <div className="bg-white p-8 shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
            <form className="flex flex-col space-y-4!">
              <div>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border-b-2 border-green-500 focus:outline-none focus:ring-green-500"
                  placeholder="Email Adress"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2  border-b-2 border-green-500  focus:outline-none focus:ring-green-500"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Login
                </button>
              <p className="text-sm mt-1">Don't have an account? <a className="text-green-500 font-semibold" href="/register">SignUp</a></p>
              </div>
            </form>
          </div>
        </main>
    );
}

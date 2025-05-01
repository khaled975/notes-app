import { Link, useNavigate } from "react-router-dom";
import PassInput from "../../components/PassInput";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { customAxios } from "../../utils/customAxios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: HANDLING FORM ERRORS
    if (!email || !email.trim()) return setError("Email is required!");
    if (!password || !password.trim()) return setError("Password is required!");
    if (password.length < 6)
      return setError("Password should be at least 6 char!");

    // NO ERROR HAPPENED
    setError("");

    try {
      const data = { email, password };

      const response = await customAxios.post("/login", data);
      // SUCCESSFUL LOGIN & STORE TOKEN IN LOCALSTORAGE
      if (response?.data?.data?.token) {
        localStorage.setItem("token", response?.data?.data?.token);
        toast.success("Welcome Back 🫡");
        navigate("/");
      }
    } catch (error) {
      // GET ERROR FROM BACKEND
      if (error?.response?.data?.message) {
        return setError(error?.response?.data?.message);
      } else {
        return setError("Unexpected Error Has Occurred, Please Try Again!");
      }
    }
  };
  return (
    <>
      <Navbar />
      <main className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[350px] max-w-[400px] sm:max-w-[600px] m flex flex-col border border-slate-400 rounded px-5 py-7 gap-4"
        >
          <h2 className="font-bold">Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <PassInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
          {error && <p className="text-sm text-red-600">{error}</p>}

          <p className="flex gap-1 items-center text-sm">
            Not registered yet?
            <Link to="/signup" className="text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;

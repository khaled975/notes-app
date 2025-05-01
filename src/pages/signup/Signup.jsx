import { Link, useNavigate } from "react-router-dom";
import PassInput from "../../components/PassInput";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { customAxios } from "../../utils/customAxios";
import toast from "react-hot-toast";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: HANDLING FORM ERRORS
    if (!firstName || !firstName.trim())
      return setError("First Name is required!");
    if (!lastName || !lastName.trim())
      return setError("Last Name is required!");
    if (!email || !email.trim()) return setError("Email is required!");
    if (!password || !password.trim()) return setError("Password is required!");
    if (password.length < 6)
      return setError("Password should be at least 6 char!");

    // NO ERROR HAPPENED
    setError("");

    try {
      const data = { fullName: firstName + " " + lastName, email, password };

      const response = await customAxios.post("/register", data);

      // SUCCESSFUL REGISTER & STORE TOKEN IN LOCALSTORAGE
      if (response?.data?.data?.user?.token) {
        localStorage.setItem("token", response?.data?.data?.user?.token);
        toast.success("Welcome To Our App 🫡");

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
          <h2 className="font-bold">Signup</h2>
          <input
            type="text"
            placeholder="Enter your firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter your lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
          />
          <PassInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Signup</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="flex gap-1 items-center text-sm">
            Have account already?
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Signup;

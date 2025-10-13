// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const { signup } = useAuth();
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       // Call backend signup
//       await signup(name, username, email, password);
//       navigate("/login"); // redirect to login on successful signup
//     } catch (err: any) {
//       // Show backend error message
//       if (err.response?.data?.detail) {
//         setError(err.response.data.detail);
//       } else {
//         setError(err.message || "Signup failed");
//       }
//     }
//   };

//   return (
//     <div className="container py-16 max-w-md mx-auto">
//       <h1 className="font-serif text-3xl">Create account</h1>
//       <form onSubmit={submit} className="mt-6 space-y-4">
//         <div>
//           <label className="text-sm">Full name</label>
//           <Input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your full name"
//           />
//         </div>
//         <div>
//           <label className="text-sm">Username</label>
//           <Input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             placeholder="Enter your username"
//           />
//         </div>
//         <div>
//           <label className="text-sm">Email</label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label className="text-sm">Password</label>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//           />
//         </div>
//         {error && <p className="text-sm text-destructive">{error}</p>}
//         <Button type="submit" className="w-full">
//           Sign up
//         </Button>
//         <p className="text-sm text-muted-foreground mt-2">
//           Already have an account? <Link to="/login" className="underline">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }









import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(
        name,
        username,
        email,
        password,
        contactNumber,
        permanentAddress,
        country,
        city,
        contactNumber2 || undefined
      );
      navigate("/login"); // redirect to login on successful signup
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError(err.message || "Signup failed");
      }
    }
  };

  return (
    <div className="container py-16 max-w-md mx-auto">
      <h1 className="font-serif text-3xl">Create account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">Full name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="text-sm">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label className="text-sm">Contact Number</label>
          <Input
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            placeholder="Enter your contact number"
          />
        </div>
        <div>
          <label className="text-sm">Permanent Address</label>
          <Input
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            required
            placeholder="Enter your permanent address"
          />
        </div>
        <div>
          <label className="text-sm">Country</label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Enter your country"
          />
        </div>
        <div>
          <label className="text-sm">City</label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="text-sm">Secondary Contact Number (Optional)</label>
          <Input
            value={contactNumber2}
            onChange={(e) => setContactNumber2(e.target.value)}
            placeholder="Enter secondary contact number"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full">
          Sign up
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
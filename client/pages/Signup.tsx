// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const { signup } = useAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await signup(name, email, password);
//       navigate("/");
//     } catch (err: any) {
//       setError(err.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container py-16 max-w-md">
//       <h1 className="font-serif text-3xl">Create account</h1>
//       <form onSubmit={submit} className="mt-6 space-y-4">
//         <div>
//           <label className="text-sm">Full name</label>
//           <Input value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label className="text-sm">Email</label>
//           <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label className="text-sm">Password</label>
//           <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         {error && <p className="text-sm text-destructive">{error}</p>}
//         <Button type="submit" className="w-full">Sign up</Button>
//         <p className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="underline">Login</Link></p>
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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Call backend signup
      await signup(name, username, email, password);
      navigate("/"); // redirect to home on successful signup
    } catch (err: any) {
      // Show backend error message
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

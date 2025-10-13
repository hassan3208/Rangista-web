import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(loginInput, password);
      navigate("/"); // redirect to home after successful login
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="container py-16 max-w-md mx-auto">
      <h1 className="font-serif text-3xl">Login</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm">Username, Email, or Contact Number</label>
          <Input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
            placeholder="Enter username, email, or contact number"
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
          Login
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          No account? <Link to="/signup" className="underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
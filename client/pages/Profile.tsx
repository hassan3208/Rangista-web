import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Mail, BadgeCheck, IdCard } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="font-serif text-3xl mb-6">Your Profile</h1>
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center text-xl font-semibold">
            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-medium flex items-center gap-2">
              {user.name || user.email}
              <BadgeCheck className="h-4 w-4 text-accent" />
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" /> {user.email}
            </div>
          </div>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4" />
            <span className="text-muted-foreground">User ID:</span>
            <span className="font-mono break-all">{user.id}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <Link to="/admin" className="underline">Go to Admin</Link>
        <span className="text-muted-foreground">•</span>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        <Button className="ml-auto" onClick={logout}>Logout</Button>
      </div>
    </main>
  );
}

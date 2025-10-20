// import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { CartSheet } from "@/components/cart/CartSheet";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/CartContext";
// import { cn } from "@/lib/utils";
// import { User } from "lucide-react";
// import MobileNav from "@/components/layout/MobileNav";

// export default function Header() {
//   const { user, logout } = useAuth();
//   const { totalProducts } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [params, setParams] = useSearchParams();
//   const q = params.get("q") ?? "";

//   const onSearch = (value: string) => {
//     const next = new URLSearchParams(params);
//     if (value) next.set("q", value);
//     else next.delete("q");
//     setParams(next);
//     if (location.pathname !== "/admin") {
//       navigate("/");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
//       <div className="container flex h-16 items-center justify-between gap-4">
//         <div className="flex items-center gap-2">
//           <MobileNav />
//           <Link to="/" className="flex items-center gap-2">
//             <img src="https://i.postimg.cc/KYZqc2Yr/Screenshot-2025-10-02-105818.png" alt="Rangista Logo" className="h-9 w-9 rounded-full bg-accent" />
//             <div className="leading-tight hidden md:block">
//               <div className="font-hand text-xl text-accent">Rangista</div>
//               <div className="-mt-1 text-xs text-muted-foreground">Hand-Painted Fashion</div>
//             </div>
//           </Link>
//         </div>
//         <nav className="hidden md:flex items-center gap-6">
//           <NavItem to="/" label="Home" />
//           <NavItem to="/about" label="About" />
//           <NavItem to="/contact" label="Contact" />
//           <NavItem to="/favorites" label="Favorites" />
//           <NavItem to="/orders" label="Orders" />
//         </nav>
//         <div className="flex items-center gap-2">
//           <div className="hidden sm:block">
//             <Input placeholder="Search products" className="w-48" value={q} onChange={(e) => onSearch(e.target.value)} />
//           </div>
//           <CartSheet />
//           {user ? (
//             <div className="flex items-center gap-2">
//               <span className="hidden sm:block text-sm">Hi, {user?.name?.split(" ")[0] ?? "User"}</span>
//               <Button variant="ghost" size="icon" aria-label="Profile" onClick={() => navigate("/profile")}>
//                 <User className="h-5 w-5" />
//               </Button>
//               <Button onClick={logout}>Logout</Button>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center gap-2">
//               <Button onClick={() => navigate("/login")}>Login</Button>
//               <Button onClick={() => navigate("/signup")}>Sign up</Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// function NavItem({ to, label }: { to: string; label: string }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         cn(
//           "text-sm text-muted-foreground hover:text-foreground transition-colors",
//           isActive && "text-foreground font-medium border-b-2 border-accent",
//         )
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }











import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartSheet } from "@/components/cart/CartSheet";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import MobileNav from "@/components/layout/MobileNav";

// const ALLOWED_ADMIN_EMAILS = new Set([
//   "l1f22bscs1019@ucp.edu.pk",
//   "itsmywork1019@gmail.com",
//   "rangistaarttowear@gmail.com"
// ]);





const ALLOWED_ADMIN_EMAILS = new Set(
  (import.meta.env.VITE_ALLOWED_ADMIN_EMAILS || "")
    .split(",")
    .map((email: string) => email.trim())
    .filter((email: string) => email)
);

export default function Header() {
  const { user, logout } = useAuth();
  const { totalProducts } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";

  const onSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next);
    if (location.pathname !== "/admin") {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.postimg.cc/KYZqc2Yr/Screenshot-2025-10-02-105818.png" alt="Rangista Logo" className="h-9 w-9 rounded-full bg-accent" />
            <div className="leading-tight hidden md:block">
              <div className="font-hand text-xl text-accent">Rangista</div>
              <div className="-mt-1 text-xs text-muted-foreground">Hand-Painted Fashion</div>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          <NavItem to="/contact" label="Contact" />
          <NavItem to="/favorites" label="Favorites" />
          <NavItem to="/orders" label="Orders" />
          {user && ALLOWED_ADMIN_EMAILS.has(user.email) && (
            <NavItem to="/admin" label="Admin" />
          )}
        </nav>
        <div className="flex items-center gap-2">
          {/* <div className="hidden sm:block">
            <Input placeholder="Search products" className="w-48" value={q} onChange={(e) => onSearch(e.target.value)} />
          </div> */}
          <CartSheet />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm">Hi, {user?.name?.split(" ")[0] ?? "User"}</span>
              <Button variant="ghost" size="icon" aria-label="Profile" onClick={() => navigate("/profile")}>
                <User className="h-5 w-5" />
              </Button>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm text-muted-foreground hover:text-foreground transition-colors",
          isActive && "text-foreground font-medium border-b-2 border-accent",
        )
      }
    >
      {label}
    </NavLink>
  );
}
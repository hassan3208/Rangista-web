// import "./global.css";

// import { Toaster } from "@/components/ui/toaster";
// import { createRoot } from "react-dom/client";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import WhatsAppButton from "@/components/WhatsAppButton";
// import Login from "@/pages/Login";
// import Signup from "@/pages/Signup";
// import About from "@/pages/About";
// import Contact from "@/pages/Contact";
// import ProductDetail from "@/pages/ProductDetail";
// import Admin from "@/pages/Admin";
// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import { FavoritesProvider } from "@/context/FavoritesContext";
// import Favorites from "@/pages/Favorites";
// import Orders from "@/pages/Orders";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "@/pages/Profile";

// const queryClient = new QueryClient();

// const Root = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate("/", { replace: true });
//   }, []);

//   return (
//     <AuthProvider>
//       <FavoritesProvider>
//         <CartProvider>
//           <div className="min-h-screen flex flex-col">
//             <Header />
//             <div className="flex-1">
//               <Routes>
//                 <Route path="/" element={<Index />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/product/:id" element={<ProductDetail />} />
//                 <Route path="/admin" element={
//                   <Admin/>
//                   // <ProtectedRoute>
//                   //   <Admin />
//                   // </ProtectedRoute>
//                 } />
//                 <Route path="/favorites" element={<Favorites />} />
//                 <Route path="/orders" element={<Orders />} />
//                 <Route path="/profile" element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 } />
//                 {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </div>
//             <Footer />
//             <WhatsAppButton />
//           </div>
//         </CartProvider>
//       </FavoritesProvider>
//     </AuthProvider>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Root />
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// createRoot(document.getElementById("root")!).render(<App />);

















import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProductDetail from "@/pages/ProductDetail";
import Admin from "@/pages/Admin";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Favorites from "@/pages/Favorites";
import Orders from "@/pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, []);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/admin" element={
                  <Admin/>
                  // <ProtectedRoute>
                  //   <Admin />
                  // </ProtectedRoute>
                } />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <WhatsAppButton />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

{
  const container = document.getElementById("root")!;
  const w = window as any;
  const root = w.__appRoot ?? createRoot(container);
  w.__appRoot = root;
  root.render(<App />);
}

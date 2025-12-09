import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ArrowLeft, ShoppingBag } from "lucide-react";

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white shadow-sm hidden md:block z-10 top-16">
                <div className="flex h-16 items-center px-6 border-b">
                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-1">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/admin")
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/admin/products")
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/admin/orders")
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Orders
                    </Link>
                    <div className="border-t my-4 pt-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Back to Store
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

import { Link } from "react-router-dom";
import { Package, Plus, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [stats, setStats] = useState({
        products_count: 0,
        inventory_count: 0,
        low_stock_count: 0,
        orders_count: 0,
        total_revenue: 0
    });

    useEffect(() => {
        axios.get('/api/admin/stats').then(response => {
            setStats(response.data);
        }).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Products */}
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Products</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.products_count}</div>
                        <p className="text-xs text-muted-foreground">Active catalog items</p>
                    </div>
                </div>

                {/* Inventory Stock */}
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Inventory Stock</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.inventory_count}</div>
                        <p className="text-xs text-muted-foreground">Total units available</p>
                        {stats.low_stock_count > 0 && (
                            <div className="flex items-center gap-1 mt-1 text-destructive">
                                <AlertTriangle className="h-3 w-3" />
                                <p className="text-xs font-medium">
                                    {stats.low_stock_count} items low on stock
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Total Orders */}
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.orders_count}</div>
                        <p className="text-xs text-muted-foreground">Lifetime orders</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Sales</h3>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">${stats.total_revenue?.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime revenue</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Link to="/admin/products">
                    <Button>Manage Products</Button>
                </Link>
                <Link to="/admin/products/new">
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" /> Add New Product
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

import { Link } from "react-router-dom";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0 });

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setStats({ products: response.data.length });
        }).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Stats Card */}
                <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Products</h3>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{stats.products}</div>
                        <p className="text-xs text-muted-foreground">Manage your catalog</p>
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

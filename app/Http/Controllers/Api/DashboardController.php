<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $productsCount = Product::count();
        $inventoryCount = Product::sum('stock');
        $lowStockCount = Product::where('stock', '<', 10)->count();
        
        $ordersCount = Order::count();
        // Assuming we count strictly 'paid' or 'completed' as revenue, 
        // but for now let's sum everything not cancelled to show numbers.
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');

        return response()->json([
            'products_count' => $productsCount,
            'inventory_count' => (int) $inventoryCount,
            'low_stock_count' => $lowStockCount,
            'orders_count' => $ordersCount,
            'total_revenue' => (float) $totalRevenue,
        ]);
    }
}

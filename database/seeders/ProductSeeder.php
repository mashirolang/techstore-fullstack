<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => "Wireless Headphones Pro",
                'description' => "Premium wireless headphones with active noise cancellation and 30-hour battery life. Crystal clear sound quality.",
                'price' => 299.99,
                'image_url' => "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
                'category' => "Audio",
                'rating' => 4.8,
                'stock' => 50,
            ],
            [
                'name' => "Smart Watch Ultra",
                'description' => "Advanced fitness tracking, heart rate monitor, and GPS. Water resistant with 7-day battery life.",
                'price' => 399.99,
                'image_url' => "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                'category' => "Wearables",
                'rating' => 4.6,
                'stock' => 50,
            ],
            [
                'name' => "4K Action Camera",
                'description' => "Capture your adventures in stunning 4K. Waterproof, shockproof, with image stabilization.",
                'price' => 249.99,
                'image_url' => "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
                'category' => "Cameras",
                'rating' => 4.7,
                'stock' => 50,
            ],
            [
                'name' => "Portable Bluetooth Speaker",
                'description' => "360° sound, 20-hour battery, waterproof design. Perfect for outdoor adventures.",
                'price' => 129.99,
                'image_url' => "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
                'category' => "Audio",
                'rating' => 4.5,
                'stock' => 50,
            ],
            [
                'name' => "Gaming Keyboard RGB",
                'description' => "Mechanical switches, customizable RGB lighting, and programmable keys for the ultimate gaming experience.",
                'price' => 159.99,
                'image_url' => "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
                'category' => "Gaming",
                'rating' => 4.9,
                'stock' => 50,
            ],
            [
                'name' => "Wireless Mouse Pro",
                'description' => "Ergonomic design with precision tracking. 3-month battery life and adjustable DPI.",
                'price' => 79.99,
                'image_url' => "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
                'category' => "Accessories",
                'rating' => 4.4,
                'stock' => 50,
            ],
            [
                'name' => "USB-C Hub Adapter",
                'description' => "7-in-1 hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.",
                'price' => 49.99,
                'image_url' => "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
                'category' => "Accessories",
                'rating' => 4.3,
                'stock' => 50,
            ],
            [
                'name' => "Laptop Stand Aluminum",
                'description' => "Adjustable height, sturdy aluminum construction. Improves posture and cooling.",
                'price' => 59.99,
                'image_url' => "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
                'category' => "Accessories",
                'rating' => 4.6,
                'stock' => 0,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}

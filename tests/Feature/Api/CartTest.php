<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_item_to_cart_as_guest()
    {
        $product = Product::factory()->create();
        $sessionId = 'test-session-id';

        $response = $this->postJson('/api/cart', [
            'product_id' => $product->id,
            'quantity' => 1,
        ], ['X-Session-ID' => $sessionId]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
        
        $this->assertDatabaseHas('carts', [
            'session_id' => $sessionId,
        ]);
    }
}

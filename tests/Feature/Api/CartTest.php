<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_item_to_cart_as_user()
    {
        $user = \App\Models\User::factory()->create();
        $product = Product::factory()->create();
        
        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/cart', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
        
        $this->assertDatabaseHas('carts', [
            'user_id' => $user->id,
        ]);
    }
}

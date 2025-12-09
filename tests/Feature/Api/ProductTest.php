<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Laravel\Sanctum\Sanctum;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_products()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_can_show_product()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJson(['id' => $product->id]);
    }

    public function test_can_create_product()
    {
        $user = User::factory()->create(['is_admin' => true]);
        
        Sanctum::actingAs($user, ['*']);

        $data = [
            'name' => 'New Product',
            'price' => 99.99,
            'stock' => 10
        ];

        $response = $this->postJson('/api/products', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment($data);

        $this->assertDatabaseHas('products', $data);
    }
}

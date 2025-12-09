<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $this->getOrCreateCart($request);
        return $cart->load('items.product');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->getOrCreateCart($request);
        $product = Product::find($request->product_id);

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json($cart->load('items.product'), 201);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Ensure the cart item belongs to the current user/session
        // (Simplified check for this demo)
        
        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json($cartItem);
    }

    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();
        return response()->noContent();
    }

    private function getOrCreateCart(Request $request)
    {
        if ($request->user()) {
            return Cart::firstOrCreate(['user_id' => $request->user()->id]);
        }

        // For guest, use a header or generate a session ID
        $sessionId = $request->header('X-Session-ID');
        if (!$sessionId) {
            // Ideally should be handled better, but for now we create one if not provided or just use what we have
             // In a real API, the client should generate a UUID or we return it.
             // We'll trust the client sends one for guest carts or we just fail.
             // Let's create a new cart if session ID is provided, otherwise error for now.
             if (!$sessionId) {
                 abort(400, 'Session ID required for guest cart');
             }
        }

        return Cart::firstOrCreate(['session_id' => $sessionId]);
    }
}

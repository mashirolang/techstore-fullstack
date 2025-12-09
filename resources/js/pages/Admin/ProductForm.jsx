import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/Button";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/${id}`);
            const product = response.data;
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("stock", product.stock);
            setValue("image_url", product.image_url);
            setValue("category", product.category);
            setValue("rating", product.rating);
        } catch (error) {
            toast.error("Failed to fetch product details");
            navigate("/admin/products");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEditMode) {
                await axios.put(`/api/products/${id}`, data);
                toast.success("Product updated successfully");
            } else {
                await axios.post("/api/products", data);
                toast.success("Product created successfully");
            }
            navigate("/admin/products");
        } catch (error) {
            toast.error("Failed to save product");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/admin/products">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                </Link>
                <h2 className="text-2xl font-bold tracking-tight">
                    {isEditMode ? "Edit Product" : "New Product"}
                </h2>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. Wireless Headphones"
                            />
                            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                {...register("description")}
                                rows="4"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Product details..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("price", { required: "Price is required", min: 0 })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    type="number"
                                    {...register("stock", { required: "Stock is required", min: 0 })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.stock && <span className="text-xs text-red-500">{errors.stock.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    {...register("category")}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Audio"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register("rating", { min: 0, max: 5 })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.rating && <span className="text-xs text-red-500">{errors.rating.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                {...register("image_url", { pattern: { value: /^https?:\/\/.+/, message: "Enter a valid URL" } })}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                            {errors.image_url && <span className="text-xs text-red-500">{errors.image_url.message}</span>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Link to="/admin/products">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save Product</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;

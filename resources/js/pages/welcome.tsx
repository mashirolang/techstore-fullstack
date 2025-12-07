import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to TechStore</h1>
                    <p className="text-lg">A simple home page.</p>
                </div>
            </div>
        </>
    );
}

import Loading from "@/app/components/loading";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-8">
          <div className="flex items-center justify-center min-h-[500px]">
            <Loading />
          </div>
        </div>
      </div>
    </div>
  );
}

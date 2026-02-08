import BrowseItems from "@/components/SwapsGrid";

const BrowsePage = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-8 text-center">
        Browse Campus Resources
      </h1>
      <BrowseItems />
    </div>
  );
};

export default BrowsePage;
import Card from "@/components/home/card";


export default async function Home() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">To Do</h2>
          <Card
            title="To Do"
            large = {true}
          />
          {/* Add more "To Do" cards here */}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <Card
            title="In Progress"
            large = {true}
          />
          {/* Add more "In Progress" cards here */}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <Card
            title="Completed"
            large = {true}
          />
          {/* Add more "Done" cards here */}
        </div>
      </div>
    </div>
  );
}
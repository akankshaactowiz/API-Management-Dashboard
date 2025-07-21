import ApiForm from "../components/ApiForm";
import ApiTable from "../components/ApiDataTable";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">API Data Dashboard</h1>
      <ApiForm />
      <ApiTable />
    </div>
  );
}
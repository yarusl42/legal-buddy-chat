import { Button } from "@/components/ui/button";

const Settings = () => {
  const userDetails = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>
      
      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1">{userDetails.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1">{userDetails.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="mt-1">{userDetails.phone}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Legal</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Terms of Use</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Privacy Policy</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
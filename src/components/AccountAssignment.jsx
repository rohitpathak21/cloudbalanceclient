import React from "react";

const AccountAssignment = ({
  dummyAccounts,
  assignedAccounts,
  setAssignedAccounts,
  searchUnassigned,
  setSearchUnassigned,
  searchAssigned,
  setSearchAssigned,
}) => {
  const handleToggleAccount = (accountId) => {
    setAssignedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const filteredUnassigned = dummyAccounts.filter(
    (acc) =>
      !assignedAccounts.includes(acc.id) &&
      acc.name.toLowerCase().includes(searchUnassigned.toLowerCase())
  );

  const filteredAssigned = dummyAccounts.filter(
    (acc) =>
      assignedAccounts.includes(acc.id) &&
      acc.name.toLowerCase().includes(searchAssigned.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Assigned account IDs:", assignedAccounts);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Unassigned Accounts */}
      <div className="flex flex-col">
        <h4 className="font-medium mb-2">Unassigned Accounts</h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchUnassigned}
          onChange={(e) => setSearchUnassigned(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-md"
        />
        <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
          {filteredUnassigned.length > 0 ? (
            filteredUnassigned.map((account) => (
              <label
                key={account.id}
                className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm hover:bg-blue-50"
              >
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => handleToggleAccount(account.id)}
                  className="mr-3 accent-blue-500"
                />
                {account.name}
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No accounts found.</p>
          )}
        </div>
      </div>

      {/* Assigned Accounts */}
      <div className="flex flex-col">
        <h4 className="font-medium mb-2">Assigned Accounts</h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchAssigned}
          onChange={(e) => setSearchAssigned(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-md"
        />
        <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
          {filteredAssigned.length > 0 ? (
            filteredAssigned.map((account) => (
              <label
                key={account.id}
                className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm hover:bg-red-50"
              >
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleToggleAccount(account.id)}
                  className="mr-3 accent-red-500"
                />
                {account.name}
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No accounts assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountAssignment;

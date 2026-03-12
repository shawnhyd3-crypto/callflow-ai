export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        <p className="text-slate-400">
          Manage your personal details and account preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400">Name</p>
            <p className="text-base text-white">Update from user settings</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-base text-white">Update from user settings</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Organization</p>
            <p className="text-base text-white">CallFlow AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client';

const DEMO_USERS = [
  { id: '1', full_name: 'Priya Sharma', email: 'priya@email.com', role: 'customer', created_at: '15 Jan 2026' },
  { id: '2', full_name: 'Lakshmi Iyer', email: 'lakshmi@email.com', role: 'customer', created_at: '20 Feb 2026' },
  { id: '3', full_name: 'Admin User', email: 'admin@silksareestore.com', role: 'admin', created_at: '01 Jan 2026' },
  { id: '4', full_name: 'Ananya Reddy', email: 'ananya@email.com', role: 'customer', created_at: '10 Mar 2026' },
];

export default function AdminUsersPage() {
  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-burgundy mb-6">Users</h2>
      <div className="bg-white rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-text-muted">User</th>
              <th className="text-left p-4 font-semibold text-text-muted">Email</th>
              <th className="text-left p-4 font-semibold text-text-muted">Role</th>
              <th className="text-left p-4 font-semibold text-text-muted">Joined</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_USERS.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-cream/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-burgundy font-bold text-sm">{user.full_name[0]}</div>
                    <span className="font-semibold">{user.full_name}</span>
                  </div>
                </td>
                <td className="p-4 text-text-secondary">{user.email}</td>
                <td className="p-4"><span className={`badge ${user.role === 'admin' ? 'badge-maroon' : 'badge-gold'}`}>{user.role}</span></td>
                <td className="p-4 text-text-muted">{user.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

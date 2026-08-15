import React, { useState } from 'react';
import { useOrganizer } from '../../context/OrganizerContext';
import {
  Bell,
  Shield,
  Users,
  KeyRound,
  Plus,
  Trash2
} from 'lucide-react';

export const OrganizerSettings = () => {
  const { organizer, showToast } = useOrganizer();

  const [activeTab, setActiveTab] = useState('notifications'); // 'notifications' | 'team' | 'security'

  // Notifications State
  const [notifications, setNotifications] = useState({
    bookmarkMilestones: true,
    weeklyDigest: true,
    newRegistration: true,
    marketingUpdates: false,
    systemAnnouncements: true
  });

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Priya Mehta', email: organizer.email || 'priya@innovatehub.org', role: 'Owner' },
    { id: 2, name: 'Tanvir Hossain', email: 'tanvir@innovatehub.org', role: 'Competition Manager' },
    { id: 3, name: 'Ayesha Rahman', email: 'ayesha@innovatehub.org', role: 'Moderator' }
  ]);

  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Editor');

  const handleToggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast('Notification preferences updated.');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    const newMember = {
      id: Date.now(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: newMemberRole
    };
    setTeamMembers((prev) => [...prev, newMember]);
    setNewMemberEmail('');
    showToast(`Invited ${newMemberEmail} as ${newMemberRole}`);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    showToast('Team member removed.', 'info');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#d97757]">
          PREFERENCES
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#e8dfd0] font-normal tracking-tight mt-1">
          Organizer Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#9eb0b7] mt-1">
          Configure notification digests, manage organization team members, and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#0c1519] border border-[#23343c] p-1 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#d97757] text-white shadow-xs'
              : 'text-[#9eb0b7] hover:text-[#e8dfd0]'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'team'
              ? 'bg-[#d97757] text-white shadow-xs'
              : 'text-[#9eb0b7] hover:text-[#e8dfd0]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team Members</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#d97757] text-white shadow-xs'
              : 'text-[#9eb0b7] hover:text-[#e8dfd0]'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security & Access</span>
        </button>
      </div>

      {/* Notifications Tab Content */}
      {activeTab === 'notifications' && (
        <div className="bg-[#131e24] border border-[#23343c] rounded-[24px] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#23343c] pb-4">
            <h2 className="font-serif text-xl text-[#e8dfd0] font-medium">
              Email Notifications & Alerts
            </h2>
            <p className="text-xs text-[#9eb0b7] mt-0.5">
              Select how you want Catalyst to notify you regarding competition events.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'bookmarkMilestones',
                title: 'Bookmark Milestones',
                desc: 'Get notified when your competition reaches 100, 500, and 1,000 bookmarks.'
              },
              {
                key: 'weeklyDigest',
                title: 'Weekly Organizer Digest',
                desc: 'Summary of student impressions, conversion rate, and upcoming event dates.'
              },
              {
                key: 'newRegistration',
                title: 'Registration Activity Alerts',
                desc: 'Real-time or aggregated alerts when students register.'
              },
              {
                key: 'systemAnnouncements',
                title: 'Catalyst Platform Updates',
                desc: 'Important organizer guidelines, new feature releases, and community news.'
              }
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0c1519] border border-[#23343c]"
              >
                <div>
                  <p className="text-xs font-semibold text-[#e8dfd0]">{item.title}</p>
                  <p className="text-[11px] text-[#65777e] mt-0.5">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleNotif(item.key)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifications[item.key] ? 'bg-[#d97757]' : 'bg-[#1a272e]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      notifications[item.key] ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members Tab Content */}
      {activeTab === 'team' && (
        <div className="bg-[#131e24] border border-[#23343c] rounded-[24px] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#23343c] pb-4">
            <h2 className="font-serif text-xl text-[#e8dfd0] font-medium">
              Team Collaboration
            </h2>
            <p className="text-xs text-[#9eb0b7] mt-0.5">
              Allow co-organizers to manage competitions and review applications.
            </p>
          </div>

          {/* Add Team Member Form */}
          <form onSubmit={handleAddMember} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="email"
              placeholder="colleague@yourorg.com"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#0c1519] border border-[#23343c] rounded-xl text-xs text-[#e8dfd0] placeholder-[#5c6b6e] focus:outline-none focus:border-[#cf9d7b]"
            />
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              className="px-3 py-2.5 bg-[#0c1519] border border-[#23343c] rounded-xl text-xs text-[#e8dfd0] focus:outline-none focus:border-[#cf9d7b] cursor-pointer"
            >
              <option value="Admin" className="bg-[#131e24] text-[#e8dfd0]">Admin</option>
              <option value="Competition Manager" className="bg-[#131e24] text-[#e8dfd0]">Competition Manager</option>
              <option value="Editor" className="bg-[#131e24] text-[#e8dfd0]">Editor</option>
              <option value="Viewer" className="bg-[#131e24] text-[#e8dfd0]">Viewer</option>
            </select>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#d97757] hover:bg-[#e08365] text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Member</span>
            </button>
          </form>

          {/* Members Table */}
          <div className="border border-[#23343c] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e171b] border-b border-[#23343c] text-[11px] font-semibold text-[#9eb0b7] uppercase">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#19262d]">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#18242a]">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#e8dfd0]">{member.name}</p>
                      <p className="text-[11px] text-[#65777e]">{member.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0c1519] text-[#cf9d7b] text-[11px] font-medium border border-[#23343c]">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {member.role !== 'Owner' && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                          title="Remove member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === 'security' && (
        <div className="bg-[#131e24] border border-[#23343c] rounded-[24px] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#23343c] pb-4">
            <h2 className="font-serif text-xl text-[#e8dfd0] font-medium">
              Security & Password
            </h2>
            <p className="text-xs text-[#9eb0b7] mt-0.5">
              Protect your organization account with strong credentials.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Password updated successfully.');
            }}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#9eb0b7] mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#0c1519] border border-[#23343c] rounded-xl text-xs text-[#e8dfd0] focus:outline-none focus:border-[#cf9d7b]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#9eb0b7] mb-1.5">
                New Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full px-4 py-2.5 bg-[#0c1519] border border-[#23343c] rounded-xl text-xs text-[#e8dfd0] focus:outline-none focus:border-[#cf9d7b]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#9eb0b7] mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                className="w-full px-4 py-2.5 bg-[#0c1519] border border-[#23343c] rounded-xl text-xs text-[#e8dfd0] focus:outline-none focus:border-[#cf9d7b]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#d97757] hover:bg-[#e08365] text-white rounded-xl text-xs font-medium shadow-md transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrganizerSettings;

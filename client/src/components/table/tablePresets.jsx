import AppBadge from "@/components/common/AppBadge";
import AppButton from "@/components/common/AppButton";
import { MoreHorizontal } from "lucide-react";

export const sampleUsers = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav.mehta@dashboard.app",
    role: "Super Admin",
    status: "Active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Nisha Patel",
    email: "nisha.patel@dashboard.app",
    role: "Admin",
    status: "Active",
    lastActive: "15 min ago",
  },
  {
    id: 3,
    name: "Kabir Shah",
    email: "kabir.shah@dashboard.app",
    role: "Editor",
    status: "Pending",
    lastActive: "Invited today",
  },
  {
    id: 4,
    name: "Isha Verma",
    email: "isha.verma@dashboard.app",
    role: "Viewer",
    status: "Inactive",
    lastActive: "3 days ago",
  },
  {
    id: 5,
    name: "Rohan Sethi",
    email: "rohan.sethi@dashboard.app",
    role: "Admin",
    status: "Active",
    lastActive: "45 min ago",
  },
  {
    id: 6,
    name: "Maya Kapoor",
    email: "maya.kapoor@dashboard.app",
    role: "Editor",
    status: "Pending",
    lastActive: "Awaiting approval",
  },
];

export const invitationRows = [
  {
    id: "inv-001",
    email: "ananya.rao@authrol.app",
    role: "ADMIN",
    status: "Pending",
    expiry: "10 Mar 2026",
  },
  {
    id: "inv-002",
    email: "rahul.menon@authrol.app",
    role: "EDITOR",
    status: "Accepted",
    expiry: "09 Mar 2026",
  },
  {
    id: "inv-003",
    email: "meera.kapoor@authrol.app",
    role: "VIEWER",
    status: "Pending",
    expiry: "11 Mar 2026",
  },
  {
    id: "inv-004",
    email: "aditya.singh@authrol.app",
    role: "ADMIN",
    status: "Accepted",
    expiry: "08 Mar 2026",
  },
];

const userRoleVariants = {
  "Super Admin": "dark",
  Admin: "neutral",
  Editor: "info",
  Viewer: "neutral",
};

const userStatusVariants = {
  Active: "success",
  Pending: "warning",
  Inactive: "neutral",
};

const invitationRoleVariants = {
  ADMIN: "dark",
  EDITOR: "info",
  VIEWER: "neutral",
};

const invitationStatusVariants = {
  Pending: "warning",
  Accepted: "success",
};

const renderPrimaryText = (primary, secondary) => (
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-slate-900">{primary}</p>
    {secondary ? <p className="truncate text-sm text-slate-500">{secondary}</p> : null}
  </div>
);

const renderActionButton = (label) => (
  <AppButton variant="ghost" size="icon" aria-label={label}>
    <MoreHorizontal size={16} />
  </AppButton>
);

export const userTableColumns = [
  {
    key: "user",
    label: "User",
    width: "w-[38%]",
    render: (user) => renderPrimaryText(user.name, user.email),
  },
  {
    key: "role",
    label: "Role",
    width: "w-[18%]",
    render: (user) => <AppBadge variant={userRoleVariants[user.role]}>{user.role}</AppBadge>,
  },
  {
    key: "status",
    label: "Status",
    width: "w-[18%]",
    render: (user) => <AppBadge variant={userStatusVariants[user.status]}>{user.status}</AppBadge>,
  },
  {
    key: "lastActive",
    label: "Last Active",
    width: "w-[18%]",
    render: (user) => <span className="text-sm text-slate-500">{user.lastActive}</span>,
  },
  {
    key: "actions",
    label: "",
    width: "w-[8%]",
    align: "right",
    render: (user) => renderActionButton(`Open actions for ${user.name}`),
  },
];

export const invitationColumns = [
  {
    key: "email",
    label: "Email",
    width: "w-[42%]",
    render: (invitation) => renderPrimaryText(invitation.email),
  },
  {
    key: "role",
    label: "Role",
    width: "w-[18%]",
    render: (invitation) => (
      <AppBadge variant={invitationRoleVariants[invitation.role]}>{invitation.role}</AppBadge>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "w-[18%]",
    render: (invitation) => (
      <AppBadge variant={invitationStatusVariants[invitation.status]}>
        {invitation.status}
      </AppBadge>
    ),
  },
  {
    key: "expiry",
    label: "Expiry",
    width: "w-[22%]",
    render: (invitation) => <span className="text-sm text-slate-500">{invitation.expiry}</span>,
  },
];

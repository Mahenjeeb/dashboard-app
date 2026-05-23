import TextField from "./TextField";
import SelectField from "./SelectField";

function EmailRoleForm({ formData, onChange, roles }) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Email address</span>
        <TextField
          className="h-10 bg-white"
          placeholder="name@company.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Role</span>
        <SelectField
          className="h-10"
          name="roleForUser"
          value={formData.roleForUser}
          onChange={onChange}
        >
          <option value="" key="select">
            -- Select a Role --
          </option>
          {roles.map((role) => (
            <option value={role.role} key={role._id}>
              {role.role.toUpperCase()}
            </option>
          ))}
        </SelectField>
      </label>
    </div>
  );
}

export default EmailRoleForm;

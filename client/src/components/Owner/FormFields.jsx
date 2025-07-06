import React from 'react';

export const InputField = ({ label, name, value, type = 'text', placeholder, onChange }) => (
  <div className="flex flex-col gap-1 group">
    <label className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))}
      required
      className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-300 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 shadow-md"
    />
  </div>
);

export const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col gap-1 group">
    <label className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition">{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))}
      required
      className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-md border border-slate-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-md"
    >
      <option value="">Select a {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

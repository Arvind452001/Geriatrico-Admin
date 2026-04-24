import { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    confidenceThreshold: 70,
    autoApprove: false,
    lowConfidenceAlert: true,

    pushNotifications: true,
    emailAlerts: false,
    summaryTime: "09:00",

    language: "en",
    recordsPerPage: 5,
    theme: "light",

    name: "Admin",
    email: "admin@test.com",
    password: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  return (
    <div className="p-3">

      {/* 🔹 AI Settings */}
      <div className="card mb-3 p-3">
        <h6>AI Settings</h6>

        <div className="mb-2">
          <label>Confidence Threshold (%)</label>
          <input
            type="number"
            className="form-control"
            name="confidenceThreshold"
            value={settings.confidenceThreshold}
            onChange={handleChange}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="autoApprove"
            checked={settings.autoApprove}
            onChange={handleChange}
          />
          <label className="form-check-label">Auto Approve Predictions</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="lowConfidenceAlert"
            checked={settings.lowConfidenceAlert}
            onChange={handleChange}
          />
          <label className="form-check-label">Low Confidence Alerts</label>
        </div>
      </div>

      {/* 🔹 Notification Settings */}
      <div className="card mb-3 p-3">
        <h6>Notification Settings</h6>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="pushNotifications"
            checked={settings.pushNotifications}
            onChange={handleChange}
          />
          <label className="form-check-label">Push Notifications</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="emailAlerts"
            checked={settings.emailAlerts}
            onChange={handleChange}
          />
          <label className="form-check-label">Email Alerts</label>
        </div>

        <div className="mt-2">
          <label>Daily Summary Time</label>
          <input
            type="time"
            className="form-control"
            name="summaryTime"
            value={settings.summaryTime}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 🔹 App Settings */}
      <div className="card mb-3 p-3">
        <h6>App Settings</h6>

        <div className="mb-2">
          <label>Language</label>
          <select
            className="form-select"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Records per page</label>
          <input
            type="number"
            className="form-control"
            name="recordsPerPage"
            value={settings.recordsPerPage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Theme</label>
          <select
            className="form-select"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* 🔹 Account Settings */}
      <div className="card mb-3 p-3">
        <h6>Account Settings</h6>

        <div className="mb-2">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={settings.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={settings.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Change Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={settings.password}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 🔹 Save Button */}
      <div className="text-end">
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>

    </div>
  );
}
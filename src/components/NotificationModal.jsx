import React, { useState } from "react";

const NotificationModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    notification_type: "general",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", message: "", notification_type: "general" });
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Send Notification</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                <input
                  type="text"
                  name="title"
                  className="form-control mb-3"
                  placeholder="Enter title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="message"
                  className="form-control mb-3"
                  rows={4}
                  placeholder="Enter message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />

                <select
                  name="notification_type"
                  className="form-select"
                  value={form.notification_type}
                  onChange={handleChange}
                >
                  <option value="general">General</option>
                  <option value="alert">Alert</option>
                </select>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary">Send</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default NotificationModal;
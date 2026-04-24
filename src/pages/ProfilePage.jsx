import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getImageUrl,
  getProfileApi,
  IMAGE_URL,
  updateProfile,
} from "../api/auth";
import Loader from "../components/Loader";

// ==================== Main Profile Component ====================
const ProfilePage = () => {
  // State
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form fields
  const [editForm, setEditForm] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    gstNumber: "",
    websiteName: "",
  });

  // Image upload
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProfileApi();
      console.log("aaaa", res.partner);
      if (res.success && res.partner) {
        setProfileData(res.partner);
        if (!editMode) populateEditForm(res.partner);
      } else {
        setError("Failed to load profile data");
      }
    } catch (err) {
      setError("Network error while fetching profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const populateEditForm = (partner) => {
    setEditForm({
      companyName: partner.companyName || "",
      ownerName: partner.ownerName || "",
      email: partner.email || "",
      phone: partner.phone || "",
      country: partner.country || "",
      state: partner.state || "",
      city: partner.city || "",
      gstNumber: partner.gstNumber || "",
      websiteName: partner.websiteName || "",
    });
    if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setSelectedImageFile(null);
    setImagePreviewUrl(partner.profileImage || null);
  };

  const handleEditClick = () => {
    if (profileData) {
      populateEditForm(profileData);
      setEditMode(true);
      setError(null);
      setSuccessMsg(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      const newPreview = URL.createObjectURL(file);
      setImagePreviewUrl(newPreview);
      setSelectedImageFile(file);
    } else {
      setImagePreviewUrl(profileData?.profileImage || null);
      setSelectedImageFile(null);
    }
  };

  const handleCancel = () => {
    if (profileData) populateEditForm(profileData);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setEditMode(false);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const formDataObj = new FormData();
      formDataObj.append("companyName", editForm.companyName);
      formDataObj.append("ownerName", editForm.ownerName);
      formDataObj.append("email", editForm.email);
      formDataObj.append("phone", editForm.phone);
      formDataObj.append("country", editForm.country);
      formDataObj.append("state", editForm.state);
      formDataObj.append("city", editForm.city);
      formDataObj.append("gstNumber", editForm.gstNumber);
      formDataObj.append("websiteName", editForm.websiteName);
      if (selectedImageFile) {
        formDataObj.append("profileImage", selectedImageFile);
      }

      const response = await updateProfile(formDataObj);
      if (response.success) {
        setProfileData(response.partner);
        // setSuccessMsg('Profile updated successfully!');
        alert("Profile updated successfully");
        setEditMode(false);
        fetchProfile();
        if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
        setSelectedImageFile(null);

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong while saving.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Auto-dismiss success message
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Helper rendering functions
  const renderLicenseInfo = () => {
    if (!profileData?.license) return null;
    const lic = profileData.license;
    return (
      <div className="bg-light p-3 rounded-3 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>
            <i className="bi bi-gem me-1"></i>{" "}
            <strong>Plan: {lic.planType}</strong>
          </span>
          <span>
            <i className="bi bi-people me-1"></i> Customers: {lic.usedCustomers}
          </span>
          <span>
            <i className="bi bi-person-badge me-1"></i> Providers:{" "}
            {lic.usedProviders}
          </span>
          <span
            className={`badge ${lic.isActive ? "bg-success" : "bg-secondary"}`}
          >
            {lic.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    );
  };

  const renderProviders = () => {
    const providers = profileData?.providers || [];

    if (!providers.length)
      return <p className="text-muted">No providers assigned</p>;

    const visibleProviders = providers.slice(0, 5); // ✅ only 5

    return (
      <>
        <div className="table-responsive">
          <table className="table table-sm table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visibleProviders.map((prov) => (
                <tr key={prov._id}>
                  <td className="fw-medium">{prov.name}</td>
                  <td>{prov.specialization || "—"}</td>

                  <td>
                    <span
                      className={`badge ${
                        prov.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {prov.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 SEE MORE BUTTON */}
        {providers.length > 5 && (
          <div className="text-end mt-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/providers")}
            >
              See More →
            </button>
          </div>
        )}
      </>
    );
  };

  const renderServices = () => {
    if (!profileData?.services?.length)
      return <p className="text-muted">No services offered</p>;
    return (
      <div className="row g-3">
        {profileData.services.map((serv) => (
          <div className="col-md-6" key={serv._id}>
            <div className="border rounded-3 p-3 h-100 bg-white">
              <h6 className="fw-bold mb-1">{serv.name}</h6>
              <p className="small text-muted mb-2">
                Duration: {serv.duration} min
              </p>
              <span className="fw-semibold text-primary">${serv.price}</span>
              {!serv.isActive && (
                <span className="badge bg-secondary ms-2">Inactive</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading && !profileData) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          {/* <p className="text-muted"><Loader/></p> */}
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="container">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            {error}{" "}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={fetchProfile}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="card border-0 rounded-4 shadow-sm overflow-hidden">
        <div className="bg-primary bg-gradient p-4 text-white d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div
              className="position-relative"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src={getImageUrl(profileData?.profileImage)}
                alt="profile"
                className="rounded-circle"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="mb-0 fw-bold">
                {profileData?.companyName || "Partner"}
              </h3>
              <p className="mb-0 opacity-75">
                <i className="bi bi-envelope me-1"></i> {profileData?.email}
              </p>
            </div>
          </div>
          {!editMode && (
            <button
              className="btn btn-light rounded-pill px-4 mt-3 mt-md-0 shadow-sm"
              onClick={handleEditClick}
              disabled={saving}
            >
              <i className="bi bi-pencil-square me-2"></i> Edit Profile
            </button>
          )}
        </div>

        <div className="p-4 p-md-5">
          {successMsg && (
            <div
              className="alert alert-success alert-dismissible fade show mb-4"
              role="alert"
            >
              <i className="bi bi-check-circle-fill me-2"></i> {successMsg}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMsg(null)}
              ></button>
            </div>
          )}
          {error && editMode && (
            <div className="alert alert-danger mb-4">{error}</div>
          )}

          {editMode ? (
            // Edit Mode
            <>
              <div className="text-center mb-4 pb-2 border-bottom">
                <div className="mb-3">
                  <img
                    src={
                      imagePreviewUrl ||
                      "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt="Preview"
                    className="rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      border: "2px solid #dee2e6",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="profileImageUpload"
                    className="btn btn-outline-secondary btn-sm rounded-pill"
                  >
                    <i className="bi bi-cloud-upload me-2"></i> Change Image
                  </label>
                  <input
                    type="file"
                    id="profileImageUpload"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="d-none"
                  />
                  <p className="small text-muted mt-2 mb-0">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={editForm.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ownerName"
                    value={editForm.ownerName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={editForm.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={editForm.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={editForm.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">GST Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gstNumber"
                    value={editForm.gstNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    name="websiteName"
                    value={editForm.websiteName}
                    onChange={handleInputChange}
                    placeholder="example.com"
                  />
                </div>
              </div>

              <hr className="my-4" />
              <div className="alert alert-secondary">
                <i className="bi bi-info-circle-fill me-2"></i> Providers &
                Services cannot be edited here (contact support)
              </div>

              <div className="d-flex flex-wrap gap-3 justify-content-end mt-5 pt-3 border-top">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <i className="bi bi-x-lg me-1"></i> Cancel
                </button>
                <button
                  className="btn btn-primary px-5"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle me-2"></i> Save Changes
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            // View Mode
            <>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="text-muted small text-uppercase fw-semibold">
                    Company Name
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.companyName || "—"}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    Owner Name
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.ownerName || "—"}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    Email Address
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.email || "—"}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    Phone Number
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.phone || "—"}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small text-uppercase fw-semibold">
                    Location
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.city}, {profileData.state},{" "}
                    {profileData.country}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    GST Number
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.gstNumber || "—"}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    Website
                  </div>
                  <div className="mb-3 fw-medium">
                    {profileData.websiteName ? (
                      <a
                        href={`https://${profileData.websiteName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profileData.websiteName}
                      </a>
                    ) : (
                      "—"
                    )}
                  </div>
                  <div className="text-muted small text-uppercase fw-semibold">
                    Account Status
                  </div>
                  <div className="fw-medium">
                    <span className="badge bg-success me-2">
                      {profileData.status}
                    </span>
                    {profileData.isEmailVerified && (
                      <i
                        className="bi bi-check-circle-fill text-success"
                        title="Email verified"
                      ></i>
                    )}
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <div className="section-title fw-bold fs-5 mb-3">
                License & Plan
              </div>
              {renderLicenseInfo()}

              <div className="section-title fw-bold fs-5 mb-3 mt-4">
                Services ({profileData.services?.length || 0})
              </div>
              {renderServices()}

              <div className="section-title fw-bold fs-5 mb-3 mt-4">
                Providers ({profileData.providers?.length || 0})
              </div>
              {renderProviders()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = 'Le nom est requis.';
    }
    if (!formData.email) {
      errors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "L'email est invalide.";
    }
    if (!formData.message) {
      errors.message = 'Le message est requis.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Old Standard TT' }}>
        Contactez-nous
      </h1>

      {isSubmitted ? (
        <div className="alert alert-success text-center">
          Merci pour votre message. Nous vous répondrons bientôt !
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-light p-4 rounded shadow-sm"
          style={{ maxWidth: '600px' }}
        >
          {/* Nom */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Nom :
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
              style={{ borderRadius: '8px' }}
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email :
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              style={{ borderRadius: '8px' }}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>

          {/* Message */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-bold">
              Message :
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
              style={{ borderRadius: '8px' }}
            />
            {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#FF7E33',
              borderColor: '#FF7E33',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px'
            }}
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;

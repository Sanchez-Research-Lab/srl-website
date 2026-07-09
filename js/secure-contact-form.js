(function () {
  const forms = document.querySelectorAll('[data-secure-contact-form]');

  function getStatusElement(form) {
    return document.getElementById(`${form.id}Status`);
  }

  function getThanksElement(form) {
    return document.getElementById(`${form.id}Thanks`);
  }

  function setStatus(form, message) {
    const status = getStatusElement(form);
    if (status) {
      status.textContent = message;
    }
  }

  function setSubmitting(form, isSubmitting) {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = isSubmitting;
      button.textContent = isSubmitting ? 'Sending...' : button.dataset.originalText;
    }
  }

  forms.forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.dataset.originalText = button.textContent;
    }

    const startedAt = form.querySelector('input[name="started_at"]');
    if (startedAt) {
      startedAt.value = String(Date.now());
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const captchaResponse = form.querySelector('[name="h-captcha-response"]');
      if (!captchaResponse || !captchaResponse.value) {
        setStatus(form, 'Please complete the human verification before submitting.');
        return;
      }

      setSubmitting(form, true);
      setStatus(form, 'Sending your message...');

      try {
        const response = await fetch(form.dataset.endpoint || '/api/contact', {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Form submission failed.');
        }

        form.reset();
        form.classList.add('d-none');

        const thanks = getThanksElement(form);
        if (thanks) {
          thanks.classList.remove('d-none');
        }

        if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
          window.hcaptcha.reset();
        }
      } catch (error) {
        setStatus(form, 'Sorry, your message could not be sent. Please try again later.');
        if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
          window.hcaptcha.reset();
        }
      } finally {
        setSubmitting(form, false);
      }
    });
  });
}());

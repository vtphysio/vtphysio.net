vtphsio = {
    initAppointmentForm: function(){
        const modal = document.getElementById('modal');
        const open = document.getElementById('openModal');
        const close = document.getElementById('closeModal');
        const form = document.getElementById('assessment-form');
        const formFieldsContainer = document.getElementById('assessment-form-container');
        const messageDiv = document.getElementById('form-message');


        open.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });

        close.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });

        // Optional: close modal when clicking outside the form
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            //form els
            const nameEl = form.querySelector('[name="name"]');
            const emailEl = form.querySelector('[name="email"]');
            const phoneEl = form.querySelector('[name="phone"]');
            const commentEl = form.querySelector('[name="comment"]');
            const contactviaEl = form.querySelector('[name="contactvia"]');

            //data assignment
            let data = {
                name: nameEl.value.trim(),
                email: emailEl.value.trim(),
                phone: phoneEl.value.trim(),
                comment: commentEl.value.trim(),
                contactvia: contactviaEl.value
            };

            //validation
            if(data.contactvia === "phone"){
                phoneEl.required = true;
                emailEl.required = false;
            } else {
                phoneEl.required = false;
                emailEl.required = true;
            }
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            //submit
            messageDiv.textContent = 'Submitting...';
            messageDiv.className = 'text-sm font-medium mt-2 text-center text-gray-600';
            fetch('https://coms.bravesteps.net/webhook/c2c46b41-e857-4744-a353-dc8a531a3713-brave-steps/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.text();
                })
                .then(() => {
                    messageDiv.textContent = 'Thank you! Your request was sent successfully.';
                    messageDiv.className = 'font-semibold font-medium mt-4 text-green-600';
                    const controls = form.querySelectorAll('.assessment-form-controls');
                    controls.forEach(el => el.classList.add('hidden'));
                    form.reset();
                })
                .catch(() => {
                    messageDiv.innerHTML = `<span class="text-red-600">Something went wrong. Please try again.</span>`;
                    messageDiv.className = 'text-sm font-medium mt-2 text-center';
                });
        });
    },
    initEmailActions: function () {
        let els = document.querySelectorAll(".email-action");
        console.log(els.length);
        let domain = window.location.hostname.replace("www.", "");
        els.forEach(function (el) {
            el.addEventListener("click", function () {
                let name = el.getAttribute("data-ename");
                let subject = el.getAttribute("data-esubject");
                if(!subject) subject = "Website Enquiry";
                let destination = name + "@" + domain;
                window.location.href = "mailto:" + destination + "?subject=" + subject;
            });
        });
    },
    initYear: function(){
        let el = document.getElementById('copyright-year')
        let year = new Date().getFullYear();
        el.innerHTML = year;
    },
    initEvents: function(){
        this.initEmailActions();
        this.initYear();
        this.initAppointmentForm();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    vtphsio.initEvents();
});
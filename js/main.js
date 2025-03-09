vtphsio = {
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
    }
}

document.addEventListener("DOMContentLoaded", function () {
    vtphsio.initEvents();
});
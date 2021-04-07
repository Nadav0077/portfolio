'use strict'

initPage();

function initPage() {
    renderProjs();
    renderModals()
    animateFavicon();
}

function renderProjs() {
    var idx = 1;
    document.getElementById('portfolio').querySelector('.row').innerHTML = getProjs().map(function(proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx}">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="img/portfolio/0${idx++}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
        </div>
    </div>`
    }).join('');
}

function renderModals() {
    document.querySelector('.modals').innerHTML = getProjs().map(function(proj, idx) {
        return ` <div class="portfolio-modal modal fade" id="portfolioModal${idx+1}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                    <div class="lr">
                        <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <!-- Project Details Go Here -->
                                <h2>${proj.name}</h2>
                                <p class="item-intro text-muted">${proj.title}</p>
                                <img class="img-fluid d-block mx-auto" src="img/portfolio/0${idx+1}.jpg" alt="">
                                <p>${proj.desc}</p>
                                <ul class="list-inline">
                                    <li>Date: ${getDate(proj.publishedAt)}</li>
                                    <li>Client: ${proj.client}</li>
                                    <li>Category: ${proj.category}</li>
                                    <li> &#10240 </li>
                                    <li> <a href="${proj.url}" class="btn btn-primary stretched-link" target="_blank">Try ${proj.name}</a></li>
                                </ul>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
    }).join('');
}

function onSendMsg() {
    var email = document.querySelector('input[name=email]').value;
    var subject = document.querySelector('input[name=subject]').value;
    console.log(email, subject)
    var message = document.querySelector('textarea[name=message]').value;
    OpenNewWindow(`https://mail.google.com/mail/?view=cm&fs=1&to=nadav1410@gmail.com&su=${subject}&body=${message}`)

}

function OpenNewWindow(MyPath) {
    window.open(MyPath, "", "toolbar=no,status=no,menubar=no,location=center,scrollbars=no,resizable=no,height=500,width=657");
}

function animateFavicon() {

    var favicon_images = [],
        image_counter = 0; // To keep track of the current image
    for (var i = 0; i < 88; i++) {
        favicon_images.push(`img/favicon/frame_${i}_delay-0.25s.gif`)
    }


    setInterval(function() {
        // remove current favicon
        if (document.querySelector("link[rel='icon']") !== null)
            document.querySelector("link[rel='icon']").remove();
        if (document.querySelector("link[rel='shortcut icon']") !== null)
            document.querySelector("link[rel='shortcut icon']").remove();

        // add new favicon image
        document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="icon" href="' + favicon_images[image_counter] + '" type="image/gif">');

        // If last image then goto first image
        // Else go to next image    
        if (image_counter == favicon_images.length - 1)
            image_counter = 0;
        else
            image_counter++;
    }, 200);
}
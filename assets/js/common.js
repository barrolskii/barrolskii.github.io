function myOnClick () {
    var bodyTag = document.getElementsByTagName('body')[0];
    const sidebarAtrribute = 'sidebar-display';

    if (bodyTag.hasAttribute(sidebarAtrribute)) {
        bodyTag.removeAttribute(sidebarAtrribute);
    } else {
        bodyTag.setAttribute(sidebarAtrribute , '');
    }
}

function toggleTheme() {
  var htmlTag = document.getElementsByTagName('html')[0];
  const attribute = 'data-mode';
  if (htmlTag.hasAttribute(attribute)) {
    htmlTag.removeAttribute(attribute);
  } else {
    htmlTag.setAttribute(attribute, 'light');
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setDescription() {
    var descriptionTag = document.getElementsByClassName('site-subtitle')[0];

    if (descriptionTag === null) {
        console.error('Could not find description tag');
        return;
    }

    const descriptions = [
        'Build Engineer',
        'I\'m not actually a ghost',
        '200k+ gamerscore and counting',
        'Learning more languages than I need to',
        'Fixing bugs. Writing more...'
    ];

    var value = getRandomInt(descriptions.length);

    descriptionTag.innerText = descriptions[value];
}

document.addEventListener('scroll', (event) => {
    var toTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 50) {
        toTopButton.style.display = 'inline-block';
    } else {
        toTopButton.style.display = 'none';
    }
});


var toTopButton = document.getElementById('back-to-top');
toTopButton.addEventListener('click', () => {
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
});

setDescription();


class Carrousel {
    constructor(images, htmlId) {
        this.images = images;
        this.htmlId = htmlId;
        this.carrouselImageContainer = document.getElementById(htmlId);
        this.indexActuel = 0;
        this.carouselElement = document.createElement('img'); 
        this.display();
    }
    display = () => {
        this.carouselElement.setAttribute('alt', "Alternative text");
        this.carouselElement.setAttribute('src', this.images[this.indexActuel]);

        this.carrouselImageContainer.appendChild(this.carouselElement);
    }
    suivant = () => {
        if (!this.images[this.indexActuel + 1]) {
            this.indexActuel = 0;
        } else {
            this.indexActuel += 1;
        }
        this.display()
    }
    precedent = () => {
        
        if (!this.images[this.indexActuel - 1]) {
            this.indexActuel = this.images.length - 1;
        } else {
            this.indexActuel -= 1;
        }
        this.display()
    }
}

const imagesArray = ["https://img.freepik.com/photos-gratuite/vue-dessus-du-sable-rencontre-eau-mer_158595-6255.jpg?w=1380&t=st=1678359058~exp=1678359658~hmac=57e2d84d6b6193a6d330a8d652229dc1737a7f023d765b3bc3d03a8e9070665a", "https://img.freepik.com/photos-gratuite/3d-rendu-paysage-tropical-palmiers-mer-bleue_1048-6386.jpg?w=1380&t=st=1678358918~exp=1678359518~hmac=d84aa977db4b8fe197a62e3bb539c1e26dc00a10be611a64c67d59e5838fa8df", "https://img.freepik.com/photos-gratuite/fond-eau-mer_64049-164.jpg?w=1380&t=st=1678358958~exp=1678359558~hmac=e3adda73ae251b907d8de4fa8917807ef19d87f50959c4f384850ea1c760bae2"]
const carrousel1 = new Carrousel(imagesArray, "carouselContent")

const previousArrow = document.getElementById('arrowLeft');
const nextArrow = document.getElementById('arrowRight');


previousArrow.addEventListener('click', () => carrousel1.precedent())
nextArrow.addEventListener('click', () => carrousel1.suivant())

setInterval(() => {
    carrousel1.suivant()
}, 3000);


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstNameInput = document.getElementById("firstName");
    const emailInput = document.getElementById("email");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value,

    }
    
    const errors = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        message: false

    }

    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const lastNameError = document.getElementById('lastNameError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    firstNameError.style.display = 'none';
    emailError.style.display = 'none';
    lastNameError.style.display = 'none';
    phoneError.style.display = 'none';
    messageError.style.display = 'none';



    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const nameRegex = /^[a-zA-Z ]+$/
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/



    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        errors.firstName = true;
        firstNameError.style.display = 'block';
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        errors.lastName = true;
        lastNameError.style.display = 'block';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = true;
        emailError.style.display = 'block';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
        errors.phone = true;
        phoneError.style.display = 'block';
    }
    if (!formData.message || formData.message.length < 4) {
        errors.message = true;
        messageError.style.display = 'block';
    }


    if (!Object.values(errors).includes(true)) {
        console.log(formData)
        axios.post(' http://212.83.176.255:3030/contact', formData)

            .then((response) => {
                console.log(response.data);
            })

            .catch((error) => {
                console.error(error);
            });
    }

})


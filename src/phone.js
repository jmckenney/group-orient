const Phone = {};

const createPhoneElement = function(key) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("phone");
    newDiv.setAttribute("id", key);
    return newDiv;
};

const createPhone = (element) => {
    return {
        rotate: function(gamma) {
            this.element.style.transform =
            "rotateZ(1deg) " +
            "rotateX(45deg) " +
            "rotateY(" + (gamma) + "deg) " +
            "skew(-3deg)";
        },
        element: element
    }
};

Phone.createPhone = createPhone;
Phone.createPhoneElement = createPhoneElement;

export default Phone;
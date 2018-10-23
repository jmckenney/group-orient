const phone = (element) => {
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

const createPhone = function(key) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("phone");
    newDiv.setAttribute("id", key);
    return phone(newDiv);
}

test('this is true', () => {
    const phone = createPhone("picklecat1");
    expect(phone.element.getAttribute("id")).toBe("picklecat");
});
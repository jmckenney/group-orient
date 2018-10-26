import Phone from '../phone';

describe("Phone", () => {
    let element;

    beforeEach(() => {
        element = Phone.createPhoneElement("pickle-hernia");
    });

    test('#createElement', () => {
        expect(element.getAttribute("id")).toBe("pickle-hernia");
    });
    
    test('#createPhone', () => {
        const phone = Phone.createPhone(element);
        expect(phone.element).toBe(element);
    });
});


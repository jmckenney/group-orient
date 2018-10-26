import utils from '../index';

test('creation of phone element', () => {
    const phoneElement = utils.createPhoneElement("picklecat1");
    expect(phoneElement.getAttribute("id")).toBe("picklecat1");
});
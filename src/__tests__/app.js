import App from '../app';

describe("#addPhonesToPage", () => {
    let users;
    let josh;
    let brian;
    let spy;
    let firebase;
    let database;
    let auth;
    let afterPhonesAddedToPage;

    beforeEach(() => {
        josh = {};
        brian = {};

        users = {
            josh: josh, 
            brian: brian
        };
        jest.spyOn(document.body, "appendChild");
        afterPhonesAddedToPage = jest.fn();
        document.body.appendChild.mockClear();
    });

    it("Adds Elements to document", () => {
        App.addPhonesToPage(users, afterPhonesAddedToPage);
        expect(document.body.appendChild).toHaveBeenCalledTimes(2);
        expect(afterPhonesAddedToPage).toHaveBeenCalled();
    });
});
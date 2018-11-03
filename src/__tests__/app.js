import App from '../app';

describe("#addPhonesToPage", () => {
    let users;
    let josh;
    let brian;
    let spy;

    beforeEach(() => {
        // MOCK FIREBASE??
        // users?
        josh = {};
        brian = {};

        users = [josh, brian];
        spy = spyOn(document.body, "appendChild");
    });

    it("Adds Elements to document", () => {
        App.addPhonesToPage(users);

        users.forEach(() => {
            expect(spy).toHaveBeenCalled();
        });
        
        // for each users
        // expect document.body.appendChild() to have been called with user
    });
});
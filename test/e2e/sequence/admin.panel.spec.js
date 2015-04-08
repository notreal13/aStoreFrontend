describe('Should login as admin and open admin panel:', function() {

    var gridTestUtils = require('../../../test/gridTestUtils.spec.js');
    var menu;

    it('open start page', function() {
        browser.get('http://localhost:9000');

        menu = element(by.binding('main.userInfo.firstName'));
        menu.getText().then(function(text) {
            expect(text).toBe('anonymous');
        });
    });

    it('go to login page', function() {
        menu.click();

        element(by.id('a_login')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/login');
    });

    it('login', function() {
        element(by.model('login.credentials.username')).sendKeys('notreal@mail.ru');
        element(by.model('login.credentials.password')).sendKeys('123');

        element(by.css('.btn-success')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
    });

    it('open admin panel', function() {
        menu.click();
        element(by.id('a_admin')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/admin/infoAdmin');
    });

    it('open tickets', function() {
        element(by.id('a_ticketAdmin')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/admin/ticketAdmin');
    });

    it('load tickets grid', function() {
        gridTestUtils.expectHeaderColumnCount('gridTicket', 7);
    });

    it('logout', function() {
        menu.click();
        element(by.id('a_logout')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
        menu.getText().then(function(text) {
            expect(text).toBe('anonymous');
        });
    });
});
describe('Should login and show history of orders:', function() {
    var menu;

    it('open start page', function() {
        browser.get('http://localhost:9000');
        element(by.id('menu_language')).click();
        element(by.id('lang_en')).click();

        menu = element(by.binding('main.userInfo.firstName'));
        menu.getText().then(function(text) {
            expect(text).toBe('anonymous');
        });
    });

    it('open login page', function() {
        menu.click();
        element(by.id('a_login')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/login');
    });

    it('login', function() {
        element(by.model('login.credentials.username')).sendKeys('oleg@setco.ru');
        element(by.model('login.credentials.password')).sendKeys('123');
        element(by.css('.btn-success')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
    });

    it('open orders history', function() {
        menu.click();
        element(by.id('a_my_orders')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/order');

    });

    it('check first order', function() {
        element(by.repeater('curOrder in order.allOrders').row(0)).click();

        var tickets = element.all(by.repeater('ticket in order.selectedOrder.orderedTicketList'));
        expect(tickets.count()).toBe(3);
    });

    it('check details of order', function() {
        var types = element.all(by.repeater('ticket in order.selectedOrder.orderedTicketList').column('ticket.ticket.name')).map(function(element) {
            return element.getText();
        });
        expect(types).toContain('adult');
        expect(types).toContain('child1');

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
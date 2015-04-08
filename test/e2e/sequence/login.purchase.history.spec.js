describe('Should login, purchase and check history:', function() {

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

    it('empty cart', function() {
        browser.get('http://localhost:9000');

        element(by.id('menu_language')).click();
        element(by.id('lang_en')).click();
        element(by.id('label_cart_empty')).getText().then(function(text) {
            expect(text).toBe('Empty');
        });
    });

    it('add first ticket(MAN) to cart', function() {
        arrow_krym = element(by.className('arrow-krym')).click();

        element(by.id('a_man')).click();
        element(by.id('btn_adult')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('1 item');
        });
    });

    it('add second ticket(MAN) to cart', function() {
        element(by.id('btn_adult')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('2 items');
        });
    });

    it('add thirt ticket(MAN) to cart', function() {
        element(by.id('btn_child1')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('3 items');
        });
    });


    it('add ticket(VEHICLE) to cart', function() {
        element(by.id('btn_back')).click();

        element(by.id('a_vehicle')).click();
        element(by.id('btn_avto1')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('4 items');
        });
    });

    it('go to purchase form', function() {
        element(by.id('a_cart')).click();
        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/cart');
    })

    it('fill the purchase form completely', function() {
        element(by.id('tr_0')).element(by.name('firstName')).sendKeys('Papa First Name');
        element(by.id('tr_0')).element(by.name('lastName')).sendKeys('Papa Last Name');
        element(by.id('tr_0')).element(by.name('middleName')).sendKeys('Papa Middle Name');
        element(by.id('tr_0')).element(by.name('day')).element(by.css('option[value="5"]')).click();
        element(by.id('tr_0')).element(by.name('month')).element(by.css('option[value="5"]')).click();
        element(by.id('tr_0')).element(by.name('year')).element(by.css('option[value="55"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocumentData')).sendKeys('xxx 111');

        element(by.id('tr_1')).element(by.name('firstName')).sendKeys('Mama First Name');
        element(by.id('tr_1')).element(by.name('lastName')).sendKeys('Mama Last Name');
        element(by.id('tr_1')).element(by.name('middleName')).sendKeys('Mama Middle Name');
        element(by.id('tr_1')).element(by.name('day')).element(by.css('option[value="7"]')).click();
        element(by.id('tr_1')).element(by.name('month')).element(by.css('option[value="7"]')).click();
        element(by.id('tr_1')).element(by.name('year')).element(by.css('option[value="65"]')).click();
        element(by.id('tr_1')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();
        element(by.id('tr_1')).element(by.name('supportingDocumentData')).sendKeys('yyy 222');

        element(by.id('tr_2')).element(by.name('firstName')).sendKeys('Baby First Name');
        element(by.id('tr_2')).element(by.name('lastName')).sendKeys('Baby Last Name');
        element(by.id('tr_2')).element(by.name('middleName')).sendKeys('Baby Middle Name');
        element(by.id('tr_2')).element(by.name('day')).element(by.css('option[value="1"]')).click();
        element(by.id('tr_2')).element(by.name('month')).element(by.css('option[value="1"]')).click();
        element(by.id('tr_2')).element(by.name('year')).element(by.css('option[value="99"]')).click();
        element(by.id('tr_2')).element(by.name('supportingDocument')).element(by.css('option[value="10"]')).click();
        element(by.id('tr_2')).element(by.name('supportingDocumentData')).sendKeys('bb 00');

        element(by.id('tr_3')).element(by.name('licensePlate')).sendKeys('AMP777199');
        element(by.id('tr_3')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();
        element(by.id('tr_3')).element(by.name('supportingDocumentData')).sendKeys('xxCTCxx');

        element(by.id('a_checkout')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/checkout');
    });

    it('check checkout form', function() {
        element(by.name('email')).getAttribute('value').then(function(data) {
            expect(data).toBe('oleg@setco.ru');
        });
        element(by.name('firstName')).getAttribute('value').then(function(data) {
            expect(data).toBe('Олег');
        });
        element(by.name('lastName')).getAttribute('value').then(function(data) {
            expect(data).toBe('Сорокин');
        });
        element(by.name('phone')).getAttribute('value').then(function(data) {
            expect(data).toBe('7755529');
        })

    });

    it('check confirmation number', function() {
        element(by.id('btn_submit')).click();        
        element(by.id('orderId')).getText().then(function(data) {
            expect(isNaN(data)).toEqual(false);
        });
    });

    it('open orders history', function() {
        menu.click();
        element(by.id('a_my_orders')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/order');
    });

    it('check second order', function() {
        element(by.repeater('curOrder in order.allOrders').row(1)).click();
        // browser.pause();
        var tickets = element.all(by.repeater('ticket in order.selectedOrder.orderedTicketList'));

        expect(tickets.count()).toBe(4);
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
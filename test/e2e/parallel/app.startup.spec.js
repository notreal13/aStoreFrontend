describe('Angular application:', function() {

    it('should display the application name...', function() {
        browser.get('http://localhost:9000');
        expect(browser.getTitle()).toEqual('aStore');
    });

    it('should go to category page...', function() {
        var arrow_krym = element(by.className('arrow-krym'));
        arrow_krym.click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/category');
    });

    it('should load some categories from backend...', function() { 
        var catCount = element.all(by.repeater('currentCategory in category.allCategories')).count();
        catCount.then(function(count) {
            expect(count > 0).toBeTruthy();
        });
    })
});
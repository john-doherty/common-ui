define(['./helpers/create-element.js', './helpers/clear-element.js', 'document-register-element'], (createElement, clearElement) => {
    /**
     * Navigation custom web component.
     */
    class Nav extends HTMLElement {
        /**
         * Executes when the element is first created
         * @access private
         * @returns {undefined}
         */
        createdCallback() {
            // Create the element template on creation and store in container
            this.container = createElement(createElement(this, 'nav', {}), 'ul');
        }

        /**
         * Gets an array of navigation links.
         * @returns {Array} an array of navigation links
         */
        get links() {
            return this._links || [];
        }

        /**
         * Sets an array of navigation links.
         * @param {Array} value - an array of navigation links
         */
        set links(value) {
            // When the links change, need to re-render the component
            this._links = value || [];
            this.render();
        }

        /**
         * Gets the selected element in the nav list
         * @returns {HTMLElement} the selected element
         */
        get selected() {
            return this._selected;
        }

        /**
         * Sets the selected element in the nav list
         * @param {HTMLElement} value - the selected element
         */
        set selected(value) {
            this._selected = value;
        }

        /**
         * Gets the index of the link to auto-click on.
         * @returns {number} the index to auto-click
         */
        get autoClickIndex() {
            return (this._autoClickIndex !== undefined) ? this._autoClickIndex : -1;
        }

        /**
         * Sets the index of the link to auto-click on.
         * @param {number} value - the index to auto-click
         */
        set autoClickIndex(value) {
            this._autoClickIndex = value;

            if (value > -1) {
                // get all the child links inside the container
                const items = this.container.querySelectorAll('a');

                // if we have a matching item, execute click event
                if (items[value]) {
                    items[value].click();
                }
            }
        }

        /**
         * Renders the component element
         * @access private
         * @return {undefined}
         */
        render() {
            clearElement(this.container);

            const items = this.links;

            if (Array.isArray(items)) {

                // add a row for each link
                items.forEach(item => {

                    const li = createElement(this.container, 'li');
                    const rel = (item.rel || '').replace(/describedby:/g, '');

                    const link = createElement(li, 'a',
                        {
                            href: item.href,
                            'data-action': 'loadCRUD',
                            'data-rel': rel,
                            'data-href': item.href
                        },
                        item.title
                    );

                    link.onclick = this.eventDelegate.bind(this);
                });
            }
        }

        /**
         * Clears the selected class of the selected item
         * @access private
         * @returns {undefined}
         */
        deselectItem() {
            if (this.selected) {
                this.selected.removeAttribute('data-selected');
            }
        }

        /**
         * Sets the selectedItem to the element passed
         * and sets the selected class on this element
         * @access private
         * @param {HTMLElement} el - the anchor element inside the component
         * @returns {undefined}
         */
        selectItem(el) {
            el.setAttribute('data-selected', 'true');
            this.selected = el;
        }

        /**
         * Manages all internal events on an element
         * @access private
         * @param {object} e - the element that the event happened on
         * @returns {undefined}
         */
        eventDelegate(e = event) {
            const el = e.target || e.srcElement;

            // Deselect the currently selected item
            this.deselectItem();

            // Select the newly clicked item
            this.selectItem(el);
        }

    }

    document.registerElement('ca-nav', Nav);
});
(function () {
	"use strict";

	function Slideshow(element, elements, config) {
		this.element = element;
		this.defaultConfig = {
			in: function (nextElement, complete, previousElement) {
				nextElement.css({
					opacity: 0,
					display: "inline-block"
				}).transition({opacity: 1}, 1500, "easeOutExpo", function () {
					complete();
				});
			},
			out: function (element, complete) {
				element.transition({opacity: 0}, 1500, "easeOutExpo");

				complete();
			},
			start: 0,
			delay: 4000
		};

		this.config = jQuery.extend(this.defaultConfig, config);
		this.elements = elements;

		this.total = this.elements.length;
		this.current = false;
		this.previous = false;

		this.init();
	}

	/**
	 * Init
	 */
	Slideshow.prototype.init = function () {
		this.in();
	};

	/**
	 * In
	 */
	Slideshow.prototype.in = function () {
		var that = this;

		if (this.current === false) {
			this.current = this.config.start;
		} else {
			this.previous = this.current;
			this.current++;

			if (this.current >= this.total) {
				this.current = 0;
			}

			this.currentElement.css("z-index", 1);
		}

		this.currentElement = jQuery(this.elements[this.current]);
		this.currentElement.css("z-index", 2);

		this.config.in(this.currentElement, function () {
			that.inCallback();
		}, jQuery(this.elements[this.previous]));
	};

	/**
	 * In Callback
	 */
	Slideshow.prototype.inCallback = function () {
		var that = this;

		setTimeout(function () {
			that.out();
		}, this.config.delay);
	};

	/**
	 * Out
	 */
	Slideshow.prototype.out = function () {
		var that = this;

		this.config.out(this.currentElement, function () {
			that.outCallback();
		});
	};

	/**
	 * Out Callback
	 */
	Slideshow.prototype.outCallback = function () {
		this.in();
	};

	window.Slideshow = Slideshow;
})();
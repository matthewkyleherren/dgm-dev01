(async () => {
    window.experimentValueFor = function experimentValueFor(
        experimentName,
        key,
        fallback
    ) {
        if (window.statsig === undefined) {
            return fallback;
        }

        return window.statsig.getExperiment(experimentName).get(key, fallback);
    };

    function didLoadPage() {
        document
            .querySelectorAll("*[data-experiment-name]")
            .forEach((element) => {
                const value = experimentValueFor(
                    element.dataset.experimentName,
                    element.dataset.experimentDataValue
                );

                if (value) {
                    element.innerText = value;
                }
            });
    }

    if (window.statsig !== undefined) {
        window.statsig.initializeAsync().then(didLoadPage);
    }
})();
window.API = {
    BASE_URL: "https://mailer.samara.com/api",

    fetch(resource, options = {}) {
        if (window.API.shouldFailNext) {
            window.API.shouldFailNext = false;

            return new Promise((_, reject) => {
                setTimeout(reject, 1000, new Error("forced rejection"))
            })
        }

        return fetch(window.API.BASE_URL + resource, {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        });
    },

    completeAddress(query, session, bias, signal) {
        let url = `/address?query=${query}`;

        if (session) {
            url += `&session=${session}`;
        }

        if (bias) {
            url += `&bias=${bias}`;
        }

        return window.API.fetch(url, { signal });
    },

    subscribe(email, tags) {
        return window.API.fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify({ email, tags })
        });
    },

    contact(body) {
        return window.API.fetch("/contact", {
            method: "POST",
            body
        });
    },

    requestShowroomTour(body) {
        return window.API.fetch("/contact/showroom", {
            method: "POST",
            body
        });
    },

    requestEstimate(body) {
        return window.API.fetch("/contact/estimate", {
            method: "POST",
            body
        });
    },

    orderBegin() {
        return window.API.fetch("/order/create");
    },

    orderFetchBySessionId(id) {
        return window.API.fetch(`/order/${id}`);
    },

    orderUpdate(id, body) {
        return window.API.fetch(`/order/${id}`, {
            method: "PUT",
            body
        });
    },

    orderUpdateUsage(id, useCases) {
        return window.API.fetch(`/order/${id}/usage`, {
            method: "PUT",
            body: JSON.stringify(useCases)
        });
    },

    orderComplete(id, body) {
        return window.API.fetch(`/order/${id}`, {
            method: "POST",
            body
        });
    },

    expand(zip, email, origin, sessionId, address) {
        return window.API.fetch("/expand", {
            method: "POST",
            body: JSON.stringify({
                zip,
                email,
                origin,
                sessionId,
                address
            })
        });
    },

    appointmentSlots(kind, date, zip) {
        let url = `/appointment/${kind}?date=${date.toISOString()}`;

        if (zip) {
            url += `&zip=${zip}`;
        }

        return window.API.fetch(url);
    },

    bookAppointment(
        kind,
        date,
        data
    ) {
        return window.API.fetch(`/appointment/${kind}`, {
            method: "POST",
            body: JSON.stringify({
                ...data,
                date
            })
        });
    },

    bookHelloCall(date, slug) {
        return window.API.fetch(`/appointment/hello`, {
            method: "POST",
            body: JSON.stringify({
                date,
                slug
            })
        });
    },

    bookEvent(data) {
        return window.API.fetch("/appointment/event", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    multiUnitGetInTouch(data) {
        return window.API.fetch("/contact/multiunit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    },

    estimationRequestFetchBySlug(slug) {
        return window.API.fetch(`/hello/${slug}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    createFinancingRecord(data) {
        return window.API.fetch("/financing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    },

    updateFinancingRecord(slug, data) {
        return window.API.fetch(`/financing/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    },

    updateHelloQuestionnaire(slug, questionnaire) {
        return window.API.fetch(`/hello/${slug}`, {
            method: "PUT",
            body: JSON.stringify(questionnaire)
        });
    },
};

window.addEventListener("mousedown", (e) => {
    if (e.altKey) {
        window.API.shouldFailNext = true;
    }
});
async function createApplication(name, options = {}, jsBundlePath) {
    const [destroyStyle, destroyScript] = await Promise.all([
        loadStyles(`/assets/stylesheets/${name}/bundle.css`),

        import(jsBundlePath || `/assets/javascripts/${name}/bundle.js`)
            .then((module) => module.default(options))
            .catch((error) => {
                console.error("failed to create application", name, error);
            })
    ]);

    function destroy() {
        if (destroyScript) {
            destroyScript();
        }

        if (destroyStyle) {
            destroyStyle();
        }
    }

    return destroy;
};
function createDestroy(
    urlPattern,
    createHandler,
    destroyEventName = "router:will-change-url"
) {
    let destroy;

    async function create() {
        destroy = await createHandler();
    }

    function tryCreate(e) {
        const url = e?.detail?.url || location.pathname;

        if (urlPattern.test(url)) {
            setTimeout(create, 0);
        }
    }

    function tryDestroy() {
        if (destroy) {
            destroy();
            destroy = undefined;
        }
    }

    document.addEventListener("DOMContentLoaded", tryCreate);
    window.addEventListener("router:did-update-content", tryCreate);
    window.addEventListener(destroyEventName, tryDestroy);
};
window.process = { ...window.process };

window.process.env = {
    ...window.process.env,
    NODE_ENV: "production",
};
(() => {
    const BREAKPOINT = 768.0;

    let timer;
    let previousSize = window.innerWidth;

    function didResize() {
        const nextSize = window.innerWidth;

        if (previousSize < BREAKPOINT && nextSize < BREAKPOINT) {
            previousSize = nextSize;
            return;
        }

        if (previousSize > BREAKPOINT && nextSize > BREAKPOINT) {
            previousSize = nextSize;
            return;
        }

        previousSize = nextSize;

        clearTimeout(timer);
        timer = setTimeout(didResizeThrottled, 40);
    }

    function didResizeThrottled() {
        document.querySelectorAll("img[srcset]").forEach((image) => {
            const srcset = image.srcset;
            image.removeAttribute("srcset");
            setTimeout(() => {
                image.setAttribute("srcset", srcset);
            }, 0);
        });
    }

    window.addEventListener("resize", didResize);
})();
function loadStyles(url) {
    function destroyStyles() {}

    return new Promise((resolve) => {
        const existing = document.querySelector(`link[href="${url}"]`);

        if (existing) {
            resolve(destroyStyles);
            return;
        }

        const link = document.createElement("link");

        link.onload = function didLoadStyles() {
            resolve(destroyStyles);
        };

        link.rel = "stylesheet";
        link.href = url;

        document.querySelector("head").appendChild(link);
    });
};
(() => {
    const IS_PERFORMANCE_TRACKING_ENABLED = false;

    const sentryScript = document.getElementById("sentry-script");

    if (sentryScript) {
        sentryScript.onload = () => {
            const options = {
                dsn: "https://6239eb46ed1b0d72b5c7186827b1f830@o1233526.ingest.sentry.io/4505953549287424"
            };

            if (IS_PERFORMANCE_TRACKING_ENABLED) {
                options.integrations = [new Sentry.BrowserTracing()];
                options.tracesSampleRate = 1.0;
            }

            Sentry.init(options);

            window.console.error = function consoleError(error) {
                const message =
                    error instanceof Error
                        ? error
                        : new Error(Array.from(arguments).join(" — "));

                Sentry.captureException(message);
            };
        };
    }
})();
createDestroy(/.*/, function footer() {
    const element = document.querySelector(".footer-nav");

    if (!element || element.dataset.enabled) {
        return function footer() {};
    }

    element.dataset.enabled = true;

    const subscriptionElement = document.querySelector(
        ".footer-contact-subscription"
    );

    function didFocus() {
        subscriptionElement.classList.remove(
            "footer-contact-subscription-failure",
            "footer-contact-subscription-success",
            "footer-contact-subscription-loading"
        );
    }

    async function subscribe(email) {
        subscriptionElement.classList.add(
            "footer-contact-subscription-loading"
        );

        gtag("event", "footer_subscribe");

        try {
            await API.subscribe(email, ["footer"]);
            subscriptionElement.classList.add(
                "footer-contact-subscription-success"
            );
        } catch (error) {
            subscriptionElement.classList.add(
                "footer-contact-subscription-failure"
            );

            if (typeof Sentry !== "undefined") {
                Sentry.captureException(error);
            }
        }

        subscriptionElement.classList.remove(
            "footer-contact-subscription-loading"
        );
    }

    async function didSubmitForm(e) {
        e.preventDefault();

        const input = subscriptionElement.querySelector("input[type=email]");

        input.blur();

        await subscribe(input.value);

        subscriptionElement.querySelector("input[type=email]").value = "";
        element.querySelector("form").reset();
    }

    subscriptionElement
        .querySelector("input[type=email]")
        .addEventListener("focus", didFocus);

    subscriptionElement
        .querySelector("form")
        .addEventListener("submit", didSubmitForm);

    return function footer() {};
});
function createInfiniteSlideshow(element) {
	element.dataset.init = true;

	let container = element.querySelector(".infinite-slideshow-spacer");
	let items = Array.from(container.children);
	let resetTimer;
	let resizeTimer;
	let isResizing = false;
	let itemWidth = items[0].clientWidth;
	let itemHeight = items[0].clientHeight;
	let indexForPageInCenter = 0;
	let snappers = [];
	let previousIndexForCurrentItem = -1;

	function setIndexPageInCenter(index) {
		indexForPageInCenter = index;

		let indexForCurrentItem = indexForPageInCenter % items.length;

		items.forEach((item, index) => {
			item.classList.toggle("current", index === indexForCurrentItem);
		});

		if (previousIndexForCurrentItem !== indexForCurrentItem) {
			element.dispatchEvent(
				new CustomEvent("change", {
					detail: {
						index: indexForCurrentItem
					}
				})
			);
		}

		previousIndexForCurrentItem = indexForCurrentItem;
	}

	function createSnappers() {
		snappers.forEach((snapper) => {
			if (snapper.parentElement) {
				snapper.parentElement.removeChild(snapper);
			}
		});

		const numberOfSnappers = Math.floor(container.clientWidth / itemWidth);

		if (Number.isFinite(numberOfSnappers) !== true) {
			return;
		}

		snappers = Array(numberOfSnappers)
			.fill(undefined)
			.map((_, i) => {
				const snapper = document.createElement("div");
				snapper.className = "infinite-slideshow-snapper";
				snapper.style.left = i * itemWidth + "px";
				container.appendChild(snapper);
				return snapper;
			});
	}

	function setSnappingEnabled(isEnabled) {
		if (isEnabled) {
			element.style.scrollSnapType = null;
		} else {
			element.style.scrollSnapType = "none";
		}
	}

	// re-center all items and scroll container
	function reset() {
		update();

		const middle =
			Math.floor(container.clientWidth / itemWidth / 2 / items.length) *
			items.length;
		setIndexPageInCenter(middle + (indexForPageInCenter % items.length));

		element.removeEventListener("scroll", didScroll);
		setSnappingEnabled(false);

		const offset = (element.clientWidth - itemWidth) * 0.5;
		element.scrollLeft =
			indexForPageInCenter * itemWidth -
			(element.clientWidth - itemWidth) +
			offset;

		update();

		setSnappingEnabled(true);
		element.addEventListener("scroll", didScroll);
	}

	// update items offset on scroll
	function update() {
		const firstIndex = Math.floor(element.scrollLeft / itemWidth);
		const lastIndex =
			firstIndex + Math.ceil(element.clientWidth / itemWidth);

		const elementRect = element.getBoundingClientRect();
		const ty = Math.round((elementRect.height - itemHeight) * 0.5);

		for (let index = firstIndex; index <= lastIndex; index++) {
			const item = items[index % items.length];

			if (item === undefined) {
				continue;
			}

			const tx = index * itemWidth;
			item.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

			const rect = item.getBoundingClientRect();
			const center = rect.x - elementRect.x + rect.width * 0.5;
			const delta = Math.abs(elementRect.width * 0.5 - center);

			if (delta < itemWidth * 0.5) {
				setIndexPageInCenter(index);
			}
		}
	}

	function didScroll() {
		if (isResizing) {
			return;
		}

		clearTimeout(resetTimer);
		resetTimer = setTimeout(reset, 300);

		update();
	}

	function didResize() {
		setSnappingEnabled(false);

		clearTimeout(resetTimer);
		clearTimeout(resizeTimer);

		resizeTimer = setTimeout(() => {
			isResizing = false;
			setSnappingEnabled(true);
		}, 100);

		isResizing = true;
		itemWidth = items[0].clientWidth;
		itemHeight = items[0].clientHeight;

		element.scrollLeft =
			indexForPageInCenter * itemWidth -
			(element.clientWidth - itemWidth) * 0.5;

		update();
		createSnappers();
	}

	function didJump(e) {
		element.scrollTo({
			left:
				(indexForPageInCenter + e.detail.direction) * itemWidth -
				(element.clientWidth - itemWidth) * 0.5,
			behavior: "smooth"
		});

		clearTimeout(resetTimer);
		resetTimer = setTimeout(reset, 600);
	}

	createSnappers();
	reset();

	element.addEventListener("jump", didJump);
	window.addEventListener("resize", didResize);

	if (element.dataset.initialPageIndex !== undefined) {
		indexForPageInCenter = element.dataset.initialPageIndex;
		element.scrollLeft =
			indexForPageInCenter * itemWidth -
			(element.clientWidth - itemWidth) * 0.5;
		reset();
	}
}

createDestroy(/.*/, function infiniteSlideshow() {
	document.body.querySelectorAll(".infinite-slideshow").forEach((element) => {
		if (element.dataset.init === undefined) {
			createInfiniteSlideshow(element);
		}
	});

	return function destroyInfiniteSlideshow() {};
});
createDestroy(/.*/, function modernSlideshow() {
    function slideshow(element) {
        element.dataset.init = true;

        setTimeout(() => {
            element.scrollTo(0, 0);
        }, 40);

        function scroll(direction) {
            const elementRect = element.getBoundingClientRect();
            const elementCenter = elementRect.left + elementRect.width * 0.5;

            const items = Array.from(element.children);
            const currentItemIndex = items.findIndex((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width * 0.5;

                return Math.abs(elementCenter - itemCenter) < itemRect.width * 0.5;
            });

            const nextItemIndex = Math.min(
                Math.max(currentItemIndex + direction, 0),
                items.length - 1
            );

            const nextItemRect = items[nextItemIndex].getBoundingClientRect();
            const nextItemCenter = nextItemRect.left + nextItemRect.width * 0.5;

            element.scrollTo({
                top: 0,
                left: element.scrollLeft + (nextItemCenter - elementCenter),
                behavior: "smooth"
            });
        }

        function didClick(e) {
            if (window.innerWidth < 768.0) {
                return;
            }

            const position = e.clientX / element.clientWidth;

            if (position < 0.5) {
                scroll(-1);
            } else {
                scroll(1);
            }
        }

        element.addEventListener("click", didClick);
    }

    document.body.querySelectorAll(".modern-slideshow").forEach((element) => {
        if (element.dataset.init === undefined) {
            slideshow(element);
        }
    });

    return function modernSlideshow() {};
});
(() => {
    function createNaviagation() {
        const element = document.querySelector("nav.main-navigation");
        const items = element.querySelectorAll("a");
        const configureButton = element.querySelector(".backyard-configure");

        configureButton.hidden = false;

        function updateCurrent(e) {
            const url = e.detail.url === "/" ? "/backyard" : e.detail.url;

            items.forEach((item) => {
                const isNested =
                    item.getAttribute("href").split("/").length > 2;

                const isCurrent =
                    item.getAttribute("href") === url ||
                    (isNested && url.startsWith(item.getAttribute("href")));

                item.classList.toggle("current", isCurrent);
            });

            element.classList.toggle(
                "transition-configurator",
                url.startsWith("/backyard/configure")
            );

            const slug = url.match(/([^\/]+)\/?$/).at(-1);

            const model = {
                "studio": "studio",
                "one-bedroom": "onebed",
                "two-bedroom": "twobed",
                "xl-8": "xl-8",
                "xl-10": "xl-10"
            }[slug];

            if (model) {
                configureButton.href = `/backyard/configure#bonewhite+${model}`;
            } else {
                configureButton.href = "/backyard/configure";
            }

            setTimeout(() => {
                element.classList.add("collapsed");
            }, 400);
        }

        function didClickToggle() {
            element.classList.toggle("collapsed");
        }

        window.addEventListener("router:will-change-url", updateCurrent);

        function didScrollTop() {
            element.classList.add("collapsed");
        }

        window.addEventListener("router:scroll-top", didScrollTop);

        const toggleElement = element.querySelector(".toggle");

        if (toggleElement) {
            toggleElement.addEventListener("click", didClickToggle);
        }

        function didMouseEnter() {
            window.dispatchEvent(new Event("navigation:hover"));
        }

        function didMouseLeave() {
            window.dispatchEvent(new Event("navigation:unhover"));
        }

        function didMoveTouch(e) {
            e.preventDefault();
        }

        Array.from(element.children).forEach((e) => {
            e.addEventListener("mouseenter", didMouseEnter);
            e.addEventListener("mouseleave", didMouseLeave);
        });

        updateCurrent({ detail: { url: location.pathname } });

        element.addEventListener("touchmove", didMoveTouch);

        element.querySelectorAll("ul > li > a").forEach((item) => {
            if (item.classList.contains("backyard-menu-item-models")) {
                return;
            }

            item.addEventListener("mouseenter", function didMouseEnter() {
                element.classList.remove("main-navigation-hover-models");
            });
        });

        element
            .querySelector(".backyard-menu-item-models")
            .addEventListener("mouseenter", function didMouseEnter() {
                if (window.matchMedia("(pointer: coarse)").matches) {
                    return;
                }

                if (window.innerWidth > 768.0) {
                    element.classList.add("main-navigation-hover-models");
                }
            });

        element.addEventListener("mouseleave", function didMouseLeave() {
            if (window.matchMedia("(pointer: coarse)").matches) {
                return;
            }

            element.classList.remove("main-navigation-hover-models");
        });
    }

    document.addEventListener("DOMContentLoaded", createNaviagation);
})();
createDestroy(/.*/, function pagingIndicator() {
    function createPagingIndicator(element) {
        element.dataset.init = true;

        const indicators = element.querySelectorAll("li");

        if (element.dataset.changeEmmiterSelector) {
            document
                .querySelector(element.dataset.changeEmmiterSelector)
                .addEventListener("change", function didChangePageIndex(e) {
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle(
                            "paging-indicator-current",
                            index === e.detail.index
                        );
                    });
                });
        }

        if (element.dataset.scrollElementSelector) {
            let previousIndex;

            document
                .querySelector(element.dataset.scrollElementSelector)
                .addEventListener("scroll", function didScroll(e) {
                    const indexForCurrentPage = Math.round(
                        (e.target.scrollLeft / e.target.scrollWidth) *
                            indicators.length
                    );

                    if (previousIndex === indexForCurrentPage) {
                        return;
                    }

                    previousIndex = indexForCurrentPage;

                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle(
                            "paging-indicator-current",
                            index === indexForCurrentPage
                        );
                    });
                });
        }
    }

    document.body.querySelectorAll(".paging-indicator").forEach((element) => {
        if (element.dataset.init === undefined) {
            createPagingIndicator(element);
        }
    });

    return function destroyPagingIndicator() {};
});
(() => {
    if (typeof Element !== "undefined") {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;
        }

        if (!Element.prototype.closest) {
            Element.prototype.closest = function (s) {
                var el = this;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);

                return null;
            };
        }
    }

    function createRouter() {
        const pages = {"/jobs/architectural-designer":{"title":"Architectural Designer – Jobs – DGM","description":"DGM is looking for a talented and highly motivated Architectural Designer to join the Product \u0026 Design Team as an inspirational force for creating new ways of living.","class_names":"jobs job","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/jobs/job","position":10},"/showrooms/events/241031-capitola-crane-in":{"title":"Capitola ADU Crane-in Block Party — Showrooms — DGM","description":"You’re invited to our prefab ADU crane-in block party in Capitola!\r\n\r\n- Watch DGM’s Backyard ADU get installed in minutes\r\n- Enjoy free farm-to-table bites from Pretty Good Advice\r\n- Meet the DGM team and get a free same-day site assessment\r\n\r\nPlease RSVP for the address and crane-in schedule.","class_names":"backyard showroom event","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/showroom/event","position":-1,"share_sheet_image_id":"71c5e6a6-ce39-43f6-b5e2-e222b6987400"},"/news/there-s-more-to-love-with-backyard-xl-10":{"title":"There’s more to love with Backyard XL 10 — News — DGM","description":"Backyard just got bigger. We’re excited to unveil Backyard XL 10, the latest and largest addition to DGM’s ADU lineup.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":13,"share_sheet_image_id":"b1ae142b-b246-4501-20f1-f1350a84c300"},"/news/samara-launches-proprietary-financing-product-to-bring-more-space-to-millions-of-homeowners":{"title":"DGM Launches Proprietary Financing Product to  Bring More Space to Millions of Homeowners — News — DGM","description":"REDWOOD CITY, CALIFORNIA  — Today, DGM Finance, LLC, a wholly-owned subsidiary of DGM, announced it launched a first-of-its-kind financing product, making it easier for homeowners to finance Backyard, its accessory dwelling unit (ADU). Now, DGM uniquely manages the ADU process from conception to completion, handling everything from product design and prefab manufacturing, to permitting, delivery and installation, to financing. The new financing option makes it possible for homeowners to add flexible space to their homes with competitive rates. This enables the company to accelerate expansion and deliver more units in 2024 and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":12,"share_sheet_image_id":"c5700752-823e-4522-f805-a3a788b63400"},"/news/introducing-backyard-xl":{"title":"Introducing Backyard XL 8 — News — DGM","description":"We’re proud to unveil Backyard XL 8, our latest ADU model that makes it easy for homeowners to add more flexible living space to their existing properties. With two bedrooms and two bathrooms, the luxe 800-square-foot home provides ample space with larger appliances, and premium amenities.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":11,"share_sheet_image_id":"4f02d289-169f-4ab4-50e7-edb29cfa4300"},"/news/samara-acquires-factory-to-scale-manufacturing-of-backyard":{"title":"DGM Acquires Factory to Scale Manufacturing of Backyard  as Demand for ADUs Soars in California — News — DGM","description":"REDWOOD CITY, CALIFORNIA — Today, DGM announced it has acquired a factory that brings the manufacturing of its high-quality accessory dwelling unit (ADU), Backyard, completely in house. Located in Mexicali, Mexico, the factory gives DGM more control over the quality standard of Backyard, shortens delivery timelines, accelerates product development and enables the company to meet rising customer demand in California and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":10,"share_sheet_image_id":"dd6932ff-e29e-410b-b2e6-4f23130e1e00"},"/news/samara-raises-41-million-to-bring-high-quality-adus-to-every-backyard-in-california-and-beyond":{"title":"DGM raises $41 million to bring high quality ADUs to every backyard in California and beyond — News — DGM","description":"We’re excited to announce our $41M Series A round, led by Thrive Capital with participation from leading VC firms and angel investors. This latest funding will allow us to scale our brand, product offerings, team, and much needed manufacturing capacity to unlock growth and bring high quality accessory dwelling units (ADUs) to every backyard in California and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":9,"share_sheet_image_id":"59ee21f7-d5a4-4592-e873-b16c86b7ea00"},"/insights/adu-california-grant":{"title":"How To Get an ADU Grant in California — DGM","description":"An ADU California grant can help you build your accessory dwelling unit. Learn how to get an ADU grant in California to offset the associated costs.","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":12,"share_sheet_image_id":"4e095cd5-6432-4dd8-42de-02f965b60400"},"/insights/adu-cost-california":{"title":"How Much Does It Cost To Build an ADU in California? — DGM","description":"Before you design and build an ADU, consider the costs and benefits. Tally up how much an ADU costs in California and if it fits your budget.","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":11,"share_sheet_image_id":"0cbd6443-3673-4085-e6b4-44e240261e00"},"/insights/adu-california":{"title":"What Is Considered an ADU in California? — DGM","description":"Building an ADU can offer homeowners many benefits despite the initial investment. Find out what's considered an ADU in the state of California. ","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":10,"share_sheet_image_id":"e0a07661-bd4d-4453-36fa-d68eabbf0300"},"/":{"title":"DGM - Backyard homes and ADUs","description":"Discover DGM's Backyard homes and ADUs. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard","theme_color":"#000000","navigation_inverted":false,"position":26,"partial_name":"partials/pages/backyard/backyard","share_sheet_image_id":"4422b17d-6e18-4bbb-6e87-102fb9821c00"},"/backyard":{"title":"DGM - Backyard homes and ADUs","description":"Discover DGM's Backyard homes and ADUs. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard","theme_color":"#000000","navigation_inverted":false,"position":25,"partial_name":"partials/pages/backyard/backyard","share_sheet_image_id":"dee522f0-e339-4516-1e61-0cb9fb83b300"},"/backyard/models":{"title":"Backyard - ADU Models - DGM","description":"Explore the full lineup of DGM's Backyard ADU models, including studio, one bedroom, and two bedroom layouts ranging from 420 to 950 square feet.","class_names":"backyard backyard-models backyard-models-index","theme_color":"#000000","navigation_inverted":true,"position":24,"partial_name":"partials/pages/backyard/models","share_sheet_image_id":"28663ada-d1e4-451f-90af-131a0b1e1700"},"/backyard/how-it-works":{"title":"Backyard – How It Works – DGM","description":"Learn how easy it is to install an accessory dwelling unit from DGM. From configuration to completion in as few as seven months.","class_names":"backyard how-it-works","theme_color":"#000000","navigation_inverted":false,"position":23,"partial_name":"partials/pages/backyard/how-it-works","share_sheet_image_id":"26440ce7-ba39-472d-0fec-c1d99823a500"},"/backyard/financing":{"title":"ADU Financing in California - DGM","description":"Explore tailored ADU financing options in California with DGM, offering affordable, efficient solutions to help you finance your backyard home.","class_names":"backyard financing","theme_color":"#000000","navigation_inverted":false,"position":22,"partial_name":"partials/pages/financing","share_sheet_image_id":null},"/backyard/faq":{"title":"Backyard – Frequently Asked Questions – DGM","description":"Find answers to the most asked questions about Backyard: building regulations, financial planning, construction, and more.","class_names":"backyard faq","theme_color":"#000000","navigation_inverted":false,"position":21,"partial_name":"partials/pages/backyard/faq","share_sheet_image_id":"525b3d2c-6270-4ef5-d824-ecd2f4edd000"},"/backyard/studio":{"title":"Backyard Studio - Prefab studio ADU - DGM","description":"DGM's prefab studio ADU is a small but mighty 420 sq. ft., featuring high cathedral ceilings, clever storage, and a fully-equipped kitchen designed for comfort and style. ","class_names":"backyard backyard-models backyard-models-studio","theme_color":"#000000","navigation_inverted":false,"position":20,"partial_name":"partials/pages/backyard/models/studio","share_sheet_image_id":"b60fe753-3258-4d18-aebf-200d8305f300"},"/backyard/one-bedroom":{"title":"Backyard One Bedroom - 1 bedroom ADU - DGM","description":"DGM’s 1 bedroom ADU features a spacious bathroom, ample storage, and a next-gen electric kitchen. It's the perfect blend of style and functionality in 540 square feet.","class_names":"backyard backyard-models backyard-models-onebed","theme_color":"#000000","navigation_inverted":false,"position":19,"partial_name":"partials/pages/backyard/models/onebed","share_sheet_image_id":"f30ce6f7-e670-4bf3-82cc-d33910a66a00"},"/backyard/two-bedroom":{"title":"Backyard Two Bedroom - 2 bedroom ADU - DGM","description":"DGM's 2 bedroom ADU offers 690 sq. ft. of flexible living space perfect for hosting guests, working from home, or generating rental income. Call it the ultimate flex.","class_names":"backyard backyard-models backyard-models-twobed","theme_color":"#000000","navigation_inverted":false,"position":18,"partial_name":"partials/pages/backyard/models/twobed","share_sheet_image_id":"13bf7b1a-901d-432f-bc02-e9978ee59500"},"/backyard/xl-8":{"title":"Backyard XL 8 - 800 sq. ft. ADU - DGM","description":"Learn more about Backyard XL 8, DGM’s 800 sq. ft. ADU featuring two bedrooms and two baths, larger appliances, and plenty of storage. Perfect for whatever use you can dream up.","class_names":"backyard backyard-models backyard-models-xl","theme_color":"#000000","navigation_inverted":false,"position":17,"partial_name":"partials/pages/backyard/models/xl-8","share_sheet_image_id":"b9f187b1-bc1b-42f7-9973-e781d980ac00"},"/backyard/xl-10":{"title":"Backyard XL 10 - 2 bedroom, 2 bath ADU - DGM","description":"Backyard XL 10 is DGM’s spacious 2 bedroom, 2 bath ADU with an upsized kitchen and living room and 950 sq. ft. of flexible space.","class_names":"backyard backyard-models backyard-models-xl-10","theme_color":"#000000","navigation_inverted":false,"position":16,"partial_name":"partials/pages/backyard/models/xl-10","share_sheet_image_id":"b851ca06-c7b5-4c2a-e2da-68d097780f00"},"/backyard/compare":{"title":"Compare Backyard models – DGM","description":"Compare Backyard models","class_names":"backyard backyard-compare","theme_color":"#000000","navigation_inverted":false,"position":15,"partial_name":"partials/pages/backyard/compare","share_sheet_image_id":null},"/backyard/configure":{"title":"Customize Backyard – DGM","description":"Customize and get a quote for DGM's Backyard ADU. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard configurator","theme_color":"#000000","navigation_inverted":false,"position":14,"partial_name":"partials/pages/backyard/configure","share_sheet_image_id":"a02d2050-630d-403d-d386-ccb3506c2300"},"/news":{"title":"News – DGM","description":"Read the latest news about DGM.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"position":13,"partial_name":"partials/pages/newsroom/newsroom","share_sheet_image_id":"7fd49401-f728-4c12-0229-3fe7abf62900"},"/insights":{"title":"Insights — DGM","description":"","class_names":"backyard insights insights-index","theme_color":"#000000","navigation_inverted":false,"position":12,"partial_name":"partials/pages/insights/index","share_sheet_image_id":null},"/insights/life-with-backyard-meet-the-kurodas":{"title":"Life with Backyard: Meet the Kurodas — DGM","description":"The Kurodas give us a tour of their cozy Backyard, built to help them stay close to family.","class_names":"backyard insights insights-story","theme_color":"#000000","navigation_inverted":true,"position":11,"partial_name":"partials/pages/insights","share_sheet_image_id":"4fc66bdc-2449-4d2d-d7f5-1dc35f7fd400"},"/jobs":{"title":"Jobs – DGM","description":"Join DGM to help create new ways of living that help people dream bigger.","class_names":"jobs","theme_color":"#000000","navigation_inverted":false,"position":10,"partial_name":"partials/pages/jobs/jobs","share_sheet_image_id":"69bca2cb-e628-48ad-c8fc-ebd743b2c700"},"/showrooms":{"title":"Showrooms – DGM","description":"Tour Backyard in person at an our San Francisco Bay Area and Los Angeles showrooms. Learn more about our locations and book a private tour.","class_names":"backyard showroom","theme_color":"#000000","navigation_inverted":false,"position":9,"partial_name":"partials/pages/showroom/showroom","share_sheet_image_id":"7f28da8b-6ec2-423a-f3a8-8a5e7ffa4500"},"/showrooms/redwood-city":{"title":"Redwood City Showroom – DGM","description":"Tour Backyard in person at DGM Redwood City. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":8,"partial_name":"partials/pages/showroom/redwood-city","share_sheet_image_id":"8e379157-712c-4bea-a50a-38c36767db00"},"/showrooms/redwood-city/visit":{"title":"Schedule Your Showroom Visit – DGM","description":"Tour Backyard in person at DGM Redwood City. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":7,"partial_name":"partials/pages/showroom/visit","share_sheet_image_id":"6b07701e-267e-4d6f-b0ea-a32fd8c27a00"},"/showrooms/thousand-oaks":{"title":"Thousand Oaks Pop-up Showroom – DGM","description":"Tour Backyard in person at DGM Thousand Oaks. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":6,"partial_name":"partials/pages/showroom/thousand-oaks","share_sheet_image_id":"00cc326f-f637-4227-f98d-dff49167c900"},"/showrooms/thousand-oaks/visit":{"title":"Schedule Your Showroom Visit – DGM","description":"","class_names":"","theme_color":"#000000","navigation_inverted":false,"position":5,"partial_name":"partials/pages/showroom/visit","share_sheet_image_id":null},"/developers":{"title":"DGM for Developers","description":"Unlock the potential of your parcel with Backyard Multiunit.","class_names":"multiunit backyard","theme_color":"#000000","navigation_inverted":true,"position":4,"partial_name":"partials/pages/multiunit","share_sheet_image_id":"a6119568-ae31-44e7-e7a6-ad201ad8a500"},"/yoshino":{"title":"Yoshino – DGM","description":null,"class_names":"yoshino","theme_color":"#000000","navigation_inverted":false,"position":3,"partial_name":"partials/pages/yoshino","share_sheet_image_id":null},"/terms-of-service":{"title":"Terms of Service – DGM","description":"","class_names":"legal","theme_color":"#000000","navigation_inverted":false,"position":2,"partial_name":"partials/pages/terms-of-service","share_sheet_image_id":"834edb4b-cd31-423c-4ed3-1accf2066200"},"/privacy-policy":{"title":"Privacy Policy – DGM","description":null,"class_names":"legal","theme_color":"#000000","navigation_inverted":false,"position":1,"partial_name":"partials/pages/privacy-policy","share_sheet_image_id":"94f4f098-aa84-4d11-1b87-65836380a800"}};
        const cache = {};
        const contentContainer = document.querySelector("main .page");
        const themeMeta = document.querySelector("meta[name=theme-color]");
        const navigation = document.querySelector("nav");
        const mainElement = document.querySelector("main");

        let queue = [];
        let isTransitioning = false;
        let previousSlug;
        let segueEndTimer;

        function direction(url) {
            const current = pages[slug(location.pathname)]?.position || 0;
            const next = pages[slug(url)]?.position || 0;
            return current < next ? -1 : 1;
        }

        function notify(event, detail) {
            window.dispatchEvent(new CustomEvent(event, { detail }));
        }

        function slug(url = null) {
            let pathname = url || location.pathname;

            pathname = pathname.split("#")[0];

            if (pathname.length > 1 && pathname.endsWith("/")) {
                pathname = pathname.slice(0, pathname.length - 1);
            }

            if (pathname === "/") {
                return "/backyard";
            } else if (pathname.startsWith("/backyard/configure")) {
                return "/backyard/configure";
            }

            return pathname;
        }

        function destroyPage() {
            const page = pages[previousSlug || slug()];

            if (page !== undefined && navigation !== null) {
                const classNames = page.class_names.split(" ").filter(className => className.length > 0)

                if (classNames.length > 0) {
                    document.body.classList.remove(...classNames);
                }
            }
        }

        function createPage() {
            let page = pages[slug()];

            if (page !== undefined) {
                if (themeMeta !== null) {
                    themeMeta.setAttribute("content", page.theme_color);
                }

                const classNames = page.class_names.split(" ").filter(className => className.length > 0)

                if (classNames.length > 0) {
                    document.body.classList.add(...classNames);
                }

                if (navigation !== null) {
                    navigation.classList.toggle(
                        "inverted",
                        page.navigation_inverted
                    );
                }
            }

            previousSlug = slug();
        }

        function performTransitionOut(direction) {
            return new Promise((resolve) => {
                mainElement.addEventListener("animationend", resolve, {
                    once: true
                });

                mainElement.classList.add(direction < 0 ? "out-pop" : "out");
            });
        }

        function performTransitionIn(direction) {
            return new Promise((resolve) => {
                mainElement.classList.remove(direction < 0 ? "out-pop" : "out");

                mainElement.addEventListener(
                    "animationend",
                    () => {
                        mainElement.classList.remove(
                            direction < 0 ? "in-pop" : "in"
                        );

                        resolve();
                    },
                    {
                        once: true
                    }
                );

                mainElement.classList.add(direction < 0 ? "in-pop" : "in");
            });
        }

        async function openRoute(
            url,
            shouldPushState = true,
            shouldPerformTransition = true
        ) {
            const page = pages[slug(url)];

            if (isTransitioning) {
                queue = [url, shouldPushState];
                return;
            }

            if (
                shouldPushState &&
                (url === location.pathname ||
                    (url === "/" && location.pathname === "/backyard") ||
                    (url === "/backyard" && location.pathname === "/"))
            ) {
                notify("router:scroll-top", { url });
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            clearTimeout(segueEndTimer);

            isTransitioning = true;
            mainElement.classList.add("segue");

            const transitionDirection = direction(url);

            notify("router:will-change-url", { url });

            if (location.pathname === "/backyard/models") {
                // invert navigation early

                setTimeout(() => {
                    navigation.classList.toggle(
                        "inverted",
                        page.navigation_inverted
                    );
                }, 200)
            }

            if (shouldPerformTransition) {
                await performTransitionOut(transitionDirection);
            }

            let html = "";
            const cacheKey = slug(url);
            const cached = cache[cacheKey];

            if (cached && cached !== "pending") {
                html = cached;
            } else {
                try {
                    const res = await fetch(`${slug(url)}.data`);
                    html = await res.text();
                    cache[cacheKey] = html;
                } catch (error) {
                    console.error("failed to load page", url);
                }
            }

            destroyPage();
            window.scrollTo({ top: 0 });
            contentContainer.innerHTML = html;

            document.title = page?.title;

            if (shouldPushState) {
                window.history.pushState(null, page, url);
            }

            createPage();
            notify("router:did-update-content", { url });

            if (shouldPerformTransition) {
                await performTransitionIn(transitionDirection);
            }

            notify("router:did-change-url", { url });

            isTransitioning = false;

            segueEndTimer = setTimeout(() => {
                mainElement.classList.remove("segue");
                document.body.style.backgroundColor = null;
            }, 10);

            if (queue.length > 0) {
                setTimeout(openRoute, 0, ...queue);
                queue = [];
            }
        }

        function pageLink(element) {
            if (!element) {
                return null;
            }

            let link = undefined;

            if (element.nodeName === "A") {
                link = element;
            }

            if (element.parentElement) {
                if (element.parentElement.nodeName === "A") {
                    link = element.parentElement;
                }

                if (typeof element.closest === "function") {
                    link = element.closest("a");
                }
            }

            if (link === undefined || link === null) {
                return null;
            }

            const href = link.getAttribute("href");

            const isPageLink =
                href &&
                href.startsWith("/") &&
                !link.getAttribute("download") &&
                link.getAttribute("target") !== "_blank";

            if (!isPageLink) {
                return null;
            }

            return link;
        }

        async function preloadRoute(url) {
            const key = slug(url);

            if (cache[key]) {
                return;
            }

            cache[key] = "pending";

            try {
                const res = await fetch(`${slug(url)}.data`);
                cache[key] = await res.text();
            } catch (error) {
                console.warn("failed to preload page", url);
            }
        }

        function didClickWindow(e) {
            if (e.metaKey) {
                return;
            }

            const link = pageLink(e.target);

            if (link) {
                e.preventDefault();
                openRoute(link.getAttribute("href"));
            }
        }

        function didMouseMove(e) {
            const link = pageLink(e.target);

            if (link) {
                preloadRoute(link.getAttribute("href"));
            }
        }

        function didPopState() {
            openRoute(location.pathname, false, false);
        }

        window.openRoute = openRoute;

        window.addEventListener("click", didClickWindow);
        window.addEventListener("popstate", didPopState);
        window.addEventListener("mousemove", didMouseMove);

        window.addEventListener("router:will-change-url", function () {
            document.body.classList.add("segue");
        });

        window.addEventListener("router:did-change-url", function () {
            document.body.classList.remove("segue");
        });

        createPage();
    }

    document.addEventListener("DOMContentLoaded", createRouter);
})();
(() => {
    function createTooltip() {
        const DAMPENING = 1.0;
        const DISMISS_INTERVAL = 2_000;

        const element = document.getElementById("tooltip");
        const container = element.querySelector("span");

        let isVisible = false;
        let isDisabled = false;
        let position = { x: 0, y: 0 };
        let target = { x: 0, y: 0 };
        let isAnimating = false;
        let dismissTimer;

        function dismiss() {
            element.classList.add("dismissed");
        }

        function updateEnablers() {
            document.querySelectorAll("*[data-tooltip]").forEach((element) => {
                element.removeAttribute("data-tooltip");

                element.addEventListener(
                    "mousemove",
                    function didMouseMoveEnabler(e) {
                        const isLeftSide = e.clientX < window.innerWidth * 0.5;

                        if (isLeftSide && element.scrollLeft === 0) {
                            element.style.cursor = null;
                            hide();
                            return;
                        }

                        if (
                            !isLeftSide &
                            (element.scrollLeft ===
                                element.scrollWidth - element.clientWidth)
                        ) {
                            element.style.cursor = null;
                            hide();
                            return;
                        }

                        const icon = isLeftSide ? "arrow-left" : "arrow-right";
                        show(icon, "", target.x, target.y);
                        element.style.cursor = "pointer";
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    function didLeaveEnabler() {
                        element.style.cursor = null;
                        hide();
                    }
                );
            });
        }

        function updateDisablers() {
            document
                .querySelectorAll("*[data-tooltip-disabled]")
                .forEach((element) => {
                    element.removeAttribute("data-tooltip-disabled");

                    element.addEventListener(
                        "mouseenter",
                        function didEnterDisabler() {
                            isDisabled = true;
                            hide();
                        }
                    );

                    element.addEventListener(
                        "mouseleave",
                        function didLeaveDisabler() {
                            isDisabled = false;
                        }
                    );
                });
        }

        function show(icon, text, x, y) {
            if (window.innerWidth < 768.0) {
                return;
            }

            if (document.hasFocus() === false) {
                return;
            }

            if (isDisabled) {
                return;
            }

            if (!isVisible) {
                position = { x, y };
                target = { x, y };
                update();
            }

            isVisible = true;
            element.className = "visible";
            element.classList.add(icon);
            element.classList.toggle("tooltip-no-text", text.length === 0);

            container.innerHTML = text;
        }

        function move(x, y) {
            clearTimeout(dismissTimer);
            dismissTimer = setTimeout(dismiss, DISMISS_INTERVAL);
            element.classList.remove("dismissed");

            target = { x, y };

            if (!isAnimating) {
                requestAnimationFrame(update);
            }
        }

        function hide() {
            if (!isVisible) {
                return;
            }

            element.classList.remove("visible");
            isVisible = false;
        }

        function update() {
            if (position.x === 0.0) {
                position = target;
            }

            position.x = position.x + (target.x - position.x) * DAMPENING;
            position.y = position.y + (target.y - position.y) * DAMPENING;

            element.style.transform =
                `translate3d(${position.x.toFixed(2)}px,` +
                `${position.y.toFixed(2)}px,` +
                `0.0)`;

            isAnimating =
                Math.abs(position.x - target.x) > 0.1 ||
                Math.abs(position.y - target.y) > 0.1;

            if (isAnimating) {
                requestAnimationFrame(update);
            }
        }

        function didMouseLeave() {
            hide();
        }

        function didMouseMove(e) {
            move(e.clientX, e.clientY);
        }

        function didScroll() {
            hide();
        }

        document.documentElement.addEventListener("mouseleave", didMouseLeave);
        window.addEventListener("mousemove", didMouseMove);
        window.addEventListener("router:did-update-content", updateDisablers);
        window.addEventListener("router:did-update-content", updateEnablers);
        window.addEventListener("scroll", didScroll);
        updateDisablers();
        updateEnablers();

        return {
            show,
            move,
            hide
        };
    }

    document.addEventListener("DOMContentLoaded", function didLoadContent() {
        window.Tooltip = createTooltip();
    });
})();
window.Backyard = window.Backyard || {};

Backyard.createALotCanHappenCards = function createALotCanHappenCards() {
    const slideshow = document.querySelector(
        ".a-lot-can-happen-cards .infinite-slideshow"
    );

    if (slideshow === null) {
        return () => {};
    }

    const label = document.querySelector(".a-lot-can-happen-cards-label");
    let timer;

    function updateLabel() {
        const currentSlide = slideshow.querySelector(".current img");

        if (!currentSlide) {
            return;
        }

        label.classList.add("change");

        setTimeout(() => {
            label.innerText = currentSlide.getAttribute("alt");
            label.classList.remove("change");
        }, 200);
    }

    function didChangeSlideshow() {
        label.classList.add("change");
        clearTimeout(timer);
        timer = setTimeout(updateLabel, 200);
    }

    let autoScrollTimer;

    function jumpNext() {
        slideshow.dispatchEvent(
            new CustomEvent("jump", {
                detail: {
                    direction: 1
                }
            })
        );
    }

    function resetAutoScrollTimer() {
        clearTimeout(autoScrollTimer);
        autoScrollTimer = setTimeout(jumpNext, 4_000);
    }

    function didScroll() {
        resetAutoScrollTimer();
    }

    function didChangeVisibility() {
        resetAutoScrollTimer();
    }

    function didClick(e) {
        const rect = slideshow.getBoundingClientRect();
        const isPrevious = e.clientX < rect.x + rect.width * 0.5;

        slideshow.dispatchEvent(
            new CustomEvent("jump", {
                detail: {
                    direction: isPrevious ? -1 : 1
                }
            })
        );
    }

    resetAutoScrollTimer();

    slideshow.addEventListener("change", didChangeSlideshow);
    slideshow.addEventListener("scroll", didScroll);
    slideshow.addEventListener("click", didClick);
    document.addEventListener("visibilitychange", didChangeVisibility);

    return function destroyALotCanHappenCards() {
        clearTimeout(autoScrollTimer);
        document.removeEventListener("visibilitychange", didChangeVisibility);
    };
};
window.Backyard = window.Backyard || {};

Backyard.createBentoCardDetails = function createBentoCardDetails() {
    function create(element) {
        function didToggle(e) {
            const isExpanded = e.target.checked;
            const list = element.querySelector("ul");

            if (isExpanded) {
                list.style.transition = "none";
                list.style.maxHeight = "unset";
                list.style.opacity = 0;

                const height = list.clientHeight;

                list.style.transition = null;
                list.style.maxHeight = null;

                setTimeout(() => {
                    list.style.maxHeight = height + "px";
                    list.style.opacity = 1;
                }, 0);
            } else {
                list.style.maxHeight = null;
                list.style.opacity = null;
            }
        }

        function didClick(e) {
            if (e.target.nodeName === "INPUT") {
                return;
            }

            e.stopPropagation();
            e.preventDefault();

            element.querySelector("input").click();
        }

        element.addEventListener("click", didClick);
        element.querySelector("input").addEventListener("change", didToggle);
    }

    document.querySelectorAll(".bento-details-card").forEach(create);

    return function destroyBentoCardDetails() {};
};
// based on http://pages.cs.wisc.edu/~lizy/mrdoob-three.js-ef5f05d/examples/canvas_geometry_birds.html

window.Backyard = window.Backyard || {};

Backyard.createBirds = function createBirds() {
    const NUMBER_OF_BIRDS = 10;
    const container = document.querySelector(".xl-10-birds");

    let raf;
    let THREE;
    let camera, scene, renderer;
    let isDestroyed = false;
    let isVisible = true;
    let birds = [];
    let flocks = [];

    function destroyBirds() {
        isDestroyed = true;

        renderer = undefined;
        scene = undefined;
        THREE = undefined;

        cancelAnimationFrame(raf);
        window.removeEventListener("resize", didResizeWindow);
        window.removeEventListener("scroll", didScrollWindow);
    }

    if (container === null) {
        return destroyBirds;
    }

    function createBird() {
        function Bird() {
            const scope = this;

            THREE.Geometry.call(this);

            v(5, 0, 0);
            v(-5, -2, 1);
            v(-5, 0, 0);
            v(-5, -2, -1);

            v(0, 2, -6);
            v(0, 2, 6);
            v(2, 0, 0);
            v(-3, 0, 0);

            f3(0, 2, 1);
            f3(4, 7, 6);
            f3(5, 6, 7);

            this.computeCentroids();
            this.computeFaceNormals();

            function v(x, y, z) {
                scope.vertices.push(new THREE.Vector3(x, y, z));
            }

            function f3(a, b, c) {
                scope.faces.push(new THREE.Face3(a, b, c));
            }
        }

        Bird.prototype = Object.create(THREE.Geometry.prototype);

        return new Bird();
    }

    function createFlock() {
        function Flock() {
            let vector = new THREE.Vector3(),
                _acceleration,
                _width = 500,
                _height = 500,
                _depth = 200,
                _goal,
                _neighborhoodRadius = 50,
                _maxSpeed = 1,
                _maxSteerForce = 0.1,
                _avoidWalls = false;

            this.fadeFactor = 0.0;
            this.needsReset = false;
            this.position = new THREE.Vector3();
            this.velocity = new THREE.Vector3();
            _acceleration = new THREE.Vector3();

            this.setGoal = function (target) {
                _goal = target;
            };

            this.setAvoidWalls = function (value) {
                _avoidWalls = value;
            };

            this.setWorldSize = function (width, height, depth) {
                _width = width;
                _height = height;
                vector;
                _depth = depth;
            };

            this.run = async function (flocks) {
                if (this.needsReset === false) {
                    this.needsReset =
                        Math.abs(this.position.y - _goal.y) < 50.0;
                }

                if (this.fadeFactor < 1.0) {
                    this.fadeFactor += 0.01;
                }

                if (_avoidWalls) {
                    vector.set(-_width, this.position.y, this.position.z);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);

                    vector.set(_width, this.position.y, this.position.z);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);

                    vector.set(this.position.x, -_height, this.position.z);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);

                    vector.set(this.position.x, _height, this.position.z);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);

                    vector.set(this.position.x, this.position.y, -_depth);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);

                    vector.set(this.position.x, this.position.y, _depth);
                    vector = this.avoid(vector);
                    vector.multiplyScalar(5);
                    _acceleration.addSelf(vector);
                }

                if (Math.random() > 0.5) {
                    this.flock(flocks);
                }

                this.move();
            };

            this.flock = function (flocks) {
                if (_goal) {
                    _acceleration.addSelf(this.reach(_goal, 0.005));
                }

                _acceleration.addSelf(this.alignment(flocks));
                _acceleration.addSelf(this.cohesion(flocks));
                _acceleration.addSelf(this.separation(flocks));
            };

            this.move = function () {
                this.velocity.addSelf(_acceleration);

                let l = this.velocity.length();

                if (l > _maxSpeed) {
                    this.velocity.divideScalar(l / _maxSpeed);
                }

                this.position.addSelf(this.velocity);
                _acceleration.set(0, 0, 0);
            };

            this.checkBounds = function () {
                if (this.position.x > _width) this.position.x = -_width;
                if (this.position.x < -_width) this.position.x = _width;
                if (this.position.y > _height) this.position.y = -_height;
                if (this.position.y < -_height) this.position.y = _height;
                if (this.position.z > _depth) this.position.z = -_depth;
                if (this.position.z < -_depth) this.position.z = _depth;
            };

            //

            this.avoid = function (target) {
                let steer = new THREE.Vector3();

                steer.copy(this.position);
                steer.subSelf(target);

                steer.multiplyScalar(
                    1 / this.position.distanceToSquared(target)
                );

                return steer;
            };

            this.repulse = function (target) {
                let distance = this.position.distanceTo(target);

                if (distance < 150) {
                    let steer = new THREE.Vector3();

                    steer.sub(this.position, target);
                    steer.multiplyScalar(0.1 / distance);

                    _acceleration.addSelf(steer);
                }
            };

            this.reach = function (target, amount) {
                let steer = new THREE.Vector3();

                steer.sub(target, this.position);
                steer.multiplyScalar(amount);

                return steer;
            };

            this.alignment = function (flocks) {
                let flock,
                    velSum = new THREE.Vector3(),
                    count = 0;

                for (let i = 0, il = flocks.length; i < il; i++) {
                    if (Math.random() > 0.3) continue;

                    flock = flocks[i];

                    distance = flock.position.distanceTo(this.position);

                    if (distance > 0 && distance <= _neighborhoodRadius) {
                        velSum.addSelf(flock.velocity);
                        count++;
                    }
                }

                if (count > 0) {
                    velSum.divideScalar(count);

                    let l = velSum.length();

                    if (l > _maxSteerForce) {
                        velSum.divideScalar(l / _maxSteerForce);
                    }
                }

                return velSum;
            };

            this.cohesion = function (flocks) {
                let flock,
                    distance,
                    posSum = new THREE.Vector3(),
                    steer = new THREE.Vector3(),
                    count = 0;

                for (let i = 0, il = flocks.length; i < il; i++) {
                    if (Math.random() > 0.6) continue;

                    flock = flocks[i];
                    distance = flock.position.distanceTo(this.position);

                    if (distance > 0 && distance <= _neighborhoodRadius) {
                        posSum.addSelf(flock.position);
                        count++;
                    }
                }

                if (count > 0) {
                    posSum.divideScalar(count);
                }

                steer.sub(posSum, this.position);

                let l = steer.length();

                if (l > _maxSteerForce) {
                    steer.divideScalar(l / _maxSteerForce);
                }

                return steer;
            };

            this.separation = function (flocks) {
                let flock,
                    distance,
                    posSum = new THREE.Vector3(),
                    repulse = new THREE.Vector3();

                for (let i = 0, il = flocks.length; i < il; i++) {
                    if (Math.random() > 0.6) continue;

                    flock = flocks[i];
                    distance = flock.position.distanceTo(this.position);

                    if (distance > 0 && distance <= _neighborhoodRadius) {
                        repulse.sub(this.position, flock.position);
                        repulse.normalize();
                        repulse.divideScalar(distance);
                        posSum.addSelf(repulse);
                    }
                }

                return posSum;
            };

            this.reset = function (isFirst) {
                this.needsReset = false;
                this.fadeFactor = 0.0;
                this.position.x =
                    (isFirst ? -400 : -container.clientWidth) +
                    Math.random() * -200;
                this.position.y = (isFirst ? -150 : -300) + Math.random() * 100;
                this.position.z = -100 + Math.random() * 200;
                this.velocity.x = Math.random() * 2 - 1;
                this.velocity.y = Math.random() * 2 - 1;
                this.velocity.z = Math.random() * 2 - 1;
                this.setWorldSize(
                    container.clientWidth,
                    container.clientHeight,
                    1000
                );
                this.setGoal(
                    new THREE.Vector3(
                        container.clientHeight * 2.25,
                        container.clientWidth * 0.25 +
                            Math.random() * container.clientHeight * 0.5,
                        Math.random() * -200
                    )
                );
            };
        }

        return new Flock();
    }

    function renderFrame() {
        if (isVisible === false) {
            return;
        }

        let needsResetCount = 0;

        for (let i = 0, il = birds.length; i < il; i++) {
            const flock = flocks[i];
            flock.run(flocks);

            if (flock.needsReset) {
                needsResetCount += 1;
            }

            const bird = birds[i];

            // fade in
            bird.material.opacity = flock.fadeFactor;

            // rotate bird as it flies
            bird.rotation.y = Math.atan2(-flock.velocity.z, flock.velocity.x);
            bird.rotation.z = Math.asin(
                flock.velocity.y / flock.velocity.length()
            );

            // flap wings
            bird.phase =
                (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
            bird.geometry.vertices[5].y = bird.geometry.vertices[4].y =
                Math.sin(bird.phase) * 5;
        }

        if (needsResetCount === flocks.length) {
            flocks.forEach((flock) => {
                flock.reset();
            });
        }

        renderer.render(scene, camera);
    }

    function renderNextFrame() {
        if (isVisible === false) {
            return;
        }

        raf = requestAnimationFrame(renderNextFrame);
        renderFrame();
    }

    async function initialize() {
        try {
            const module = await import("/assets/javascripts/vendor/three.js");
            THREE = module.default;
        } catch (error) {
            console.error("failed to release birds");
        }

        if (isDestroyed == true) {
            return;
        }

        if (THREE === undefined) {
            return;
        }

        scene = new THREE.Scene();

        for (let i = 0; i < NUMBER_OF_BIRDS; i += 1) {
            const flock = createFlock();
            flock.reset(true);

            const bird = new THREE.Mesh(
                createBird(),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    side: THREE.DoubleSide
                })
            );

            const scale = 0.5 + Math.random() * 0.05;
            bird.scale = new THREE.Vector3(scale, scale, scale);
            bird.color = (500 - bird.position.z) / 1000;
            bird.phase = Math.floor(Math.random() * 62.83);
            bird.position = flock.position;

            flocks.push(flock);
            birds.push(bird);
            scene.add(bird);
        }

        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            1,
            10000
        );

        camera.position.z = 450;

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        window.addEventListener("resize", didResizeWindow);
        window.addEventListener("scroll", didScrollWindow);

        didResizeWindow();
        didScrollWindow();
        renderNextFrame();
    }

    function didScrollWindow() {
        const rect = container.getBoundingClientRect();

        const isVisibleNext =
            (rect.top >= 0.0 && rect.top <= container.clientHeight) ||
            (rect.bottom >= 0.0 && rect.bottom <= container.clientHeight);

        if (isVisible === isVisibleNext) {
            return;
        }

        isVisible = isVisibleNext;

        if (isVisible) {
            renderNextFrame();
        } else {
            cancelAnimationFrame(raf);
        }
    }

    function didResizeWindow() {
        camera.aspect = container.clientWidth / (container.clientHeight * 0.5);
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight * 0.5);
    }

    if (document.readyState === "complete") {
        initialize();
    } else {
        document.addEventListener(
            "readystatechange",
            function didChangeReadyState() {
                if (document.readyState !== "complete") {
                    return;
                }

                initialize();
            }
        );
    }

    return destroyBirds;
};
createDestroy(/^\/backyard\/compare.*/, function createCompare() {
	const SELECTION_KEY = "compare:v3";

	const header = document.querySelector(".backyard-compare-header");
	const pickers = Array.from(document.querySelectorAll(".backyard-compare-header select"));
	const rows = document.querySelectorAll(".backyard-compare-row");
	const tableRows = document.querySelectorAll(".backyard-compare-row tr");

	let indexForRowInFocus;
	let offsetForRowInFocus;

	function pickersSliced() {
		return pickers.slice(0, window.innerWidth < 1024.0 ? 2 : 3);
	}

	function restoreSelection() {
		if (localStorage.getItem(SELECTION_KEY) === null) {
			return;
		}

		const selection = JSON.parse(localStorage.getItem(SELECTION_KEY));

		selection.forEach((value, i) => {
			pickers[i].value = value;
		});
	}

	function restoreScroll() {
		if (indexForRowInFocus === undefined || indexForRowInFocus < 1) {
			return;
		}

		const currentOffset = rows[indexForRowInFocus].getBoundingClientRect().top;
		const delta = currentOffset - offsetForRowInFocus;

		window.scrollBy(0, delta);
	}

	let previousWindowWidth = window.innerWidth;

	function didChangeViewport() {
		if (previousWindowWidth < 1024.0 && window.innerWidth >= 1024.0) {
			const selection = pickersSliced().map((picker) => picker.value);

			if (selection[0] === selection[2] || selection[1] === selection[2]) {
				pickers[2].value = ["onebed", "twobed", "xl-8", "studio", "xl-10"].find(
					(layout) => selection.includes(layout) !== true
				);
			}

			didChangeSelection();
		}

		previousWindowWidth = window.innerWidth;

		let minDistance = Number.MAX_SAFE_INTEGER;

		indexForRowInFocus = undefined;

		rows.forEach((row, i) => {
			if (row.dataset.mayHide !== undefined) {
				return;
			}

			if (row.clientHeight === 0) {
				return;
			}

			const offset = row.getBoundingClientRect().top;
			const distance = Math.abs(offset - window.innerHeight * 0.5);

			if (distance < minDistance) {
				minDistance = distance;
				indexForRowInFocus = i;
				offsetForRowInFocus = offset;
			}
		});

		header.classList.toggle(
			"backyard-compare-header-sticky",
			header.getBoundingClientRect().height * 1.5 < window.scrollY
		);
	}

	function didChangeSelection(e) {
		if (e && e.target) {
			e.target.blur();
		}

		const selection = pickersSliced().map((picker) => picker.value);

		localStorage.setItem(SELECTION_KEY, JSON.stringify(selection));

		tableRows.forEach((row) => {
			let numberOfEmptyColumns = 0;

			row.querySelectorAll("td").forEach((td) => {
				const isHidden = selection.includes(td.dataset.layout) === false;

				td.hidden = isHidden;

				if (isHidden === false && td.querySelector(".backyard-compare-text-empty")) {
					numberOfEmptyColumns += 1;
				}
			});

			const shouldHideTable = numberOfEmptyColumns === selection.length;

			row.closest("table").classList.toggle("backyard-compare-row-hidden", shouldHideTable);

			const container = row.closest(".backyard-compare-row");

			const shouldHideRow =
				container.querySelectorAll("table").length ===
				container.querySelectorAll(".backyard-compare-row-hidden").length;

			container.classList.toggle("backyard-compare-row-hidden", shouldHideRow);

			selection
				.slice()
				.reverse()
				.forEach((layout) => {
					row.insertBefore(row.querySelector(`td[data-layout=${layout}]`), row.firstChild);
				});
		});

		document.querySelectorAll(".backyard-compare-header option").forEach((option) => {
			option.disabled = option.parentElement.value !== option.value && selection.includes(option.value);
		});

		pickersSliced().forEach((picker) => {
			const slug = picker.value.replace("bed", "-bedroom");

			picker.previousElementSibling.href = `/backyard/${slug}`;

			picker.previousElementSibling.querySelector("img").src =
				"/assets/images/backyard/models/" +
				`models-index-${picker.value}` +
				`/models-index-${picker.value}-1000.webp`;
		});

		restoreScroll();
	}

	pickers.forEach((picker) => {
		picker.addEventListener("change", didChangeSelection);
	});

	window.addEventListener("scroll", didChangeViewport);
	window.addEventListener("resize", didChangeViewport);

	restoreSelection();
	didChangeSelection();
	didChangeViewport();

	return function destroyCompare() {
		window.addEventListener("scroll", didChangeViewport);
		window.addEventListener("resize", didChangeViewport);
	};
});
window.Backyard = window.Backyard || {};

Backyard.createFaqMenu = function createFaqMenu() {
    const sidebar = document.querySelector(".backyard-faq .sidebar");
    const menuItems = Array.from(sidebar.querySelectorAll(".menu li"));
    const categories = Array.from(
        document.querySelectorAll(".backyard-faq .faq-group")
    );
    const pageTitle = sidebar.querySelector("h1");

    let isScrollToRequested = false;
    let isScrolling = false;
    let previousScrollY = window.scrollY;
    let timer;

    function update() {
        if (categories.findLastIndex === undefined) {
            return;
        }

        const indexForCurrentCategory = Math.max(
            categories.findLastIndex(
                (category) =>
                    category.getBoundingClientRect().top <
                    window.innerHeight * 0.5
            ),
            0
        );

        menuItems.forEach((item, index) => {
            item.classList.toggle("active", index === indexForCurrentCategory);
        });
    }

    function map(n, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((n - low1) / (high1 - low1));
    }

    function didChangeViewport() {
        if (isScrollToRequested) {
            isScrolling = previousScrollY !== window.scrollY;
        } else {
            isScrolling = false;
        }

        if (!isScrolling) {
            isScrollToRequested = false;
            update();
        }

        previousScrollY = window.scrollY;

        if (isScrolling) {
            clearTimeout(timer);
            timer = setTimeout(didChangeViewport, 100);
        }

        if (window.innerWidth >= 768.0) {
            const p = Math.min(
                Math.max(map(window.scrollY, 0.0, 132.0, 0.0, 1.0), 0.0),
                1.0
            );

            const ty = map(p, 0.0, 1.0, 0.0, 50.0);
            const scale = map(p, 0.0, 1.0, 1.0, 0.66);

            pageTitle.style.transform = `translateY(${ty}px) scale(${scale})`;
        } else {
            pageTitle.style.transform = null;
        }
    }

    window.addEventListener("scroll", didChangeViewport, { passive: true });
    window.addEventListener("resize", didChangeViewport, { passive: true });
    didChangeViewport();

    menuItems.slice(0, -1).forEach((item, index) => {
        item.addEventListener("click", function didClickItem() {
            const top =
                window.scrollY +
                categories[index].getBoundingClientRect().top -
                150;

            menuItems.forEach((item, i) => {
                item.classList.toggle("active", index === i);
            });

            isScrollToRequested = true;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    return function destroyFaqMenu() {
        window.removeEventListener("scroll", didChangeViewport);
        window.removeEventListener("resize", didChangeViewport);
    };
};
window.Backyard = window.Backyard || {};

Backyard.createInteriorPhotoCards = function createInteriorPhotoCards() {
    document
        .querySelectorAll(".interior-carousel-cards-card")
        .forEach((card, _index, cards) => {
            card.addEventListener("click", function didClickCard(e) {
                const isMobile = window.innerWidth < 768.0;
                const { left, width } = card.getBoundingClientRect();
                const center = Math.round(left + width * 0.5);
                const delta = window.innerWidth * 0.5 - center;

                if (!isMobile && delta > 0.0 && Math.abs(delta) > width * 0.5) {
                    e.stopPropagation();

                    card.parentElement.classList.add("scrolling");

                    card.parentElement.scrollTo({
                        left: card.parentElement.scrollLeft - card.clientWidth,
                        behavior: "smooth"
                    });
                } else if (
                    !isMobile &&
                    delta < 0.0 &&
                    Math.abs(delta) > width * 0.5
                ) {
                    e.stopPropagation();

                    card.parentElement.classList.add("scrolling");

                    card.parentElement.scrollTo({
                        left: card.parentElement.scrollLeft + card.clientWidth,
                        behavior: "smooth"
                    });
                } else if (
                    e.target.classList.contains(
                        "interior-carousel-cards-card-images"
                    )
                ) {
                    e.preventDefault();
                    e.stopPropagation();

                    const inputs = card.querySelectorAll("input");

                    const currentIndex = Array.from(inputs).findIndex(
                        (input) => input.checked
                    );

                    const nextIndex =
                        currentIndex + 1 > inputs.length - 1
                            ? 0
                            : currentIndex + 1;

                    inputs.forEach((input, index) => {
                        input.checked = index === nextIndex;
                    });
                }

                setTimeout(function updateCursorStatus() {
                    cards.forEach((card) => {
                        const { left, width } = card.getBoundingClientRect();
                        const center = Math.round(left + width * 0.5);
                        const delta = window.innerWidth * 0.5 - center;

                        card.parentElement.classList.remove("scrolling");

                        card.classList.toggle(
                            "current",
                            Math.abs(delta) < width * 0.5
                        );
                    });
                }, 600);
            });
        });

    return function destroyIntroCarousel() {};
};
window.Backyard = window.Backyard || {};

Backyard.introCarousel = function introCarousel() {
	const LAYOUT_NAMES = [
		"Studio",
		"One bedroom",
		"Two bedroom",
		'<span class="alt">Backyard</span> XL 8',
		'<span class="alt">Backyard</span> XL 10'
	];

	const LAYOUT_URIS = [
		"/backyard/studio",
		"/backyard/one-bedroom",
		"/backyard/two-bedroom",
		"/backyard/xl-8",
		"/backyard/xl-10"
	];

	const LAYOUT_AREAS = [
		"420 sq. ft.",
		"540 sq. ft.",
		"690 sq. ft.",
		"800 sq. ft.",
		"950 sq. ft."
	];

	const LAYOUT_NEW = [false, false, false, false, true];

	const container = document.querySelector(
		".intro-carousel-new .infinite-slideshow"
	);

	if (!container) {
		return () => {};
	}

	const images = container.querySelectorAll("img");

	let indexForCurrentImage = 1;

	function setIndexForCurrentImage(index) {
		if (index === indexForCurrentImage) {
			return;
		}

		indexForCurrentImage = index;

		const layoutNewElement = document.getElementById(
			"intro-carousel-layout-new"
		);

		if (layoutNewElement) {
			layoutNewElement.hidden = !LAYOUT_NEW[indexForCurrentImage];
		}

		const layoutNameElement = document.getElementById(
			"intro-carousel-layout-name"
		);

		if (layoutNameElement) {
			layoutNameElement.innerHTML = LAYOUT_NAMES[indexForCurrentImage];
			layoutNameElement.href = LAYOUT_URIS[indexForCurrentImage];
		}

		const layoutAreaElement = document.getElementById(
			"intro-carousel-layout-area"
		);

		if (layoutAreaElement) {
			layoutAreaElement.innerText = LAYOUT_AREAS[indexForCurrentImage];
		}

		images.forEach((image, i) => {
			image.classList.toggle("current", i === indexForCurrentImage);
		});
	}

	function didUpdateOffset(e) {
		function indexForItemAt(index) {
			return Math.trunc(
				index - Math.floor(index / images.length) * images.length
			);
		}

		setIndexForCurrentImage(indexForItemAt(e.detail.targetIndex));
	}

	let isClickDisabled = false;

	function didClick(e) {
		if (isClickDisabled || window.innerWidth < 768.0) {
			return;
		}

		isClickDisabled = true;

		setTimeout(() => {
			isClickDisabled = false;
		}, 400);

		container.dispatchEvent(
			new CustomEvent("jump", {
				detail: {
					direction: e.clientX < window.innerWidth * 0.5 ? -1 : 1
				}
			})
		);
	}

	function didChangeCurrentItem(e) {
		setIndexForCurrentImage(e.detail.index);
	}

	container.addEventListener("change", didChangeCurrentItem);
	container.addEventListener("click", didClick);
	container.addEventListener("offset", didUpdateOffset);

	return function destroyIntroCarousel() {};
};
window.Backyard = window.Backyard || {};

Backyard.intro = function intro() {
    const element = document.querySelector(".backyard .intro");
    const parts = element.querySelectorAll(".part");

    function map(n, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((n - low1) / (high1 - low1));
    }

    function didChangeViewport() {
        const isMobile = window.innerWidth < 768.0;
        const max = isMobile ? 0.25 : 0.25;
        const p = map(window.scrollY, 0.0, window.innerHeight * max, 0.0, 1.0);

        const i = Math.min(
            Math.max(Math.round(p * parts.length), 0),
            parts.length - 1
        );

        parts.forEach((part, index) => {
            part.classList.toggle("active", index <= i);
        });
    }

    async function appear() {
        const isMobile = window.innerWidth < 768.0;

        if (isMobile === false) {
            return;
        }

        function sleep(interval) {
            return new Promise((resolve) => {
                setTimeout(resolve, interval);
            });
        }

        const sentences = Array.from(
            element.querySelectorAll("span[data-sentence]")
        ).reduce((result, e) => {
            const i = parseInt(e.dataset.sentence) - 1;

            if (result[i]) {
                result[i].push(e);
            } else {
                result[i] = [e];
            }

            return result;
        }, []);

        for (let i = 0; i < sentences.length; i++) {
            sentences[i].forEach((e) => {
                e.classList.add("active");
            });

            await sleep(i === 0 ? 1250 : 1000);
        }
    }

    if (typeof experimentValueFor !== "undefined") {
        const ctaExperimentElement = element.querySelector("#cta-experiment");

        if (ctaExperimentElement) {
            ctaExperimentElement.innerText = experimentValueFor("cta", "text");
        }
    }

    window.addEventListener("scroll", didChangeViewport, { passive: true });
    window.addEventListener("resize", didChangeViewport);
    didChangeViewport();
    setTimeout(appear, 200);

    element.querySelectorAll("h1 img").forEach((img) => {
        if (img.complete) {
            img.classList.add("loaded");
            return;
        }

        img.addEventListener("load", () => img.classList.add("loaded"), {
            once: true
        });
    });

    return function destroyIntro() {
        window.removeEventListener("scroll", didChangeViewport);
        window.removeEventListener("resize", didChangeViewport);
    };
};

// only play intro animation if loaded home page directly
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add("intro-complete");
    }, 2000);
});
window.Backyard = window.Backyard || {};

Backyard.invertNavigation = function invertNavigation() {
    const nav = document.getElementsByTagName("nav")[0];
    const elements = Array.from(document.querySelectorAll(".slides > *, article > *, .page-section"));

    function didChangeViewport() {
        const isMobile = window.innerWidth < 768.0;

        const slide = elements.find((element) => {
            const MARGIN = isMobile ? 45.0 : 65.0;
            const { top, bottom } = element.getBoundingClientRect();
            return top < MARGIN && bottom > MARGIN;
        });

        if (slide) {
            if (isMobile && slide.dataset.invertMobile) {
                const shouldInvertMobile = slide.dataset.invertMobile === "true";

                nav.classList.toggle("inverted", shouldInvertMobile);
            } else {
                nav.classList.toggle("inverted", slide.dataset.invert !== undefined);
            }
        }
    }

    window.addEventListener("scroll", didChangeViewport, { passive: true });
    didChangeViewport();

    return function destroyInvertNavigation() {
        window.removeEventListener("scroll", didChangeViewport);
    };
};
window.Backyard = window.Backyard || {};

Backyard.createJealousy = function createJealousy() {
    const images = document.querySelector(".jealousy");

    if (images === null) {
        return () => {};
    }

    const radios = Array.from(document.querySelectorAll(".jealousy input"));
    let timer;

    function reset() {
        images.classList.remove("active");
        radios.forEach((r, i) => (r.checked = i === 1));
    }

    function activate() {
        clearTimeout(timer);
        timer = setTimeout(reset, 10_000);
        images.classList.add("active");
    }

    function didClickImages(e) {
        activate();

        if (e.target.nodeName === "INPUT" || e.target.nodeName === "UL") {
            return;
        }

        let index = radios.findIndex((r) => r.checked === true);

        if (index < radios.length - 1) {
            index += 1;
        } else {
            index = 0;
        }

        radios.forEach((r, i) => (r.checked = i === index));
    }

    images.addEventListener("click", didClickImages);

    return function destroyInteriorToggle() {
        images.removeEventListener("click", didClickImages);
    };
};
window.Backyard = window.Backyard || {};

Backyard.loadImagesLazily = function loadImagesLazily() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(({ isIntersecting, target }) => {
				if (!isIntersecting) {
					return;
				}

				target.setAttribute("loading", "eager");

				if (target.nodeName === "VIDEO" && target.clientWidth > 0.0) {
					const video = /** @type {HTMLVideoElement} */ (target);
					video.load();
					video.addEventListener(
						"canplay",
						() => {
							video.play().catch(() => {});
						},
						{ once: true }
					);
				}

				observer.unobserve(target);
			});
		},
		{ rootMargin: "100%" }
	);

	document.querySelectorAll("*[loading=lazy]").forEach((element) => {
		observer.observe(element);
	});

	return function destroyLoadImagesLazily() {
		observer.disconnect();
	};
};
createDestroy(/^\/backyard\/.+/, function createModelsInnerNavigation() {
	const links = document.querySelectorAll(".backyard-models-navigation a");

	function didClickLink(e) {
		e.preventDefault();

		const id = e.target.getAttribute("href").substring(1);
		const element = document.getElementById(id);
		const rect = element.getBoundingClientRect();
		const y = rect.top - (window.innerWidth < 768.0 ? 68.0 : 180.0);

		window.scrollTo({ top: y, behavior: "smooth" });
	}

	links.forEach((link) => {
		link.addEventListener("click", didClickLink);
	});

	return function destroyModelsInnerNavigation() {
		links.forEach((link) => {
			link.removeEventListener("click", didClickLink);
		});
	};
});
createDestroy(/^\/backyard\/.+/, function createModelsCollageParallax() {
    const items = document.querySelectorAll("*[data-models-parallax]");

    function map(n, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((n - low1) / (high1 - low1));
    }

    function didUpdateViewport() {
        items.forEach((item) => {
            const rect = item.parentElement.getBoundingClientRect();

            const progress = map(rect.top, window.innerHeight, -rect.height, 0.0, 1.0);

            if (progress < 0.0 || progress > 1.0) {
                return;
            }

            const params =
                window.innerWidth > 768.0
                    ? item.dataset.modelsParallax
                    : item.dataset.modelsParallaxMobile || item.dataset.modelsParallax;

            const range = params.split(",").map(parseFloat);
            const dampening = window.innerWidth < 768.0 ? 1.0 : 0.5;

            const offset = map(
                progress,
                0.0,
                1.0,
                range[0] * rect.height * dampening,
                range[1] * rect.height * dampening
            );

            item.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
    }

    window.addEventListener("scroll", didUpdateViewport);
    window.addEventListener("resize", didUpdateViewport);

    didUpdateViewport();

    return function destroyModelsCollageParallax() {
        window.removeEventListener("scroll", didUpdateViewport);
        window.removeEventListener("resize", didUpdateViewport);
    };
});
window.Backyard = window.Backyard || {};

Backyard.threeSizes = function threeSizes() {
    const cost = [
        [147_000, 1_641],
        [165_000, 1_790],
        [185_000, 1_940],
        [233_000, 2_479],
        [267_000, 2_748]
    ];

    const offsets = {
        desktop: [
            [0.0, 0.2, -2.5, 15.75, 31],
            [0.0, 0.4, -30, -1, 27.5],
            [0.2, 0.6, -25, 1.25, 22.5],
            [0.4, 0.8, -27.75, 0.875, 29.5],
            [0.6, 1.0, -25.75, 2.125, 30]
        ],
        mobile: [
            [0.0, 0.2, -3, 11, 24],
            [0.0, 0.4, -24.5, -3, 19],
            [0.2, 0.6, -18.5, -3, 13],
            [0.4, 0.8, -20, 0, 21],
            [0.6, 1.0, -18, 0, 20]
        ]
    };

    const container = document.querySelector(
        ".three-sizes-layouts-pages-container"
    );
    const selectorButtons = Array.from(
        document.querySelectorAll(".three-sizes-layouts-selector button")
    );
    const layouts = Array.from(
        document.querySelectorAll(".three-sizes-layouts-pages-page")
    );
    const colorButtons = Array.from(
        document.querySelectorAll(".three-sizes-colors > div")
    );
    const arrowButtons = Array.from(
        document.querySelectorAll(".three-sizes-layouts-pages-controls button")
    );

    let scrollWidth = 0.0;
    let indexForSelectedLayout = 1;
    let indexForSelectedColor = Array(layouts.length).fill(0);
    let withoutAnimationTimer;
    let raf;

    function map(n, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((n - low1) / (high1 - low1));
    }

    function setIndexForSelectedLayout(i, withoutAnimation) {
        indexForSelectedLayout = Math.max(Math.min(i, layouts.length - 1), 0);

        container.scrollTo({
            left: i * container.clientWidth,
            behavior: withoutAnimation ? "instant" : "smooth"
        });

        container.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    index: i
                }
            })
        );

        update(withoutAnimation);
    }

    function formatCurrency(value) {
        let v = value;

        if (Number.isFinite(v) === false) {
            v = 0.0;
        }

        const options = {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        };

        return new Intl.NumberFormat("en-US", options).format(v);
    }

    function urlForConfigurator() {
        const layouts = ["studio", "onebed", "twobed", "xl-8", "xl-10"];

        const colors = [
            "bonewhite",
            "driftwood",
            "parchment",
            "evergreen",
            "dark-bronze"
        ];

        const color = colors[indexForSelectedColor[indexForSelectedLayout]];
        const layout = layouts[indexForSelectedLayout];

        return `/backyard/configure#${color}+${layout}`;
    }

    function summary() {
        const summaries = [
            "420 sq. ft. <span></span> 1 bath",
            "540 sq. ft. <span></span> 1 bedroom <span></span> 1 bath",
            "690 sq. ft. <span></span> 2 bedrooms <span></span> 1 bath",
            "800 sq. ft. <span></span> 2 bedrooms <span></span> 2 baths",
            "950 sq. ft. <span></span> 2 bedrooms <span></span> 2 baths"
        ];

        return summaries[indexForSelectedLayout];
    }

    function titleForProductPage() {
        const titles = [
            "the studio",
            "the one bedroom",
            "the two bedroom",
            "<span class='alt'>Backyard</span> XL 8",
            "<span class='alt'>Backyard</span> XL 10"
        ];

        return titles[indexForSelectedLayout];
    }

    function urlForProductPage() {
        const slugs = ["studio", "one-bedroom", "two-bedroom", "xl-8", "xl-10"];

        return `/backyard/${slugs[indexForSelectedLayout]}`;
    }

    function update(withoutAnimation) {
        if (withoutAnimation) {
            clearTimeout(withoutAnimationTimer);

            container.classList.add("without-animation");

            withoutAnimationTimer = setTimeout(() => {
                container.classList.remove("without-animation");
            }, 100);
        } else {
            container.classList.remove("without-animation");
        }

        const nextIndexForSelectedLayout = Math.max(
            Math.min(
                Math.round(
                    (container.scrollLeft / container.scrollWidth) *
                        layouts.length
                ),
                layouts.length - 1
            ),
            0
        );

        if (Number.isFinite(nextIndexForSelectedLayout)) {
            indexForSelectedLayout = nextIndexForSelectedLayout;

            container.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        index: indexForSelectedLayout
                    }
                })
            );
        }

        if (scrollWidth === 0.0) {
            scrollWidth = container.scrollWidth;
        }

        const p = container.scrollLeft / scrollWidth;
        const sizeClass = window.innerWidth < 768.0 ? "mobile" : "desktop";

        layouts.forEach((layout, i) => {
            layout.classList.toggle("selected", i === indexForSelectedLayout);

            layout.querySelectorAll("img").forEach((image, j) => {
                image.classList.toggle(
                    "current",
                    j === indexForSelectedColor[i]
                );
            });

            const [lowIn, highIn, lowOut, midOut, highOut] =
                offsets[sizeClass][i];
            const midIn = lowIn + (highIn - lowIn) * 0.5;
            const x =
                p < midIn
                    ? map(p, lowIn, midIn, lowOut, midOut)
                    : map(p, midIn, highIn, midOut, highOut);
            const images = layout.querySelector(
                ".three-sizes-layouts-pages-image"
            );

            images.style.transform = `translate3d(${x}vw, 0, 0)`;
        });

        // update model selector buttons state
        selectorButtons.forEach((button, i) => {
            button.classList.toggle("selected", i === indexForSelectedLayout);
        });

        // update color selector buttons state
        colorButtons.forEach((button, i) => {
            button.classList.toggle(
                "selected",
                i === indexForSelectedColor[indexForSelectedLayout]
            );
        });

        // update arrow buttons state
        arrowButtons.forEach((button, i) => {
            if (i === 0 && indexForSelectedLayout === 0) {
                button.disabled = true;
            } else if (
                i === 1 &&
                indexForSelectedLayout === layouts.length - 1
            ) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });

        // update pricing
        const totalCostElement = document.getElementById(
            "three-sizes-footer-cost-total"
        );

        if (totalCostElement) {
            totalCostElement.innerText = formatCurrency(
                cost[indexForSelectedLayout][0]
            );
        }

        // update monthly payment
        const monthlyCostElement = document.getElementById(
            "three-sizes-footer-cost-monthly"
        );

        if (monthlyCostElement) {
            monthlyCostElement.innerText = `${formatCurrency(cost[indexForSelectedLayout][1])}/mo`;
        }

        const configureLinkElement = document.getElementById(
            "three-sizes-footer-configure-link"
        );

        if (configureLinkElement) {
            configureLinkElement.href = urlForConfigurator();
        }

        // explore link

        const exploreLinkElement = document.getElementById(
            "three-sizes-footer-explore-link"
        );

        if (exploreLinkElement) {
            exploreLinkElement.href = urlForProductPage();

            exploreLinkElement.querySelector(
                ".three-sizes-footer-explore-link-model"
            ).innerHTML = titleForProductPage();
        }

        // model summary

        const summaryElement = document.getElementById(
            "three-sizes-footer-summary"
        );

        if (summaryElement) {
            summaryElement.innerHTML = summary();
        }
    }

    function didChangeViewport(e) {
        if (e.type === "resize") {
            scrollWidth = container.scrollWidth;
        }

        cancelAnimationFrame(raf);

        raf = requestAnimationFrame(() => {
            update(e && e.type === "resize");
        });
    }

    function didClickContainer(e) {
        if (window.innerWidth < 768.0) {
            return;
        }

        if (e.clientX < container.clientWidth * 0.5) {
            if (indexForSelectedLayout > 0) {
                setIndexForSelectedLayout(indexForSelectedLayout - 1);
            }
        } else if (e.clientX > container.clientWidth * 0.5) {
            if (indexForSelectedLayout < layouts.length - 1) {
                setIndexForSelectedLayout(indexForSelectedLayout + 1);
            }
        }
    }

    function didMouseMoveContainer(e) {
        arrowButtons[0].classList.toggle(
            "highlight",
            e.clientX < container.clientWidth * 0.5
        );

        arrowButtons[1].classList.toggle(
            "highlight",
            e.clientX > container.clientWidth * 0.5
        );

        if (e.clientX < container.clientWidth * 0.5) {
            container.style.cursor =
                indexForSelectedLayout === 0 ? null : "pointer";
        } else if (e.clientX > container.clientWidth * 0.5) {
            container.style.cursor =
                indexForSelectedLayout === layouts.length - 1
                    ? null
                    : "pointer";
        }
    }

    function didMouseLeaveContainer() {
        arrowButtons.forEach((button) => {
            button.classList.remove("highlight");
        });
    }

    // model selector buttons
    selectorButtons.forEach((button, i) => {
        button.addEventListener("click", function didClickSelectorButton() {
            setIndexForSelectedLayout(i);
        });
    });

    // color selector buttons
    colorButtons.forEach((button, i) => {
        button.addEventListener("click", function didClickColorButton() {
            indexForSelectedColor[indexForSelectedLayout] = i;
            update();
        });
    });

    // arrow buttons
    arrowButtons.forEach((button, index) => {
        button.addEventListener("click", function didClickArrowButton() {
            switch (index) {
                case 0:
                    setIndexForSelectedLayout(indexForSelectedLayout - 1);
                    break;

                case 1:
                    setIndexForSelectedLayout(indexForSelectedLayout + 1);
                    break;

                default:
                    return;
            }

            update();
        });
    });

    container.addEventListener("scroll", didChangeViewport);
    container.addEventListener("click", didClickContainer);
    container.addEventListener("mousemove", didMouseMoveContainer);
    container.addEventListener("mouseleave", didMouseLeaveContainer);

    window.addEventListener("resize", didChangeViewport, { passive: true });
    document.addEventListener("scroll", didChangeViewport, { passive: true });

    setIndexForSelectedLayout(1, true);

    return function destroyThreeSizes() {
        window.removeEventListener("scroll", didChangeViewport);
        window.removeEventListener("resize", didChangeViewport);
    };
};
window.Backyard = window.Backyard || {};

Backyard.xl10 = function xl10() {
    const container = document.querySelector(".xl-10");

    if (container === null) {
        return () => {};
    }

    const images = container.querySelectorAll(".xl-10-parallax");

    let numberOfLoadedImages = 0;

    function map(n, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * ((n - low1) / (high1 - low1));
    }

    function didChangeViewport() {
        if (window.scrollY > container.clientHeight) {
            return;
        }

        const stops = window.innerWidth > 768.0 ? [-0.25, -0.32] : [0, -0.12];

        const ty = Math.min(
            map(
                Math.min(Math.max(window.scrollY, 0.0), container.clientHeight),
                0.0,
                container.clientHeight,
                stops[0],
                stops[1]
            ) * container.clientWidth,
            0.0
        );

        images.forEach((image) => {
            image.style.transform = `translate3d(0, 0, 0)`;
        });
    }

    function didLoadImage() {
        numberOfLoadedImages += 1;

        if (numberOfLoadedImages === container.querySelectorAll("img").length) {
            container.classList.add("xl-10-loaded");
        }
    }

    container.querySelectorAll("img").forEach((image) => {
        if (image.complete) {
            didLoadImage();
        } else {
            image.addEventListener("load", didLoadImage, { once: true });
        }
    });

    window.addEventListener("scroll", didChangeViewport);
    window.addEventListener("resize", didChangeViewport);
    didChangeViewport();

    return function destroy() {
        window.removeEventListener("scroll", didChangeViewport);
        window.removeEventListener("resize", didChangeViewport);
    };
};

(() => {
    if (document.readyState === "complete") {
        document.body.classList.add("complete");
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.body.classList.add("interactive");
    });

    window.addEventListener(
        "load",
        () => {
            document.body.classList.add("complete");
        },
        { once: true }
    );
})();

createDestroy(/^(\/|\/backyard|\/backyard\/)$/, function backyard() {
    const disposal = [
        Backyard.xl10(),
        Backyard.intro(),
        Backyard.introCarousel(),
        Backyard.invertNavigation(),
        Backyard.loadImagesLazily(),
        Backyard.threeSizes(),
        Backyard.createInteriorPhotoCards(),
        Backyard.createALotCanHappenCards(),
        Backyard.createBentoCardDetails(),
        Backyard.createJealousy(),
        Backyard.createBirds()
    ];

    return function backyard() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});
createDestroy(
	/^\/backyard\/configure.*/,
	function configurator() {
		return createApplication(
			"configurator",
			{},
			"/assets/javascripts/configurator/bundle/index.js"
		);
	},
	"router:did-update-content"
);
createDestroy(
	/^\/showrooms\/events.*|^\/events.*/,
	function event() {
		return createApplication("event");
	},
	"router:did-update-content"
);
createDestroy(/^\/backyard\/faq.*/, function faq() {
    const disposal = [Backyard.invertNavigation(), Backyard.createFaqMenu()];

    return function faq() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});
createDestroy(
    /^\/backyard\/financing.*/,
    async function createFinancingPage() {
        const disposal = [Backyard.invertNavigation()];
        const destroyApplication = await createApplication("financing");

        return () => {
            disposal.forEach((destroy) => destroy());
            destroyApplication();
        };
    },
    "router:did-update-content"
);

window.getYourRate = function getYourRate(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    gtag("event", "financing_get_your_rate");

    window.dispatchEvent(new Event("financing:rate-modal"));
};
createDestroy(/^\/backyard\/how-it-works.*/, function howItWorks() {
    const disposal = [Backyard.invertNavigation()];

    return function howItWorks() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});
const Insights = {
    createPagination() {
        const element = document.querySelector(".insights-pagination");

        if (element === null || element.dataset.init === true) {
            return () => {};
        }

        element.dataset.init = true;

        let pageIndex = 0;

        const container = document.querySelector(".insights-index-list");

        const [prevButton, nextButton] = Array.from(
            element.querySelectorAll("a")
        );

        function setPageIndex(nextPageIndex) {
            if (nextPageIndex < 0) {
                return;
            }

            if (nextPageIndex > element.dataset.numberOfPages - 1) {
                return;
            }

            pageIndex = nextPageIndex;

            const statedFetchingAt = Date.now();

            element.classList.add("insights-pagination-loading");
            container.classList.add("insights-index-list-will-change");

            fetch(`/insights/${pageIndex + 1}.data`)
                .then((res) => res.text())
                .then((text) => {
                    didFinishFetchingNextPage(statedFetchingAt, text);
                });

            prevButton.classList.toggle(
                "insights-pagination-hidden",
                pageIndex === 0
            );

            nextButton.classList.toggle(
                "insights-pagination-hidden",
                pageIndex === element.dataset.numberOfPages - 1
            );

            const pageLabel = `${pageIndex + 1}`;

            history.pushState(
                null,
                document.title,
                pageIndex === 0 ? "/insights" : `/insights?page=${pageLabel}`
            );

            element.querySelector("select").value = pageLabel;

            element.querySelector(
                ".insights-pagination-selector-current"
            ).innerHTML = pageLabel;
        }

        function didFinishFetchingNextPage(statedFetchingAt, text) {
            const delay = 400 - (Date.now() - statedFetchingAt);

            setTimeout(() => {
                container.innerHTML = text;
                window.scrollTo({ top: 0, behavior: "smooth" });
                container.classList.remove("insights-index-list-will-change");
                element.classList.remove("insights-pagination-loading");
            }, delay);
        }

        function didClickLink(e) {
            e.preventDefault();

            setPageIndex(
                pageIndex + parseInt(e.target.closest("a").dataset.direction)
            );
        }

        function didChangeSelection(e) {
            setPageIndex(parseInt(e.target.value) - 1);
        }

        [prevButton, nextButton].forEach((a) => {
            a.addEventListener("click", didClickLink);
        });

        element
            .querySelector("select")
            .addEventListener("change", didChangeSelection);

        const params = new URLSearchParams(document.location.search);

        if (params.has("page")) {
            setPageIndex((parseInt(params.get("page")) || 1) - 1);
        }

        return function destroyPagination() {};
    }
};

createDestroy(/^\/insights.*/, function insights() {
    const disposal = [Backyard.invertNavigation(), Insights.createPagination()];

    return function insights() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});
(() => {
    const pages = {"/jobs/architectural-designer":{"title":"Architectural Designer – Jobs – DGM","description":"DGM is looking for a talented and highly motivated Architectural Designer to join the Product \u0026 Design Team as an inspirational force for creating new ways of living.","class_names":"jobs job","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/jobs/job","position":10},"/showrooms/events/241031-capitola-crane-in":{"title":"Capitola ADU Crane-in Block Party — Showrooms — DGM","description":"You’re invited to our prefab ADU crane-in block party in Capitola!\r\n\r\n- Watch DGM’s Backyard ADU get installed in minutes\r\n- Enjoy free farm-to-table bites from Pretty Good Advice\r\n- Meet the DGM team and get a free same-day site assessment\r\n\r\nPlease RSVP for the address and crane-in schedule.","class_names":"backyard showroom event","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/showroom/event","position":-1,"share_sheet_image_id":"71c5e6a6-ce39-43f6-b5e2-e222b6987400"},"/news/there-s-more-to-love-with-backyard-xl-10":{"title":"There’s more to love with Backyard XL 10 — News — DGM","description":"Backyard just got bigger. We’re excited to unveil Backyard XL 10, the latest and largest addition to DGM’s ADU lineup.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":13,"share_sheet_image_id":"b1ae142b-b246-4501-20f1-f1350a84c300"},"/news/samara-launches-proprietary-financing-product-to-bring-more-space-to-millions-of-homeowners":{"title":"DGM Launches Proprietary Financing Product to  Bring More Space to Millions of Homeowners — News — DGM","description":"REDWOOD CITY, CALIFORNIA  — Today, DGM Finance, LLC, a wholly-owned subsidiary of DGM, announced it launched a first-of-its-kind financing product, making it easier for homeowners to finance Backyard, its accessory dwelling unit (ADU). Now, DGM uniquely manages the ADU process from conception to completion, handling everything from product design and prefab manufacturing, to permitting, delivery and installation, to financing. The new financing option makes it possible for homeowners to add flexible space to their homes with competitive rates. This enables the company to accelerate expansion and deliver more units in 2024 and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":12,"share_sheet_image_id":"c5700752-823e-4522-f805-a3a788b63400"},"/news/introducing-backyard-xl":{"title":"Introducing Backyard XL 8 — News — DGM","description":"We’re proud to unveil Backyard XL 8, our latest ADU model that makes it easy for homeowners to add more flexible living space to their existing properties. With two bedrooms and two bathrooms, the luxe 800-square-foot home provides ample space with larger appliances, and premium amenities.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":11,"share_sheet_image_id":"4f02d289-169f-4ab4-50e7-edb29cfa4300"},"/news/samara-acquires-factory-to-scale-manufacturing-of-backyard":{"title":"DGM Acquires Factory to Scale Manufacturing of Backyard  as Demand for ADUs Soars in California — News — DGM","description":"REDWOOD CITY, CALIFORNIA — Today, DGM announced it has acquired a factory that brings the manufacturing of its high-quality accessory dwelling unit (ADU), Backyard, completely in house. Located in Mexicali, Mexico, the factory gives DGM more control over the quality standard of Backyard, shortens delivery timelines, accelerates product development and enables the company to meet rising customer demand in California and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":10,"share_sheet_image_id":"dd6932ff-e29e-410b-b2e6-4f23130e1e00"},"/news/samara-raises-41-million-to-bring-high-quality-adus-to-every-backyard-in-california-and-beyond":{"title":"DGM raises $41 million to bring high quality ADUs to every backyard in California and beyond — News — DGM","description":"We’re excited to announce our $41M Series A round, led by Thrive Capital with participation from leading VC firms and angel investors. This latest funding will allow us to scale our brand, product offerings, team, and much needed manufacturing capacity to unlock growth and bring high quality accessory dwelling units (ADUs) to every backyard in California and beyond.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/newsroom/internal","position":9,"share_sheet_image_id":"59ee21f7-d5a4-4592-e873-b16c86b7ea00"},"/insights/adu-california-grant":{"title":"How To Get an ADU Grant in California — DGM","description":"An ADU California grant can help you build your accessory dwelling unit. Learn how to get an ADU grant in California to offset the associated costs.","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":12,"share_sheet_image_id":"4e095cd5-6432-4dd8-42de-02f965b60400"},"/insights/adu-cost-california":{"title":"How Much Does It Cost To Build an ADU in California? — DGM","description":"Before you design and build an ADU, consider the costs and benefits. Tally up how much an ADU costs in California and if it fits your budget.","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":11,"share_sheet_image_id":"0cbd6443-3673-4085-e6b4-44e240261e00"},"/insights/adu-california":{"title":"What Is Considered an ADU in California? — DGM","description":"Building an ADU can offer homeowners many benefits despite the initial investment. Find out what's considered an ADU in the state of California. ","class_names":"backyard insights insights-post","theme_color":"#000000","navigation_inverted":false,"partial_name":"partials/pages/insights/post","position":10,"share_sheet_image_id":"e0a07661-bd4d-4453-36fa-d68eabbf0300"},"/":{"title":"DGM - Backyard homes and ADUs","description":"Discover DGM's Backyard homes and ADUs. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard","theme_color":"#000000","navigation_inverted":false,"position":26,"partial_name":"partials/pages/backyard/backyard","share_sheet_image_id":"4422b17d-6e18-4bbb-6e87-102fb9821c00"},"/backyard":{"title":"DGM - Backyard homes and ADUs","description":"Discover DGM's Backyard homes and ADUs. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard","theme_color":"#000000","navigation_inverted":false,"position":25,"partial_name":"partials/pages/backyard/backyard","share_sheet_image_id":"dee522f0-e339-4516-1e61-0cb9fb83b300"},"/backyard/models":{"title":"Backyard - ADU Models - DGM","description":"Explore the full lineup of DGM's Backyard ADU models, including studio, one bedroom, and two bedroom layouts ranging from 420 to 950 square feet.","class_names":"backyard backyard-models backyard-models-index","theme_color":"#000000","navigation_inverted":true,"position":24,"partial_name":"partials/pages/backyard/models","share_sheet_image_id":"28663ada-d1e4-451f-90af-131a0b1e1700"},"/backyard/how-it-works":{"title":"Backyard – How It Works – DGM","description":"Learn how easy it is to install an accessory dwelling unit from DGM. From configuration to completion in as few as seven months.","class_names":"backyard how-it-works","theme_color":"#000000","navigation_inverted":false,"position":23,"partial_name":"partials/pages/backyard/how-it-works","share_sheet_image_id":"26440ce7-ba39-472d-0fec-c1d99823a500"},"/backyard/financing":{"title":"ADU Financing in California - DGM","description":"Explore tailored ADU financing options in California with DGM, offering affordable, efficient solutions to help you finance your backyard home.","class_names":"backyard financing","theme_color":"#000000","navigation_inverted":false,"position":22,"partial_name":"partials/pages/financing","share_sheet_image_id":null},"/backyard/faq":{"title":"Backyard – Frequently Asked Questions – DGM","description":"Find answers to the most asked questions about Backyard: building regulations, financial planning, construction, and more.","class_names":"backyard faq","theme_color":"#000000","navigation_inverted":false,"position":21,"partial_name":"partials/pages/backyard/faq","share_sheet_image_id":"525b3d2c-6270-4ef5-d824-ecd2f4edd000"},"/backyard/studio":{"title":"Backyard Studio - Prefab studio ADU - DGM","description":"DGM's prefab studio ADU is a small but mighty 420 sq. ft., featuring high cathedral ceilings, clever storage, and a fully-equipped kitchen designed for comfort and style. ","class_names":"backyard backyard-models backyard-models-studio","theme_color":"#000000","navigation_inverted":false,"position":20,"partial_name":"partials/pages/backyard/models/studio","share_sheet_image_id":"b60fe753-3258-4d18-aebf-200d8305f300"},"/backyard/one-bedroom":{"title":"Backyard One Bedroom - 1 bedroom ADU - DGM","description":"DGM’s 1 bedroom ADU features a spacious bathroom, ample storage, and a next-gen electric kitchen. It's the perfect blend of style and functionality in 540 square feet.","class_names":"backyard backyard-models backyard-models-onebed","theme_color":"#000000","navigation_inverted":false,"position":19,"partial_name":"partials/pages/backyard/models/onebed","share_sheet_image_id":"f30ce6f7-e670-4bf3-82cc-d33910a66a00"},"/backyard/two-bedroom":{"title":"Backyard Two Bedroom - 2 bedroom ADU - DGM","description":"DGM's 2 bedroom ADU offers 690 sq. ft. of flexible living space perfect for hosting guests, working from home, or generating rental income. Call it the ultimate flex.","class_names":"backyard backyard-models backyard-models-twobed","theme_color":"#000000","navigation_inverted":false,"position":18,"partial_name":"partials/pages/backyard/models/twobed","share_sheet_image_id":"13bf7b1a-901d-432f-bc02-e9978ee59500"},"/backyard/xl-8":{"title":"Backyard XL 8 - 800 sq. ft. ADU - DGM","description":"Learn more about Backyard XL 8, DGM’s 800 sq. ft. ADU featuring two bedrooms and two baths, larger appliances, and plenty of storage. Perfect for whatever use you can dream up.","class_names":"backyard backyard-models backyard-models-xl","theme_color":"#000000","navigation_inverted":false,"position":17,"partial_name":"partials/pages/backyard/models/xl-8","share_sheet_image_id":"b9f187b1-bc1b-42f7-9973-e781d980ac00"},"/backyard/xl-10":{"title":"Backyard XL 10 - 2 bedroom, 2 bath ADU - DGM","description":"Backyard XL 10 is DGM’s spacious 2 bedroom, 2 bath ADU with an upsized kitchen and living room and 950 sq. ft. of flexible space.","class_names":"backyard backyard-models backyard-models-xl-10","theme_color":"#000000","navigation_inverted":false,"position":16,"partial_name":"partials/pages/backyard/models/xl-10","share_sheet_image_id":"b851ca06-c7b5-4c2a-e2da-68d097780f00"},"/backyard/compare":{"title":"Compare Backyard models – DGM","description":"Compare Backyard models","class_names":"backyard backyard-compare","theme_color":"#000000","navigation_inverted":false,"position":15,"partial_name":"partials/pages/backyard/compare","share_sheet_image_id":null},"/backyard/configure":{"title":"Customize Backyard – DGM","description":"Customize and get a quote for DGM's Backyard ADU. Elevated design, expertly crafted. Fast and easy installation. Solar-powered and future-ready.","class_names":"backyard configurator","theme_color":"#000000","navigation_inverted":false,"position":14,"partial_name":"partials/pages/backyard/configure","share_sheet_image_id":"a02d2050-630d-403d-d386-ccb3506c2300"},"/news":{"title":"News – DGM","description":"Read the latest news about DGM.","class_names":"newsroom","theme_color":"#000000","navigation_inverted":false,"position":13,"partial_name":"partials/pages/newsroom/newsroom","share_sheet_image_id":"7fd49401-f728-4c12-0229-3fe7abf62900"},"/insights":{"title":"Insights — DGM","description":"","class_names":"backyard insights insights-index","theme_color":"#000000","navigation_inverted":false,"position":12,"partial_name":"partials/pages/insights/index","share_sheet_image_id":null},"/insights/life-with-backyard-meet-the-kurodas":{"title":"Life with Backyard: Meet the Kurodas — DGM","description":"The Kurodas give us a tour of their cozy Backyard, built to help them stay close to family.","class_names":"backyard insights insights-story","theme_color":"#000000","navigation_inverted":true,"position":11,"partial_name":"partials/pages/insights","share_sheet_image_id":"4fc66bdc-2449-4d2d-d7f5-1dc35f7fd400"},"/jobs":{"title":"Jobs – DGM","description":"Join DGM to help create new ways of living that help people dream bigger.","class_names":"jobs","theme_color":"#000000","navigation_inverted":false,"position":10,"partial_name":"partials/pages/jobs/jobs","share_sheet_image_id":"69bca2cb-e628-48ad-c8fc-ebd743b2c700"},"/showrooms":{"title":"Showrooms – DGM","description":"Tour Backyard in person at an our San Francisco Bay Area and Los Angeles showrooms. Learn more about our locations and book a private tour.","class_names":"backyard showroom","theme_color":"#000000","navigation_inverted":false,"position":9,"partial_name":"partials/pages/showroom/showroom","share_sheet_image_id":"7f28da8b-6ec2-423a-f3a8-8a5e7ffa4500"},"/showrooms/redwood-city":{"title":"Redwood City Showroom – DGM","description":"Tour Backyard in person at DGM Redwood City. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":8,"partial_name":"partials/pages/showroom/redwood-city","share_sheet_image_id":"8e379157-712c-4bea-a50a-38c36767db00"},"/showrooms/redwood-city/visit":{"title":"Schedule Your Showroom Visit – DGM","description":"Tour Backyard in person at DGM Redwood City. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":7,"partial_name":"partials/pages/showroom/visit","share_sheet_image_id":"6b07701e-267e-4d6f-b0ea-a32fd8c27a00"},"/showrooms/thousand-oaks":{"title":"Thousand Oaks Pop-up Showroom – DGM","description":"Tour Backyard in person at DGM Thousand Oaks. Find our hours and learn how to book a private tour.","class_names":"backyard showroom tour","theme_color":"#000000","navigation_inverted":false,"position":6,"partial_name":"partials/pages/showroom/thousand-oaks","share_sheet_image_id":"00cc326f-f637-4227-f98d-dff49167c900"},"/showrooms/thousand-oaks/visit":{"title":"Schedule Your Showroom Visit – DGM","description":"","class_names":"","theme_color":"#000000","navigation_inverted":false,"position":5,"partial_name":"partials/pages/showroom/visit","share_sheet_image_id":null},"/developers":{"title":"DGM for Developers","description":"Unlock the potential of your parcel with Backyard Multiunit.","class_names":"multiunit backyard","theme_color":"#000000","navigation_inverted":true,"position":4,"partial_name":"partials/pages/multiunit","share_sheet_image_id":"a6119568-ae31-44e7-e7a6-ad201ad8a500"},"/yoshino":{"title":"Yoshino – DGM","description":null,"class_names":"yoshino","theme_color":"#000000","navigation_inverted":false,"position":3,"partial_name":"partials/pages/yoshino","share_sheet_image_id":null},"/terms-of-service":{"title":"Terms of Service – DGM","description":"","class_names":"legal","theme_color":"#000000","navigation_inverted":false,"position":2,"partial_name":"partials/pages/terms-of-service","share_sheet_image_id":"834edb4b-cd31-423c-4ed3-1accf2066200"},"/privacy-policy":{"title":"Privacy Policy – DGM","description":null,"class_names":"legal","theme_color":"#000000","navigation_inverted":false,"position":1,"partial_name":"partials/pages/privacy-policy","share_sheet_image_id":"94f4f098-aa84-4d11-1b87-65836380a800"}};

    let dots = [];
    let isAnimating = false;

    function update() {
        isAnimating = dots.length > 0;

        dots.forEach((dot) => {
            if (!dot.element.parentElement) {
                document.body.appendChild(dot.element);
            }

            if (dot.x + dot.vx < 0 && dot.vx < 0) {
                dot.vx *= -1.0;
            } else if (
                dot.x + dot.vx + dot.radius * 2.0 > window.innerWidth &&
                dot.vx > 0.0
            ) {
                dot.vx *= -1.0;
            }

            if (dot.y + dot.vy < 0 && dot.vy < 0) {
                dot.vy *= -1.0;
            } else if (
                dot.y + dot.vy + dot.radius * 2.0 > window.innerHeight &&
                dot.vy > 0.0
            ) {
                dot.vy *= -1.0;
            }

            if (dot.vx < -0.5 || dot.vx > 0.5) {
                dot.vx *= 0.99;
            }

            if (dot.vy < -0.5 || dot.vy > 0.5) {
                dot.vy *= 0.99;
            }

            dot.x += dot.vx;
            dot.y += dot.vy;

            dot.x = Math.min(
                Math.max(dot.x, 0.0),
                window.innerWidth - dot.radius * 2.0
            );

            dot.y = Math.min(
                Math.max(dot.y, 0.0),
                window.innerHeight - dot.radius * 2.0
            );

            dot.element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
        });

        if (dots.length) {
            requestAnimationFrame(update);
        }
    }

    function createDot() {
        const jobsElement = document.querySelector(".jobs .jobs");

        if (!jobsElement) {
            return;
        }

        const isEmpty = jobsElement.classList.contains("empty");

        const radius = 7.0;
        const x = Math.random() * (window.innerWidth - radius);
        const y = Math.random() * (window.innerHeight - radius);

        const dvx = -1.0 + Math.random() * 2.0;
        const dvy = -1.0 + Math.random() * 2.0;
        const mag = Math.sqrt(dvx * dvx + dvy * dvy);
        const vx = (dvx / mag) * 0.5;
        const vy = (dvy / mag) * 0.5;

        const element = document.createElement("div");
        element.className = "dot";
        element.style.width = radius * 2.0 + "px";
        element.style.height = radius * 2.0 + "px";
        element.style.opacity = isEmpty ? 0.3 : null;

        return { x, y, vx, vy, radius, element };
    }

    function jobs() {
        if (dots.length) {
            return;
        }

        const numberOfDots = Object.keys(pages).filter((title) =>
            title.startsWith("/jobs/")
        ).length;

        dots = [];

        Array(numberOfDots)
            .fill(null)
            .forEach(() => {
                setTimeout(
                    () => {
                        const dot = createDot();

                        if (dot !== undefined) {
                            dots.push(dot);
                        }

                        if (!isAnimating) {
                            update();
                        }
                    },
                    Math.random() * 500 * numberOfDots
                );
            });

        return function jobs() {
            dots.forEach((dot) => {
                if (dot.element) {
                    document.body.removeChild(dot.element);
                }
            });

            dots = [];
        };
    }

    createDestroy(/^\/jobs.*/, jobs, "router:did-update-content");
})();
createDestroy(/^\/backyard\/.*/, function createModels() {
    const disposal = [
        Backyard.invertNavigation(),
        Backyard.loadImagesLazily(),
        Backyard.createInteriorPhotoCards()
    ];

    return function destroyModels() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});
createDestroy(
    /^\/developers.*/,
    function multiUnit() {
        document
            .querySelector("nav .backyard-configure.multiunit")
            .addEventListener("click", function didClickGetInTouchButton(e) {
                e.stopPropagation();
                e.preventDefault();

                const rect = document
                    .querySelector(".multiunit-hr")
                    .getBoundingClientRect();

                window.scrollTo({
                    top: window.scrollY + rect.top,
                    behavior: "smooth"
                });
            });

        return createApplication("multiunit");
    },
    "router:did-update-content"
);
createDestroy(/^\/news/, function newsroom() {
    const disposal = [Backyard.invertNavigation()];

    return function newsroom() {
        disposal.forEach((destroy) => {
            destroy();
        });
    };
});

(() => {
    function displayFeedback(e) {
        e.classList.add("newsroom-internal-feedback-visible");
        setTimeout(() => {
            e.classList.remove("newsroom-internal-feedback-visible");
        }, 3_000);
    }

    globalThis.Newsroom = {
        copyText(e) {
            e.preventDefault();

            const title = document.querySelector("h1").innerText;

            const body = Array.from(
                document.querySelectorAll(
                    "time, .newsroom-internal-body p, .newsroom-internal-body h2, .newsroom-internal-body h3, .newsroom-internal-body blockquote, .newsroom-internal-body li"
                )
            )
                .map((e) => {
                    if (e.nodeName === "LI") {
                        return `\n- ${e.innerText}\n`;
                    }

                    return `\n${e.innerText}\n`;
                })
                .join("");

            navigator.clipboard.writeText(`${title}\n${body}`);

            displayFeedback(e.target);
        },

        downloadImages(e) {
            e.preventDefault();

            document
                .querySelectorAll(".newsroom img[data-downloadable]")
                .forEach((image, index) => {
                    setTimeout(() => {
                        const a = document.createElement("a");
                        a.href = image.src;
                        a.target = "_blank";
                        a.download = image.src.split("/").reverse()[0];
                        a.click();
                    }, 100 * index);
                });
        },

        copyLink(e) {
            navigator.clipboard.writeText(location.href);

            displayFeedback(e.target);
        }
    };
})();
createDestroy(
    /^(\/showrooms|\/showrooms\/|\/showrooms\/.*)$/,
    function showroom() {
        const limit = Date.now();

        document.querySelectorAll(".showroom-events").forEach((list) => {
            const events = Showroom.events.filter((e) => e.showroom === list.dataset.showroom);

            list.dataset.numberOfEvents = events.filter(
                (e) => Date.parse(e.start_at) > limit
            ).length;

            list.querySelectorAll("li").forEach((li) => {
                li.hidden = Date.parse(li.dataset.startAt) <= limit;
            });
        });

        const destroyLazyLoader = Backyard.loadImagesLazily();

        return function showroom() {
            destroyLazyLoader();
        };
    },
    "router:did-update-content"
);

createDestroy(
    /^\/showrooms\/.*\/visit.*/,
    function showroomVisit() {
        return createApplication("showroom");
    },
    "router:did-update-content"
);

globalThis.Showroom = {
    events: [{"title":"August Open House: Thousand Oaks","slug":"august-2024-open-house-thousand-oaks","showroom":"thousand-oaks","image_id":null,"location_title":"","location_url":"","description":"Drop by our Thousand Oaks pop-up and tour our stunning one-bedroom Backyard unit. Light refreshments and great vibes guaranteed.\r\n","start_at":"2024-08-10T11:00:00.000+00:00","end_at":"2024-08-10T14:00:00.000+00:00","is_published":false},{"title":"San Jose ADU Crane-in Block Party","slug":"241001-san-jose-crane-in","showroom":"","image_id":"b974dd5a-8992-4dd1-bad6-f953307f7600","location_title":"San Jose","location_url":"","description":"You’re invited to our prefab ADU crane-in block party in San Jose!\r\n\r\n- Watch DGM’s Backyard ADU get installed in minutes\r\n- Enjoy free boba and pan-Asian bites\r\n- Meet the DGM team and get a free same-day site assessment\r\n\r\nPlease RSVP for the address and crane-in schedule.","start_at":"2024-10-01T12:00:00.000+00:00","end_at":"2024-10-01T13:30:00.000+00:00","is_published":false},{"title":"September Open House: Thousand Oaks","slug":"240921-open-house-thousand-oaks","showroom":"thousand-oaks","image_id":"b2866365-2525-496c-6348-e24581312900","location_title":"","location_url":"","description":"Drop by our Thousand Oaks pop-up and tour our stunning one-bedroom Backyard unit. Light refreshments and great vibes guaranteed.","start_at":"2024-09-21T11:00:00.000+00:00","end_at":"2024-09-21T14:00:00.000+00:00","is_published":false},{"title":"Open House: Thousand Oaks","slug":"open-house-thousand-oaks-240720","showroom":"thousand-oaks","image_id":null,"location_title":"","location_url":"","description":"Drop by our Thousand Oaks pop-up and tour our stunning one-bedroom Backyard unit. Light refreshments and great vibes guaranteed.","start_at":"2024-07-20T11:00:00.000+00:00","end_at":"2024-07-20T14:00:00.000+00:00","is_published":false},{"title":"Livestream: Backyard 101 with Scott Wilson","slug":"livestream-backyard-101-with-scott-wilson-240605","showroom":"","image_id":"20ae49ce-5676-4b2d-8600-8e7e6f950b00","location_title":"Online (Zoom Meeting)","location_url":"","description":"Join DGM’s VP of Revenue, Scott Wilson, to get a crash course on Backyard, DGM's flagship accessory dwelling unit (ADU).\r\n\r\nIn this hourlong, interactive livestream he’ll cover:\r\n\r\n- Why ADUs are so popular, the laws around them, and the steps to get one\r\n- What sets DGM ADUs apart in design, quality, service, sustainability and manufacturing\r\n- ADU costs and how to finance them\r\n- Background on the DGM team, our factory in Mexico, and more","start_at":"2024-06-05T19:30:00.000+00:00","end_at":"2024-06-05T20:30:00.000+00:00","is_published":false},{"title":"Webinar: Introducing DGM's Real Estate Partner Program","slug":"webinar-introducing-samaras-real-estate-partner-program","showroom":"redwood-city","image_id":"e3d2c7e0-3089-4414-9b55-234fed4b2b00","location_title":"Online (Zoom Meeting)","location_url":"","description":"For real estate professionals. Join our webinar to learn about Backyard, DGM's flagship accessory dwelling unit (ADU), and how to boost your income through our real estate partner program.\r\n\r\nWe'll cover:\r\n\r\n- ADU basics: why they're popular, what they cost, market insights, and more\r\n- Backyard 101: what sets DGM ADUs apart in design, quality, service, and sustainability\r\n- How to enroll in our partner program and our partner referral benefits\r\n\r\nReserve your spot today and build the future of housing in California with us!","start_at":"2024-04-26T13:00:00.000+00:00","end_at":"2024-04-26T14:00:00.000+00:00","is_published":false},{"title":"Open House: Discover Backyard","slug":"open-house-discover-backyard","showroom":"redwood-city","image_id":null,"location_title":null,"location_url":null,"description":"Drop by DGM Redwood City for a coffee and learn what the hype around Backyard is all about. Tour a Backyard Studio unit, check out our materials, and get answers to your questions from our team of specialists.","start_at":"2024-01-20T13:00:00.000+00:00","end_at":"2024-01-20T16:00:00.000+00:00","is_published":false},{"title":"Watsonville Crane-in Event","slug":"watsonville-crane-in-event","showroom":"","image_id":"23012e6f-8477-4d63-179f-4040ab711900","location_title":"Watsonville, CA","location_url":"","description":"We’d love to see you at our crane-in event in Watsonville!\r\n\r\n- Watch DGM’s Backyard ADU get installed in minutes\r\n- Enjoy music, coffee, and other refreshments\r\n- Meet the DGM team and get a free site assessment\r\n\r\nPlease RSVP for the complete address and day-of schedule.\r\n","start_at":"2024-05-07T10:30:00.000+00:00","end_at":"2024-05-07T12:00:00.000+00:00","is_published":false},{"title":"Open House: Thousand Oaks","slug":"open-house-thousand-oaks-240511","showroom":"thousand-oaks","image_id":null,"location_title":"","location_url":"","description":"Drop by our Thousand Oaks pop-up and tour our stunning one-bedroom Backyard unit. Light refreshments and great vibes guaranteed.","start_at":"2024-05-11T11:00:00.000+00:00","end_at":"2024-05-11T14:00:00.000+00:00","is_published":false},{"title":"Capitola ADU Crane-in Block Party","slug":"241031-capitola-crane-in","showroom":"","image_id":"71c5e6a6-ce39-43f6-b5e2-e222b6987400","location_title":"1605 38th Ave, Capitola","location_url":"","description":"You’re invited to our prefab ADU crane-in block party in Capitola!\r\n\r\n- Watch DGM’s Backyard ADU get installed in minutes\r\n- Enjoy free farm-to-table bites from Pretty Good Advice\r\n- Meet the DGM team and get a free same-day site assessment\r\n\r\nPlease RSVP for the address and crane-in schedule.","start_at":"2024-10-31T10:00:00.000+00:00","end_at":"2024-10-31T13:00:00.000+00:00","is_published":true}],
    jumpTo(showroom) {
        const element = document.getElementById(showroom);
        const box = element.getBoundingClientRect();
        const margin = window.innerWidth <= 768.0 ? 100 : 120;

        window.scrollTo({ top: box.top - margin, behavior: "smooth" });
    }
};




globalThis.gtag = globalThis.gtag || (() => {});

document.addEventListener("DOMContentLoaded", () => {
	document.body.classList.remove("no-javascript");
});

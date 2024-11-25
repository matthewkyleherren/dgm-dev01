window.dataLayer = window.dataLayer || [];

if (window.Statsig !== undefined) {
	window.statsig = new Statsig.StatsigClient(
		"client-14AEhOOdI4GdEaxfBFTovoEoiOnJ68ev5k62cphseBg",
		{},
		{
			environment: { tier: "production" }
		}
	);

	Statsig.runStatsigSessionReplay(window.statsig);
	Statsig.runStatsigAutoCapture(window.statsig);
}

function utm() {
	const params = new URLSearchParams(location.search);
	const result = {};

	params.forEach((value, key) => {
		if (key.startsWith("utm_")) {
			result[key] = value;
		}
	});

	return result;
}

function gtag() {
	window.dataLayer.push(arguments);

	const [command, param, data] = arguments;

	if (window.statsig !== undefined && command === "event") {
		statsig.logEvent({ eventName: param, metadata: { ...data, ...utm() } });
	}
}

gtag("js", new Date());
gtag("config", "G-Y1SW8E75MN");
gtag("config", "AW-11027142108", { allow_enhanced_conversions: true });

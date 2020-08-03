(function addRequestIdleCallback() {
    window.requestIdleCallback = window.requestIdleCallback || function (handler) {
        let startTime = Date.now();

        return setTimeout(function () {
            handler({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50.0 - (Date.now() - startTime));
                }
            });
        }, 1);
    };
})();

class Monitoring {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    use(key) {
        if (this.apiKey) {
            ObservePerformance.observe();
            new EvilMethodsCheck(key).checkUsingEval();
            new EvilMethodsCheck(key).checkUsingDocumentWrite();
            new MetaTags(key).checkMetaTags();
        }
    }
}

// not recommended methods
class EvilMethodsCheck extends Monitoring {

    constructor(apiKey) {
        super(apiKey);
    }

    checkUsingDocumentWrite() {
        if (document) {
            const write = document.write;
            document.write = (params) => {
                Request.postRequest('info',
                    [{
                        date: Date.now(),
                        appId: this.apiKey,
                        type: 'write',
                        message: `don't use document.write()`,
                        details: 'see more at: https://developer.mozilla.org/ru/docs/Web/API/Document/write'
                    }]
                );
                write.call(document, params);
            };
        }
    }

    checkUsingEval() {
        if (window) {
            const evaluate = window.eval;
            window.eval = (params) => {
                Request.postRequest('info',
                    [{
                        date: Date.now(),
                        appId: this.apiKey,
                        type: 'eval',
                        message: `don't use eval()`,
                        details: 'see more at: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/eval'
                    }]
                );
                evaluate.call(window, params);
            };
        }
    }
}

class Request {
    static postRequest(endpoint, data) {
        if ((data && data.length) || data) {
            requestIdleCallback(() => {
                fetch(`https://web-monitoring-cba12.firebaseio.com/${ endpoint }.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(...data),
                });
            });
        }
    }
}

class ObservePerformance {
    static performanceObserveInstance() {
        return new PerformanceObserver((list) => {
            const resources = ObservePerformance.dataProcessing(list.getEntries()
                .filter(item => item instanceof PerformanceResourceTiming));

            resources.then(data => {
                Request.postRequest('analytics', data);
            });
        });
    }

    static dataProcessing(data) {
        const TIMING = 15000;

        return new Promise((resolve, reject) => {
            if (data) {
                setTimeout(() => {
                    resolve(new DataAnalytics('1223334444').mutateObjects(data));
                }, TIMING);
            } else {
                reject('something went to wrong');
            }
        });
    }

    static observe() {
        const po = ObservePerformance.performanceObserveInstance();

        po.observe({ type: 'resource', buffered: true });
        po.observe({ type: 'navigation', buffered: true });
        ObservePerformance.disconnect(po);
    }

    static disconnect(po) {
        const DISCONNECT_TIMING = 25000;

        setTimeout(() => {
            po.disconnect();
        }, DISCONNECT_TIMING);
    }
}


class DataAnalytics extends Monitoring {

    constructor(apiKey) {
        super(apiKey);
    }

    eachData(item) {
        return {
            date: Date.now(),
            appId: this.apiKey,
            duration: item.duration,
            encodedBodySize: item.encodedBodySize,
            entryType: item.entryType,
            fetchStart: item.fetchStart,
            initiatorType: item.initiatorType,
            name: item.name,
            startTime: item.startTime,
            transferSize: item.transferSize,
        };
    }

    mutateObjects(arg) {

        const tempArray = [];

        tempArray.push(arg);

        const flatedArray = tempArray.flat(2);

        return flatedArray.map(item => {

            if (item.initiatorType === 'css' || item.initiatorType === 'script' || item.initiatorType === 'link') {
                const data = this.eachData(item);

                data.isCached = item.transferSize === 0;
                data.isMinified = (item.name.includes('.css') || item.name.includes('.js')) ? item.name.includes('.min') : null;
                delete data.isMinified;

                return data;
            } else if (item.initiatorType === 'navigation') {
                const data = this.eachData(item);

                data.domContentLoaded = item.domContentLoadedEventEnd - item.domContentLoadedEventStart;
                data.domComplete = item.domComplete;
                data.domInteractive = item.domInteractive;

                return data;
            } else if (item.initiatorType === 'xmlhttprequest') {
                return this.eachData(item);
            } else if (item.initiatorType === 'img') {
                const data = this.eachData(item);

                data.isCached = item.transferSize === 0;
                data.needToChangeImgFormat = !/.*\.(webp+|svg+|gif+)/ig.test(item.name);

                return data;
            } else {
                const data = this.eachData(item);

                data.isCached = item.transferSize === 0;

                return data;
            }
        });
    }
}

class MetaTags extends Monitoring {
    constructor(apiKey) {
        super(apiKey);
    }

    checkMetaTags() {
        const meta = [...document.querySelectorAll('meta')];
        const title = document.querySelector('title');
        const metaNames = [];
        const badMetaTagsName = [];
        const goodMetaTagsName = [];
        const goodMetaTags = ['description', 'viewport'];
        const badMetaTags = [
            'author',
            'web author',
            'revisit after',
            'rating',
            'expiration',
            'data',
            'copyright',
            'abstract',
            'distribution',
            'generator',
            'cache-control',
            'resource type',
        ];

        for (let item of meta) {
            metaNames.push(item.name);
        }

        meta.forEach(item => {
            if (badMetaTags.includes(item.name)) {
                badMetaTagsName.push(item.name);
            }
        });

        goodMetaTags.forEach(item => {
            if (!metaNames.includes(item)) {
                goodMetaTagsName.push(item);
            }
        });

        if (title.text.length > 50) {
            Request.postRequest('info', [{
                appId: this.apiKey,
                date: Date.now(),
                message: 'Your title is too long',
                type: 'title',
                details: 'see more at: https://developer.mozilla.org/ru/docs/Web/HTML/Element/title',
            }]);
        }

        if (badMetaTagsName.length) {
            Request.postRequest('info', [{
                appId: this.apiKey,
                date: Date.now(),
                message: `You are using ${ badMetaTagsName.join(',') } bad meta tags`,
                type: 'badMeta',
                details: 'see more at: https://metatags.io/',
            }]);
        }

        if (goodMetaTagsName.length) {
            Request.postRequest('info', [{
                appId: this.apiKey,
                date: Date.now(),
                message: `You have to use ${goodMetaTagsName.join(",")} meta tags`,
                type: 'goodMeta',
                details: 'see more at: https://metatags.io/',
            }]);
        }

    }
}


window.Monitoring = Monitoring;

//** how to use
const monitoring = new Monitoring('1223334444');
//
monitoring.use('1223334444');

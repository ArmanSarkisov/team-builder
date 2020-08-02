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

// not recommended methods
class CheckUsingBadMethods {

    static checkUsingDocumentWrite() {
        if (document) {
            const write = document.write;
            document.write = (params) => {
                Request.postRequest('info', [{ message: `don't use document.write()` }]);
                write.call(document, params);
            };
        }
    }

    static checkUsingEval() {
        if (window) {
            const evaluate = window.eval;
            window.eval = (params) => {
                Request.postRequest('info',[{ message: `don't use eval()` }]);
                evaluate.call(window, params);
            };
        }
    }
}

class Request {
    static postRequest(endpoint, data) {
        if (data && data.length) {
            requestIdleCallback(() => {
                fetch(`https://web-monitoring-cba12.firebaseio.com/${endpoint}.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
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

            resources.then(r => {
                Request.postRequest('analytics', r);
            });
        });
    }

    static dataProcessing(data) {
        const TIMING = 15000;

        return new Promise((resolve, reject) => {
            if (data) {
                setTimeout(() => {
                    resolve(DataAnalytics.mutateObjects(data));
                }, TIMING);
            } else {
                reject('something went to wrong');
            }
        });
    }

    static observe() {
        const po = ObservePerformance.performanceObserveInstance();

        po.observe({ entryTypes: ['resource', 'navigation'] });
    }

    static disconnect() {
        const DISCONNECT_TIMING = 25000;
        const po = ObservePerformance.performanceObserveInstance();

        setTimeout(() => {
            po.disconnect();
        }, DISCONNECT_TIMING);
    }
}


class DataAnalytics {
    static eachData(item) {
        return {
            date: Date.now(),
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

    static mutateObjects(arg) {
        const tempArray = [];

        tempArray.push(arg);

        const flatedArray = tempArray.flat(2);

        return flatedArray.map(item => {
            if (item.initiatorType === 'css' || item.initiatorType === 'script' || item.initiatorType === 'link') {
                const data = DataAnalytics.eachData(item);

                data.isCached = item.transferSize === 0;
                data.isMinified = item.name.includes('.min');

                return data;
            } else if (item.initiatorType === 'navigation') {
                const data = DataAnalytics.eachData(item);

                data.domContentLoaded = item.domContentLoadedEventEnd - item.domContentLoadedEventStart;
                data.domComplete = item.domComplete;
                data.domInteractive = item.domInteractive;

                return data;
            } else if (item.initiatorType === 'xmlhttprequest') {
                return DataAnalytics.eachData(item);
            } else if (item.initiatorType === 'img') {
                const data = DataAnalytics.eachData(item);

                data.isCached = item.transferSize === 0;
                data.needToChangeImgFormat = !/.*\.(webp+|svg+|gif+)/ig.test(item.name);

                return data;
            } else {
                const data = DataAnalytics.eachData(item);

                data.isCached = item.transferSize === 0;

                return data;
            }
        });
    }
}


ObservePerformance.observe();
CheckUsingBadMethods.checkUsingEval();
CheckUsingBadMethods.checkUsingDocumentWrite();
ObservePerformance.disconnect();

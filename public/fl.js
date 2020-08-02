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

    use() {
        if(this.apiKey) {
            ObservePerformance.observe();
            EvilMethodsCheck.checkUsingEval();
            EvilMethodsCheck.checkUsingDocumentWrite();
        }
    }
}

// not recommended methods
class EvilMethodsCheck {

    static checkUsingDocumentWrite() {
        if (document) {
            const write = document.write;
            document.write = (params) => {
                Request.postRequest('info', [
                    {
                        date: Date.now(),
                        appId: 1223334444,
                        type: 'write',
                        message: `don't use document.write()`
                    }
                ]);
                write.call(document, params);
            };
        }
    }

    static checkUsingEval() {
        if (window) {
            const evaluate = window.eval;
            window.eval = (params) => {
                Request.postRequest('info',[
                    {
                        date: Date.now(),
                        appId: 1223334444,
                        type: 'eval',
                        message: `don't use eval()`
                    }
                ]);
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

        ObservePerformance.disconnect(po);
    }

    static disconnect(po) {
        const DISCONNECT_TIMING = 25000;

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
                data.isMinified = (item.name.includes('css') || item.name.includes('js')) ? item.name.includes('.min') : null;
                delete data.isMinified;

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



//** how to use
// const monitoring = new Monitoring('1233');
//
// monitoring.use();

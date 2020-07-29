class Monitoring {
    static getEntriesByType(type) {
        if (typeof window !== 'undefined') {
            return window.performance.getEntriesByType(type);
        }
        return null;
    }
}

// old classes ->

class Navigation {
    static getNavigationPerformance() {
        return Monitoring.getEntriesByType('navigation');
    }

    // TODO: Aharon
    static DOMContentLoadedTiming() {
        Navigation.getNavigationPerformance()
            .forEach(item => {
                // console.log(item);
                // TODO: get dom content loaded time, you need item.domContentLoadedEventEnd and item.domContentLoadedEventStart
                setTimeout(() => {
                    console.log('dom content loaded', item.domContentLoadedEventEnd, item.domContentLoadedEventStart);
                }, 0);
            });
    }

    static isChached() {
        return Navigation.getNavigationPerformance()[0].transferSize ?
            console.log("The data is cached") :
            console.log("The data is not cached");
    }

    // TODO: Rob
    static DOMCompleteTiming() {
        Navigation.getNavigationPerformance()
            .forEach(item => {
                console.log(item);
                // TODO: get Dom complete timing
                setTimeout(() => {
                    console.log('DOM complete = ' + toSec(item.domComplete));
                }, 1000);
            });
    }
}

// <-old classes


// TODO: use PerformanceObserver

class Resource {
    static getResourcePerformance() {
        return Monitoring.getEntriesByType('resource');
    }

    static RequestTiming() {
        console.log(Date.now());
        Resource.getResourcePerformance()
            .forEach(item => {
                console.log(item);
                setTimeout(() => {
                    console.log('Request timing = ' + item.name + ' ' + (item.responseEnd - item.requestStart) + ' ' + item.duration);
                }, 1000);
            });
    }
}

// class -> images -> Aharon -> jpg png jpeg -> webp
// class -> other -> Aharon
// class -> xmlrequest -> Lilit
// class -> link -> Rob
// class -> css -> Rob
// {
// useWebP: true || false
// isCache: true || false
// loadTime: 1
// }

// TODO: need ms to sec function;
const toSec = m => (m / 1000).toFixed(2);
const arr = [];

const isCached = (arr) => {
    return arr.map(item => (
        {
            ...item,
            isCached: item.transferSize === 0
        }))
}

const po = new PerformanceObserver((list) => {
    const img = list.getEntries().filter(item => item.initiatorType === 'img');
    const cache = isCached(img);

    for(let i = 0; i < cache.length; i++){
        arr.push(cache[i]);
    }
});

po.observe({ type: 'resource', buffered: true });


// const perfData = window.performance.timing;
// const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
// console.log(pageLoadTime);

// classes methods execute
// Navigation.DOMContentLoadedTiming();
// Navigation.DOMCompleteTiming();

// Wait at most two seconds before processing events.
// requestIdleCallback( Resource.RequestTiming(), { timeout: 2000 });


class CheckUsingBadMethods {

    static evalCount = 0;
    static checkDocWriteCount = 0;

    static checkUsingDocumentWrite() {
        if (document) {
            const write = document.write;
            let usingDocWriteCount = 0;
            document.write = (params) => {
                usingDocWriteCount++;
                CheckUsingBadMethods.checkDocWriteCount += usingDocWriteCount;
                write.call(document, params);
            };
        }
    }

    static checkUsingEval() {
        if (window) {
            const evaluate = window.eval;
            let usingEvalCount = 0;
            window.eval = (params) => {
                usingEvalCount++;
                CheckUsingBadMethods.evalCount += usingEvalCount;
                evaluate.call(window, params);
            };
        }
    }
}

window.CheckUsingBadMethods = CheckUsingBadMethods;
CheckUsingBadMethods.checkUsingEval();
CheckUsingBadMethods.checkUsingDocumentWrite();
Navigation.isChached();

/** DO NOT DELETE!!!!!!!!!! */

//for finding the image element from the source
// Array.from(document.getElementsByTagName('img')).filter(i => i.src=='https://www.nicepng.com/png/detail/503-5032252_shamim-amiri-blank-female-avatar-icon.png')

/** DO NOT DELETE!!!!!!!!!! */

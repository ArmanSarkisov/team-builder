class Monitoring {
    static getEntriesByType(type) {
        if (typeof window !== 'undefined') {
            return window.performance.getEntriesByType(type);
        }
        return null;
    }
}

class Navigation {
    static getNavigationPerformance() {
        return Monitoring.getEntriesByType('navigation');
    }

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
class Resource {
    static getResourcePerformance() {
        return Monitoring.getEntriesByType('resource');
    }

    static RequestTiming() {
        console.log(Date.now())
        Resource.getResourcePerformance()
            .forEach(item => {
                console.log(item);
                setTimeout(() => {
                    console.log('Request timing = '+ item.name +' '+ (item.responseEnd - item.requestStart)+ ' '+item.duration);
                }, 1000);
            });
    }
}


// TODO: need ms to sec function;
const toSec = m => (m / 1000).toFixed(2);

const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('Server Timing', entry);
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
/*
document.write("hello")

const write = document.write;
document.write = (params) => {
    console.warn("noooo");
    write.call(document, params);
}
document.write("bye")

const evaluate = window.eval;

window.eval = (params) => {
    console.warn("noooo!");
    evaluate.call(window, params)
}

eval("console.log(1+1)");

*/





/** DO NOT DELETE!!!!!!!!!! */

//for finding the image element from the source
// Array.from(document.getElementsByTagName('img')).filter(i => i.src=='https://www.nicepng.com/png/detail/503-5032252_shamim-amiri-blank-female-avatar-icon.png')

/** DO NOT DELETE!!!!!!!!!! */
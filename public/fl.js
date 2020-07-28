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
        return new Promise((resolve) => {
            // TODO: promise inner validation
            resolve(
                Navigation.getNavigationPerformance()
                    .forEach(item => {
                        // console.log(item);
                        // TODO: get dom content loaded time, you need item.domContentLoadedEventEnd and item.domContentLoadedEventStart
                        setTimeout(() => {
                            console.log('dom content loaded', item.domContentLoadedEventEnd, item.domContentLoadedEventStart);
                        }, 0);
                    })
            );
        });
    }

    static DOMCompleteTiming() {
        return new Promise((resolve) => {
            // TODO: promise inner validation
            resolve(
                Navigation.getNavigationPerformance()
                    .forEach(item => {
                        setTimeout(() => {
                            console.log('DOM complete = ' + toSec(item.domComplete));
                        }, 1000);
                    })
            );

            reject(console.log('ERROR'))
        });
    }
}


const toSec = m => (m / 1000).toFixed(2);

/*
DON'T TOUCH THE FOLLOWING CODE IN THIS COMMENT!!!

const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('Server Timing', entry);
    }
});
po.observe({ type: 'beacon', buffered: true });

const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log(pageLoadTime);
*/

// classes methods execute
// Navigation.DOMContentLoadedTiming();
Navigation.DOMCompleteTiming();
Navigation.DOMContentLoadedTiming();
